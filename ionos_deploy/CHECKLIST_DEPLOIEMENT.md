# ✅ CHECKLIST DE DÉPLOIEMENT IONOS

## AVANT DE COMMENCER

### 📋 INFORMATIONS À RÉCUPÉRER DE IONOS :

**Base de données MySQL :**
- [ ] Nom de la base de données : `____________________`
- [ ] Nom d'utilisateur MySQL : `____________________`
- [ ] Mot de passe MySQL : `____________________`
- [ ] Host MySQL : `____________________` (généralement `localhost`)

**Domaine et Email :**
- [ ] Nom de domaine : `____________________`
- [ ] Adresse email créée : `contact@lassoued-energie.fr`
- [ ] Mot de passe email : `GABES9596gabes@70` (ou nouveau)

## ÉTAPES DE DÉPLOIEMENT

### 1️⃣ PRÉPARATION IONOS
- [ ] Connecté à l'espace client IONOS
- [ ] Base de données MySQL créée
- [ ] Adresse email `contact@lassoued-energie.fr` créée
- [ ] Accès FTP/SFTP disponible

### 2️⃣ CONFIGURATION BASE DE DONNÉES
- [ ] phpMyAdmin accessible
- [ ] Fichier `setup_mysql.sql` importé
- [ ] Table `contacts` créée avec succès
- [ ] Contact de test inséré

### 3️⃣ CONFIGURATION FICHIERS
- [ ] Fichier `config.php` modifié avec vraies informations :
  - [ ] `DB_NAME_HERE` → remplacé par nom réel
  - [ ] `DB_USERNAME_HERE` → remplacé par utilisateur réel  
  - [ ] `DB_PASSWORD_HERE` → remplacé par mot de passe réel
  - [ ] `https://votre-domaine.com` → remplacé par vrai domaine
- [ ] Mot de passe email vérifié dans `config.php`

### 4️⃣ UPLOAD FICHIERS
- [ ] Tous les fichiers de `public_html/` uploadés vers racine site
- [ ] Structure des dossiers respectée :
  - [ ] `api/` présent
  - [ ] `includes/` présent
  - [ ] `static/` présent
  - [ ] `index.html` à la racine
  - [ ] `.htaccess` à la racine

### 5️⃣ TESTS FONCTIONNELS
- [ ] Site accessible : `https://votre-domaine.com`
- [ ] Page d'accueil s'affiche
- [ ] Navigation entre pages fonctionne
- [ ] Formulaire de contact s'affiche
- [ ] Boutons "Devis Gratuit" mènent au formulaire
- [ ] API accessible : `https://votre-domaine.com/api/contact.php` (erreur 405 normal)

### 6️⃣ TEST FORMULAIRE
- [ ] Formulaire se remplit
- [ ] Soumission ne génère pas d'erreur
- [ ] Email reçu sur `contact@lassoued-energie.fr`
- [ ] Client reçoit email de confirmation
- [ ] Contact sauvegardé dans base de données (vérifier phpMyAdmin)

### 7️⃣ VÉRIFICATIONS FINALES
- [ ] Logs d'erreur vides : `https://votre-domaine.com/logs/error.log`
- [ ] SSL/HTTPS fonctionne
- [ ] Site rapide et responsive
- [ ] Toutes les pages accessibles

## 🚨 EN CAS DE PROBLÈME

### Formulaire ne fonctionne pas :
1. Vérifier `logs/error.log`
2. Tester API avec Postman/curl
3. Vérifier configuration base de données

### Emails ne partent pas :
1. Vérifier adresse email existe
2. Vérifier mot de passe email
3. Tester SMTP manuellement

### Erreurs 500 :
1. Vérifier permissions fichiers
2. Vérifier syntaxe PHP
3. Consulter logs Apache IONOS

## 🎉 SUCCÈS !
- [ ] Site entièrement fonctionnel
- [ ] Formulaire de contact opérationnel  
- [ ] Emails envoyés et reçus
- [ ] Base de données peuplée

**Votre site Lassoued Énergie est en ligne ! 🚀**