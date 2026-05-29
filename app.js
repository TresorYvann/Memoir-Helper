/**
 * Mémoire Helper - Application de Rédaction et de Structuration pour Mémoire d'Ingénieur
 * Logique Frontend & Gestion d'État
 */

// ==========================================================================
// 1. Modèles de plans prédéfinis
// ==========================================================================
const PLAN_PRESETS = {
    rd: [
        {
            id: 'intro',
            title: '1. Introduction générale',
            targetWords: 1000,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'c1', label: 'Définir le contexte général et industriel', checked: false },
                { id: 'c2', label: 'Formuler la problématique technique', checked: false },
                { id: 'c3', label: 'Énoncer les objectifs du projet', checked: false },
                { id: 'c4', label: 'Présenter la structure du document (annonce du plan)', checked: false }
            ],
            guidelines: '<p>L\'introduction doit situer le sujet dans son contexte professionnel ou de recherche. Elle expose clairement les enjeux, le problème auquel vous faites face, et la démarche générale que vous allez suivre pour y répondre.</p>'
        },
        {
            id: 'state_of_art',
            title: '2. État de l\'art & Choix techniques',
            targetWords: 2500,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'c5', label: 'Rechercher les solutions existantes (littérature/marché)', checked: false },
                { id: 'c6', label: 'Comparer les technologies (avantages / inconvénients)', checked: false },
                { id: 'c7', label: 'Justifier scientifiquement les choix finaux', checked: false },
                { id: 'c8', label: 'Identifier les verrous technologiques à lever', checked: false }
            ],
            guidelines: '<p>Cette section démontre votre rigueur d\'ingénieur. Vous devez analyser la littérature, la documentation technique, comparer les solutions disponibles et justifier pourquoi vous avez choisi une technologie ou méthode plutôt qu\'une autre.</p>'
        },
        {
            id: 'requirements',
            title: '3. Analyse des besoins & Spécifications',
            targetWords: 2000,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'c9', label: 'Lister les besoins fonctionnels', checked: false },
                { id: 'c10', label: 'Définir les besoins non-fonctionnels (performance, sécurité...)', checked: false },
                { id: 'c11', label: 'Présenter les cas d\'utilisation (UML - Use Cases)', checked: false },
                { id: 'c12', label: 'Établir les critères d\'acceptation', checked: false }
            ],
            guidelines: '<p>Détaillez le cahier des charges. Quels sont les besoins de l\'utilisateur final ? Quelles sont les contraintes techniques, budgétaires ou réglementaires ? Utilisez des diagrammes s\'ils facilitent la compréhension.</p>'
        },
        {
            id: 'conception',
            title: '4. Conception & Architecture de la solution',
            targetWords: 3000,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'c13', label: 'Schématiser l\'architecture globale du système', checked: false },
                { id: 'c14', label: 'Décrire le modèle de données (MCD / diagramme de classes)', checked: false },
                { id: 'c15', label: 'Détailler le fonctionnement des interfaces (APIs, UI)', checked: false },
                { id: 'c16', label: 'Expliquer les choix de conception algorithmique', checked: false }
            ],
            guidelines: '<p>Présentez la structure interne de votre solution. C\'est le cœur conceptuel de votre travail d\'ingénieur. Expliquez comment les modules interagissent entre eux, comment les données circulent, et justifiez vos choix architecturaux (ex: MVC, microservices, cloud...).</p>'
        },
        {
            id: 'implementation',
            title: '5. Réalisation & Implémentation',
            targetWords: 3000,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'c17', label: 'Décrire les phases clés du développement', checked: false },
                { id: 'c18', label: 'Présenter des extraits de code critiques ou configurations clés', checked: false },
                { id: 'c19', label: 'Expliquer la résolution des problèmes complexes rencontrés', checked: false },
                { id: 'c20', label: 'Présenter l\'interface finale (captures d\'écran à l\'appui)', checked: false }
            ],
            guidelines: '<p>Décrivez concrètement comment vous avez mis en œuvre la conception. Évitez de lister des détails de code triviaux ; concentrez-vous sur l\'essentiel, les algorithmes spécifiques, les configurations complexes et l\'intégration.</p>'
        },
        {
            id: 'validation',
            title: '6. Validation & Évaluation des résultats',
            targetWords: 2000,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'c21', label: 'Détailler le plan de tests (unitaires, intégration, charge)', checked: false },
                { id: 'c22', label: 'Présenter les métriques de performance obtenues', checked: false },
                { id: 'c23', label: 'Comparer les résultats réels aux spécifications de départ', checked: false },
                { id: 'c24', label: 'Recueillir et analyser les retours utilisateurs', checked: false }
            ],
            guidelines: '<p>Apportez la preuve que votre système fonctionne et résout la problématique initiale. Présentez des graphiques de performance, des résultats de tests de charge, des taux de couverture de code, ou des évaluations d\'ergonomie.</p>'
        },
        {
            id: 'conclusion',
            title: '7. Conclusion générale & Perspectives',
            targetWords: 1500,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'c25', label: 'Faire la synthèse du travail accompli', checked: false },
                { id: 'c26', label: 'Discuter les limites actuelles de la solution', checked: false },
                { id: 'c27', label: 'Proposer des voies d\'amélioration futures', checked: false },
                { id: 'c28', label: 'Formuler un bilan personnel et professionnel', checked: false }
            ],
            guidelines: '<p>Résumez vos contributions. Prenez du recul sur vos résultats en analysant objectivement les limites du projet. Enfin, ouvrez sur les perspectives d\'évolution de la solution et partagez votre retour d\'expérience en tant que futur ingénieur.</p>'
        }
    ],
    academic: [
        {
            id: 'intro',
            title: '1. Introduction',
            targetWords: 1000,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ca1', label: 'Contexte scientifique', checked: false },
                { id: 'ca2', label: 'Question de recherche', checked: false },
                { id: 'ca3', label: 'Hypothèses de travail', checked: false },
                { id: 'ca4', label: 'Annonce du plan', checked: false }
            ],
            guidelines: '<p>Introduisez le domaine scientifique et le sujet précis de recherche. Définissez la problématique de manière formelle et émettez des hypothèses claires.</p>'
        },
        {
            id: 'literature',
            title: '2. Revue de la littérature',
            targetWords: 3500,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ca5', label: 'Synthèse des travaux antérieurs', checked: false },
                { id: 'ca6', label: 'Identification des manques de la recherche actuelle', checked: false },
                { id: 'ca7', label: 'Positionnement de vos travaux', checked: false }
            ],
            guidelines: '<p>Présentez l\'état de la science sur le sujet. Référencez rigoureusement les articles fondateurs et les avancées récentes. Mettez en évidence les limites des approches actuelles que vous cherchez à dépasser.</p>'
        },
        {
            id: 'methodology',
            title: '3. Méthodologie & Approche proposée',
            targetWords: 3000,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ca8', label: 'Modélisation formelle / théorique', checked: false },
                { id: 'ca9', label: 'Protocole expérimental détaillé', checked: false },
                { id: 'ca10', label: 'Description du jeu de données ou des instruments', checked: false }
            ],
            guidelines: '<p>Décrivez précisément votre démarche scientifique, vos modèles mathématiques ou théoriques. Votre méthodologie doit être assez détaillée pour que vos expériences soient reproductibles par d\'autres chercheurs.</p>'
        },
        {
            id: 'experiments',
            title: '4. Expérimentation & Résultats',
            targetWords: 3500,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ca11', label: 'Présentation des données brutes récoltées', checked: false },
                { id: 'ca12', label: 'Graphiques et tableaux de résultats clairs', checked: false },
                { id: 'ca13', label: 'Validation statistique des résultats', checked: false }
            ],
            guidelines: '<p>Exposez les faits. Présentez vos résultats sous forme de courbes, de graphiques ou de tableaux. Évitez d\'interpréter les résultats dans cette section, présentez-les simplement de manière claire et objective.</p>'
        },
        {
            id: 'discussion',
            title: '5. Discussion & Analyse critique',
            targetWords: 2500,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ca14', label: 'Interprétation des résultats obtenus', checked: false },
                { id: 'ca15', label: 'Vérification ou infirmation des hypothèses', checked: false },
                { id: 'ca16', label: 'Comparaison avec les travaux de l\'état de l\'art', checked: false },
                { id: 'ca17', label: 'Discussion des biais ou sources d\'erreurs', checked: false }
            ],
            guidelines: '<p>C\'est ici que vous donnez du sens à vos résultats. Expliquez les écarts éventuels par rapport à vos hypothèses. Comparez vos résultats à ceux de la littérature. Soyez honnête sur les limites de vos données ou méthodes.</p>'
        },
        {
            id: 'conclusion',
            title: '6. Conclusion & Perspectives',
            targetWords: 1500,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ca18', label: 'Synthèse des conclusions majeures', checked: false },
                { id: 'ca19', label: 'Contributions scientifiques apportées', checked: false },
                { id: 'ca20', label: 'Pistes pour de futurs travaux de recherche', checked: false }
            ],
            guidelines: '<p>Résumez les découvertes clés et leur portée. Ouvrez sur des questions scientifiques qui restent en suspens et méritent d\'être étudiées par la suite.</p>'
        }
    ],
    audit: [
        {
            id: 'intro',
            title: '1. Introduction & Contexte de l\'audit',
            targetWords: 1000,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ci1', label: 'Présentation de l\'organisation et du secteur', checked: false },
                { id: 'ci2', label: 'Définition du périmètre de l\'étude', checked: false },
                { id: 'ci3', label: 'Objectifs de performance visés', checked: false }
            ],
            guidelines: '<p>Cadrez votre sujet. Présentez l\'entreprise ou l\'usine auditée, délimitez le périmètre exact (atelier, ligne de production, service informatique) et exposez les enjeux financiers ou opérationnels.</p>'
        },
        {
            id: 'diagnosis',
            title: '2. Diagnostic de l\'existant',
            targetWords: 3000,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ci4', label: 'Cartographie des processus actuels', checked: false },
                { id: 'ci5', label: 'Mesure de l\'état actuel (KPIs bruts, anomalies)', checked: false },
                { id: 'ci6', label: 'Analyse des causes racines (5 Pourquoi, Ishikawa...)', checked: false }
            ],
            guidelines: '<p>Modélisez la situation actuelle. Utilisez des outils qualité (diagramme d\'Ishikawa, 5M, VSM). Appuyez-vous sur des données chiffrées réelles pour identifier précisément où se situent les pertes de performance ou les risques.</p>'
        },
        {
            id: 'methodology',
            title: '3. Cadre méthodologique & Théorique',
            targetWords: 2500,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ci7', label: 'Présentation des standards ou normes de référence', checked: false },
                { id: 'ci8', label: 'Choix de la méthodologie d\'amélioration (ex: Lean, Six Sigma)', checked: false }
            ],
            guidelines: '<p>Justifiez les concepts académiques et industriels sur lesquels vous vous appuyez (ex: Lean Manufacturing, ITIL, normes ISO, Kaizen). Expliquez pourquoi ils s\'appliquent à votre problématique.</p>'
        },
        {
            id: 'proposals',
            title: '4. Recommandations & Solutions proposées',
            targetWords: 3000,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ci9', label: 'Lister et hiérarchiser les solutions possibles', checked: false },
                { id: 'ci10', label: 'Évaluer le coût / bénéfice et les risques de chaque option', checked: false },
                { id: 'ci11', label: 'Détailler le plan d\'action d\'implémentation', checked: false }
            ],
            guidelines: '<p>Présentez vos solutions. Ne vous contentez pas d\'une seule idée, montrez que vous avez étudié plusieurs scénarios. Justifiez le scénario retenu par une étude de rentabilité (ROI) ou d\'analyse de risques (AMDEC).</p>'
        },
        {
            id: 'evaluation',
            title: '5. Déploiement & Évaluation des gains',
            targetWords: 3500,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ci12', label: 'Suivi de la mise en œuvre sur le terrain', checked: false },
                { id: 'ci13', label: 'Mesure post-implémentation des indicateurs de performance', checked: false },
                { id: 'ci14', label: 'Bilan financier ou de gains de temps constatés', checked: false },
                { id: 'ci15', label: 'Plan de pérennisation des gains (conduite du changement)', checked: false }
            ],
            guidelines: '<p>Mesurez les résultats. Comparez les KPIs "Avant" et "Après". Expliquez comment vous avez géré les aspects humains et organisationnels (conduite du changement, formation des équipes).</p>'
        },
        {
            id: 'conclusion',
            title: '6. Conclusion générale & Recommandations futures',
            targetWords: 1500,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ci16', label: 'Synthèse de l\'audit et des résultats', checked: false },
                { id: 'ci17', label: 'Feuille de route à moyen/long terme pour l\'entreprise', checked: false }
            ],
            guidelines: '<p>Faites le bilan général des gains opérationnels et proposez une feuille de route stratégique pour que l\'organisation continue de s\'améliorer.</p>'
        }
    ],
    empty: [
        {
            id: 'intro',
            title: '1. Introduction',
            targetWords: 1000,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ce1', label: 'Définir la problématique', checked: false }
            ],
            guidelines: '<p>Présentez votre sujet et structurez votre introduction.</p>'
        },
        {
            id: 'chapitre1',
            title: '2. Développement',
            targetWords: 5000,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ce2', label: 'Rédiger le corps principal', checked: false }
            ],
            guidelines: '<p>Développez vos arguments techniques ou scientifiques.</p>'
        },
        {
            id: 'conclusion',
            title: '3. Conclusion',
            targetWords: 1000,
            draft: '',
            status: 'todo',
            checklist: [
                { id: 'ce3', label: 'Résumer et ouvrir sur les perspectives', checked: false }
            ],
            guidelines: '<p>Concluez votre rapport de mémoire.</p>'
        }
    ]
};

// ==========================================================================
// 2. Gestion de l'état global (State)
// ==========================================================================
let state = {
    projects: [],
    activeProjectId: null,
    activeSectionId: null,
    activeCitationStyle: 'ieee' // 'ieee' or 'apa'
};

let currentUser = null;

function showLoginOverlay(message = '') {
    const overlay = document.getElementById('auth-overlay');
    const messageEl = document.getElementById('auth-message');
    if (overlay) overlay.style.display = 'flex';
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.style.display = message ? 'block' : 'none';
    }
    const appContainer = document.querySelector('.app-container');
    if (appContainer) appContainer.style.filter = 'blur(4px)';
}

function hideLoginOverlay() {
    const overlay = document.getElementById('auth-overlay');
    if (overlay) overlay.style.display = 'none';
    const appContainer = document.querySelector('.app-container');
    if (appContainer) appContainer.style.filter = 'none';
}

function updateUserBadge(username) {
    const userBadge = document.getElementById('current-user-badge');
    const logoutBtn = document.getElementById('btn-logout');
    if (userBadge) {
        userBadge.textContent = username ? `Utilisateur : ${username}` : '';
        userBadge.style.display = username ? 'inline-flex' : 'none';
    }
    if (logoutBtn) {
        logoutBtn.style.display = username ? 'inline-flex' : 'none';
    }
}

async function callAuthApi(path, payload) {
    const response = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    return response;
}

async function loginUser(username, password) {
    try {
        const response = await callAuthApi('/api/auth/login', { username, password });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Erreur de connexion');
        }
        currentUser = data.username;
        updateUserBadge(currentUser);
        hideLoginOverlay();
        await initializeAppAfterLogin();
    } catch (err) {
        showLoginOverlay(err.message);
    }
}

async function registerUser(username, password, confirmPassword) {
    if (password !== confirmPassword) {
        showLoginOverlay('Les mots de passe ne correspondent pas.');
        return;
    }
    try {
        const response = await callAuthApi('/api/auth/register', { username, password });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Erreur d\'inscription');
        }
        currentUser = data.username;
        updateUserBadge(currentUser);
        hideLoginOverlay();
        await initializeAppAfterLogin();
    } catch (err) {
        showLoginOverlay(err.message);
    }
}

async function logoutUser() {
    try {
        await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
        console.warn('Impossible de se déconnecter proprement', e);
    }
    currentUser = null;
    updateUserBadge(null);
    showLoginOverlay('Vous êtes déconnecté. Connectez-vous pour accéder à votre espace.');
}

async function checkAuthStatus() {
    try {
        const response = await fetch('/api/auth/status');
        if (response.ok) {
            const data = await response.json();
            if (data.authenticated) {
                currentUser = data.username;
                updateUserBadge(currentUser);
                return true;
            }
        }
    } catch (e) {
        console.warn('Impossible de vérifier l\'authentification :', e);
    }
    return false;
}

function initLoginForms() {
    const loginTab = document.getElementById('auth-tab-login');
    const registerTab = document.getElementById('auth-tab-register');
    const loginForm = document.getElementById('login-auth-form');
    const registerForm = document.getElementById('register-auth-form');
    const authMessage = document.getElementById('auth-message');

    function switchAuthTab(target) {
        if (!loginForm || !registerForm || !loginTab || !registerTab) return;
        if (target === 'login') {
            loginForm.classList.add('auth-form-active');
            registerForm.classList.remove('auth-form-active');
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            authMessage.textContent = '';
        } else {
            loginForm.classList.remove('auth-form-active');
            registerForm.classList.add('auth-form-active');
            loginTab.classList.remove('active');
            registerTab.classList.add('active');
            authMessage.textContent = '';
        }
    }

    if (loginTab) loginTab.addEventListener('click', () => switchAuthTab('login'));
    if (registerTab) registerTab.addEventListener('click', () => switchAuthTab('register'));

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('auth-login-username').value.trim();
            const password = document.getElementById('auth-login-password').value;
            await loginUser(username, password);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('auth-register-username').value.trim();
            const password = document.getElementById('auth-register-password').value;
            const confirmPassword = document.getElementById('auth-register-password-confirm').value;
            await registerUser(username, password, confirmPassword);
        });
    }

    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) logoutBtn.addEventListener('click', logoutUser);
}

async function initializeAppAfterLogin() {
    await loadStateFromServer();
    if (state.projects.length === 0) {
        createDefaultProject();
    }
    renderProjectSelector();
    loadActiveProject();
}

// Pomodoro Timer State
let pomoTimer = {
    intervalId: null,
    timeLeft: 1500, // 25 minutes default
    status: 'idle', // 'idle', 'running', 'paused'
    audioCtx: null
};

// ==========================================================================
// 3. Initialisation de l'application
// ==========================================================================
document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    initLoginForms();
    initRouting();
    initEventListeners();
    initTableGenerator();

    const authenticated = await checkAuthStatus();
    if (!authenticated) {
        showLoginOverlay('Connectez-vous ou créez un compte pour accéder à votre espace.');
        return;
    }

    await initializeAppAfterLogin();
    hideLoginOverlay();
});

// Charger l'état depuis le serveur local (avec repli sur localStorage)
async function loadStateFromServer() {
    try {
        const response = await fetch('/api/state');
        if (response.ok) {
            const serverState = await response.json();
            if (serverState && serverState.projects && serverState.projects.length > 0) {
                state.projects = serverState.projects;
                state.activeProjectId = serverState.activeProjectId;
                state.activeCitationStyle = serverState.activeCitationStyle || 'ieee';
                // Mettre à jour la copie locale
                localStorage.setItem('memoire_helper_state', JSON.stringify(state));
                console.log("Données chargées depuis le serveur local.");
                return true;
            }
        }
    } catch (e) {
        console.warn("Impossible de contacter le serveur, repli sur localStorage.", e);
    }
    
    // Repli sur le localStorage
    loadStateFromStorage();
    return false;
}

// Charger l'état depuis localStorage
function loadStateFromStorage() {
    try {
        const savedState = localStorage.getItem('memoire_helper_state');
        if (savedState) {
            const parsed = JSON.parse(savedState);
            state.projects = parsed.projects || [];
            state.activeProjectId = parsed.activeProjectId || null;
            state.activeCitationStyle = parsed.activeCitationStyle || 'ieee';
        }
    } catch (e) {
        console.error("Erreur de chargement du localStorage : ", e);
    }
}

// Sauvegarder l'état (localement d'abord, puis sur le serveur)
async function saveStateToStorage() {
    // 1. Sauvegarde locale instantanée
    try {
        localStorage.setItem('memoire_helper_state', JSON.stringify({
            projects: state.projects,
            activeProjectId: state.activeProjectId,
            activeCitationStyle: state.activeCitationStyle
        }));
    } catch (e) {
        console.error("Erreur de sauvegarde locale :", e);
    }

    const saveStatusEl = document.getElementById('save-status');
    
    // 2. Envoi asynchrone au serveur
    try {
        const response = await fetch('/api/state', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state)
        });
        
        if (response.ok) {
            saveStatusEl.style.color = 'var(--accent-success)';
            saveStatusEl.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Sauvegardé sur le disque (data.json)';
        } else {
            throw new Error("Erreur de sauvegarde serveur");
        }
    } catch (e) {
        saveStatusEl.style.color = 'var(--accent-warning)';
        saveStatusEl.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Sauvegardé localement (hors-ligne)';
    }

    // Réinitialiser le texte après 2 secondes
    setTimeout(() => {
        saveStatusEl.style.color = 'var(--text-muted)';
        saveStatusEl.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Données sauvegardées localement';
    }, 2000);
}

// Initialiser le thème (sombre par défaut)
function initTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    const savedTheme = localStorage.getItem('memoire_helper_theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('memoire_helper_theme', 'light');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('memoire_helper_theme', 'dark');
        }
    });
}

// Créer un projet par défaut si vide
function createDefaultProject() {
    const defaultProj = {
        id: 'proj_' + Date.now(),
        name: 'Mon Mémoire de Fin d\'Études (R&D)',
        type: 'rd',
        targetWords: 15000,
        deadline: '',
        sections: JSON.parse(JSON.stringify(PLAN_PRESETS.rd)), // deep copy
        acronyms: [
            { term: 'API', definition: 'Application Programming Interface', desc: 'Interface de programmation pour la communication entre systèmes.' },
            { term: 'MVC', definition: 'Model-View-Controller', desc: 'Patron d\'architecture logicielle séparant les données, la logique et l\'affichage.' },
            { term: 'UML', definition: 'Unified Modeling Language', desc: 'Langage de modélisation graphique standardisé pour le génie logiciel.' }
        ],
        references: [
            {
                id: 'ref_1',
                key: 'sommerville2020',
                type: 'book',
                title: 'Software Engineering (10th Edition)',
                author: 'I. Sommerville',
                year: 2020,
                publisher: 'Pearson',
                city: 'Boston'
            },
            {
                id: 'ref_2',
                key: 'fielding2000',
                type: 'thesis',
                title: 'Architectural Styles and the Design of Network-based Software Architectures',
                author: 'R. Fielding',
                year: 2000,
                institution: 'University of California, Irvine'
            }
        ]
    };
    
    state.projects.push(defaultProj);
    state.activeProjectId = defaultProj.id;
    saveStateToStorage();
}

// Initialiser le système de routage par onglets
function initRouting() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const currentTabTitle = document.getElementById('current-tab-title');

    function switchTab(tabId) {
        // Enlever la classe active partout
        navItems.forEach(item => item.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Mettre à l'onglet sélectionné
        const selectedNavItem = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
        const selectedPanel = document.getElementById(`tab-${tabId}`);
        
        if (selectedNavItem && selectedPanel) {
            selectedNavItem.classList.add('active');
            selectedPanel.classList.add('active');
            
            // Modifier le titre en haut
            const titles = {
                dashboard: 'Tableau de bord',
                workspace: 'Rédaction & Plan',
                glossary: 'Glossaire & Sigles',
                bibliography: 'Bibliographie',
                toolbox: 'Boîte à outils'
            };
            currentTabTitle.textContent = titles[tabId] || 'Mémoire Helper';
        }
    }

    // Intercepter les clics sur la nav
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = item.getAttribute('data-tab');
            switchTab(tabId);
            window.location.hash = tabId;
        });
    });

    // Hash change initial
    const currentHash = window.location.hash.substring(1);
    if (currentHash && ['dashboard', 'workspace', 'glossary', 'bibliography', 'toolbox'].includes(currentHash)) {
        switchTab(currentHash);
    }
}

// ==========================================================================
// 4. Gestion des Événements & Modales
// ==========================================================================
function initEventListeners() {
    const btnNewProject = document.getElementById('btn-new-project');
    const btnCloseNewModal = document.getElementById('btn-close-new-modal');
    const newProjectModal = document.getElementById('new-project-modal');
    const newProjectForm = document.getElementById('new-project-form');
    const projectSelect = document.getElementById('project-select');
    const btnDeleteProject = document.getElementById('btn-delete-project');
    
    // Ouvrir le modal Nouveau Projet
    btnNewProject.addEventListener('click', () => {
        newProjectModal.classList.add('open');
    });

    // Fermer le modal
    btnCloseNewModal.addEventListener('click', () => {
        newProjectModal.classList.remove('open');
    });

    // Validation du formulaire de nouveau projet
    newProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('new-project-name-input').value;
        const type = document.getElementById('new-project-type').value;
        const targetWords = parseInt(document.getElementById('new-project-words').value) || 15000;
        const deadline = document.getElementById('new-project-deadline').value;
        
        const newProj = {
            id: 'proj_' + Date.now(),
            name: name,
            type: type,
            targetWords: targetWords,
            deadline: deadline,
            sections: JSON.parse(JSON.stringify(PLAN_PRESETS[type] || PLAN_PRESETS.empty)),
            acronyms: [],
            references: []
        };
        
        state.projects.push(newProj);
        state.activeProjectId = newProj.id;
        
        newProjectForm.reset();
        newProjectModal.classList.remove('open');
        
        saveStateToStorage();
        renderProjectSelector();
        loadActiveProject();
    });

    // Changement de projet actif
    projectSelect.addEventListener('change', () => {
        state.activeProjectId = projectSelect.value;
        saveStateToStorage();
        loadActiveProject();
    });

    // Supprimer le projet actif
    btnDeleteProject.addEventListener('click', () => {
        const activeProj = getActiveProject();
        if (!activeProj) return;
        
        if (confirm(`Êtes-vous sûr de vouloir supprimer définitivement le projet "${activeProj.name}" ? Toutes vos rédactions seront perdues.`)) {
            state.projects = state.projects.filter(p => p.id !== state.activeProjectId);
            
            if (state.projects.length === 0) {
                createDefaultProject();
            } else {
                state.activeProjectId = state.projects[0].id;
            }
            
            saveStateToStorage();
            renderProjectSelector();
            loadActiveProject();
        }
    });

    // Enregistrer la configuration du projet depuis le Dashboard
    document.getElementById('btn-save-config').addEventListener('click', () => {
        const activeProj = getActiveProject();
        if (!activeProj) return;
        
        const newTitle = document.getElementById('config-title').value;
        const targetWords = parseInt(document.getElementById('config-target-words').value) || 15000;
        const deadline = document.getElementById('config-deadline').value;
        
        activeProj.name = newTitle || activeProj.name;
        activeProj.targetWords = targetWords;
        activeProj.deadline = deadline;
        
        saveStateToStorage();
        renderProjectSelector();
        loadActiveProject();
        
        alert("Configuration mise à jour !");
    });

    // Actions d'export/import JSON
    document.getElementById('btn-export-json').addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", `memoire_helper_backup_${Date.now()}.json`);
        dlAnchorElem.click();
    });

    const fileInput = document.getElementById('import-file-input');
    document.getElementById('btn-import-json').addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(evt) {
            try {
                const imported = JSON.parse(evt.target.result);
                if (imported && imported.projects) {
                    state = imported;
                    saveStateToStorage();
                    renderProjectSelector();
                    loadActiveProject();
                    alert("Projets importés avec succès !");
                } else {
                    alert("Format de fichier JSON non reconnu.");
                }
            } catch (err) {
                alert("Erreur de lecture du fichier JSON.");
            }
        };
        reader.readAsText(file);
    });

    // Workspace & Editor
    const textarea = document.getElementById('section-textarea');
    textarea.addEventListener('input', () => {
        const activeProj = getActiveProject();
        if (!activeProj || !state.activeSectionId) return;
        
        const activeSec = activeProj.sections.find(s => s.id === state.activeSectionId);
        if (!activeSec) return;
        
        activeSec.draft = textarea.value;
        
        // Calculer le nombre de mots
        activeSec.words = countWords(textarea.value);
        document.getElementById('editor-section-words').textContent = `${activeSec.words} mots / ${activeSec.targetWords}`;
        
        // Scan des sigles
        scanAcronymsInActiveSection(textarea.value);
        
        saveStateToStorage();
        updateDashboardStats();
    });

    // Statut de section
    const statusSelect = document.getElementById('section-status-select');
    statusSelect.addEventListener('change', () => {
        const activeProj = getActiveProject();
        if (!activeProj || !state.activeSectionId) return;
        
        const activeSec = activeProj.sections.find(s => s.id === state.activeSectionId);
        if (activeSec) {
            activeSec.status = statusSelect.value;
            saveStateToStorage();
            renderOutline();
            updateDashboardStats();
        }
    });

    // Reset outline
    document.getElementById('btn-reset-outline').addEventListener('click', () => {
        const activeProj = getActiveProject();
        if (!activeProj) return;
        
        if (confirm("Réinitialiser le plan supprimera toutes les modifications de plan et réinitialisera aux modèles par défaut. Vos rédactions seront conservées si l'identifiant de la section concorde.")) {
            activeProj.sections = JSON.parse(JSON.stringify(PLAN_PRESETS[activeProj.type] || PLAN_PRESETS.empty));
            saveStateToStorage();
            loadActiveProject();
        }
    });

    // Preview Markdown Toggle
    const btnTogglePreview = document.getElementById('btn-toggle-preview');
    const previewDiv = document.getElementById('section-preview');
    
    btnTogglePreview.addEventListener('click', () => {
        if (previewDiv.style.display === 'none') {
            const activeProj = getActiveProject();
            const activeSec = activeProj ? activeProj.sections.find(s => s.id === state.activeSectionId) : null;
            
            const rawText = activeSec ? activeSec.draft : '';
            previewDiv.innerHTML = parseMarkdown(rawText);
            
            textarea.style.display = 'none';
            previewDiv.style.display = 'block';
            btnTogglePreview.innerHTML = '<i class="fa-solid fa-pen"></i> Éditeur';
            btnTogglePreview.classList.replace('btn-secondary', 'btn-primary');
        } else {
            textarea.style.display = 'block';
            previewDiv.style.display = 'none';
            btnTogglePreview.innerHTML = '<i class="fa-solid fa-eye"></i> Aperçu';
            btnTogglePreview.classList.replace('btn-primary', 'btn-secondary');
        }
    });

    // Pomodoro Timer Focus events
    const btnPomoStart = document.getElementById('btn-pomo-start');
    const btnPomoPause = document.getElementById('btn-pomo-pause');
    const btnPomoReset = document.getElementById('btn-pomo-reset');
    const btnPomoCompactPlay = document.getElementById('btn-pomo-play');
    
    const startPomo = () => {
        if (pomoTimer.status === 'running') return;
        
        // Initialiser AudioContext au premier clic pour respecter les politiques du navigateur
        if (!pomoTimer.audioCtx) {
            pomoTimer.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        pomoTimer.status = 'running';
        btnPomoStart.innerHTML = '<i class="fa-solid fa-play"></i> Reprendre';
        btnPomoStart.disabled = true;
        btnPomoPause.disabled = false;
        btnPomoCompactPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
        
        document.getElementById('pomo-status').textContent = 'En cours';
        document.getElementById('pomo-status').className = 'badge';
        
        pomoTimer.intervalId = setInterval(() => {
            pomoTimer.timeLeft--;
            updatePomoDisplay();
            
            if (pomoTimer.timeLeft <= 0) {
                clearInterval(pomoTimer.intervalId);
                pomoTimer.status = 'idle';
                playPomoAlarm();
                alert("Session terminée ! Prenez une pause.");
                pomoTimer.timeLeft = 1500;
                updatePomoDisplay();
                btnPomoStart.disabled = false;
                btnPomoPause.disabled = true;
                btnPomoStart.innerHTML = '<i class="fa-solid fa-play"></i> Démarrer';
                btnPomoCompactPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        }, 1000);
    };

    const pausePomo = () => {
        if (pomoTimer.status !== 'running') return;
        clearInterval(pomoTimer.intervalId);
        pomoTimer.status = 'paused';
        btnPomoStart.disabled = false;
        btnPomoPause.disabled = true;
        btnPomoCompactPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
        document.getElementById('pomo-status').textContent = 'En pause';
        document.getElementById('pomo-status').className = 'badge';
    };

    const resetPomo = (time = 1500) => {
        clearInterval(pomoTimer.intervalId);
        pomoTimer.status = 'idle';
        pomoTimer.timeLeft = time;
        updatePomoDisplay();
        btnPomoStart.disabled = false;
        btnPomoPause.disabled = true;
        btnPomoStart.innerHTML = '<i class="fa-solid fa-play"></i> Démarrer';
        btnPomoCompactPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
        document.getElementById('pomo-status').textContent = 'Prêt';
        document.getElementById('pomo-status').className = 'badge';
    };

    btnPomoStart.addEventListener('click', startPomo);
    btnPomoPause.addEventListener('click', pausePomo);
    btnPomoReset.addEventListener('click', () => resetPomo(1500));
    
    btnPomoCompactPlay.addEventListener('click', () => {
        if (pomoTimer.status === 'running') {
            pausePomo();
        } else {
            startPomo();
        }
    });

    document.querySelectorAll('.pomo-modes button').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.pomo-modes button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const time = parseInt(btn.getAttribute('data-time'));
            resetPomo(time);
        });
    });

    // GLOSSARY SUBMISSIONS
    const acronymForm = document.getElementById('acronym-form');
    acronymForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const activeProj = getActiveProject();
        if (!activeProj) return;
        
        const term = document.getElementById('acro-term').value.trim().toUpperCase();
        const definition = document.getElementById('acro-definition').value.trim();
        const desc = document.getElementById('acro-desc').value.trim();
        
        // Vérifier si le sigle existe déjà
        const existingIdx = activeProj.acronyms.findIndex(a => a.term === term);
        if (existingIdx !== -1) {
            activeProj.acronyms[existingIdx] = { term, definition, desc };
        } else {
            activeProj.acronyms.push({ term, definition, desc });
        }
        
        acronymForm.reset();
        saveStateToStorage();
        renderGlossary();
        scanAcronymsInActiveSection(textarea.value);
        updateDashboardStats();
    });

    // Recherche de sigle
    document.getElementById('search-acronym').addEventListener('input', (e) => {
        renderGlossary(e.target.value);
    });

    // BIBLIOGRAPHY SUBMISSIONS
    const refType = document.getElementById('ref-type');
    refType.addEventListener('change', () => {
        const type = refType.value;
        document.querySelectorAll('.conditional-fields').forEach(div => div.style.display = 'none');
        
        if (type === 'web') document.getElementById('fields-web').style.display = 'block';
        else if (type === 'book') document.getElementById('fields-book').style.display = 'block';
        else if (type === 'article') document.getElementById('fields-article').style.display = 'block';
        else if (type === 'thesis') document.getElementById('fields-thesis').style.display = 'block';
    });

    const refForm = document.getElementById('ref-form');
    refForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const activeProj = getActiveProject();
        if (!activeProj) return;
        
        const type = refType.value;
        const title = document.getElementById('ref-title').value.trim();
        const author = document.getElementById('ref-author').value.trim();
        const year = parseInt(document.getElementById('ref-year').value);
        
        // Générer une clé de citation automatique
        const authorClean = author.split(',')[0].split(' ').pop().toLowerCase().replace(/[^a-z]/g, '');
        let key = `${authorClean}${year}`;
        
        // S'assurer de l'unicité de la clé
        let keyCount = 1;
        while (activeProj.references.some(r => r.key === key)) {
            key = `${authorClean}${year}_${keyCount}`;
            keyCount++;
        }
        
        const newRef = {
            id: 'ref_' + Date.now(),
            key: key,
            type: type,
            title: title,
            author: author,
            year: year
        };
        
        // Collecter les champs conditionnels
        if (type === 'web') {
            newRef.url = document.getElementById('ref-url').value.trim();
            newRef.publisherWeb = document.getElementById('ref-publisher-web').value.trim();
        } else if (type === 'book') {
            newRef.publisher = document.getElementById('ref-publisher').value.trim();
            newRef.city = document.getElementById('ref-city').value.trim();
        } else if (type === 'article') {
            newRef.journal = document.getElementById('ref-journal').value.trim();
            newRef.volume = document.getElementById('ref-volume').value.trim();
            newRef.pages = document.getElementById('ref-pages').value.trim();
        } else if (type === 'thesis') {
            newRef.institution = document.getElementById('ref-institution').value.trim();
        }
        
        activeProj.references.push(newRef);
        
        refForm.reset();
        // Cacher les champs conditionnels non par défaut
        refType.value = 'web';
        document.querySelectorAll('.conditional-fields').forEach(div => div.style.display = 'none');
        document.getElementById('fields-web').style.display = 'block';
        
        saveStateToStorage();
        renderReferences();
        updateDashboardStats();
    });

    // Style de citation bibliographique
    document.getElementById('btn-style-ieee').addEventListener('click', () => {
        document.getElementById('btn-style-ieee').classList.add('active');
        document.getElementById('btn-style-apa').classList.remove('active');
        state.activeCitationStyle = 'ieee';
        saveStateToStorage();
        renderReferences();
    });
    
    document.getElementById('btn-style-apa').addEventListener('click', () => {
        document.getElementById('btn-style-apa').classList.add('active');
        document.getElementById('btn-style-ieee').classList.remove('active');
        state.activeCitationStyle = 'apa';
        saveStateToStorage();
        renderReferences();
    });

    // Recherche de référence
    document.getElementById('search-ref').addEventListener('input', (e) => {
        renderReferences(e.target.value);
    });

    // EXPORTS BUTTONS
    document.getElementById('btn-export-markdown').addEventListener('click', () => {
        exportProjectAsMarkdown();
    });

    document.getElementById('btn-export-bibtex').addEventListener('click', () => {
        exportProjectAsBibTeX();
    });

    // Copier des snippets dans le presse-papier
    document.querySelectorAll('.btn-copy-snippet').forEach(btn => {
        btn.addEventListener('click', () => {
            const pre = btn.previousElementSibling;
            if (pre && pre.tagName === 'PRE') {
                copyTextToClipboard(pre.textContent);
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Copié !';
                setTimeout(() => btn.innerHTML = originalText, 1500);
            }
        });
    });

    // Commutateur de sous-onglets Bibliographie
    const btnSubLocal = document.getElementById('btn-sub-bib-local');
    const btnSubSearch = document.getElementById('btn-sub-bib-search');
    const bibLocalLayout = document.getElementById('bib-local-layout');
    const bibSearchLayout = document.getElementById('bib-search-layout');

    if (btnSubLocal && btnSubSearch) {
        btnSubLocal.addEventListener('click', () => {
            btnSubLocal.classList.add('active-sub-tab', 'btn-primary');
            btnSubLocal.classList.remove('btn-outline');
            btnSubSearch.classList.remove('active-sub-tab', 'btn-primary');
            btnSubSearch.classList.add('btn-outline');
            
            bibLocalLayout.style.display = 'grid';
            bibSearchLayout.style.display = 'none';
        });

        btnSubSearch.addEventListener('click', () => {
            btnSubSearch.classList.add('active-sub-tab', 'btn-primary');
            btnSubSearch.classList.remove('btn-outline');
            btnSubLocal.classList.remove('active-sub-tab', 'btn-primary');
            btnSubLocal.classList.add('btn-outline');
            
            bibLocalLayout.style.display = 'none';
            bibSearchLayout.style.display = 'flex';
        });
    }

    // Déclencher la recherche scientifique
    const btnSearchScientific = document.getElementById('btn-trigger-scientific-search');
    const scientificSearchInput = document.getElementById('scientific-search-input');
    
    if (btnSearchScientific && scientificSearchInput) {
        btnSearchScientific.addEventListener('click', executeScientificSearch);
        scientificSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                executeScientificSearch();
            }
        });
    }
}

// Obtenir le projet actif
function getActiveProject() {
    return state.projects.find(p => p.id === state.activeProjectId);
}

// Charger les données du projet actif
function loadActiveProject() {
    const activeProj = getActiveProject();
    if (!activeProj) return;

    // Nom dans la top-bar
    document.getElementById('current-project-name').textContent = activeProj.name;
    
    // Remplir la configuration dans le Dashboard
    document.getElementById('config-title').value = activeProj.name;
    document.getElementById('config-target-words').value = activeProj.targetWords;
    document.getElementById('config-deadline').value = activeProj.deadline || '';
    
    // Charger les modules
    updateDashboardStats();
    renderOutline();
    renderGlossary();
    renderReferences();
    
    // Sélectionner la première section par défaut dans l'éditeur s'il y en a
    if (activeProj.sections && activeProj.sections.length > 0) {
        selectSection(activeProj.sections[0].id);
    } else {
        clearEditor();
    }
}

// Générer la liste des projets dans le sélecteur
function renderProjectSelector() {
    const select = document.getElementById('project-select');
    select.innerHTML = '';
    
    state.projects.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.name;
        if (p.id === state.activeProjectId) {
            opt.selected = true;
        }
        select.appendChild(opt);
    });
}

// ==========================================================================
// 5. Dashboard et Statistiques
// ==========================================================================
function updateDashboardStats() {
    const activeProj = getActiveProject();
    if (!activeProj) return;

    // 1. Calculer le nombre total de mots rédigés
    let totalWords = 0;
    activeProj.sections.forEach(s => {
        s.words = countWords(s.draft); // Mettre à jour au passage
        totalWords += s.words;
    });

    const targetWords = activeProj.targetWords || 15000;
    const wordsPercent = Math.min(100, Math.round((totalWords / targetWords) * 100));
    
    document.getElementById('stat-words').textContent = `${totalWords.toLocaleString()} / ${targetWords.toLocaleString()}`;
    const wordsBar = document.getElementById('progress-words-bar');
    wordsBar.style.width = `${wordsPercent}%`;

    // 2. Calculer le pourcentage de progression des sections
    // todo = 10%, in_progress = 40%, review = 80%, done = 100%
    let totalWeight = 0;
    let completedWeight = 0;
    
    activeProj.sections.forEach(s => {
        totalWeight += 100;
        if (s.status === 'todo') completedWeight += 10;
        else if (s.status === 'in_progress') completedWeight += 40;
        else if (s.status === 'review') completedWeight += 80;
        else if (s.status === 'done') completedWeight += 100;
    });
    
    const sectionsPercent = totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
    document.getElementById('stat-completion').textContent = `${sectionsPercent}%`;
    document.getElementById('progress-sections-bar').style.width = `${sectionsPercent}%`;

    // 3. Jours restants
    const daysLeftEl = document.getElementById('stat-days-left');
    const deadlineDateEl = document.getElementById('stat-deadline-date');
    
    if (activeProj.deadline) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = new Date(activeProj.deadline);
        target.setHours(0, 0, 0, 0);
        
        const diffTime = target.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const formattedDate = target.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
        deadlineDateEl.textContent = `Rendu le ${formattedDate}`;
        
        if (diffDays < 0) {
            daysLeftEl.textContent = "Date dépassée !";
            daysLeftEl.style.color = 'var(--accent-danger)';
        } else {
            daysLeftEl.textContent = `${diffDays} j`;
            daysLeftEl.style.color = diffDays <= 7 ? 'var(--accent-danger)' : 'var(--text-main)';
        }
    } else {
        daysLeftEl.textContent = "--";
        daysLeftEl.style.color = 'var(--text-muted)';
        deadlineDateEl.textContent = "Date limite : non configurée";
        updateDeadlineReminder(null);
    }

    // 4. Références & Sigles
    const refCount = activeProj.references ? activeProj.references.length : 0;
    const acroCount = activeProj.acronyms ? activeProj.acronyms.length : 0;
    document.getElementById('stat-ref-glo').textContent = `${refCount} Réf / ${acroCount} Sigles`;

    if (activeProj.deadline) {
        const target = new Date(activeProj.deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        target.setHours(0, 0, 0, 0);
        const diffTime = target.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        updateDeadlineReminder(diffDays);
    }

    function updateDeadlineReminder(diffDays) {
        const reminder = document.getElementById('deadline-reminder');
        const reminderText = document.getElementById('deadline-reminder-text');
        if (!reminder || !reminderText) return;

        reminder.classList.remove('urgent', 'warning', 'info');

        if (diffDays === null) {
            reminder.style.display = 'none';
            reminderText.textContent = '';
            return;
        }

        if (diffDays < 0) {
            reminder.style.display = 'block';
            reminder.classList.add('urgent');
            reminderText.textContent = 'La date de rendu est dépassée. Priorise immédiatement la rédaction et relance ton planning pour rattraper le retard.';
        } else if (diffDays === 0) {
            reminder.style.display = 'block';
            reminder.classList.add('urgent');
            reminderText.textContent = 'C’est le dernier jour pour rendre ton mémoire. Concentre-toi sur la finalisation et l’envoi aujourd’hui.';
        } else if (diffDays <= 7) {
            reminder.style.display = 'block';
            reminder.classList.add('warning');
            reminderText.textContent = `Il reste ${diffDays} jour${diffDays > 1 ? 's' : ''} avant la deadline. Avance chaque jour et vérifie tes sections clés.`;
        } else if (diffDays <= 14) {
            reminder.style.display = 'block';
            reminder.classList.add('info');
            reminderText.textContent = `Il reste ${diffDays} jours avant la date de rendu. Planifie des sessions courtes et régulières pour ne pas tout laisser à la dernière minute.`;
        } else {
            reminder.style.display = 'none';
            reminderText.textContent = '';
        }
    }


    // 5. Générer le diagramme de Gantt horizontal des jalons
    renderGanttChart(activeProj.sections);
}

// Affichage Pomodoro
function updatePomoDisplay() {
    const mins = Math.floor(pomoTimer.timeLeft / 60);
    const secs = pomoTimer.timeLeft % 60;
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    document.getElementById('pomo-time').textContent = timeStr;
    document.getElementById('pomo-main-time').textContent = timeStr;
}

// Bip de fin de Pomodoro (Synthèse audio native)
function playPomoAlarm() {
    if (!pomoTimer.audioCtx) return;
    
    const osc = pomoTimer.audioCtx.createOscillator();
    const gainNode = pomoTimer.audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(pomoTimer.audioCtx.destination);
    
    osc.type = 'sine';
    osc.frequency.value = 523.25; // Note C5
    gainNode.gain.setValueAtTime(0.5, pomoTimer.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, pomoTimer.audioCtx.currentTime + 1.5);
    
    osc.start();
    osc.stop(pomoTimer.audioCtx.currentTime + 1.5);
}

// Dessiner le calendrier/Gantt simplifié
function renderGanttChart(sections) {
    const container = document.getElementById('gantt-chart');
    container.innerHTML = '';
    
    if (!sections || sections.length === 0) {
        container.innerHTML = '<p class="text-muted">Aucun jalon défini. Créez des sections dans le sommaire.</p>';
        return;
    }
    
    sections.forEach(s => {
        const row = document.createElement('div');
        row.className = 'gantt-row';
        
        const label = document.createElement('div');
        label.className = 'gantt-label';
        label.textContent = s.title;
        label.title = s.title;
        
        const barWrapper = document.createElement('div');
        barWrapper.className = 'gantt-bar-wrapper';
        
        const bar = document.createElement('div');
        
        let statusClass = 'gantt-todo';
        let statusText = 'À faire';
        let percent = 10;
        
        if (s.status === 'in_progress') {
            statusClass = 'gantt-in-progress';
            statusText = 'En cours';
            percent = 45;
        } else if (s.status === 'review') {
            statusClass = 'gantt-review';
            statusText = 'En relecture';
            percent = 75;
        } else if (s.status === 'done') {
            statusClass = 'gantt-done';
            statusText = 'Terminé';
            percent = 100;
        }
        
        bar.className = `gantt-bar ${statusClass}`;
        bar.style.width = `${percent}%`;
        
        const currentWords = s.words || 0;
        const target = s.targetWords || 1000;
        const wordsPercent = Math.min(100, Math.round((currentWords / target) * 100));
        bar.textContent = `${statusText} (${wordsPercent}%)`;
        
        barWrapper.appendChild(bar);
        row.appendChild(label);
        row.appendChild(barWrapper);
        container.appendChild(row);
    });
}

// ==========================================================================
// 6. Workspace (Plan et Rédaction)
// ==========================================================================
function renderOutline() {
    const activeProj = getActiveProject();
    const list = document.getElementById('outline-list');
    list.innerHTML = '';
    
    if (!activeProj || !activeProj.sections) return;
    
    activeProj.sections.forEach(sec => {
        const item = document.createElement('div');
        item.className = `outline-item ${state.activeSectionId === sec.id ? 'active' : ''}`;
        item.setAttribute('data-sec-id', sec.id);
        
        const left = document.createElement('div');
        left.className = 'outline-item-left';
        
        const dot = document.createElement('span');
        dot.className = `status-dot ${sec.status}`;
        
        const title = document.createElement('span');
        title.className = 'outline-item-title';
        title.textContent = sec.title;
        
        left.appendChild(dot);
        left.appendChild(title);
        item.appendChild(left);
        
        // Mots écrits / cibles
        const right = document.createElement('span');
        right.className = 'badge';
        const words = sec.words || 0;
        right.textContent = `${words}`;
        item.appendChild(right);
        
        item.addEventListener('click', () => {
            selectSection(sec.id);
        });
        
        list.appendChild(item);
    });
}

function selectSection(sectionId) {
    state.activeSectionId = sectionId;
    
    // Mettre en surbrillance l'item actif
    document.querySelectorAll('.outline-item').forEach(item => {
        if (item.getAttribute('data-sec-id') === sectionId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const activeProj = getActiveProject();
    if (!activeProj) return;
    
    const sec = activeProj.sections.find(s => s.id === sectionId);
    if (!sec) return;

    // Remplir l'éditeur
    document.getElementById('editor-section-title').textContent = sec.title;
    document.getElementById('editor-section-words').textContent = `${sec.words || 0} mots / ${sec.targetWords}`;
    document.getElementById('section-status-select').value = sec.status;
    
    // Textarea
    const textarea = document.getElementById('section-textarea');
    textarea.value = sec.draft || '';
    
    // Gérer l'état de l'aperçu si ouvert
    const previewDiv = document.getElementById('section-preview');
    if (previewDiv.style.display === 'block') {
        previewDiv.innerHTML = parseMarkdown(sec.draft);
    }

    // Charger les Checklists et les Guidelines
    renderChecklist(sec);
    renderGuidelines(sec);
    scanAcronymsInActiveSection(sec.draft || '');
}

function clearEditor() {
    state.activeSectionId = null;
    document.getElementById('editor-section-title').textContent = 'Sélectionnez une section';
    document.getElementById('editor-section-words').textContent = '0 mots';
    document.getElementById('section-textarea').value = '';
    document.getElementById('section-checklist').innerHTML = '<li>Aucune checklist</li>';
    document.getElementById('section-guidelines').innerHTML = '<p>Sélectionnez un chapitre dans la liste pour voir les conseils.</p>';
}

function renderChecklist(section) {
    const ul = document.getElementById('section-checklist');
    ul.innerHTML = '';
    
    if (!section.checklist || section.checklist.length === 0) {
        ul.innerHTML = '<li><i class="fa-solid fa-circle-check"></i> Aucune checklist spécifique</li>';
        return;
    }
    
    section.checklist.forEach(item => {
        const li = document.createElement('li');
        li.className = `checklist-item ${item.checked ? 'checked' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.checked;
        
        const label = document.createElement('span');
        label.textContent = item.label;
        
        li.appendChild(checkbox);
        li.appendChild(label);
        
        // Événement clic
        const toggleCheck = () => {
            item.checked = !item.checked;
            li.classList.toggle('checked', item.checked);
            checkbox.checked = item.checked;
            saveStateToStorage();
        };
        
        checkbox.addEventListener('change', (e) => {
            e.stopPropagation(); // Éviter double déclenchement
            item.checked = checkbox.checked;
            li.classList.toggle('checked', checkbox.checked);
            saveStateToStorage();
        });
        
        li.addEventListener('click', toggleCheck);
        ul.appendChild(li);
    });
}

function renderGuidelines(section) {
    const container = document.getElementById('section-guidelines');
    container.innerHTML = section.guidelines || '<p>Aucun guide pour cette section.</p>';
}

// ==========================================================================
// 7. Glossaire et Sigles
// ==========================================================================
function renderGlossary(filterTerm = '') {
    const activeProj = getActiveProject();
    const tbody = document.getElementById('acronym-tbody');
    const acronymCount = document.getElementById('acronym-count');
    tbody.innerHTML = '';
    
    if (!activeProj || !activeProj.acronyms) {
        acronymCount.textContent = '0';
        return;
    }
    
    // Filtrage et tri alphabétique
    const search = filterTerm.trim().toLowerCase();
    const list = activeProj.acronyms
        .filter(a => a.term.toLowerCase().includes(search) || a.definition.toLowerCase().includes(search))
        .sort((a, b) => a.term.localeCompare(b.term));
        
    acronymCount.textContent = activeProj.acronyms.length;
    
    if (list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="text-muted text-center">Aucun sigle défini.</td></tr>';
        return;
    }
    
    list.forEach(a => {
        const tr = document.createElement('tr');
        
        const tdTerm = document.createElement('td');
        tdTerm.innerHTML = `<strong>${a.term}</strong>`;
        
        const tdDef = document.createElement('td');
        tdDef.innerHTML = `<div>${a.definition}</div>`;
        if (a.desc) {
            tdDef.innerHTML += `<small style="display:block;margin-top:4px;color:var(--text-muted);">${a.desc}</small>`;
        }
        
        const tdActions = document.createElement('td');
        tdActions.className = 'text-right';
        
        const btnDel = document.createElement('button');
        btnDel.className = 'btn btn-danger-outline btn-xs';
        btnDel.innerHTML = '<i class="fa-solid fa-trash"></i>';
        btnDel.addEventListener('click', () => {
            if (confirm(`Supprimer le sigle ${a.term} ?`)) {
                activeProj.acronyms = activeProj.acronyms.filter(ac => ac.term !== a.term);
                saveStateToStorage();
                renderGlossary(filterTerm);
                scanAcronymsInActiveSection(document.getElementById('section-textarea').value);
                updateDashboardStats();
            }
        });
        
        tdActions.appendChild(btnDel);
        
        tr.appendChild(tdTerm);
        tr.appendChild(tdDef);
        tr.appendChild(tdActions);
        tbody.appendChild(tr);
    });
}

// Analyser le texte pour repérer les acronymes écrits mais NON définis dans le glossaire
function scanAcronymsInActiveSection(text) {
    const activeProj = getActiveProject();
    const listContainer = document.getElementById('dangling-acronyms-list');
    const warningTagsContainer = document.getElementById('missing-acronyms-tags');
    const alertBox = document.getElementById('dangling-acronyms-alert');
    
    listContainer.innerHTML = '';
    warningTagsContainer.innerHTML = '';
    
    if (!activeProj || !text) {
        alertBox.style.display = 'none';
        return;
    }
    
    // Regexp pour identifier des mots de 2 à 5 lettres entièrement en majuscules
    // Exclut les chiffres, la ponctuation, et les mots courants en majuscules (ex: LE, LA, UN, DES, DU, DE)
    const stopWords = ['LE', 'LA', 'LES', 'UN', 'UNE', 'DES', 'DU', 'DE', 'ET', 'OU', 'PAR', 'SUR', 'SUR', 'MON', 'SON', 'JE', 'IL', 'NOUS', 'VOUS'];
    const potentialAcro = text.match(/\b[A-Z]{2,6}\b/g) || [];
    
    // Nettoyer les doublons et les mots interdits
    const uniquePotential = [...new Set(potentialAcro)]
        .filter(term => !stopWords.includes(term));
        
    const defined = activeProj.acronyms.map(a => a.term);
    const missing = uniquePotential.filter(term => !defined.includes(term));
    const recognized = uniquePotential.filter(term => defined.includes(term));

    // Remplir les tags reconnus dans la section d'édition de texte
    if (recognized.length > 0) {
        alertBox.style.display = 'block';
        recognized.forEach(term => {
            const ac = activeProj.acronyms.find(a => a.term === term);
            const tag = document.createElement('span');
            tag.className = 'badge';
            tag.style.background = 'rgba(99, 102, 241, 0.15)';
            tag.style.color = 'var(--accent-primary)';
            tag.style.margin = '2px';
            tag.style.cursor = 'help';
            tag.title = ac ? ac.definition : '';
            tag.textContent = term;
            listContainer.appendChild(tag);
        });
    } else {
        alertBox.style.display = 'none';
    }
    
    // S'il y a des acronymes manquants, on affiche des alertes
    if (missing.length > 0) {
        missing.forEach(term => {
            const tag = document.createElement('span');
            tag.className = 'tag-warning';
            tag.textContent = `+ Définir ${term}`;
            tag.addEventListener('click', () => {
                // Cliquer sur le tag emmène à l'onglet glossaire et pré-remplit le formulaire
                window.location.hash = 'glossary';
                document.querySelector('.nav-item[data-tab="glossary"]').click();
                document.getElementById('acro-term').value = term;
                document.getElementById('acro-definition').focus();
            });
            warningTagsContainer.appendChild(tag);
            
            // Ajouter aussi un tag alerte dans le workspace pour encourager la saisie
            const workspaceWarningTag = tag.cloneNode(true);
            // Re-bind le clic sur le clone
            workspaceWarningTag.addEventListener('click', () => {
                window.location.hash = 'glossary';
                document.querySelector('.nav-item[data-tab="glossary"]').click();
                document.getElementById('acro-term').value = term;
                document.getElementById('acro-definition').focus();
            });
            listContainer.appendChild(workspaceWarningTag);
            alertBox.style.display = 'block';
        });
    }
}

// ==========================================================================
// 8. Bibliographie et Sources
// ==========================================================================
function renderReferences(filterText = '') {
    const activeProj = getActiveProject();
    const container = document.getElementById('references-list');
    const refCount = document.getElementById('ref-count');
    container.innerHTML = '';
    
    if (!activeProj || !activeProj.references) {
        refCount.textContent = '0';
        return;
    }
    
    const search = filterText.trim().toLowerCase();
    const list = activeProj.references.filter(r => 
        r.title.toLowerCase().includes(search) || 
        r.author.toLowerCase().includes(search) || 
        r.key.toLowerCase().includes(search)
    );
    
    refCount.textContent = activeProj.references.length;
    
    if (list.length === 0) {
        container.innerHTML = '<p class="text-muted text-center" style="margin-top:20px;">Aucune référence trouvée.</p>';
        return;
    }
    
    list.forEach((r, index) => {
        const card = document.createElement('div');
        card.className = 'reference-card';
        
        const header = document.createElement('div');
        header.className = 'reference-card-header';
        
        // Index de citation
        const idx = activeProj.references.findIndex(ref => ref.id === r.id) + 1;
        
        const badge = document.createElement('span');
        badge.className = `ref-type-badge ${r.type}`;
        badge.textContent = `${r.type} [${idx}]`;
        
        const actions = document.createElement('div');
        actions.className = 'ref-actions';
        
        // Copier Citation
        const btnCite = document.createElement('button');
        btnCite.className = 'btn btn-secondary btn-xs';
        btnCite.innerHTML = '<i class="fa-solid fa-quote-right"></i> Citer';
        btnCite.addEventListener('click', () => {
            const citeText = state.activeCitationStyle === 'ieee' ? `[${idx}]` : `(${r.author.split(',')[0].trim()} et al., ${r.year})`;
            copyTextToClipboard(citeText);
            btnCite.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => btnCite.innerHTML = '<i class="fa-solid fa-quote-right"></i> Citer', 1000);
        });
        
        // Copier BibTeX
        const btnBib = document.createElement('button');
        btnBib.className = 'btn btn-secondary btn-xs';
        btnBib.innerHTML = 'BibTeX';
        btnBib.addEventListener('click', () => {
            const bibtex = generateBibTeXString(r);
            copyTextToClipboard(bibtex);
            btnBib.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => btnBib.innerHTML = 'BibTeX', 1000);
        });

        // Supprimer
        const btnDel = document.createElement('button');
        btnDel.className = 'btn btn-danger-outline btn-xs';
        btnDel.innerHTML = '<i class="fa-solid fa-trash"></i>';
        btnDel.addEventListener('click', () => {
            if (confirm(`Supprimer la référence ${r.key} ?`)) {
                activeProj.references = activeProj.references.filter(ref => ref.id !== r.id);
                saveStateToStorage();
                renderReferences(filterText);
                updateDashboardStats();
            }
        });
        
        actions.appendChild(btnCite);
        actions.appendChild(btnBib);
        actions.appendChild(btnDel);
        
        header.appendChild(badge);
        header.appendChild(actions);
        
        // Corps
        const body = document.createElement('div');
        body.className = 'reference-card-body';
        
        const refStr = state.activeCitationStyle === 'ieee' ? formatIEEE(r, idx) : formatAPA(r);
        body.innerHTML = `<div>${refStr}</div>`;
        
        // Clé
        const keySpan = document.createElement('span');
        keySpan.className = 'ref-key';
        keySpan.textContent = `Clé LaTeX : @${r.key}`;
        body.appendChild(keySpan);
        
        card.appendChild(header);
        card.appendChild(body);
        container.appendChild(card);
    });
}

// Formater les citations
function formatIEEE(r, idx) {
    let output = `[${idx}] `;
    
    // Auteurs
    output += `${r.author}, `;
    
    // Titre
    if (r.type === 'book') {
        output += `*${r.title}*. `;
    } else {
        output += `"${r.title}," `;
    }
    
    // Détails selon le type
    if (r.type === 'web') {
        output += `${r.publisherWeb || 'Internet'}. Disponible en ligne : ${r.url ? `<a href="${r.url}" target="_blank">${r.url}</a>` : 'N/D'} (consulté en ${r.year}).`;
    } else if (r.type === 'book') {
        output += `${r.city ? r.city + ': ' : ''}${r.publisher || 'Éditeur inconnu'}, ${r.year}.`;
    } else if (r.type === 'article') {
        output += `*${r.journal || 'Revue inconnue'}*, ${r.volume ? r.volume + ', ' : ''}${r.pages ? 'pp. ' + r.pages + ', ' : ''}${r.year}.`;
    } else if (r.type === 'thesis') {
        output += `Thèse / Rapport académique, ${r.institution || 'Université'}, ${r.year}.`;
    }
    
    return output;
}

function formatAPA(r) {
    let output = `${r.author} (${r.year}). `;
    
    if (r.type === 'book') {
        output += `*${r.title}*. `;
    } else {
        output += `"${r.title}". `;
    }
    
    if (r.type === 'web') {
        output += `${r.publisherWeb || 'Site Web'}. ${r.url ? `Retrieved from <a href="${r.url}" target="_blank">${r.url}</a>` : ''}`;
    } else if (r.type === 'book') {
        output += `${r.city ? r.city + ': ' : ''}${r.publisher || ''}.`;
    } else if (r.type === 'article') {
        output += `*${r.journal || ''}*, ${r.volume || ''}, ${r.pages ? 'pp. ' + r.pages : ''}.`;
    } else if (r.type === 'thesis') {
        output += `(Doctoral dissertation / Rapport de cycle ingénieur, ${r.institution || 'N/D'}).`;
    }
    
    return output;
}

// Générer le bloc de code BibTeX pour LaTeX
function generateBibTeXString(r) {
    let type = 'misc';
    if (r.type === 'book') type = 'book';
    else if (r.type === 'article') type = 'article';
    else if (r.type === 'thesis') type = 'phdthesis';
    else if (r.type === 'web') type = 'online';
    
    let bib = `@${type}{${r.key},\n`;
    bib += `  author = {${r.author}},\n`;
    bib += `  title = {${r.title}},\n`;
    bib += `  year = {${r.year}},\n`;
    
    if (r.type === 'web') {
        if (r.url) bib += `  url = {${r.url}},\n`;
        if (r.publisherWeb) bib += `  organization = {${r.publisherWeb}},\n`;
    } else if (r.type === 'book') {
        if (r.publisher) bib += `  publisher = {${r.publisher}},\n`;
        if (r.city) bib += `  address = {${r.city}},\n`;
    } else if (r.type === 'article') {
        if (r.journal) bib += `  journal = {${r.journal}},\n`;
        if (r.volume) bib += `  volume = {${r.volume}},\n`;
        if (r.pages) bib += `  pages = {${r.pages}},\n`;
    } else if (r.type === 'thesis') {
        bib += `  school = {${r.institution || 'Université'}},\n`;
    }
    
    // Enlever la dernière virgule et fermer
    bib = bib.substring(0, bib.length - 2) + '\n}';
    return bib;
}

// ==========================================================================
// 9. Boîte à outils (LaTeX Table Generator, Exports)
// ==========================================================================
function initTableGenerator() {
    const btnGenGrid = document.getElementById('btn-generate-grid');
    const container = document.getElementById('grid-editor-container');
    const btnCopyTable = document.getElementById('btn-copy-latex-table');
    
    btnGenGrid.addEventListener('click', () => {
        const cols = parseInt(document.getElementById('latex-tbl-cols').value) || 3;
        const rows = parseInt(document.getElementById('latex-tbl-rows').value) || 4;
        
        container.innerHTML = '';
        const table = document.createElement('table');
        table.className = 'grid-editor-table';
        
        for (let r = 0; r < rows; r++) {
            const tr = document.createElement('tr');
            for (let c = 0; c < cols; c++) {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'text';
                if (r === 0) {
                    input.placeholder = `Entête ${c+1}`;
                } else {
                    input.placeholder = `R${r}C${c+1}`;
                }
                
                input.addEventListener('input', () => {
                    generateLaTeXTable();
                });
                
                td.appendChild(input);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        
        container.appendChild(table);
        generateLaTeXTable();
        document.getElementById('latex-table-output-container').style.display = 'block';
    });

    btnCopyTable.addEventListener('click', () => {
        const code = document.getElementById('latex-table-code').textContent;
        copyTextToClipboard(code);
        btnCopyTable.innerHTML = '<i class="fa-solid fa-check"></i> Code copié !';
        setTimeout(() => btnCopyTable.innerHTML = '<i class="fa-solid fa-copy"></i> Copier le code LaTeX', 1500);
    });
}

function generateLaTeXTable() {
    const cols = parseInt(document.getElementById('latex-tbl-cols').value) || 3;
    const caption = document.getElementById('latex-tbl-caption').value || 'Mon tableau de données';
    const rows = document.querySelectorAll('.grid-editor-table tr');
    
    let latex = `% Tableau généré par Mémoire Helper\n`;
    latex += `\\begin{table}[htbp]\n`;
    latex += `  \\centering\n`;
    latex += `  \\caption{${caption}}\n`;
    latex += `  \\label{tab:${caption.toLowerCase().replace(/[^a-z0-9]/g, '_')}}\n`;
    
    // Format de colonnes (ex: |c|c|c|)
    let colFormat = '|' + 'c|'.repeat(cols);
    latex += `  \\begin{tabular}{${colFormat}}\n`;
    latex += `    \\hline\n`;
    
    rows.forEach((row, rIdx) => {
        let rowCells = [];
        row.querySelectorAll('input').forEach(input => {
            rowCells.push(input.value || '');
        });
        
        latex += `    ${rowCells.join(' & ')} \\\\\n`;
        latex += `    \\hline\n`;
    });
    
    latex += `  \\end{tabular}\n`;
    latex += `\\end{table}`;
    
    document.getElementById('latex-table-code').textContent = latex;
}

// Exporter en Markdown structuré
function exportProjectAsMarkdown() {
    const activeProj = getActiveProject();
    if (!activeProj) return;
    
    let md = `# ${activeProj.name}\n\n`;
    
    if (activeProj.deadline) {
        md += `*Date de rendu cible : ${activeProj.deadline}*\n\n`;
    }
    
    // Progression
    let totalW = 0;
    activeProj.sections.forEach(s => totalW += s.words || 0);
    md += `*Volume total rédigé : ${totalW} mots / Objectif : ${activeProj.targetWords} mots*\n\n`;
    md += `---\n\n`;
    
    // Contenu des sections
    activeProj.sections.forEach(sec => {
        md += `## ${sec.title}\n\n`;
        md += `*Statut de la section : ${sec.status.toUpperCase()}* | *Mots écrits : ${sec.words || 0}*\n\n`;
        
        // Checklist
        if (sec.checklist && sec.checklist.length > 0) {
            md += `### Checklist d'avancement\n`;
            sec.checklist.forEach(item => {
                md += `- [${item.checked ? 'x' : ' '}] ${item.label}\n`;
            });
            md += `\n`;
        }
        
        // Draft Notes
        md += `### Brouillon & Notes de rédaction\n\n`;
        if (sec.draft) {
            md += `${sec.draft}\n\n`;
        } else {
            md += `*Pas de rédaction pour cette section.*\n\n`;
        }
        md += `---\n\n`;
    });
    
    // Glossaire
    md += `## Glossaire & Liste des Acronymes\n\n`;
    if (activeProj.acronyms && activeProj.acronyms.length > 0) {
        md += `| Sigle | Signification / Rôle |\n`;
        md += `| --- | --- |\n`;
        activeProj.acronyms.forEach(a => {
            md += `| **${a.term}** | ${a.definition} ${a.desc ? ` - *${a.desc}*` : ''} |\n`;
        });
    } else {
        md += `*Aucun sigle défini.*\n`;
    }
    md += `\n---\n\n`;
    
    // Bibliographie
    md += `## Références Bibliographiques\n\n`;
    if (activeProj.references && activeProj.references.length > 0) {
        activeProj.references.forEach((r, idx) => {
            const rawRef = formatIEEE(r, idx + 1);
            // Enlever les liens HTML pour le markdown propre
            const cleanedRef = rawRef.replace(/<[^>]*>/g, '');
            md += `${cleanedRef}\n\n`;
        });
    } else {
        md += `*Aucune référence bibliographique définie.*\n`;
    }
    
    downloadFile(md, `${activeProj.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`, 'text/markdown');
}

// Exporter la bibliographie en fichier BibTeX (.bib)
function exportProjectAsBibTeX() {
    const activeProj = getActiveProject();
    if (!activeProj || !activeProj.references || activeProj.references.length === 0) {
        alert("Aucune référence à exporter en BibTeX.");
        return;
    }
    
    let bibContent = `% Bibliographie générée par Mémoire Helper\n% Projet : ${activeProj.name}\n\n`;
    
    activeProj.references.forEach(r => {
        bibContent += generateBibTeXString(r) + '\n\n';
    });
    
    downloadFile(bibContent, `${activeProj.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_refs.bib`, 'text/plain');
}

// ==========================================================================
// 10. Fonctions Utilitaires
// ==========================================================================

// Compteur de mots efficace
function countWords(str) {
    if (!str || str.trim() === '') return 0;
    
    // Nettoyer les caractères spéciaux et isoler les mots
    const cleanStr = str.trim()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ")
        .replace(/\s+/g, " ");
        
    return cleanStr.split(' ').filter(w => w.length > 0).length;
}

// Copier du texte dans le presse-papier
function copyTextToClipboard(text) {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
        document.execCommand("copy");
    } catch (err) {
        console.error("Impossible d'effectuer la copie :", err);
    }
    document.body.removeChild(tempTextArea);
}

// Télécharger un fichier généré côté client
function downloadFile(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}

// Parseur Markdown basique pour la prévisualisation
function parseMarkdown(mdText) {
    if (!mdText) return '<p class="text-muted">Rédigez quelque chose pour voir l\'aperçu...</p>';
    
    let html = mdText
        // Remplacement du HTML potentiellement injecté
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
        
    // Titres
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Formules LaTeX simples $$ ... $$ ou $ ... $
    html = html.replace(/\$\$(.*?)\$\$/g, '<pre class="math-latex"><code>\\[ $1 \\]</code></pre>');
    html = html.replace(/\$(.*?)\$/g, '<code class="math-latex">$1</code>');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Gras & Italique
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Listes à puces
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/im, '<ul>$1</ul>');
    
    // Paragraphes simples (qui ne commencent pas par un tag)
    html = html.split('\n').map(line => {
        const trimmed = line.trim();
        if (trimmed === '') return '';
        if (trimmed.startsWith('<h') || trimmed.startsWith('<pre') || trimmed.startsWith('<code') || trimmed.startsWith('<ul>') || trimmed.startsWith('<li>') || trimmed.startsWith('</')) {
            return line;
        }
        return `<p>${line}</p>`;
    }).join('\n');
    
    return html;
}

// ==========================================================================
// 11. Module de Recherche Scientifique (OpenAlex API)
// ==========================================================================

// Exécuter la recherche scientifique via l'API OpenAlex
async function executeScientificSearch() {
    const input = document.getElementById('scientific-search-input');
    const query = input.value.trim();
    if (!query) return;

    const statusBar = document.getElementById('scientific-search-status');
    const resultsContainer = document.getElementById('scientific-results-container');

    // Afficher l'indicateur de chargement
    statusBar.style.display = 'flex';
    resultsContainer.innerHTML = '';

    try {
        const response = await fetch(`https://api.openalex.org/works?search=${encodeURIComponent(query)}&limit=10`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        statusBar.style.display = 'none';

        if (data.results && data.results.length > 0) {
            renderScientificResults(data.results);
        } else {
            resultsContainer.innerHTML = `
                <div class="text-center py-5">
                    <i class="fa-solid fa-circle-question" style="font-size: 2.5rem; color: var(--text-muted); opacity: 0.7; margin-bottom: var(--spacing-sm); display: block;"></i>
                    <h4>Aucun résultat trouvé</h4>
                    <p class="text-muted">Essayez de reformuler votre recherche avec d'autres mots-clés en anglais ou en français.</p>
                </div>
            `;
        }
    } catch (err) {
        console.error("Erreur lors de la recherche scientifique :", err);
        statusBar.style.display = 'none';
        resultsContainer.innerHTML = `
            <div class="text-center py-5" style="color: var(--accent-danger);">
                <i class="fa-solid fa-circle-exclamation" style="font-size: 2.5rem; margin-bottom: var(--spacing-sm); display: block;"></i>
                <h4>Erreur de connexion</h4>
                <p>Impossible d'interroger la base scientifique. Vérifiez votre connexion internet.</p>
            </div>
        `;
    }
}

// Reconstruire l'abstract depuis l'inverted index d'OpenAlex
function reconstructAbstract(invertedIndex) {
    if (!invertedIndex) return "Aucun résumé disponible pour cette publication.";
    const words = [];
    for (const [word, positions] of Object.entries(invertedIndex)) {
        positions.forEach(pos => {
            words[pos] = word;
        });
    }
    return words.join(' ');
}

// Afficher les résultats de la recherche OpenAlex
function renderScientificResults(results) {
    const container = document.getElementById('scientific-results-container');
    container.innerHTML = '';

    const activeProj = getActiveProject();
    const existingTitles = activeProj ? activeProj.references.map(r => r.title.toLowerCase().trim()) : [];

    results.forEach((work, index) => {
        const card = document.createElement('div');
        card.className = 'scientific-result-card';

        // 1. Extraire les métadonnées
        const title = work.title || "Titre inconnu";
        const year = work.publication_year || "Date inconnue";
        const journal = work.primary_location?.source?.display_name || "Source / Revue non spécifiée";
        const doi = work.doi || "";
        const url = work.primary_location?.landing_page_url || doi || "";
        
        // Liste des auteurs
        const authors = work.authorships 
            ? work.authorships.map(a => a.author.display_name).join(', ') 
            : "Auteur inconnu";

        const abstractText = reconstructAbstract(work.abstract_inverted_index);

        // Vérifier si déjà importé
        const isAlreadyImported = existingTitles.includes(title.toLowerCase().trim());

        // Header de la carte
        const header = document.createElement('div');
        header.className = 'scientific-result-card-header';
        
        const titleEl = document.createElement('h4');
        titleEl.className = 'scientific-result-title';
        titleEl.textContent = title;
        header.appendChild(titleEl);

        // Bouton d'importation
        const btnImport = document.createElement('button');
        if (isAlreadyImported) {
            btnImport.className = 'btn btn-success btn-sm import-success';
            btnImport.disabled = true;
            btnImport.innerHTML = '<i class="fa-solid fa-check"></i> Importé';
        } else {
            btnImport.className = 'btn btn-primary btn-sm';
            btnImport.innerHTML = '<i class="fa-solid fa-plus"></i> Importer';
            btnImport.addEventListener('click', () => {
                const success = importScientificWork(work);
                if (success) {
                    btnImport.className = 'btn btn-success btn-sm import-success';
                    btnImport.disabled = true;
                    btnImport.innerHTML = '<i class="fa-solid fa-check"></i> Importé';
                }
            });
        }
        header.appendChild(btnImport);
        card.appendChild(header);

        // Métadonnées
        const meta = document.createElement('div');
        meta.className = 'scientific-result-meta';
        
        const authorSpan = document.createElement('span');
        authorSpan.innerHTML = `<i class="fa-solid fa-user"></i> ${authors.length > 60 ? authors.substring(0, 60) + '...' : authors}`;
        meta.appendChild(authorSpan);

        const divider1 = document.createElement('span');
        divider1.className = 'meta-divider';
        divider1.textContent = '|';
        meta.appendChild(divider1);

        const yearSpan = document.createElement('span');
        yearSpan.innerHTML = `<i class="fa-solid fa-calendar"></i> ${year}`;
        meta.appendChild(yearSpan);

        const divider2 = document.createElement('span');
        divider2.className = 'meta-divider';
        divider2.textContent = '|';
        meta.appendChild(divider2);

        const journalSpan = document.createElement('span');
        journalSpan.innerHTML = `<i class="fa-solid fa-book"></i> ${journal}`;
        meta.appendChild(journalSpan);

        if (url) {
            const divider3 = document.createElement('span');
            divider3.className = 'meta-divider';
            divider3.textContent = '|';
            meta.appendChild(divider3);

            const urlSpan = document.createElement('span');
            urlSpan.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> <a href="${url}" target="_blank" style="color:var(--accent-secondary);">Accéder</a>`;
            meta.appendChild(urlSpan);
        }

        card.appendChild(meta);

        // Accordéon pour l'abstract
        const abstractToggle = document.createElement('button');
        abstractToggle.className = 'scientific-result-abstract-toggle';
        abstractToggle.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Lire le résumé (Abstract)';
        
        const abstractContent = document.createElement('div');
        abstractContent.className = 'scientific-result-abstract-content';
        abstractContent.style.display = 'none';
        abstractContent.textContent = abstractText;

        abstractToggle.addEventListener('click', () => {
            if (abstractContent.style.display === 'none') {
                abstractContent.style.display = 'block';
                abstractToggle.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Fermer le résumé';
            } else {
                abstractContent.style.display = 'none';
                abstractToggle.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Lire le résumé (Abstract)';
            }
        });

        card.appendChild(abstractToggle);
        card.appendChild(abstractContent);

        container.appendChild(card);
    });
}

// Importer un document OpenAlex dans le projet actif
function importScientificWork(work) {
    const activeProj = getActiveProject();
    if (!activeProj) {
        alert("Aucun projet actif sélectionné.");
        return false;
    }

    const title = work.title || "Titre inconnu";
    const year = work.publication_year || new Date().getFullYear();
    const journal = work.primary_location?.source?.display_name || "Revue non spécifiée";
    const doi = work.doi || "";
    const url = work.primary_location?.landing_page_url || doi || "";
    
    const authorsList = work.authorships 
        ? work.authorships.map(a => a.author.display_name) 
        : ["Auteur inconnu"];
        
    // Formater la chaîne des auteurs (ex: J. Smith, A. Dupont)
    const authorString = authorsList.map(name => {
        const parts = name.split(' ');
        const lastName = parts.pop();
        const initials = parts.map(p => p.charAt(0) + '.').join(' ');
        return `${initials} ${lastName}`.trim();
    }).join(', ');

    // Générer une clé de citation automatique
    const firstAuthorLastName = authorsList[0].split(' ').pop().toLowerCase().replace(/[^a-z]/g, '');
    let key = `${firstAuthorLastName}${year}`;
    
    // S'assurer de l'unicité de la clé
    let keyCount = 1;
    while (activeProj.references.some(r => r.key === key)) {
        key = `${firstAuthorLastName}${year}_${keyCount}`;
        keyCount++;
    }

    // Déterminer le type de source (OpenAlex "type" de base)
    let type = 'article';
    if (work.type === 'book' || work.type === 'book-chapter') {
        type = 'book';
    } else if (work.type === 'dissertation') {
        type = 'thesis';
    }

    const newRef = {
        id: 'ref_' + Date.now(),
        key: key,
        type: type,
        title: title,
        author: authorString,
        year: parseInt(year)
    };

    // Compléter selon le type
    if (type === 'article') {
        newRef.journal = journal;
        newRef.pages = '';
        newRef.volume = '';
        newRef.url = doi || url || '';
    } else if (type === 'book') {
        newRef.publisher = journal || 'Éditeur inconnu';
        newRef.city = '';
    } else if (type === 'thesis') {
        newRef.institution = journal || 'Université';
    } else {
        newRef.url = doi || url || '';
        newRef.publisherWeb = journal;
    }

    activeProj.references.push(newRef);
    
    // Sauvegarder
    saveStateToStorage();
    renderReferences();
    updateDashboardStats();

    return true;
}
