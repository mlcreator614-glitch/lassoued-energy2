# 🔒 SÉCURITÉ DÉPLOIEMENT IONOS - LASSOUED ÉNERGIE

## 🚨 URGENT - AVANT DÉPLOIEMENT

### 1. **SUPPRIMER LE MOT DE PASSE DU CODE**

**⚠️ PROBLÈME :** Le mot de passe IONOS `GABES9596gabes@70` est dans le fichier `.env` qui peut être sur GitHub !

**✅ SOLUTION :**

**Sur votre serveur IONOS, créez le fichier `.env` manuellement :**

```bash
# /app/backend/.env (sur le serveur IONOS)
MONGO_URL="mongodb://localhost:27017"
DB_NAME="lassoued_energie_prod"
CORS_ORIGINS="https://votre-domaine.com"

# Configuration Email IONOS (SENSIBLE - Ne jamais committer)
IONOS_EMAIL="contact@lassoued-energie.fr"
IONOS_PASSWORD="GABES9596gabes@70"
```

### 2. **MODIFIER LE .gitignore**

Ajoutez dans `.gitignore` :
```
# Fichiers sensibles
.env
*.env
.env.local
.env.production

# Logs
*.log
logs/

# Base de données
data/
```

### 3. **NETTOYER L'HISTORIQUE GIT**

Si le mot de passe est déjà sur GitHub :
```bash
# Supprimer le fichier de l'historique Git
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch backend/.env' \
--prune-empty --tag-name-filter cat -- --all

# Forcer la mise à jour
git push origin --force --all
```

## 🚀 CONFIGURATION SERVEUR IONOS

### **Configuration Recommandée :**

**1. Structure des Dossiers :**
```
/var/www/lassoued-energie/
├── frontend/          # Build React
├── backend/           # API Python
├── .env              # Variables sensibles (HORS GIT)
├── nginx.conf        # Configuration web
└── logs/             # Fichiers de log
```

**2. Variables d'Environnement Production :**
```bash
# .env (sur serveur uniquement)
NODE_ENV=production
MONGO_URL="mongodb://localhost:27017"
DB_NAME="lassoued_energie_prod"
CORS_ORIGINS="https://lassoued-energie.fr"
IONOS_EMAIL="contact@lassoued-energie.fr"
IONOS_PASSWORD="GABES9596gabes@70"
REACT_APP_BACKEND_URL="https://lassoued-energie.fr"
```

**3. Configuration MongoDB :**
```bash
# Installer MongoDB sur serveur IONOS
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**4. Configuration Nginx :**
```nginx
server {
    listen 80;
    server_name lassoued-energie.fr www.lassoued-energie.fr;
    
    # Redirection HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name lassoued-energie.fr www.lassoued-energie.fr;
    
    # Certificat SSL
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Frontend React
    location / {
        root /var/www/lassoued-energie/frontend/build;
        try_files $uri $uri/ /index.html;
    }
    
    # API Backend
    location /api {
        proxy_pass http://localhost:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📋 CHECKLIST DÉPLOIEMENT

### **Avant de Déployer :**
- [ ] Supprimer mot de passe du code GitHub
- [ ] Vérifier .gitignore complet
- [ ] Tester en local sans erreur
- [ ] Préparer .env pour serveur

### **Sur le Serveur IONOS :**
- [ ] Installer Node.js, Python, MongoDB
- [ ] Créer .env avec vraies variables
- [ ] Build React : `npm run build`
- [ ] Installer dépendances Python
- [ ] Configurer Nginx/Apache
- [ ] Configurer SSL/HTTPS
- [ ] Tester emails IONOS

### **Après Déploiement :**
- [ ] Tester formulaire de contact
- [ ] Vérifier emails reçus
- [ ] Tester carte d'intervention
- [ ] Vérifier responsive mobile
- [ ] Configurer sauvegardes automatiques

## 🔧 COMMANDES UTILES

**Build Production :**
```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && pip install -r requirements.txt
```

**Démarrage Services :**
```bash
# Backend
cd backend && uvicorn server:app --host 0.0.0.0 --port 8001

# Ou avec PM2 (recommandé)
pm2 start "uvicorn server:app --host 0.0.0.0 --port 8001" --name "lassoued-backend"
```

## 🛡️ SÉCURITÉ SUPPLÉMENTAIRE

### **Protection Supplémentaire :**
1. **Changer le mot de passe IONOS** régulièrement
2. **Activer 2FA** sur compte IONOS
3. **Firewall** serveur (bloquer ports inutiles)
4. **Sauvegardes** automatiques base de données
5. **Monitoring** logs d'erreur

### **Variables à NE JAMAIS COMMITTER :**
- Mots de passe email
- Clés API
- Chaînes de connexion base de données
- Certificats SSL
- Tokens d'authentification

## 🎯 DOMAINE & DNS

**Configuration DNS IONOS :**
```
Type    Nom    Valeur
A       @      [IP_SERVEUR]
A       www    [IP_SERVEUR]
CNAME   mail   mail.ionos.fr
MX      @      mail.ionos.fr (priorité 10)
```

**Test Final :**
- https://lassoued-energie.fr → Site web
- https://lassoued-energie.fr/api → API backend
- Formulaire contact → Email reçu

## 🚨 ALERTE SÉCURITÉ

**SI LE MOT DE PASSE EST SUR GITHUB :**
1. **Changez immédiatement** le mot de passe IONOS
2. **Supprimez** l'historique Git
3. **Recréez** le repository avec code propre
4. **Utilisez** variables d'environnement serveur

**JAMAIS de mots de passe dans le code source !**