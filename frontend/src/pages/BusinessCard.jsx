import React from 'react';
import { Button } from '../components/ui/button';

const BusinessCardPage = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Pour le moment, on utilise la fonction print du navigateur
    // qui permet de sauvegarder en PDF
    window.print();
  };

  return (
    <div>
      {/* Styles d'impression */}
      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { margin: 0; }
          .business-card-front, .business-card-back {
            page-break-after: always;
            margin: 0 !important;
          }
        }
        .print-only { display: none; }
      `}</style>

      {/* Interface utilisateur (masquée à l'impression) */}
      <div className="no-print min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* En-tête */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🎨 Carte de Visite - Yassine Lassoued
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Votre carte de visite professionnelle Lassoued Énergie
            </p>
            
            <div className="flex justify-center gap-4">
              <Button 
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                🖨️ Imprimer / PDF
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
              >
                🏠 Retour Accueil
              </Button>
            </div>
          </div>

          {/* Aperçu des cartes */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold mb-6 text-center">📄 Aperçu des cartes :</h2>
            
            <div className="flex flex-wrap justify-center gap-8">
              
              {/* RECTO */}
              <div className="text-center">
                <h3 className="text-lg font-medium mb-4 text-blue-600">RECTO</h3>
                <div style={{
                  width: '170mm',
                  height: '108mm',
                  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                  borderRadius: '16px',
                  padding: '24mm',
                  color: 'white',
                  position: 'relative',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transform: 'scale(0.8)'
                }}>
                  
                  {/* Logo */}
                  <div style={{ textAlign: 'center', marginBottom: '16mm' }}>
                    <img 
                      src="https://customer-assets.emergentagent.com/job_lassoued-wp-mirror/artifacts/l85f2sax_lasswad%20logo%20.%20-%20copie%202.png"
                      alt="Lassoued Énergie"
                      style={{ height: '50mm', width: 'auto' }}
                    />
                  </div>

                  {/* Informations */}
                  <div style={{ textAlign: 'center' }}>
                    <h1 style={{ 
                      fontSize: '36px', 
                      fontWeight: 'bold', 
                      margin: '0 0 8px 0',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}>
                      YASSINE LASSOUED
                    </h1>
                    <p style={{ 
                      fontSize: '24px', 
                      margin: '0 0 16px 0',
                      opacity: '0.9',
                      fontWeight: '500'
                    }}>
                      Fondateur & Inventeur Électrique
                    </p>
                    <p style={{ 
                      fontSize: '20px', 
                      margin: '0',
                      opacity: '0.8',
                      fontStyle: 'italic'
                    }}>
                      Électricien Qualifié et Talentueux
                    </p>
                  </div>

                  {/* Bordure */}
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    height: '6px',
                    background: 'linear-gradient(90deg, #10b981, #059669)',
                    borderRadius: '0 0 16px 16px'
                  }}></div>
                </div>
              </div>

              {/* VERSO */}
              <div className="text-center">
                <h3 className="text-lg font-medium mb-4 text-blue-600">VERSO</h3>
                <div style={{
                  width: '170mm',
                  height: '108mm',
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24mm',
                  color: '#1f2937',
                  position: 'relative',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                  border: '4px solid #e5e7eb',
                  transform: 'scale(0.8)'
                }}>
                  
                  {/* En-tête */}
                  <div style={{ 
                    textAlign: 'center', 
                    borderBottom: '4px solid #3b82f6',
                    paddingBottom: '12px',
                    marginBottom: '20px'
                  }}>
                    <h2 style={{ 
                      fontSize: '28px', 
                      fontWeight: 'bold', 
                      margin: '0',
                      color: '#1e40af'
                    }}>
                      COORDONNÉES
                    </h2>
                  </div>

                  {/* Contact */}
                  <div style={{ fontSize: '20px', lineHeight: '1.4' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '24px', marginRight: '12px' }}>📱</span>
                      <strong>+33 0605583573</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '24px', marginRight: '12px' }}>📧</span>
                      <span>contact@lassoued-energie.fr</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <span style={{ fontSize: '24px', marginRight: '12px' }}>📍</span>
                      <span>52 Rue Rouget de Lisle<br/>77550 Moissy-Cramayel</span>
                    </div>

                    <div style={{ 
                      background: '#f3f4f6', 
                      padding: '12px', 
                      borderRadius: '8px',
                      marginBottom: '12px',
                      textAlign: 'center'
                    }}>
                      <div style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '20px' }}>
                        🚨 SERVICE D'URGENCE 24/7
                      </div>
                    </div>

                    <div style={{ fontSize: '18px', textAlign: 'center' }}>
                      <strong style={{ color: '#1e40af' }}>NOS SERVICES:</strong><br/>
                      <span>Domotique • Travaux Électriques • LED • Maintenance</span>
                    </div>
                  </div>

                  {/* Pied */}
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '24mm',
                    right: '24mm',
                    textAlign: 'center',
                    fontSize: '16px',
                    color: '#6b7280',
                    fontStyle: 'italic'
                  }}>
                    Fondée en 2023 • 3 ans d'expérience • 100+ clients satisfaits
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              📋 Instructions d'utilisation :
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">🖨️ Impression à domicile :</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Cliquez sur "Imprimer / PDF"</li>
                  <li>• Sélectionnez "Sauvegarder au format PDF"</li>
                  <li>• Imprimez sur papier épais (200g minimum)</li>
                  <li>• Découpez aux dimensions standard</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">🏪 Impression professionnelle :</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Sauvegardez en PDF</li>
                  <li>• Format : 85mm x 54mm</li>
                  <li>• Papier : 300g/m² brillant ou mat</li>
                  <li>• Quantité : 250 ou 500 exemplaires</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Version imprimable (visible uniquement à l'impression) */}
      <div className="print-only">
        <div style={{ 
          fontFamily: 'Arial, sans-serif',
          background: 'white',
          padding: '10mm'
        }}>
          
          {/* RECTO - Page 1 */}
          <div style={{
            width: '85mm',
            height: '54mm',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            borderRadius: '4mm',
            padding: '6mm',
            color: 'white',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pageBreakAfter: 'always'
          }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4mm' }}>
              <img 
                src="https://customer-assets.emergentagent.com/job_lassoued-wp-mirror/artifacts/l85f2sax_lasswad%20logo%20.%20-%20copie%202.png"
                alt="Lassoued Énergie"
                style={{ height: '25mm', width: 'auto' }}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <h1 style={{ 
                fontSize: '4.5mm', 
                fontWeight: 'bold', 
                margin: '0 0 1mm 0'
              }}>
                YASSINE LASSOUED
              </h1>
              <p style={{ 
                fontSize: '3mm', 
                margin: '0 0 2mm 0',
                fontWeight: '500'
              }}>
                Fondateur & Inventeur Électrique
              </p>
              <p style={{ 
                fontSize: '2.5mm', 
                margin: '0',
                fontStyle: 'italic',
                opacity: '0.9'
              }}>
                Électricien Qualifié et Talentueux
              </p>
            </div>

            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              height: '1.5mm',
              background: 'linear-gradient(90deg, #10b981, #059669)',
              borderRadius: '0 0 4mm 4mm'
            }}></div>
          </div>

          {/* VERSO - Page 2 */}
          <div style={{
            width: '85mm',
            height: '54mm',
            background: 'white',
            borderRadius: '4mm',
            padding: '6mm',
            color: '#1f2937',
            position: 'relative',
            border: '1mm solid #e5e7eb'
          }}>
            
            <div style={{ 
              textAlign: 'center', 
              borderBottom: '1mm solid #3b82f6',
              paddingBottom: '3mm',
              marginBottom: '5mm'
            }}>
              <h2 style={{ 
                fontSize: '3.5mm', 
                fontWeight: 'bold', 
                margin: '0',
                color: '#1e40af'
              }}>
                COORDONNÉES
              </h2>
            </div>

            <div style={{ fontSize: '2.5mm', lineHeight: '1.3' }}>
              
              <div style={{ marginBottom: '3mm' }}>
                <strong>📱 +33 0605583573</strong>
              </div>

              <div style={{ marginBottom: '3mm' }}>
                📧 contact@lassoued-energie.fr
              </div>

              <div style={{ marginBottom: '4mm' }}>
                📍 52 Rue Rouget de Lisle<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;77550 Moissy-Cramayel
              </div>

              <div style={{ 
                background: '#f3f4f6', 
                padding: '3mm', 
                borderRadius: '2mm',
                marginBottom: '3mm',
                textAlign: 'center',
                fontSize: '2.2mm'
              }}>
                <strong style={{ color: '#dc2626' }}>
                  🚨 SERVICE D'URGENCE 24/7
                </strong>
              </div>

              <div style={{ fontSize: '2.2mm', textAlign: 'center' }}>
                <strong style={{ color: '#1e40af' }}>SERVICES:</strong><br/>
                Domotique • Électricité • LED • Maintenance
              </div>
            </div>

            <div style={{
              position: 'absolute',
              bottom: '2mm',
              left: '6mm',
              right: '6mm',
              textAlign: 'center',
              fontSize: '2mm',
              color: '#6b7280',
              fontStyle: 'italic'
            }}>
              Fondée en 2023 • 3 ans d'expérience • 100+ clients
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardPage;