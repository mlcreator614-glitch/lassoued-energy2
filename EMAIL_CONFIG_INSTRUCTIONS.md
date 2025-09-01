# 📧 Configuration EmailJS pour Lassoued Énergie

## 🎯 **Système Email Implémenté :**

Votre formulaire de contact est **prêt à envoyer des emails** vers `contact@lassoued-energie.fr` !

## ⚡ **Configuration Requise (5 minutes) :**

### **Étape 1 - Créer un compte EmailJS :**
1. Allez sur : **https://www.emailjs.com/**
2. Cliquez sur **"Sign Up"** 
3. Créez un compte gratuit

### **Étape 2 - Configurer le service email :**
1. Dans EmailJS Dashboard → **"Email Services"**
2. Cliquez **"Add New Service"**  
3. Choisissez **"Gmail"** (recommandé)
4. Nommez-le : `service_lassoued`
5. Connectez votre compte Gmail `contact@lassoued-energie.fr`

### **Étape 3 - Créer le template d'email :**
1. Allez dans **"Email Templates"**
2. Cliquez **"Create New Template"**
3. Nommez-le : `template_contact`
4. Copiez ce contenu dans le template :

```html
Nouvelle demande de contact - Lassoued Énergie

🔥 INFORMATIONS CLIENT :
- Nom: {{from_name}}
- Email: {{from_email}}  
- Téléphone: {{phone}}
- Entreprise: {{company}}

🔧 SERVICE DEMANDÉ: {{service}}

{{#urgence}}
🚨 DEMANDE URGENTE - INTERVENTION 24/7 REQUISE !
{{/urgence}}

💬 MESSAGE:
{{message}}

---
Reçu le: {{date}}

Actions rapides:
- Répondre: {{reply_to}}
- Appeler: {{phone}}

⚡ LASSOUED ÉNERGIE - Service 24/7
52 Rue Rouget de Lisle, 77550 Moissy-Cramayel
```

### **Étape 4 - Obtenir les clés :**
1. Dans **"Integration"** → copiez votre **Public Key**
2. Notez votre **Service ID** et **Template ID**

### **Étape 5 - Configurer le site :**
Modifiez le fichier `/app/frontend/src/services/emailService.js` :

```javascript
const EMAIL_CONFIG = {
  serviceId: 'service_xxxxxxxxx', // Votre Service ID
  templateId: 'template_xxxxxxxx', // Votre Template ID  
  publicKey: 'votre_public_key_ici' // Votre Public Key
};
```

### **Étape 6 - Activer l'envoi réel :**
Décommentez cette ligne dans `emailService.js` :
```javascript
const result = await emailjs.send(
  EMAIL_CONFIG.serviceId,
  EMAIL_CONFIG.templateId,
  templateParams
);
```

## 🎉 **Résultat Final :**

Une fois configuré, **chaque formulaire enverra un email professionnel** à `contact@lassoued-energie.fr` avec :

✅ **Informations client complètes**
✅ **Service demandé**  
✅ **Message détaillé**
✅ **Badge URGENCE** si demande 24/7
✅ **Boutons d'action rapide** (répondre, appeler)
✅ **Design professionnel** Lassoued Énergie
✅ **Sauvegarde en base de données**

## 💰 **Coût : GRATUIT**
- EmailJS : 200 emails/mois gratuits
- Largement suffisant pour une entreprise locale

## 🚀 **Bonus - Features Disponibles :**

Une fois EmailJS configuré, le système inclut :
- **Emails automatiques** vers `contact@lassoued-energie.fr`
- **Sauvegarde base de données** de tous les contacts
- **API backend** pour récupérer les demandes
- **Distinction urgences 24/7**
- **Templates HTML professionnels**

**Configuration estimée : 5 minutes maximum ! 🎯**