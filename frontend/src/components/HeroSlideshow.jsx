import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd29ya3xlbnwwfHx8fDE3NTY3NDAzNzh8MA&ixlib=rb-4.1.0&q=85",
      title: "Installations Électriques",
      subtitle: "Professionnelles & Certifiées",
      description: "Nos experts réalisent vos installations électriques selon les normes NF C 15-100 pour votre sécurité et votre confort.",
      buttonText: "Nos Services",
      buttonLink: "/nos-services"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxlbGVjdHJpY2FsJTIwd29ya3xlbnwwfHx8fDE3NTY3NDAzNzh8MA&ixlib=rb-4.1.0&q=85",
      title: "Équipe Qualifiée",
      subtitle: "3 Ans d'Expérience",
      description: "Techniciens certifiés et expérimentés, équipés des dernières technologies pour garantir des interventions de qualité.",
      buttonText: "Qui Sommes-Nous",
      buttonLink: "/qui-sommes-nous"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1707733260992-73ff6dbed163?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxob21lJTIwYXV0b21hdGlvbnxlbnwwfHx8fDE3NTY3NDAzODR8MA&ixlib=rb-4.1.0&q=85",
      title: "Domotique Intelligente",
      subtitle: "Maison Connectée",
      description: "Transformez votre maison en espace intelligent avec nos solutions domotiques sur mesure et contrôle à distance.",
      buttonText: "Découvrir",
      buttonLink: "/nos-services"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1713857297379-6fc26e70f581?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHw0fHxob21lJTIwYXV0b21hdGlvbnxlbnwwfHx8fDE3NTY3NDAzODR8MA&ixlib=rb-4.1.0&q=85",
      title: "Support 24/7",
      subtitle: "Dépannage Urgent",
      description: "Service d'urgence disponible 24h/24 et 7j/7 pour tous vos dépannages électriques. Intervention rapide garantie.",
      buttonText: "Urgence",
      buttonLink: "/contact"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      className="relative h-[600px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-blue-300 mb-6">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to={slide.buttonLink}>
                      <Button 
                        size="lg" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
                      >
                        {slide.buttonText}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg"
                    >
                      <Phone className="mr-2 w-5 h-5" />
                      +33 0605583573
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-white scale-110" 
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 bg-black bg-opacity-30 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default HeroSlideshow;