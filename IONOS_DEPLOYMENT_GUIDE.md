# 🚀 GUIDE DÉPLOIEMENT IONOS - LASSOUED ÉNERGIE

## 📋 PLAN DE DÉPLOIEMENT COMPLET

### **Phase 1 - Préparation (AVANT déploiement)**

#### 🔒 **Sécurité (CRITIQUE) :**
1. **SUPPRIMER** le mot de passe du fichier `.env` sur GitHub
2. **AJOUTER** `.env` au `.gitignore`
3. **CHANGER** le mot de passe IONOS si déjà exposé

#### 🛠️ **Préparation Code :**
```bash
# 1. Nettoyer le repository
echo ".env" >> .gitignore
echo "*.env" >> .gitignore
echo "logs/" >> .gitignore

# 2. Build production React
cd frontend
npm run build

# 3. Tester en local une dernière fois
cd ../backend
python3 test_ionos_email.py
```

### **Phase 2 - Configuration Serveur IONOS**

#### 📡 **Prérequis Serveur :**

```bash
# 1. Mise à jour système
sudo apt update && sudo apt upgrade -y

# 2. Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Installer Python et pip
sudo apt install python3 python3-pip python3-venv -y

# 4. Installer MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# 5. Installer PM2 (gestionnaire de processus)
sudo npm install -g pm2
```

#### 📁 **Structure Dossiers :**

```bash
# Créer structure sur serveur IONOS
sudo mkdir -p /var/www/lassoued-energie
sudo chown $USER:$USER /var/www/lassoued-energie
cd /var/www/lassoued-energie

# Cloner votre repository (sans .env)
git clone https://github.com/VOTRE_USERNAME/lassoued-energie.git .
```

#### ⚙️ **Configuration Variables :**

```bash
# Créer .env sur serveur (JAMAIS dans Git)
cat > /var/www/lassoued-energie/backend/.env << EOF
MONGO_URL="mongodb://localhost:27017"
DB_NAME="lassoued_energie_prod"
CORS_ORIGINS="https://lassoued-energie.fr,https://www.lassoued-energie.fr"

# Configuration Email IONOS (SENSIBLE)
IONOS_EMAIL="contact@lassoued-energie.fr"
IONOS_PASSWORD="GABES9596gabes@70"
EOF

# Sécuriser le fichier
chmod 600 /var/www/lassoued-energie/backend/.env
```

### **Phase 3 - Installation Dependencies**

```bash
# Backend Python
cd /var/www/lassoued-energie/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend (si besoin de rebuild)
cd ../frontend
npm install
npm run build
```

### **Phase 4 - Configuration Web Server**

#### 🌐 **Option A - Nginx (Recommandé) :**

```bash
# Installer Nginx
sudo apt install nginx -y

# Configuration Nginx
sudo tee /etc/nginx/sites-available/lassoued-energie << EOF
server {
    listen 80;
    server_name lassoued-energie.fr www.lassoued-energie.fr;
    
    # Redirection HTTPS (après configuration SSL)
    # return 301 https://\$server_name\$request_uri;
    
    # Pour test initial (HTTP temporaire)
    root /var/www/lassoued-energie/frontend/build;
    index index.html;
    
    # Frontend React
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # API Backend
    location /api {
        proxy_pass http://localhost:8001;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
    
    # Assets statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Activer le site
sudo ln -s /etc/nginx/sites-available/lassoued-energie /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 🔄 **Démarrage Services :**

```bash
# Démarrer backend avec PM2
cd /var/www/lassoued-energie/backend
source venv/bin/activate

pm2 start "uvicorn server:app --host 0.0.0.0 --port 8001" --name "lassoued-backend"
pm2 startup
pm2 save
```

### **Phase 5 - Configuration SSL (HTTPS)**

```bash
# Installer Certbot pour SSL gratuit
sudo apt install certbot python3-certbot-nginx -y

# Obtenir certificat SSL
sudo certbot --nginx -d lassoued-energie.fr -d www.lassoued-energie.fr

# Renouvellement automatique
sudo crontab -e
# Ajouter : 0 12 * * * /usr/bin/certbot renew --quiet
```

### **Phase 6 - Tests & Validation**

#### ✅ **Checklist Tests :**

```bash
# 1. Test API
curl http://localhost:8001/api/

# 2. Test base MongoDB
mongo --eval "db.adminCommand('ismaster')"

# 3. Test email IONOS
cd /var/www/lassoued-energie/backend
source venv/bin/activate
python3 test_ionos_email.py

# 4. Test site web
curl -I http://lassoued-energie.fr
```

### **Phase 7 - Monitoring & Maintenance**

#### 📊 **Surveillance :**

```bash
# Logs PM2
pm2 logs lassoued-backend

# Logs Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Status services
pm2 status
sudo systemctl status nginx
sudo systemctl status mongod
```

#### 🔄 **Mise à jour Future :**

```bash
# Script de déploiement automatique
cat > /var/www/lassoued-energie/deploy.sh << 'EOF'
#!/bin/bash
cd /var/www/lassoued-energie

# Pull dernières modifications
git pull origin main

# Rebuild frontend si nécessaire
cd frontend
npm run build

# Redémarrer backend
cd ../backend
pm2 restart lassoued-backend

echo "✅ Déploiement terminé!"
EOF

chmod +x deploy.sh
```

## 🎯 CONFIGURATION DOMAINE IONOS

### **DNS Records :**
```
Type    Nom             Valeur                  TTL
A       @               [IP_VOTRE_SERVEUR]      3600
A       www             [IP_VOTRE_SERVEUR]      3600
MX      @               mail.ionos.fr           3600 (Priorité: 10)
```

## 🚨 POINTS CRITIQUES

### **SÉCURITÉ :**
- ❌ **JAMAIS** de mot de passe dans Git
- ✅ **Toujours** HTTPS en production
- ✅ **Firewall** configuré
- ✅ **Sauvegardes** automatiques

### **PERFORMANCE :**
- ✅ **Compression** Nginx (gzip)
- ✅ **Cache** assets statiques
- ✅ **PM2** pour backend
- ✅ **MongoDB** indexé

### **MONITORING :**
- ✅ **Logs** centralisés
- ✅ **PM2** monitoring
- ✅ **SSL** auto-renewal
- ✅ **Health checks** API

## 📞 SUPPORT

**En cas de problème :**
1. Vérifier logs : `pm2 logs`
2. Tester API : `curl localhost:8001/api/`
3. Vérifier email : `python3 test_ionos_email.py`
4. Status services : `pm2 status`

**Votre site sera accessible sur :**
- 🌐 **https://lassoued-energie.fr**
- 📧 **Emails** vers `contact@lassoued-energie.fr`
- 📱 **Responsive** sur tous appareils