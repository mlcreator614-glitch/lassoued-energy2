<?php
/**
 * API Principal - Lassoued Énergie
 * Point d'entrée pour toutes les requêtes API
 */

require_once '../config.php';

header('Content-Type: application/json');

// Récupérer l'URI et la méthode
$uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Supprimer les paramètres GET de l'URI
$uri = strtok($uri, '?');

// Router simple
try {
    // Route racine API
    if ($uri === '/api/' || $uri === '/api') {
        if ($method === 'GET') {
            echo json_encode([
                'message' => 'API Lassoued Énergie',
                'version' => '1.0.0',
                'status' => 'operational',
                'endpoints' => [
                    'GET /api/' => 'Informations API',
                    'POST /api/contact' => 'Créer une demande de contact',
                    'GET /api/contact' => 'Récupérer les contacts',
                    'GET /api/contact/urgent' => 'Récupérer les urgences uniquement',
                    'GET /api/services' => 'Récupérer les services',
                    'GET /api/testimonials' => 'Récupérer les témoignages'
                ]
            ]);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Méthode non autorisée']);
        }
    }
    
    // Route contact
    else if (strpos($uri, '/api/contact') === 0) {
        require_once 'contact.php';
    }
    
    // Route services
    else if (strpos($uri, '/api/services') === 0) {
        require_once 'services.php';
    }
    
    // Route témoignages
    else if (strpos($uri, '/api/testimonials') === 0) {
        require_once 'testimonials.php';
    }
    
    // Route test email
    else if ($uri === '/api/test-email' && $method === 'POST') {
        require_once 'test-email.php';
    }
    
    // Route non trouvée
    else {
        http_response_code(404);
        echo json_encode([
            'error' => 'Endpoint non trouvé',
            'uri' => $uri,
            'method' => $method
        ]);
    }
    
} catch (Exception $e) {
    logError("Erreur API: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur interne']);
}
?>