import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl font-bold text-lg shadow-lg">
                <span className="text-xl">L</span>ASSOUED
                <span className="block text-sm font-light tracking-wider">ÉNERGIE</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Votre partenaire de confiance pour tous vos travaux électriques et solutions domotiques. 
              Services professionnels et support 24/7.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/qui-sommes-nous" className="text-gray-300 hover:text-white transition-colors">
                  Qui Sommes-Nous ?
                </Link>
              </li>
              <li>
                <Link to="/nos-services" className="text-gray-300 hover:text-white transition-colors">
                  Nos Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Domotique</li>
              <li>Travaux Électriques</li>
              <li>Installation & Maintenance</li>
              <li>Dépannage Urgent</li>
              <li>Mise aux Normes</li>
              <li>Éclairage LED</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 text-blue-500" />
                <div>
                  <p>52 Rue Rouget de Lisle</p>
                  <p>77550 Moissy-Cramayel</p>
                  <p>France</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-500" />
                <span>+33 0605583573</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <span>contact@lassoued-energie.fr</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>Support 24/24 - 7/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Lassoued Énergie. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Powered by WordPress</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400 text-sm">Theme: InnoPress by ThemeArile</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;