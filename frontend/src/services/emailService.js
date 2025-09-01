import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAIL_CONFIG = {
  serviceId: 'service_lassoued', // À configurer sur emailjs.com
  templateId: 'template_contact', // À configurer sur emailjs.com
  publicKey: 'your_public_key_here' // À obtenir sur emailjs.com
};

// Initialiser EmailJS
emailjs.init(EMAIL_CONFIG.publicKey);

export const sendContactEmail = async (formData) => {
  try {
    // Préparer les données pour l'email
    const templateParams = {
      from_name: `${formData.prenom} ${formData.nom}`,
      from_email: formData.email,
      phone: formData.telephone,
      company: formData.entreprise || 'Non spécifiée',
      service: formData.service,
      message: formData.message,
      urgence: formData.urgence ? 'OUI - URGENCE 24/7' : 'Non',
      to_email: 'contact@lassoued-energie.fr',
      reply_to: formData.email,
      date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Pour le moment, on simule l'envoi en attendant la configuration EmailJS
    console.log('📧 Email à envoyer:', templateParams);
    
    // TODO: Décommenter cette ligne une fois EmailJS configuré
    // const result = await emailjs.send(
    //   EMAIL_CONFIG.serviceId,
    //   EMAIL_CONFIG.templateId,
    //   templateParams
    // );

    // Simulation pour le moment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      message: 'Email envoyé vers contact@lassoued-energie.fr'
    };

  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
    return {
      success: false,
      message: 'Erreur lors de l\'envoi de l\'email'
    };
  }
};

// Fonction pour envoyer aussi vers l'API backend (optionnel)
export const saveContactToDatabase = async (formData) => {
  try {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const response = await fetch(`${BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'nouveau'
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      throw new Error('Erreur sauvegarde');
    }
  } catch (error) {
    console.error('❌ Erreur sauvegarde:', error);
    return { success: false };
  }
};