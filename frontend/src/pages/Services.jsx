import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  Home as HomeIcon, 
  Zap, 
  Lightbulb, 
  Wrench,
  CheckCircle,
  ArrowRight,
  Phone,
  Clock,
  Shield,
  Star,
  Settings,
  Wifi,
  Camera,
  Thermometer
} from "lucide-react";
import { services, projects, testimonials } from "../data/mockData";

const Services = () => {
  const [activeService, setActiveService] = useState("all");

  const getServiceIcon = (iconName) => {
    const icons = {
      home: <HomeIcon className="w-8 h-8 text-blue-600" />,
      zap: <Zap className="w-8 h-8 text-blue-600" />,
      lightbulb: <Lightbulb className="w-8 h-8 text-blue-600" />,
      wrench: <Wrench className="w-8 h-8 text-blue-600" />
    };
    return icons[iconName] || <Settings className="w-8 h-8 text-blue-600" />;
  };

  const additionalServices = [
    {
      title: "Installation & Maintenance",
      description: "Installation complète et maintenance de vos équipements électriques",
      icon: <Settings className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Mise aux Normes",
      description: "Mise en conformité selon les normes NF C 15-100",
      icon: <Shield className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Dépannage Urgent",
      description: "Intervention d'urgence 24h/24 et 7j/7",
      icon: <Clock className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Diagnostic Électrique",
      description: "Contrôle et diagnostic de vos installations",
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />
    }
  ];

  const domoticFeatures = [
    { icon: <Wifi className="w-5 h-5" />, text: "Contrôle à distance" },
    { icon: <Camera className="w-5 h-5" />, text: "Surveillance intelligente" },
    { icon: <Thermometer className="w-5 h-5" />, text: "Régulation thermique" },
    { icon: <Lightbulb className="w-5 h-5" />, text: "Éclairage automatisé" }
  ];

  const filteredProjects = activeService === "all" 
    ? projects 
    : projects.filter(project => project.category.toLowerCase().includes(activeService.toLowerCase()));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Solutions complètes en électricité et domotique pour particuliers et professionnels. 
              Expertise technique, matériel de qualité et service client d'exception.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.slice(0, 2).map((service) => (
              <Card key={service.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="text-center pb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mx-auto mb-6">
                    {getServiceIcon(service.icon)}
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600">
                    {service.shortDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.fullDescription}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {service.id === 1 && (
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Fonctionnalités Avancées</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {domoticFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-blue-700">
                            {feature.icon}
                            <span>{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link to="/contact">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Demander un Devis
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Services Complémentaires
            </h2>
            <p className="text-xl text-gray-600">
              Une gamme complète de services pour tous vos besoins électriques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {services.slice(2).map((service) => (
              <Card key={service.id} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mx-auto mb-4">
                    {getServiceIcon(service.icon)}
                  </div>
                  <CardTitle className="text-xl font-semibold mb-2">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4">
                    {service.shortDescription}
                  </CardDescription>
                  <div className="space-y-2">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center justify-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mx-auto mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold mb-2">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Réalisations
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez quelques-uns de nos projets récents
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="domotique">Domotique</TabsTrigger>
              <TabsTrigger value="electrique">Électrique</TabsTrigger>
              <TabsTrigger value="led">LED</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                          {project.category}
                        </Badge>
                        <span className="text-sm text-gray-500">{project.year}</span>
                      </div>
                      <CardTitle className="text-lg font-semibold">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>Durée: {project.duration}</span>
                      </div>
                      <div className="space-y-2">
                        {project.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="domotique">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.filter(p => p.category === "Domotique").map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 w-fit mb-2">
                        {project.category}
                      </Badge>
                      <CardTitle className="text-lg font-semibold">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="space-y-2">
                        {project.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="electrique">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.filter(p => p.category === "Travaux Électriques").map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 w-fit mb-2">
                        {project.category}
                      </Badge>
                      <CardTitle className="text-lg font-semibold">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="space-y-2">
                        {project.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="led">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.filter(p => p.category === "Éclairage LED").map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 w-fit mb-2">
                        {project.category}
                      </Badge>
                      <CardTitle className="text-lg font-semibold">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="space-y-2">
                        {project.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Témoignages Clients
            </h2>
            <p className="text-xl text-gray-600">
              La satisfaction de nos clients est notre priorité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
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
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {testimonial.service}
                      </Badge>
                    </div>
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
            Besoin d'un Devis Personnalisé ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Notre équipe d'experts vous accompagne dans votre projet. 
            Devis gratuit et conseils personnalisés.
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
              Appeler Maintenant
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;