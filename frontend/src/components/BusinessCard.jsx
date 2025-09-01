import React from 'react';

const BusinessCard = () => {
  return (
    <div className="print-container" style={{ 
      fontFamily: 'Arial, sans-serif',
      background: '#f0f0f0',
      padding: '40px',
      minHeight: '100vh'
    }}>
      
      {/* RECTO */}
      <div className="business-card-front" style={{
        width: '85mm',
        height: '54mm',
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        borderRadius: '8px',
        padding: '12px',
        color: 'white',
        position: 'relative',
        marginBottom: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        
        {/* Logo en haut */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <img 
            src="https://customer-assets.emergentagent.com/job_lassoued-wp-mirror/artifacts/l85f2sax_lasswad%20logo%20.%20-%20copie%202.png"
            alt="Lassoued Énergie"
            style={{ height: '25mm', width: 'auto' }}
          />
        </div>

        {/* Informations personnelles */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            margin: '0 0 4px 0',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}>
            YASSINE LASSOUED
          </h1>
          <p style={{ 
            fontSize: '12px', 
            margin: '0 0 8px 0',
            opacity: '0.9',
            fontWeight: '500'
          }}>
            Fondateur & Inventeur Électrique
          </p>
          <p style={{ 
            fontSize: '10px', 
            margin: '0',
            opacity: '0.8',
            fontStyle: 'italic'
          }}>
            Électricien Qualifié et Talentueux
          </p>
        </div>

        {/* Bordure décorative */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '3px',
          background: 'linear-gradient(90deg, #10b981, #059669)',
          borderRadius: '0 0 8px 8px'
        }}></div>
      </div>

      {/* VERSO */}
      <div className="business-card-back" style={{
        width: '85mm',
        height: '54mm',
        background: 'white',
        borderRadius: '8px',
        padding: '12px',
        color: '#1f2937',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        border: '2px solid #e5e7eb'
      }}>
        
        {/* En-tête */}
        <div style={{ 
          textAlign: 'center', 
          borderBottom: '2px solid #3b82f6',
          paddingBottom: '6px',
          marginBottom: '10px'
        }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            margin: '0',
            color: '#1e40af'
          }}>
            COORDONNÉES
          </h2>
        </div>

        {/* Informations de contact */}
        <div style={{ fontSize: '10px', lineHeight: '1.4' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', marginRight: '6px' }}>📱</span>
            <strong>+33 0605583573</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', marginRight: '6px' }}>📧</span>
            <span>contact@lassoued-energie.fr</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', marginRight: '6px' }}>📍</span>
            <span>52 Rue Rouget de Lisle<br/>77550 Moissy-Cramayel</span>
          </div>

          <div style={{ 
            background: '#f3f4f6', 
            padding: '6px', 
            borderRadius: '4px',
            marginBottom: '6px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '10px' }}>
              🚨 SERVICE D'URGENCE 24/7
            </div>
          </div>

          {/* Services */}
          <div style={{ fontSize: '9px', textAlign: 'center' }}>
            <strong style={{ color: '#1e40af' }}>NOS SERVICES:</strong><br/>
            <span>Domotique • Travaux Électriques • LED • Maintenance</span>
          </div>
        </div>

        {/* Pied de page */}
        <div style={{
          position: 'absolute',
          bottom: '4px',
          left: '12px',
          right: '12px',
          textAlign: 'center',
          fontSize: '8px',
          color: '#6b7280',
          fontStyle: 'italic'
        }}>
          Fondée en 2023 • 3 ans d'expérience • 100+ clients satisfaits
        </div>
      </div>

      {/* Instructions d'impression */}
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        background: 'white', 
        borderRadius: '8px',
        fontSize: '14px',
        color: '#374151'
      }}>
        <h3 style={{ color: '#1e40af', marginBottom: '12px' }}>📄 Instructions d'impression :</h3>
        <ul style={{ lineHeight: '1.6' }}>
          <li><strong>Format :</strong> 85mm x 54mm (format carte de visite standard)</li>
          <li><strong>Papier :</strong> 300g/m² mat ou brillant</li>
          <li><strong>Impression :</strong> Recto-verso</li>
          <li><strong>Finition :</strong> Coins arrondis (optionnel)</li>
          <li><strong>Quantité recommandée :</strong> 250 ou 500 exemplaires</li>
        </ul>
        
        <p style={{ marginTop: '16px', padding: '12px', background: '#f0f9ff', borderRadius: '6px' }}>
          <strong>💡 Conseil :</strong> Vous pouvez imprimer cette page directement ou l'enregistrer en PDF 
          pour l'envoyer à votre imprimeur préféré !
        </p>
      </div>
    </div>
  );
};

export default BusinessCard;