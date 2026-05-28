/**
 * Mémoire Helper - Serveur de Stockage Local Natif (Sans dépendance / Sans Express)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const SESSION_COOKIE_NAME = 'memoire_session';
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000; // 7 jours

// Types MIME pour le support correct des fichiers par le navigateur
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.json': 'application/json; charset=utf-8'
};

function parseCookies(cookieHeader) {
    const cookies = {};
    if (!cookieHeader) return cookies;
    cookieHeader.split(';').forEach(cookie => {
        const [name, ...rest] = cookie.split('=');
        if (!name) return;
        cookies[name.trim()] = decodeURIComponent(rest.join('=').trim());
    });
    return cookies;
}

function sendJSON(res, status, payload, extraHeaders = {}) {
    res.writeHead(status, Object.assign({
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store'
    }, extraHeaders));
    res.end(JSON.stringify(payload));
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password, 'utf8').digest('hex');
}

function createSessionToken() {
    return crypto.randomBytes(24).toString('hex');
}

function parseJSONBody(req, callback) {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
        try {
            callback(null, JSON.parse(body || '{}'));
        } catch (err) {
            callback(err);
        }
    });
}

function createDefaultUserState() {
    return {
        projects: [],
        activeProjectId: null,
        activeCitationStyle: 'ieee'
    };
}

function normalizeStorageData(data) {
    if (!data || typeof data !== 'object') {
        return { users: {}, sessions: {} };
    }
    if (!data.users && (data.projects || data.activeProjectId !== undefined || data.activeCitationStyle !== undefined)) {
        return {
            users: {
                legacy: {
                    passwordHash: null,
                    state: {
                        projects: data.projects || [],
                        activeProjectId: data.activeProjectId || null,
                        activeCitationStyle: data.activeCitationStyle || 'ieee'
                    }
                }
            },
            sessions: {}
        };
    }
    return {
        users: data.users || {},
        sessions: data.sessions || {}
    };
}

function loadDataFile(callback) {
    fs.readFile(DATA_FILE, 'utf8', (err, rawData) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return callback(null, { users: {}, sessions: {} });
            }
            return callback(err);
        }

        try {
            const parsed = JSON.parse(rawData || '{}');
            callback(null, normalizeStorageData(parsed));
        } catch (parseErr) {
            callback(parseErr);
        }
    });
}

function saveDataFile(data, callback) {
    fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8', callback);
}

function resolveSession(req, callback) {
    const cookies = parseCookies(req.headers.cookie || '');
    const token = cookies[SESSION_COOKIE_NAME];
    if (!token) {
        return callback(null, null);
    }

    loadDataFile((err, data) => {
        if (err) return callback(err);
        const session = data.sessions[token];
        if (!session || session.expires < Date.now()) {
            return callback(null, null);
        }
        return callback(null, session.username);
    });
}

function clearSessionCookie(res) {
    res.setHeader('Set-Cookie', `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`);
}

const server = http.createServer((req, res) => {
    if (req.url === '/api/auth/status' && req.method === 'GET') {
        return resolveSession(req, (err, username) => {
            if (err) return sendJSON(res, 500, { error: 'Erreur serveur' });
            if (!username) return sendJSON(res, 200, { authenticated: false });
            sendJSON(res, 200, { authenticated: true, username });
        });
    }

    if (req.url === '/api/auth/register' && req.method === 'POST') {
        return parseJSONBody(req, (err, body) => {
            if (err) return sendJSON(res, 400, { error: 'Format JSON invalide' });

            const username = String((body.username || '').trim()).toLowerCase();
            const password = String(body.password || '');

            if (!username || !password) {
                return sendJSON(res, 400, { error: 'Nom d\'utilisateur et mot de passe requis' });
            }
            if (!/^[a-zA-Z0-9._-]{3,32}$/.test(username)) {
                return sendJSON(res, 400, { error: 'Nom d\'utilisateur invalide' });
            }
            if (password.length < 6) {
                return sendJSON(res, 400, { error: 'Mot de passe trop court (min 6 caractères)' });
            }

            loadDataFile((loadErr, data) => {
                if (loadErr) return sendJSON(res, 500, { error: 'Impossible de lire les données' });
                data.users = data.users || {};
                if (data.users[username]) {
                    return sendJSON(res, 409, { error: 'Ce nom d\'utilisateur existe déjà' });
                }

                const token = createSessionToken();
                data.users[username] = {
                    passwordHash: hashPassword(password),
                    state: createDefaultUserState()
                };
                data.sessions = data.sessions || {};
                data.sessions[token] = {
                    username,
                    expires: Date.now() + SESSION_TTL
                };

                saveDataFile(data, saveErr => {
                    if (saveErr) return sendJSON(res, 500, { error: 'Impossible d\'enregistrer l\'utilisateur' });
                    sendJSON(res, 200, { success: true, username }, { 'Set-Cookie': `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; Max-Age=${SESSION_TTL / 1000}; SameSite=Lax` });
                });
            });
        });
    }

    if (req.url === '/api/auth/login' && req.method === 'POST') {
        return parseJSONBody(req, (err, body) => {
            if (err) return sendJSON(res, 400, { error: 'Format JSON invalide' });

            const username = String((body.username || '').trim()).toLowerCase();
            const password = String(body.password || '');

            if (!username || !password) {
                return sendJSON(res, 400, { error: 'Nom d\'utilisateur et mot de passe requis' });
            }

            loadDataFile((loadErr, data) => {
                if (loadErr) return sendJSON(res, 500, { error: 'Impossible de lire les données' });
                const user = data.users && data.users[username];
                if (!user || !user.passwordHash) {
                    return sendJSON(res, 401, { error: 'Nom d\'utilisateur ou mot de passe invalide' });
                }
                if (hashPassword(password) !== user.passwordHash) {
                    return sendJSON(res, 401, { error: 'Nom d\'utilisateur ou mot de passe invalide' });
                }

                const token = createSessionToken();
                data.sessions = data.sessions || {};
                data.sessions[token] = {
                    username,
                    expires: Date.now() + SESSION_TTL
                };

                saveDataFile(data, saveErr => {
                    if (saveErr) return sendJSON(res, 500, { error: 'Impossible de créer la session' });
                    sendJSON(res, 200, { success: true, username }, { 'Set-Cookie': `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; Max-Age=${SESSION_TTL / 1000}; SameSite=Lax` });
                });
            });
        });
    }

    if (req.url === '/api/auth/logout' && req.method === 'POST') {
        const cookies = parseCookies(req.headers.cookie || '');
        const token = cookies[SESSION_COOKIE_NAME];
        if (token) {
            loadDataFile((loadErr, data) => {
                if (!loadErr && data.sessions && data.sessions[token]) {
                    delete data.sessions[token];
                    saveDataFile(data, () => {});
                }
            });
        }
        clearSessionCookie(res);
        return sendJSON(res, 200, { success: true });
    }

    if (req.url === '/api/state' && req.method === 'GET') {
        return resolveSession(req, (err, username) => {
            if (err) return sendJSON(res, 500, { error: 'Erreur serveur' });
            if (!username) return sendJSON(res, 401, { error: 'Non authentifié' });

            loadDataFile((loadErr, data) => {
                if (loadErr) return sendJSON(res, 500, { error: 'Impossible de lire les données' });
                const user = data.users && data.users[username];
                sendJSON(res, 200, user && user.state ? user.state : createDefaultUserState());
            });
        });
    }

    if (req.url === '/api/state' && req.method === 'POST') {
        return resolveSession(req, (err, username) => {
            if (err) return sendJSON(res, 500, { error: 'Erreur serveur' });
            if (!username) return sendJSON(res, 401, { error: 'Non authentifié' });

            parseJSONBody(req, (parseErr, body) => {
                if (parseErr) return sendJSON(res, 400, { error: 'Format JSON invalide' });
                loadDataFile((loadErr, data) => {
                    if (loadErr) return sendJSON(res, 500, { error: 'Impossible de lire les données' });
                    data.users = data.users || {};
                    data.users[username] = data.users[username] || { passwordHash: null, state: createDefaultUserState() };
                    data.users[username].state = body;
                    saveDataFile(data, saveErr => {
                        if (saveErr) return sendJSON(res, 500, { error: 'Impossible d\'écrire le fichier sur le disque' });
                        sendJSON(res, 200, { success: true, message: 'Sauvegarde effectuée' });
                    });
                });
            });
        });
    }

    // 3. Service des fichiers statiques
    let urlPath = req.url === '/' ? '/index.html' : req.url;
    // Nettoyer les paramètres de requête éventuels (ex: ?t=123)
    urlPath = urlPath.split('?')[0];
    
    const fullPath = path.join(__dirname, urlPath);

    // Sécurité : Interdire l'accès en dehors du dossier du projet
    if (!fullPath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Accès interdit (hors du répertoire racine)');
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Fichier non trouvé');
            } else {
                console.error('Erreur de lecture de fichier statique :', err);
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Erreur interne du serveur');
            }
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

// Écouter sur 0.0.0.0 pour permettre l'accès depuis le réseau local (ex: téléphone)
server.listen(PORT, '0.0.0.0', () => {
    console.log("=================================================");
    console.log("   MÉMOIRE HELPER - SERVEUR LOCAL DÉMARRÉ        ");
    console.log(`   URL locale : http://localhost:${PORT}        `);
    console.log("   --------------------------------------------- ");
    console.log("   Pour y accéder depuis votre téléphone :       ");
    console.log("   1. Connectez votre téléphone au même Wi-Fi   ");
    console.log("   2. Utilisez l'adresse IP de ce PC :          ");
    console.log(`      http://<IP_DE_VOTRE_PC>:${PORT}          `);
    console.log("=================================================");
});
