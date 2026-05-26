/**
 * Mémoire Helper - Serveur de Stockage Local Natif (Sans dépendance / Sans Express)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

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

const server = http.createServer((req, res) => {
    
    // 1. API : Charger l'état global (GET /api/state)
    if (req.url === '/api/state' && req.method === 'GET') {
        fs.readFile(DATA_FILE, 'utf8', (err, data) => {
            res.writeHead(200, { 
                'Content-Type': 'application/json; charset=utf-8',
                'Cache-Control': 'no-store'
            });
            
            if (err) {
                if (err.code === 'ENOENT') {
                    // Si le fichier n'existe pas, renvoyer un état vide
                    return res.end(JSON.stringify({ projects: [], activeProjectId: null }));
                }
                console.error("Erreur de lecture :", err);
                return res.end(JSON.stringify({ error: "Impossible de lire les données" }));
            }
            res.end(data);
        });
        return;
    }

    // 2. API : Sauvegarder l'état global (POST /api/state)
    if (req.url === '/api/state' && req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const state = JSON.parse(body);
                const jsonStr = JSON.stringify(state, null, 2);
                
                fs.writeFile(DATA_FILE, jsonStr, 'utf8', (err) => {
                    if (err) {
                        console.error("Erreur d'écriture :", err);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ error: "Impossible d'écrire le fichier sur le disque" }));
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, message: "Sauvegarde effectuée" }));
                });
            } catch (e) {
                console.error("Erreur de parsing JSON reçu :", e);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Format JSON invalide" }));
            }
        });
        return;
    }

    // 3. Service des fichiers statiques
    let urlPath = req.url === '/' ? '/index.html' : req.url;
    // Nettoyer les paramètres de requête éventuels (ex: ?t=123)
    urlPath = urlPath.split('?')[0];
    
    const fullPath = path.join(__dirname, urlPath);

    // Sécurité : Interdire l'accès en dehors du dossier du projet
    if (!fullPath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end("Accès interdit (hors du répertoire racine)");
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end("Fichier non trouvé");
            } else {
                console.error("Erreur de lecture de fichier statique :", err);
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end("Erreur interne du serveur");
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
