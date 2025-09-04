import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

# Configuration SMTP IONOS (Correcte)
SMTP_CONFIG = {
    "hostname": "smtp.ionos.fr",
    "port": 587,  # Port STARTTLS pour IONOS
    "use_tls": True,
    "username": os.environ.get("IONOS_EMAIL", "contact@lassoued-energie.fr"),
    "password": os.environ.get("IONOS_PASSWORD", "")  # À définir dans .env
}

async def send_contact_email(contact_data: Dict[str, Any]) -> bool:
    """
    Envoie un email de contact via SMTP IONOS
    """
    try:
        # Vérifier si le mot de passe est configuré
        if not SMTP_CONFIG["password"]:
            logger.error("❌ Mot de passe IONOS non configuré dans .env")
            return False
        # Créer le message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"{'🚨 URGENCE - ' if contact_data.get('urgence') else ''}Nouvelle demande - {contact_data['prenom']} {contact_data['nom']}"
        msg['From'] = SMTP_CONFIG["username"]
        msg['To'] = SMTP_CONFIG["username"]
        msg['Reply-To'] = contact_data['email']

        # Version texte
        text_content = f"""
🔥 NOUVELLE DEMANDE DE CONTACT - LASSOUED ÉNERGIE

{'🚨🚨 DEMANDE URGENTE - INTERVENTION 24/7 REQUISE ! 🚨🚨' if contact_data.get('urgence') else '📧 DEMANDE NORMALE'}

👤 CLIENT:
- Nom complet: {contact_data['prenom']} {contact_data['nom']}
- Email: {contact_data['email']}
- Téléphone: {contact_data['telephone']}
- Entreprise: {contact_data.get('entreprise', 'Non spécifiée')}

🔧 SERVICE DEMANDÉ: {contact_data['service']}

💬 MESSAGE:
{contact_data['message']}

---
⚡ ACTIONS RAPIDES:
- Répondre par email: {contact_data['email']}
- Appeler maintenant: {contact_data['telephone']}

---
⚡ LASSOUED ÉNERGIE - Votre Confort Électrique Local
Yassine Lassoued - Inventeur électrique qualifié et talentueux
52 Rue Rouget de Lisle, 77550 Moissy-Cramayel
Service 24/7 | +33 06 05 90 61 63
        """

        # Version HTML
        urgence_badge = """
        <div style="background: #ef4444; color: white; padding: 12px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 18px;">🚨🚨 DEMANDE URGENTE - INTERVENTION 24/7 REQUISE ! 🚨🚨</h2>
        </div>
        """ if contact_data.get('urgence') else """
        <div style="background: #10b981; color: white; padding: 12px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 18px;">📧 NOUVELLE DEMANDE DE CONTACT</h2>
        </div>
        """

        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Nouvelle demande - Lassoued Énergie</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 12px; margin-bottom: 20px;">
                <h1 style="margin: 0; font-size: 24px;">⚡ LASSOUED ÉNERGIE</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Nouvelle demande de contact</p>
            </div>

            {urgence_badge}

            <!-- Client Info -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #2563eb; margin-top: 0;">👤 Informations Client</h3>
                <table style="width: 100%;">
                    <tr><td style="font-weight: bold; padding: 5px 0;">Nom:</td><td>{contact_data['prenom']} {contact_data['nom']}</td></tr>
                    <tr><td style="font-weight: bold; padding: 5px 0;">Email:</td><td><a href="mailto:{contact_data['email']}">{contact_data['email']}</a></td></tr>
                    <tr><td style="font-weight: bold; padding: 5px 0;">Téléphone:</td><td><a href="tel:{contact_data['telephone']}">{contact_data['telephone']}</a></td></tr>
                    <tr><td style="font-weight: bold; padding: 5px 0;">Entreprise:</td><td>{contact_data.get('entreprise', 'Non spécifiée')}</td></tr>
                </table>
            </div>

            <!-- Service -->
            <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #2563eb; margin-top: 0;">🔧 Service Demandé</h3>
                <p style="font-size: 18px; font-weight: bold; margin: 0;">{contact_data['service']}</p>
            </div>

            <!-- Message -->
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #2563eb; margin-top: 0;">💬 Message</h3>
                <p style="white-space: pre-wrap; margin: 0;">{contact_data['message']}</p>
            </div>

            <!-- Actions -->
            <div style="text-align: center; margin-bottom: 30px;">
                <a href="mailto:{contact_data['email']}?subject=Re: Votre demande {contact_data['service']}" 
                   style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;">
                    📧 Répondre par Email
                </a>
                <a href="tel:{contact_data['telephone']}" 
                   style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;">
                    📞 Appeler Maintenant
                </a>
            </div>

            <!-- Footer -->
            <div style="background: #374151; color: white; padding: 20px; text-align: center; border-radius: 8px;">
                <p style="margin: 0; font-weight: bold;">⚡ LASSOUED ÉNERGIE - Votre Confort Électrique Local</p>
                <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">
                    Yassine Lassoued - Inventeur électrique qualifié et talentueux<br>
                    52 Rue Rouget de Lisle, 77550 Moissy-Cramayel | +33 06 05 90 61 63<br>
                    Service 24/7
                </p>
            </div>
        </body>
        </html>
        """

        # Attacher les versions texte et HTML
        part1 = MIMEText(text_content, 'plain', 'utf-8')
        part2 = MIMEText(html_content, 'html', 'utf-8')
        
        msg.attach(part1)
        msg.attach(part2)

        # Envoyer l'email
        # Utiliser SSL direct sur port 465 (configuration IONOS validée)
        smtp = aiosmtplib.SMTP(hostname=SMTP_CONFIG["hostname"], port=465, use_tls=True)
        await smtp.connect()
        await smtp.login(SMTP_CONFIG["username"], SMTP_CONFIG["password"])
        await smtp.send_message(msg)
        await smtp.quit()
        logger.info("✅ Email envoyé via SSL (port 465)")

        logger.info(f"✅ Email envoyé avec succès pour {contact_data['prenom']} {contact_data['nom']}")
        return True

    except Exception as e:
        logger.error(f"❌ Erreur envoi email: {str(e)}")
        return False

async def send_confirmation_email(contact_data: Dict[str, Any]) -> bool:
    """
    Envoie un email de confirmation au client
    """
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "Confirmation de votre demande - Lassoued Énergie"
        msg['From'] = SMTP_CONFIG["username"]
        msg['To'] = contact_data['email']

        confirmation_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Confirmation - Lassoued Énergie</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            
            <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 12px; margin-bottom: 20px;">
                <h1 style="margin: 0; font-size: 24px;">⚡ LASSOUED ÉNERGIE</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Confirmation de votre demande</p>
            </div>

            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #2563eb; margin-top: 0;">Bonjour {contact_data['prenom']},</h2>
                <p>Nous avons bien reçu votre demande concernant <strong>{contact_data['service']}</strong>.</p>
                
                {'<p style="background: #fef2f2; color: #dc2626; padding: 12px; border-radius: 6px; font-weight: bold;">🚨 Votre demande est marquée comme URGENTE. Nous vous contacterons dans les plus brefs délais.</p>' if contact_data.get('urgence') else '<p>Nous vous recontacterons dans les plus brefs délais.</p>'}
                
                <p><strong>Récapitulatif de votre demande :</strong></p>
                <ul>
                    <li><strong>Service :</strong> {contact_data['service']}</li>
                    <li><strong>Téléphone :</strong> {contact_data['telephone']}</li>
                    {'<li><strong>Entreprise :</strong> ' + contact_data['entreprise'] + '</li>' if contact_data.get('entreprise') else ''}
                </ul>
            </div>

            <div style="background: #374151; color: white; padding: 20px; text-align: center; border-radius: 8px;">
                <p style="margin: 0; font-weight: bold;">⚡ LASSOUED ÉNERGIE</p>
                <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">
                    +33 06 05 90 61 63 | contact@lassoued-energie.fr<br>
                    52 Rue Rouget de Lisle, 77550 Moissy-Cramayel
                </p>
            </div>
        </body>
        </html>
        """

        part = MIMEText(confirmation_html, 'html', 'utf-8')
        msg.attach(part)

        # Utiliser SSL direct sur port 465 pour email de confirmation
        smtp = aiosmtplib.SMTP(hostname=SMTP_CONFIG["hostname"], port=465, use_tls=True)
        await smtp.connect()
        await smtp.login(SMTP_CONFIG["username"], SMTP_CONFIG["password"])
        await smtp.send_message(msg)
        await smtp.quit()

        return True

    except Exception as e:
        logger.error(f"❌ Erreur envoi confirmation: {str(e)}")
        return False