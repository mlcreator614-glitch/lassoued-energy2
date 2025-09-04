<?php
/**
 * API Services - Lassoued Énergie
 */

require_once '../config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

try {
    $pdo = getDatabase();
    
    switch ($method) {
        case 'GET':
            getServices($pdo);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Méthode non autorisée']);
            break;
    }
    
} catch (Exception $e) {
    logError("Erreur API services: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur interne']);
}

/**
 * Récupérer tous les services
 */
function getServices($pdo) {
    try {
        $sql = "SELECT * FROM services WHERE actif = 1 ORDER BY id";
        $stmt = $pdo->query($sql);
        $services = $stmt->fetchAll();
        
        echo json_encode($services);
        
    } catch (PDOException $e) {
        logError("Erreur récupération services: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Erreur lors de la récupération']);
    }
}
?>