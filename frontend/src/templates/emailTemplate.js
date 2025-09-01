// Template HTML pour les emails de contact
export const createEmailTemplate = (data) => {
  const urgenceStyle = data.urgence ? 
    'background: #ef4444; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold;' : 
    'background: #10b981; color: white; padding: 8px 16px; border-radius: 4px;';

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouvelle demande de contact - Lassoued Énergie</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">⚡ LASSOUED ÉNERGIE</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Nouvelle demande de contact</p>
            </div>

            <!-- Priority Badge -->
            <div style="background: white; padding: 20px; text-align: center;">
                <span style="${urgenceStyle}">
                    ${data.urgence ? '🚨 DEMANDE URGENTE - INTERVENTION 24/7' : '📧 DEMANDE NORMALE'}
                </span>
                <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
                    Reçu le ${data.date}
                </p>
            </div>

            <!-- Client Info -->
            <div style="background: white; padding: 0 20px;">
                <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                    👤 Informations Client
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; width: 120px;">Nom complet:</td>
                        <td style="padding: 8px 0;">${data.from_name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                        <td style="padding: 8px 0;"><a href="mailto:${data.from_email}" style="color: #2563eb;">${data.from_email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold;">Téléphone:</td>
                        <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold;">Entreprise:</td>
                        <td style="padding: 8px 0;">${data.company}</td>
                    </tr>
                </table>
            </div>

            <!-- Service Info -->
            <div style="background: white; padding: 0 20px;">
                <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                    🔧 Service Demandé
                </h2>
                <p style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 15px 0; font-size: 16px; font-weight: bold;">
                    ${data.service}
                </p>
            </div>

            <!-- Message -->
            <div style="background: white; padding: 0 20px;">
                <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                    💬 Message
                </h2>
                <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #2563eb; margin: 15px 0; border-radius: 0 6px 6px 0;">
                    <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
                </div>
            </div>

            <!-- Actions -->
            <div style="background: white; padding: 20px; text-align: center;">
                <h2 style="color: #2563eb; margin-bottom: 20px;">🎯 Actions Rapides</h2>
                <div style="margin: 20px 0;">
                    <a href="mailto:${data.from_email}?subject=Re: Votre demande ${data.service}" 
                       style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;">
                        📧 Répondre par Email
                    </a>
                    <a href="tel:${data.phone}" 
                       style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;">
                        📞 Appeler Maintenant
                    </a>
                </div>
            </div>

            <!-- Footer -->
            <div style="background: #374151; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
                <p style="margin: 0; font-size: 14px;">
                    ⚡ <strong>LASSOUED ÉNERGIE</strong> - Votre Confort Électrique Local
                </p>
                <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.8;">
                    52 Rue Rouget de Lisle, 77550 Moissy-Cramayel | +33 06 05 90 61 63
                </p>
                <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.8;">
                    Service 24/7 - Inventeur électrique qualifié et talentueux
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Template texte simple (fallback)
export const createTextTemplate = (data) => {
  return `
🔥 NOUVELLE DEMANDE DE CONTACT - LASSOUED ÉNERGIE

${data.urgence ? '🚨 DEMANDE URGENTE - INTERVENTION 24/7' : '📧 DEMANDE NORMALE'}
Reçu le: ${data.date}

👤 CLIENT:
- Nom: ${data.from_name}
- Email: ${data.from_email}
- Téléphone: ${data.phone}
- Entreprise: ${data.company}

🔧 SERVICE DEMANDÉ: ${data.service}

💬 MESSAGE:
${data.message}

---
⚡ LASSOUED ÉNERGIE
52 Rue Rouget de Lisle, 77550 Moissy-Cramayel
+33 0605583573 | contact@lassoued-energie.fr
Service 24/7 - Inventeur électrique qualifié et talentueux
  `;
};