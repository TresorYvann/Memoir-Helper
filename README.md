# Mémoire Helper - Assistant de Rédaction et de Structuration pour Mémoire d'Ingénieur

Bienvenue dans **Mémoire Helper**, une application web interactive conçue spécifiquement pour structurer, rédiger et suivre l'avancement de votre mémoire de fin d'études ou rapport de projet de fin d'études (PFE) en cycle ingénieur.

Cette application fonctionne entièrement dans votre navigateur (client-side) pour garantir la confidentialité absolue de vos données, tout en offrant une interface utilisateur moderne, réactive et esthétique.

---

## 🚀 Comment lancer l'application ?

Vous pouvez utiliser l'application de deux façons différentes :

### Option A : Avec le serveur local Node.js (Recommandé)
Cette méthode permet de sauvegarder automatiquement vos rédactions sur votre disque dur dans un fichier `data.json` situé dans le dossier du projet.

1. Ouvrez un terminal dans le dossier du projet : `C:\Users\USER\.gemini\antigravity\scratch\memoire-helper`
2. Démarrez le serveur :
   ```bash
   npm start
   ```
3. Ouvrez l'adresse **`http://localhost:3000`** dans votre navigateur.

### Option B : Mode autonome (Sans installation)
Idéal pour un démarrage rapide sans outils supplémentaires. Les données sont sauvegardées uniquement dans le navigateur (`localStorage`).

1. Allez dans le répertoire du projet : `C:\Users\USER\.gemini\antigravity\scratch\memoire-helper`
2. Double-cliquez sur le fichier [index.html](file:///C:/Users/USER/.gemini/antigravity/scratch/memoire-helper/index.html) pour l'ouvrir dans votre navigateur.

> [!TIP]
> **Espace de travail recommandé :**
> Nous vous conseillons de définir ce répertoire (`C:\Users\USER\.gemini\antigravity\scratch\memoire-helper`) comme votre espace de travail actif dans votre outil d'IA ou IDE afin de pouvoir modifier et gérer facilement vos fichiers.

---

## 📂 Structure du projet

Le projet se compose des fichiers clés suivants :
* 📄 [index.html](file:///C:/Users/USER/.gemini/antigravity/scratch/memoire-helper/index.html) : Structure de l'application sémantique et agencement par onglets.
* 📄 [style.css](file:///C:/Users/USER/.gemini/antigravity/scratch/memoire-helper/style.css) : La charte graphique (thème sombre par défaut, variables de couleurs HSL, styles de glassmorphism, responsive mobile et animations).
* 📄 [app.js](file:///C:/Users/USER/.gemini/antigravity/scratch/memoire-helper/app.js) : La logique métier (synchronisation client-serveur avec repli sur le localStorage).
* 📄 [server.js](file:///C:/Users/USER/.gemini/antigravity/scratch/memoire-helper/server.js) : Serveur Node.js Express qui sert les fichiers et gère l'API d'écriture/lecture de `data.json`.
* 📄 [package.json](file:///C:/Users/USER/.gemini/antigravity/scratch/memoire-helper/package.json) : Configuration NPM du projet.

---

## 🛠️ Fonctionnalités incluses

### 1. Modèles de plan académiques et industriels
Lors de la création d'un nouveau projet, vous pouvez choisir parmi plusieurs gabarits adaptés aux mémoires de cycle ingénieur :
* **Projet R&D / Développement logiciel :** Parfait pour les mémoires orientés technique, architecture logicielle, infrastructure cloud ou conception produit.
* **Recherche Scientifique / Théorique :** Idéal si vous effectuez un travail de laboratoire, de modélisation théorique ou d'analyse quantitative poussée.
* **Audit & Amélioration de Processus :** Modèle calqué sur le DMAIC ou des approches Lean, excellent pour l'ingénierie industrielle, logistique ou de gestion.

Chaque modèle pré-remplit des sections standards accompagnées d'une **checklist de contrôle** et de **conseils académiques** de rédaction (ton, contenu à éviter/privilégier).

### 2. Espace de rédaction avec aperçu Markdown & LaTeX
Le module de rédaction vous permet de rédiger vos brouillons et notes structurées directement dans l'application.
* **Éditeur / Aperçu :** Vous pouvez basculer d'un clic entre l'éditeur de texte et l'aperçu du rendu Markdown.
* **LaTeX :** Les équations mathématiques sont reconnues (ex: `$E=mc^2$` en ligne ou `$$E=mc^2$$` en bloc).
* **Statut de section :** Attribuez un statut à chaque section (*À faire*, *En cours*, *En relecture*, *Terminé*) pour voir la progression s'afficher en temps réel sur le tableau de bord.

### 3. Détecteur automatique d'acronymes
* L'application scanne en temps réel le texte saisi dans votre éditeur à la recherche de mots entièrement en majuscules (ex: SQL, REST).
* Elle vérifie s'ils sont définis dans votre glossaire.
* S'ils ne le sont pas, elle affiche des tags d'alerte. Un clic sur le tag pré-remplit le formulaire du glossaire pour vous faire gagner du temps !

### 4. Gestionnaire de citations et de bibliographie
* Formulaire adapté selon la source : Site web, Livre, Article de journal scientifique, Thèse/Rapport.
* Génération automatique de clés de citation (ex: `@dupont2024`).
* Formatage automatique de l'entrée bibliographique selon les styles officiels **IEEE** (standard ingénieur) ou **APA**.
* Bouton pour copier directement la citation courte (ex: `[1]` ou `(Dupont, 2024)`) et le bloc BibTeX associé (si vous rédigez le document final sous LaTeX).

### 5. Chronomètre Pomodoro
* Intégré au tableau de bord et à la barre supérieure.
* Modes de 25 minutes (focus), 5 minutes (pause courte) ou 15 minutes (pause longue).
* Synthèse sonore native (sans chargement d'asset audio externe) pour vous avertir discrètement à la fin du temps.

### 6. Exportations universelles
* **Export Markdown (.md) :** Génère un fichier contenant tout votre plan, vos rédactions ordonnées, votre glossaire complet sous forme de tableau et votre liste bibliographique. Ce fichier est directement exploitable ou convertible en PDF/Word via Pandoc.
* **Export BibTeX (.bib) :** Télécharge l'ensemble de votre base de données bibliographiques au format standard BibTeX pour vos rapports compilés en LaTeX.
* **Export & Import JSON :** Sauvegarde complète de tous vos projets configurés pour pouvoir reprendre votre travail sur un autre ordinateur.
