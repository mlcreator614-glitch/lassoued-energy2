import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  Award, 
  Target, 
  Shield, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  MapPin,
  Calendar,
  Phone
} from "lucide-react";
import { teamMembers, companyInfo } from "../data/mockData";

const About = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Sécurité",
      description: "Nous respectons scrupuleusement toutes les normes de sécurité électrique pour garantir votre protection."
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Qualité",
      description: "Nous utilisons uniquement des équipements de marques reconnues et offrons des prestations de haute qualité."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Réactivité",
      description: "Service d'urgence 24h/24 et respect des délais pour tous vos projets programmés."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Proximité",
      description: "Une équipe locale à votre écoute, disponible et impliquée dans votre région."
    }
  ];

  const stats = [
    { number: "500+", label: "Clients Satisfaits" },
    { number: "7", label: "Années d'Expérience" },
    { number: "24/7", label: "Support Client" },
    { number: "100%", label: "Travaux Garantis" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Qui Sommes-Nous ?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Lassoued Énergie est votre partenaire de confiance pour tous vos besoins en électricité 
              et domotique. Depuis 7 ans, nous accompagnons particuliers et professionnels 
              dans la région de Seine-et-Marne.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre Histoire
              </h2>
              <div className="space-y-6 text-gray-600">
                <p className="text-lg leading-relaxed">
                  Fondée en 2023 par Yassine Lassoued, inventeur électrique et électricien qualifié talentueux avec plus de 7 ans d'expérience, 
                  Lassoued Énergie s'est rapidement imposée comme référence dans le domaine de l'électricité 
                  et de la domotique en Seine-et-Marne.
                </p>
                <p className="text-lg leading-relaxed">
                  Notre engagement envers l'excellence et l'innovation nous a permis de développer une expertise 
                  reconnue dans les technologies les plus avancées, tout en conservant les valeurs traditionnelles 
                  du service client et de la proximité.
                </p>
                <p className="text-lg leading-relaxed">
                  Aujourd'hui, notre équipe de techniciens qualifiés intervient sur l'ensemble du territoire 
                  francilien pour des projets allant de la simple maintenance à l'installation complète 
                  de systèmes domotiques sophistiqués.
                </p>
              </div>
            </div>
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6" />
                  <span className="text-lg">Fondée en 2010</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6" />
                  <span className="text-lg">Basée à Moissy-Cramayel</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6" />
                  <span className="text-lg">3 techniciens experts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6" />
                  <span className="text-lg">Service 24h/24 - 7j/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident notre action quotidienne et notre relation client
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mx-auto mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des professionnels expérimentés et passionnés à votre service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {member.position}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Expérience</p>
                    <p className="font-medium">{member.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Spécialités</p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Certifications</p>
                    <ul className="space-y-1">
                      {member.certifications.map((cert, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Notre Mission
              </h2>
              <div className="space-y-4 text-lg text-blue-100">
                <p>
                  Accompagner nos clients dans leurs projets électriques et domotiques 
                  en proposant des solutions innovantes, sûres et adaptées à leurs besoins.
                </p>
                <p>
                  Nous nous engageons à fournir un service d'excellence, dans le respect 
                  des normes de sécurité les plus strictes et avec une disponibilité totale.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Target className="w-8 h-8 text-blue-300 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-blue-100">
                    Intégration des dernières technologies pour des solutions modernes et efficaces.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Shield className="w-8 h-8 text-blue-300 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sécurité</h3>
                  <p className="text-blue-100">
                    Respect strict des normes NF C 15-100 et garantie totale sur nos installations.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="w-8 h-8 text-blue-300 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Disponibilité</h3>
                  <p className="text-blue-100">
                    Service d'urgence 24h/24 et engagement sur les délais de vos projets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Prêt à Travailler Avec Nous ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Découvrez nos services et obtenez un devis personnalisé pour votre projet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/nos-services">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Nos Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
              >
                Nous Contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;