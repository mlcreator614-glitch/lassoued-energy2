<?php
/**
 * API Contact - Lassoued Énergie
 * Gestion des demandes de contact et envoi d'emails
 */

require_once '../config.php';
require_once '../includes/EmailService.php';

header('Content-Type: application/json');

// Récupérer la méthode HTTP
$method = $_SERVER['REQUEST_METHOD'];

try {
    $pdo = getDatabase();
    
    switch ($method) {
        case 'POST':
            // Créer une nouvelle demande de contact
            createContact($pdo);
            break;
            
        case 'GET':
            // Récupérer les contacts (pour admin)
            getContacts($pdo);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Méthode non autorisée']);
            break;
    }
    
} catch (Exception $e) {
    logError("Erreur API contact: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur interne']);
}

/**
 * Créer une nouvelle demande de contact
 */
function createContact($pdo) {
    // Récupérer les données JSON
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validation des données
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Données invalides']);
        return;
    }
    
    $required_fields = ['nom', 'prenom', 'email', 'telephone', 'service', 'message'];
    foreach ($required_fields as $field) {
        if (empty($input[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "Le champ '$field' est requis"]);
            return;
        }
    }
    
    // Validation email
    if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email invalide']);
        return;
    }
    
    // Nettoyer et préparer les données
    $contact_data = [
        'id' => generateUUID(),
        'nom' => trim($input['nom']),
        'prenom' => trim($input['prenom']),
        'email' => trim(strtolower($input['email'])),
        'telephone' => trim($input['telephone']),
        'entreprise' => isset($input['entreprise']) ? trim($input['entreprise']) : null,
        'service' => trim($input['service']),
        'message' => trim($input['message']),
        'urgence' => isset($input['urgence']) ? (bool)$input['urgence'] : false
    ];
    
    try {
        // Insérer en base de données
        $sql = "INSERT INTO contacts (id, nom, prenom, email, telephone, entreprise, service, message, urgence) 
                VALUES (:id, :nom, :prenom, :email, :telephone, :entreprise, :service, :message, :urgence)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($contact_data);
        
        // Envoyer les emails
        $emailService = new EmailService();
        $email_sent = false;
        $confirmation_sent = false;
        
        try {
            // Email vers l'entreprise
            $email_sent = $emailService->sendContactEmail($contact_data);
            
            // Email de confirmation au client
            $confirmation_sent = $emailService->sendConfirmationEmail($contact_data);
            
        } catch (Exception $e) {
            logError("Erreur envoi email: " . $e->getMessage());
        }
        
        // Log de l'activité
        $urgence_text = $contact_data['urgence'] ? "🚨 URGENCE 24/7" : "📧 Normal";
        $email_status = $email_sent ? "✅ Email envoyé" : "❌ Erreur email";
        
        logError("$urgence_text - Nouveau contact: {$contact_data['prenom']} {$contact_data['nom']} ({$contact_data['email']}) - Service: {$contact_data['service']} - $email_status");
        
        // Réponse de succès
        $response = $contact_data;
        $response['created_at'] = date('Y-m-d H:i:s');
        $response['status'] = 'nouveau';
        $response['email_sent'] = $email_sent;
        $response['confirmation_sent'] = $confirmation_sent;
        
        http_response_code(201);
        echo json_encode($response);
        
    } catch (PDOException $e) {
        logError("Erreur base de données: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Erreur lors de la sauvegarde']);
    }
}

/**
 * Récupérer les contacts (pour administration)
 */
function getContacts($pdo) {
    try {
        // Vérifier si demande des urgences uniquement
        $urgences_only = isset($_GET['urgent']) && $_GET['urgent'] === 'true';
        
        if ($urgences_only) {
            $sql = "SELECT * FROM contacts WHERE urgence = 1 ORDER BY created_at DESC LIMIT 100";
        } else {
            $sql = "SELECT * FROM contacts ORDER BY urgence DESC, created_at DESC LIMIT 1000";
        }
        
        $stmt = $pdo->query($sql);
        $contacts = $stmt->fetchAll();
        
        // Ajouter des infos formatées
        foreach ($contacts as &$contact) {
            $contact['urgence_text'] = $contact['urgence'] ? '🚨 URGENCE' : '📧 Normal';
            $contact['created_at_formatted'] = date('d/m/Y H:i', strtotime($contact['created_at']));
        }
        
        echo json_encode($contacts);
        
    } catch (PDOException $e) {
        logError("Erreur récupération contacts: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Erreur lors de la récupération']);
    }
}
?>