<?php
/**
 * Service Email pour Lassoued Énergie
 * Gestion des emails via SMTP IONOS
 */

require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';
require_once __DIR__ . '/PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class EmailService {
    
    private $config;
    
    public function __construct() {
        global $email_config, $company_info;
        $this->config = $email_config;
        $this->company = $company_info;
    }
    
    /**
     * Envoyer un email de contact vers l'entreprise
     */
    public function sendContactEmail($contact_data) {
        try {
            $mail = $this->createMailer();
            
            // Destinataire
            $mail->addAddress($this->config['from_email'], 'Lassoued Énergie');
            
            // Expéditeur (reply-to = client)
            $mail->setFrom($this->config['from_email'], 'Lassoued Énergie - Contact');
            $mail->addReplyTo($contact_data['email'], $contact_data['prenom'] . ' ' . $contact_data['nom']);
            
            // Sujet
            $urgence_prefix = $contact_data['urgence'] ? '🚨 URGENCE - ' : '';
            $mail->Subject = $urgence_prefix . 'Nouvelle demande - ' . $contact_data['prenom'] . ' ' . $contact_data['nom'] . ' (' . $contact_data['service'] . ')';
            
            // Corps de l'email (HTML)
            $mail->isHTML(true);
            $mail->Body = $this->generateContactEmailHTML($contact_data);
            $mail->AltBody = $this->generateContactEmailText($contact_data);
            
            // Envoyer
            return $mail->send();
            
        } catch (Exception $e) {
            logError("Erreur envoi email contact: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Envoyer un email de confirmation au client
     */
    public function sendConfirmationEmail($contact_data) {
        try {
            $mail = $this->createMailer();
            
            // Destinataire (client)
            $mail->addAddress($contact_data['email'], $contact_data['prenom'] . ' ' . $contact_data['nom']);
            
            // Expéditeur
            $mail->setFrom($this->config['from_email'], 'Lassoued Énergie');
            
            // Sujet
            $mail->Subject = 'Confirmation de votre demande - Lassoued Énergie';
            
            // Corps de l'email
            $mail->isHTML(true);
            $mail->Body = $this->generateConfirmationEmailHTML($contact_data);
            $mail->AltBody = $this->generateConfirmationEmailText($contact_data);
            
            // Envoyer
            return $mail->send();
            
        } catch (Exception $e) {
            logError("Erreur envoi email confirmation: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Créer une instance PHPMailer configurée pour IONOS
     */
    private function createMailer() {
        $mail = new PHPMailer(true);
        
        // Configuration SMTP IONOS
        $mail->isSMTP();
        $mail->Host = $this->config['smtp_host'];
        $mail->SMTPAuth = true;
        $mail->Username = $this->config['smtp_username'];
        $mail->Password = $this->config['smtp_password'];
        $mail->SMTPSecure = $this->config['smtp_secure']; // 'ssl' pour port 465
        $mail->Port = $this->config['smtp_port'];
        
        // Configuration générale
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';
        
        return $mail;
    }
    
    /**
     * Générer le HTML pour l'email de contact
     */
    private function generateContactEmailHTML($contact_data) {
        $urgence_badge = $contact_data['urgence'] ? 
            '<div style="background: #ef4444; color: white; padding: 12px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 18px;">🚨🚨 DEMANDE URGENTE - INTERVENTION 24/7 REQUISE ! 🚨🚨</h2>
            </div>' :
            '<div style="background: #10b981; color: white; padding: 12px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 18px;">📧 NOUVELLE DEMANDE DE CONTACT</h2>
            </div>';
        
        $entreprise = $contact_data['entreprise'] ? $contact_data['entreprise'] : 'Non spécifiée';
        
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>Nouvelle demande - Lassoued Énergie</title>
        </head>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;'>
            
            <!-- Header -->
            <div style='background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 12px; margin-bottom: 20px;'>
                <h1 style='margin: 0; font-size: 24px;'>⚡ LASSOUED ÉNERGIE</h1>
                <p style='margin: 10px 0 0 0; opacity: 0.9;'>Nouvelle demande de contact</p>
            </div>

            $urgence_badge

            <!-- Client Info -->
            <div style='background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;'>
                <h3 style='color: #2563eb; margin-top: 0;'>👤 Informations Client</h3>
                <table style='width: 100%;'>
                    <tr><td style='font-weight: bold; padding: 5px 0;'>Nom:</td><td>{$contact_data['prenom']} {$contact_data['nom']}</td></tr>
                    <tr><td style='font-weight: bold; padding: 5px 0;'>Email:</td><td><a href='mailto:{$contact_data['email']}'>{$contact_data['email']}</a></td></tr>
                    <tr><td style='font-weight: bold; padding: 5px 0;'>Téléphone:</td><td><a href='tel:{$contact_data['telephone']}'>{$contact_data['telephone']}</a></td></tr>
                    <tr><td style='font-weight: bold; padding: 5px 0;'>Entreprise:</td><td>$entreprise</td></tr>
                </table>
            </div>

            <!-- Service -->
            <div style='background: #e0f2fe; padding: 20px; border-radius: 8px; margin-bottom: 20px;'>
                <h3 style='color: #2563eb; margin-top: 0;'>🔧 Service Demandé</h3>
                <p style='font-size: 18px; font-weight: bold; margin: 0;'>{$contact_data['service']}</p>
            </div>

            <!-- Message -->
            <div style='background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;'>
                <h3 style='color: #2563eb; margin-top: 0;'>💬 Message</h3>
                <p style='white-space: pre-wrap; margin: 0;'>{$contact_data['message']}</p>
            </div>

            <!-- Actions -->
            <div style='text-align: center; margin-bottom: 30px;'>
                <a href='mailto:{$contact_data['email']}?subject=Re: Votre demande {$contact_data['service']}' 
                   style='display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;'>
                    📧 Répondre par Email
                </a>
                <a href='tel:{$contact_data['telephone']}' 
                   style='display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;'>
                    📞 Appeler Maintenant
                </a>
            </div>

            <!-- Footer -->
            <div style='background: #374151; color: white; padding: 20px; text-align: center; border-radius: 8px;'>
                <p style='margin: 0; font-weight: bold;'>⚡ LASSOUED ÉNERGIE - Votre Confort Électrique Local</p>
                <p style='margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;'>
                    Yassine Lassoued - Inventeur électrique qualifié et talentueux<br>
                    52 Rue Rouget de Lisle, 77550 Moissy-Cramayel | +33 06 05 90 61 63<br>
                    Service 24/7
                </p>
            </div>
        </body>
        </html>";
    }
    
    /**
     * Générer le texte pour l'email de contact
     */
    private function generateContactEmailText($contact_data) {
        $urgence_text = $contact_data['urgence'] ? '🚨🚨 DEMANDE URGENTE - INTERVENTION 24/7 REQUISE ! 🚨🚨' : '📧 NOUVELLE DEMANDE DE CONTACT';
        $entreprise = $contact_data['entreprise'] ? $contact_data['entreprise'] : 'Non spécifiée';
        
        return "
🔥 NOUVELLE DEMANDE DE CONTACT - LASSOUED ÉNERGIE

$urgence_text

👤 CLIENT:
- Nom: {$contact_data['prenom']} {$contact_data['nom']}
- Email: {$contact_data['email']}
- Téléphone: {$contact_data['telephone']}
- Entreprise: $entreprise

🔧 SERVICE DEMANDÉ: {$contact_data['service']}

💬 MESSAGE:
{$contact_data['message']}

---
⚡ ACTIONS RAPIDES:
- Répondre par email: {$contact_data['email']}
- Appeler maintenant: {$contact_data['telephone']}

---
⚡ LASSOUED ÉNERGIE - Votre Confort Électrique Local
Yassine Lassoued - Inventeur électrique qualifié et talentueux
52 Rue Rouget de Lisle, 77550 Moissy-Cramayel
Service 24/7 | +33 06 05 90 61 63
        ";
    }
    
    /**
     * Générer le HTML pour l'email de confirmation
     */
    private function generateConfirmationEmailHTML($contact_data) {
        $urgence_message = $contact_data['urgence'] ? 
            '<p style="background: #fef2f2; color: #dc2626; padding: 12px; border-radius: 6px; font-weight: bold;">🚨 Votre demande est marquée comme URGENTE. Nous vous contacterons dans les plus brefs délais.</p>' :
            '<p>Nous vous recontacterons dans les plus brefs délais.</p>';
        
        $entreprise_line = $contact_data['entreprise'] ? 
            '<li><strong>Entreprise :</strong> ' . $contact_data['entreprise'] . '</li>' : '';
        
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>Confirmation - Lassoued Énergie</title>
        </head>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;'>
            
            <div style='background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 12px; margin-bottom: 20px;'>
                <h1 style='margin: 0; font-size: 24px;'>⚡ LASSOUED ÉNERGIE</h1>
                <p style='margin: 10px 0 0 0; opacity: 0.9;'>Confirmation de votre demande</p>
            </div>

            <div style='background: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;'>
                <h2 style='color: #2563eb; margin-top: 0;'>Bonjour {$contact_data['prenom']},</h2>
                <p>Nous avons bien reçu votre demande concernant <strong>{$contact_data['service']}</strong>.</p>
                
                $urgence_message
                
                <p><strong>Récapitulatif de votre demande :</strong></p>
                <ul>
                    <li><strong>Service :</strong> {$contact_data['service']}</li>
                    <li><strong>Téléphone :</strong> {$contact_data['telephone']}</li>
                    $entreprise_line
                </ul>
            </div>

            <div style='background: #374151; color: white; padding: 20px; text-align: center; border-radius: 8px;'>
                <p style='margin: 0; font-weight: bold;'>⚡ LASSOUED ÉNERGIE</p>
                <p style='margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;'>
                    +33 06 05 90 61 63 | contact@lassoued-energie.fr<br>
                    52 Rue Rouget de Lisle, 77550 Moissy-Cramayel
                </p>
            </div>
        </body>
        </html>";
    }
    
    /**
     * Générer le texte pour l'email de confirmation
     */
    private function generateConfirmationEmailText($contact_data) {
        $urgence_text = $contact_data['urgence'] ? 
            '🚨 Votre demande est marquée comme URGENTE. Nous vous contacterons dans les plus brefs délais.' :
            'Nous vous recontacterons dans les plus brefs délais.';
        
        $entreprise = $contact_data['entreprise'] ? $contact_data['entreprise'] : '';
        
        return "
LASSOUED ÉNERGIE - Confirmation de votre demande

Bonjour {$contact_data['prenom']},

Nous avons bien reçu votre demande concernant {$contact_data['service']}.

$urgence_text

Récapitulatif de votre demande :
- Service : {$contact_data['service']}
- Téléphone : {$contact_data['telephone']}
" . ($entreprise ? "- Entreprise : $entreprise" : "") . "

---
⚡ LASSOUED ÉNERGIE
+33 06 05 90 61 63 | contact@lassoued-energie.fr
52 Rue Rouget de Lisle, 77550 Moissy-Cramayel
        ";
    }
}
?>