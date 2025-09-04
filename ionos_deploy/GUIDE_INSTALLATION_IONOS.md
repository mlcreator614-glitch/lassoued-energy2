# 🚀 Guide d'Installation IONOS - Lassoued Énergie

## ÉTAPES À SUIVRE SUR IONOS

### 1️⃣ **CONNEXION À VOTRE ESPACE IONOS**
- Connectez-vous à votre espace client IONOS
- Allez dans "Hébergement Web & Domaine"

### 2️⃣ **CONFIGURATION DE LA BASE DE DONNÉES MYSQL**

**A. Créer la base de données :**
- Dans votre panel IONOS, allez dans "Bases de données"
- Créez une nouvelle base de données MySQL
- Notez bien les informations :
  - Nom de la base : `DB_NAME_HERE`
  - Utilisateur : `DB_USERNAME_HERE`
  - Mot de passe : `DB_PASSWORD_HERE`
  - Host : généralement `localhost`

**B. Importer la structure :**
- Accédez à phpMyAdmin depuis votre panel IONOS
- Sélectionnez votre base de données
- Onglet "Importer" → Sélectionnez le fichier `database/setup_mysql.sql`
- Cliquez sur "Exécuter"

### 3️⃣ **CONFIGURATION DES FICHIERS**

**A. Modifier config.php :**
```php
// Dans public_html/config.php, remplacez :
'dbname' => 'votre_nom_de_base_reelle',
'username' => 'votre_utilisateur_mysql',
'password' => 'votre_mot_de_passe_mysql',

// Et aussi :
header('Access-Control-Allow-Origin: https://votre-domaine.com');
```

**B. Configuration email :**
- Vérifiez que votre adresse `contact@lassoued-energie.fr` est bien créée
- Le mot de passe dans config.php doit correspondre

### 4️⃣ **UPLOAD DES FICHIERS**

**A. Via FTP/SFTP ou File Manager :**
- Uploadez TOUT le contenu du dossier `public_html/` vers la racine de votre site
- Structure finale sur IONOS :
```
/
├── index.html (page React)
├── static/ (fichiers CSS/JS React)
├── api/
│   ├── contact.php
│   ├── services.php
│   └── index.php
├── includes/
│   ├── EmailService.php
│   └── PHPMailer/
├── config.php
├── logs/ (créé automatiquement)
└── .htaccess
```

### 5️⃣ **VÉRIFICATION ET TESTS**

**A. Tester l'API :**
- Allez sur : `https://votre-domaine.com/api/contact.php`
- Vous devriez voir une erreur 405 (normal, c'est un POST)

**B. Tester le site :**
- Allez sur : `https://votre-domaine.com`
- Le site React devrait s'afficher
- Testez le formulaire de contact

**C. Tester l'email :**
- Remplissez et soumettez le formulaire
- Vérifiez votre boîte mail `contact@lassoued-energie.fr`

### 6️⃣ **RÉSOLUTION DE PROBLÈMES**

**Si le formulaire ne fonctionne pas :**
1. Vérifiez les logs : `https://votre-domaine.com/logs/error.log`
2. Vérifiez phpMyAdmin que la base est bien créée
3. Testez l'API directement avec un outil comme Postman

**Si les emails n'arrivent pas :**
1. Vérifiez que l'adresse email existe dans IONOS
2. Vérifiez le mot de passe dans config.php
3. Consultez les logs d'erreur

## 🛠️ MAINTENANCE

### Consulter les contacts reçus :
- Via phpMyAdmin : table `contacts`
- Ou créez une page d'admin (à développer si besoin)

### Sauvegardes :
- IONOS fait des sauvegardes automatiques
- Exportez régulièrement votre base de données via phpMyAdmin

## 📞 SUPPORT
En cas de problème, vérifiez d'abord :
1. Les logs d'erreur (`logs/error.log`)
2. La configuration de la base de données
3. Les permissions des fichiers (755 pour dossiers, 644 pour fichiers)

✅ **Votre site est maintenant prêt pour la production !**