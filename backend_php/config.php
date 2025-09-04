<?php
/**
 * Configuration de base - Lassoued Énergie
 */

// Configuration base de données MySQL
$db_config = [
    'host' => 'localhost', // Ou l'host MySQL fourni par IONOS
    'dbname' => 'lassoued_energie',
    'username' => 'your_db_username', // À remplacer par vos identifiants IONOS
    'password' => 'your_db_password', // À remplacer par votre mot de passe MySQL IONOS
    'charset' => 'utf8mb4'
];

// Configuration email IONOS
$email_config = [
    'smtp_host' => 'smtp.ionos.fr',
    'smtp_port' => 465,
    'smtp_secure' => 'ssl',
    'smtp_username' => 'contact@lassoued-energie.fr',
    'smtp_password' => 'GABES9596gabes@70', // Votre mot de passe email IONOS
    'from_email' => 'contact@lassoued-energie.fr',
    'from_name' => 'Lassoued Énergie'
];

// Informations entreprise
$company_info = [
    'name' => 'Lassoued Énergie',
    'address' => '52 Rue Rouget de Lisle, 77550 Moissy-Cramayel',
    'phone' => '+33 06 05 90 61 63',
    'email' => 'contact@lassoued-energie.fr'
];

// CORS pour API
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Gérer les requêtes OPTIONS pour CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Timezone
date_default_timezone_set('Europe/Paris');

// Fonction de connexion à la base de données
function getDatabase() {
    global $db_config;
    
    try {
        $dsn = "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset={$db_config['charset']}";
        $pdo = new PDO($dsn, $db_config['username'], $db_config['password']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erreur de connexion base de données']);
        exit;
    }
}

// Fonction pour générer un UUID
function generateUUID() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

// Fonction pour logger les erreurs
function logError($message) {
    error_log(date('Y-m-d H:i:s') . " - " . $message . PHP_EOL, 3, 'logs/error.log');
}

// Créer le dossier logs s'il n'existe pas
if (!file_exists('logs')) {
    mkdir('logs', 0755, true);
}
?>