# 📧 Solutions Email pour IONOS - Lassoued Énergie

## 🚨 **Problème Identifié :**
EmailJS avec Gmail ne fonctionne pas avec votre email IONOS `contact@lassoued-energie.fr`.

## 🎯 **3 Solutions Recommandées :**

---

## **Solution 1 - Formspree (RECOMMANDÉE - 2 minutes)**

### ✅ **Avantages :**
- ✅ **Configuration ultra-rapide** (2 minutes)
- ✅ **Fonctionne avec IONOS** directement
- ✅ **Gratuit** (50 emails/mois)
- ✅ **Emails professionnels** avec votre domaine
- ✅ **Pas de serveur** à configurer

### 🚀 **Configuration Formspree :**

1. **Allez sur** : https://formspree.io/
2. **Créez un compte** avec `contact@lassoued-energie.fr`
3. **Créez un formulaire** : nom = "Contact Lassoued Énergie"
4. **Copiez l'URL** du formulaire (ex: `https://formspree.io/f/abcd1234`)

5. **Modifiez le frontend** - Remplacez dans `/app/frontend/src/services/emailService.js` :

```javascript
export const sendContactEmail = async (formData) => {
  try {
    const formspreeUrl = "https://formspree.io/f/VOTRE_ID_ICI"; // Remplacez par votre URL
    
    const response = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${formData.prenom} ${formData.nom}`,
        email: formData.email,
        phone: formData.telephone,
        company: formData.entreprise || "Non spécifiée",
        service: formData.service,
        message: formData.message,
        urgence: formData.urgence ? "🚨 URGENCE 24/7" : "Demande normale",
        _subject: `${formData.urgence ? '🚨 URGENCE - ' : ''}Nouvelle demande - ${formData.prenom} ${formData.nom}`,
        _replyto: formData.email,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: "Email envoyé vers contact@lassoued-energie.fr via Formspree"
      };
    } else {
      throw new Error("Erreur Formspree");
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};
```

**C'est tout ! Ça marche immédiatement ! 🎉**

---

## **Solution 2 - EmailJS avec SMTP IONOS (Configuration Manuelle)**

### 📋 **Étapes Détaillées :**

1. **EmailJS Dashboard** : https://www.emailjs.com
2. **Service Email** : Choisir **"Other"** → **"SMTP"**
3. **Configuration SMTP IONOS** :
   ```
   SMTP Server: smtp.ionos.fr
   Port: 587
   Security: STARTTLS
   Username: contact@lassoued-energie.fr
   Password: [mot de passe email IONOS]
   ```

4. **Template Email** identique au précédent
5. **Test** : Envoyer un email de test via EmailJS

**⚠️ Attention :** Peut nécessiter un mot de passe d'application si 2FA activé.

---

## **Solution 3 - Backend SMTP Corrigé**

Le système backend est prêt, mais nécessite le **mot de passe IONOS** correct.

### 🔧 **Configuration :**

1. **Mot de passe** : Ajoutez votre mot de passe IONOS dans `/app/backend/.env`
2. **Test manuel** :
   ```bash
   # Testez votre email IONOS
   python3 -c "
   import smtplib
   from email.mime.text import MIMEText
   
   msg = MIMEText('Test IONOS')
   msg['Subject'] = 'Test'
   msg['From'] = 'contact@lassoued-energie.fr'
   msg['To'] = 'contact@lassoued-energie.fr'
   
   with smtplib.SMTP('smtp.ionos.fr', 587) as server:
       server.starttls()
       server.login('contact@lassoued-energie.fr', 'VOTRE_MOT_DE_PASSE')
       server.send_message(msg)
   print('✅ Email IONOS fonctionne!')
   "
   ```

---

## 🏆 **Recommandation Finale :**

### **SOLUTION 1 - FORMSPREE** (Ultra-rapide)

**Pourquoi Formspree ?**
- ✅ **2 minutes de configuration**
- ✅ **Fonctionne immédiatement** avec IONOS
- ✅ **Emails reçus** directement dans votre boîte IONOS
- ✅ **Gratuit** et fiable
- ✅ **Pas de configuration serveur**

**Une fois Formspree configuré :**
- Emails reçus sur `contact@lassoued-energie.fr`
- Design professionnel Lassoued Énergie
- Gestion des urgences 24/7
- Formulaire opérationnel immédiatement

## 🚀 **Quelle solution préférez-vous ?**

1. **Formspree** (rapide et simple)
2. **EmailJS SMTP** (plus de contrôle)
3. **Backend corrigé** (solution complète)