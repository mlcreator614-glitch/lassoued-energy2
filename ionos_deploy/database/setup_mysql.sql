-- Base de données MySQL pour Lassoued Énergie
-- À exécuter dans phpMyAdmin ou interface MySQL IONOS

CREATE TABLE IF NOT EXISTS contacts (
    id VARCHAR(36) PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    entreprise VARCHAR(255) NULL,
    service VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    urgence TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at),
    INDEX idx_urgence (urgence),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertion d'un contact de test (optionnel)
INSERT INTO contacts (id, nom, prenom, email, telephone, service, message, urgence) VALUES 
(UUID(), 'Test', 'Contact', 'test@example.com', '+33123456789', 'Installation électrique', 'Message de test pour vérifier la base de données', 0);