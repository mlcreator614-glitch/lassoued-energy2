-- Base de données MySQL pour Lassoued Énergie
-- À exécuter dans phpMyAdmin ou interface MySQL IONOS

CREATE DATABASE IF NOT EXISTS lassoued_energie CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE lassoued_energie;

-- Table pour les contacts/demandes
CREATE TABLE contacts (
    id VARCHAR(36) PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    entreprise VARCHAR(255) NULL,
    service VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    urgence BOOLEAN DEFAULT FALSE,
    status ENUM('nouveau', 'traite', 'archive') DEFAULT 'nouveau',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_urgence (urgence),
    INDEX idx_created_at (created_at)
);

-- Table pour les services (optionnel - pour administration future)
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    prix_base DECIMAL(10,2) NULL,
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_actif (actif)
);

-- Insérer les services de base
INSERT INTO services (nom, description, actif) VALUES
('Domotique', 'Installation de systèmes domotiques intelligents', TRUE),
('Travaux Électriques', 'Installation et rénovation électrique complète', TRUE),
('Éclairage LED', 'Installation d\'éclairage LED économique', TRUE),
('Maintenance', 'Maintenance et dépannage électrique', TRUE),
('Dépannage Urgent', 'Intervention d\'urgence 24h/24', TRUE),
('Mise aux Normes', 'Mise en conformité électrique NF C 15-100', TRUE);

-- Table pour les témoignages (optionnel)
CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    localisation VARCHAR(100),
    service VARCHAR(100),
    note INT DEFAULT 5,
    commentaire TEXT NOT NULL,
    date_temoignage DATE,
    affiche BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_affiche (affiche),
    INDEX idx_note (note)
);

-- Insérer quelques témoignages
INSERT INTO testimonials (nom, localisation, service, note, commentaire, date_temoignage, affiche) VALUES
('Marie Dubois', 'Moissy-Cramayel', 'Domotique', 5, 'Excellent service ! L\'équipe a installé notre système domotique rapidement et efficacement. Je recommande vivement.', '2024-12-15', TRUE),
('Pierre Martin', 'Melun', 'Travaux Électriques', 5, 'Intervention très professionnelle pour la rénovation électrique de notre maison. Travail soigné et respect des délais.', '2024-11-28', TRUE),
('Sophie Laurent', 'Savigny-le-Temple', 'Dépannage Urgent', 5, 'Support 24/7 vraiment efficace. Dépannage d\'urgence résolu en quelques heures. Merci à toute l\'équipe !', '2024-12-01', TRUE),
('Jean-Claude Moreau', 'Lieusaint', 'Éclairage LED', 5, 'Installation d\'éclairage LED dans toute la maison. Résultat parfait et économies d\'énergie visibles dès le premier mois.', '2024-10-20', TRUE);

-- Table pour les statistiques (optionnel)
CREATE TABLE stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contacts_total INT DEFAULT 0,
    contacts_mois INT DEFAULT 0,
    urgences_total INT DEFAULT 0,
    derniere_maj TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insérer statistiques initiales
INSERT INTO stats (contacts_total, contacts_mois, urgences_total) VALUES (0, 0, 0);

-- Vue pour les contacts récents
CREATE VIEW contacts_recents AS 
SELECT 
    id, nom, prenom, email, telephone, entreprise, service, 
    urgence, status, created_at,
    CASE 
        WHEN urgence = 1 THEN '🚨 URGENCE'
        ELSE '📧 Normal'
    END as priorite
FROM contacts 
ORDER BY urgence DESC, created_at DESC;

-- Procédure pour nettoyer les anciens contacts (optionnel)
DELIMITER //
CREATE PROCEDURE CleanOldContacts()
BEGIN
    -- Archiver les contacts de plus de 1 an
    UPDATE contacts 
    SET status = 'archive' 
    WHERE status = 'traite' 
    AND created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);
END //
DELIMITER ;

-- Afficher les tables créées
SHOW TABLES;