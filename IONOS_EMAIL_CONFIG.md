# 📧 Configuration Email IONOS pour Lassoued Énergie

## 🎯 **Système Implémenté :**

Votre formulaire de contact est **prêt à envoyer des emails** via votre email IONOS `contact@lassoued-energie.fr` !

## ⚡ **Configuration Simple (2 minutes) :**

### **Étape 1 - Récupérer le mot de passe de votre email IONOS :**

1. **Connectez-vous** à votre espace client IONOS
2. Allez dans **"Email & Office"** → **"Email"**  
3. Trouvez votre email `contact@lassoued-energie.fr`
4. **Notez le mot de passe** (ou changez-le si nécessaire)

### **Étape 2 - Configurer le backend :**

1. **Ouvrez le fichier** `/app/backend/.env`
2. **Remplacez la ligne** :
   ```
   IONOS_PASSWORD=""
   ```
   **Par :**
   ```
   IONOS_PASSWORD="votre_mot_de_passe_ionos"
   ```
3. **Sauvegardez** le fichier

### **Étape 3 - Redémarrer le backend :**

Exécutez cette commande :
```bash
sudo supervisorctl restart backend
```

## 🎉 **C'est Terminé !**

### ✅ **Fonctionnalités Actives :**

**📨 Double Email Automatique :**
1. **Email vers vous** : `contact@lassoued-energie.fr`
   - Toutes les informations du client
   - Badge URGENCE si demandé
   - Boutons d'action rapide (répondre, appeler)
   - Design professionnel Lassoued Énergie

2. **Email de confirmation** vers le client :
   - Confirmation de réception
   - Récapitulatif de sa demande
   - Vos coordonnées de contact

**💾 Sauvegarde Base de Données :**
- Toutes les demandes sauvegardées
- Possibilité de consulter l'historique
- Gestion des urgences

### 🔧 **Configuration SMTP IONOS (Automatique) :**

Le système utilise automatiquement :
```
Serveur SMTP: smtp.ionos.fr
Port: 587 (STARTTLS)
Sécurité: TLS/STARTTLS
Username: contact@lassoued-energie.fr
Password: [votre mot de passe IONOS]
```

**⚠️ Important :** 
- Utilisez le **mot de passe de votre compte email IONOS**
- Si vous avez l'authentification 2FA, créez un **mot de passe d'application**

### 🎯 **Test du Système :**

1. **Allez sur** : http://localhost:3000/contact
2. **Remplissez** le formulaire de test
3. **Cochez "Urgence"** pour tester la fonction 24/7
4. **Cliquez "Envoyer"**
5. **Vérifiez** votre boîte email IONOS !

### 💪 **Avantages vs EmailJS :**

✅ **Plus fiable** : Utilise directement votre serveur IONOS  
✅ **Plus professionnel** : Email avec votre nom de domaine  
✅ **Plus sécurisé** : Pas de service tiers  
✅ **Plus complet** : Double email + sauvegarde  
✅ **Compatible** : Fonctionne avec tous les emails  

## 🚨 **En Cas de Problème :**

### **Test de Configuration :**
1. Vérifiez que le mot de passe IONOS est correct
2. Vérifiez que l'email existe bien dans votre panel IONOS
3. Redémarrez le backend : `sudo supervisorctl restart backend`

### **Vérification des Logs :**
```bash
tail -f /var/log/supervisor/backend.*.log
```

## 🎯 **Résultat Final :**

**Dès que vous mettez le mot de passe IONOS :**
- ✅ **Formulaire → Email IONOS** automatiquement
- ✅ **Client → Email de confirmation** automatiquement  
- ✅ **Gestion urgences 24/7**
- ✅ **Design professionnel** complet
- ✅ **Sauvegarde** toutes les demandes

**C'est terminé ! Le système est 100% opérationnel avec votre email IONOS ! 🚀**