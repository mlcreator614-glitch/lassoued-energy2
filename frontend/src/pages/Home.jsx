import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import HeroSlideshow from "../components/HeroSlideshow";
import { 
  Zap, 
  Home as HomeIcon, 
  Shield, 
  Clock, 
  Star, 
  CheckCircle, 
  Users, 
  Award,
  Phone,
  ArrowRight,
  Lightbulb,
  Wrench,
  Settings
} from "lucide-react";

const Home = () => {
  const services = [
    {
      icon: <HomeIcon className="w-12 h-12 text-blue-600" />,
      title: "Domotique",
      description: "Transformez votre maison en espace intelligent et sécurisé avec nos solutions domotiques sur mesure."
    },
    {
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      title: "Travaux Électriques",
      description: "Solutions professionnelles et innovantes garantissant la fiabilité et la sécurité de vos installations électriques."
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-blue-600" />,
      title: "Éclairage LED",
      description: "Installation d'éclairage LED économique et moderne pour réduire votre consommation énergétique."
    },
    {
      icon: <Wrench className="w-12 h-12 text-blue-600" />,
      title: "Maintenance",
      description: "Service de maintenance préventive et corrective pour assurer le bon fonctionnement de vos installations."
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Services de Confiance",
      description: "Équipe certifiée et assurée"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Support 24/24 - 7/7",
      description: "Disponibilité totale pour les urgences"
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Hautement Qualifié",
      description: "Professionnels experts et expérimentés"
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      location: "Moissy-Cramayel",
      rating: 5,
      comment: "Excellent service ! L'équipe a installé notre système domotique rapidement et efficacement. Je recommande vivement."
    },
    {
      name: "Pierre Martin",
      location: "Melun",
      rating: 5,
      comment: "Intervention très professionnelle pour la rénovation électrique de notre maison. Travail soigné et respect des délais."
    },
    {
      name: "Sophie Laurent",
      location: "Savigny-le-Temple",
      rating: 5,
      comment: "Support 24/7 vraiment efficace. Dépannage d'urgence résolu en quelques heures. Merci à toute l'équipe !"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes pour tous vos besoins en électricité et domotique, 
              avec un service de qualité et un support permanent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold mb-2">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/nos-services">
              <Button 
                variant="outline" 
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Voir Tous Nos Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Témoignages Clients
            </h2>
            <p className="text-xl text-gray-600">
              Ce que disent nos clients satisfaits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à Démarrer Votre Projet ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé. 
            Notre équipe d'experts est là pour vous conseiller.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
              >
                Demander un Devis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
            >
              <Phone className="mr-2 w-5 h-5" />
              +33 06 05 90 61 63
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;