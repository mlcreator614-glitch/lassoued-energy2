import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MapPin, Navigation } from 'lucide-react';

// Coordonnées de Moissy-Cramayel (52 Rue Rouget de Lisle)
const COMPANY_COORDINATES = [48.6286, 2.5914];
const INTERVENTION_RADIUS = 50000; // 50 km en mètres

// Créer des icônes personnalisées
const createCustomIcon = () => {
  return new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="15" fill="#2563eb" stroke="white" stroke-width="2"/>
        <path d="M16 8c-2.21 0-4 1.79-4 4 0 1.11.45 2.11 1.17 2.83L16 21l2.83-6.17C19.55 14.11 20 13.11 20 12c0-2.21-1.79-4-4-4z" fill="white"/>
        <circle cx="16" cy="12" r="2" fill="#2563eb"/>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const InterventionMap = () => {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
  }, []);

  if (!mapReady) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 text-blue-600 mr-2" />
            Zone d'Intervention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chargement de la carte...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 text-blue-600 mr-2" />
          Zone d'Intervention
        </CardTitle>
        <p className="text-gray-600 text-sm mt-2">
          Nous intervenons dans un rayon de 50 km autour de notre siège social
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80 rounded-lg overflow-hidden border-2 border-gray-200">
          <MapContainer
            center={COMPANY_COORDINATES}
            zoom={9}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Cercle de la zone d'intervention */}
            <Circle
              center={COMPANY_COORDINATES}
              radius={INTERVENTION_RADIUS}
              pathOptions={{
                fillColor: '#3b82f6',
                fillOpacity: 0.1,
                color: '#2563eb',
                weight: 2,
                opacity: 0.8,
              }}
            />
            
            {/* Marqueur de la société */}
            <Marker
              position={COMPANY_COORDINATES}
              icon={createCustomIcon()}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-blue-600 mb-2">⚡ LASSOUED ÉNERGIE</h3>
                  <p className="text-sm mb-1">
                    <strong>Adresse:</strong><br />
                    52 Rue Rouget de Lisle<br />
                    77550 Moissy-Cramayel
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Téléphone:</strong><br />
                    +33 06 05 90 61 63
                  </p>
                  <p className="text-sm">
                    <strong>Service:</strong> 24h/24 - 7j/7
                  </p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        
        {/* Informations sur la zone */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Navigation className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="font-semibold text-blue-900">Rayon d'intervention</h4>
            </div>
            <p className="text-blue-700 text-sm">
              <strong>50 km</strong> autour de Moissy-Cramayel
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <MapPin className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="font-semibold text-green-900">Siège social</h4>
            </div>
            <p className="text-green-700 text-sm">
              52 Rue Rouget de Lisle<br />
              77550 Moissy-Cramayel
            </p>
          </div>
        </div>

        {/* Villes principales couvertes */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Principales villes couvertes :</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-sm">
            {[
              'Moissy-Cramayel', 'Melun', 'Savigny-le-Temple', 'Lieusaint', 'Vert-Saint-Denis',
              'Combs-la-Ville', 'Évry-Courcouronnes', 'Corbeil-Essonnes', 'Tigery', 'Paris (Est)',
              'Créteil', 'Brie-Comte-Robert', 'Fontainebleau', 'Nemours', 'Montereau'
            ].map((ville, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-700">{ville}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white text-center">
          <p className="mb-2">
            <strong>Votre ville n'est pas dans la liste ?</strong>
          </p>
          <p className="text-sm text-blue-100">
            Contactez-nous ! Nous étudions toutes les demandes dans un rayon de 50 km.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterventionMap;