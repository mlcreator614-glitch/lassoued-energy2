// Mock data for Lassoued Énergie website

export const companyInfo = {
  name: "Lassoued Énergie",
  tagline: "Votre Confort Électrique Local",
  description: "Votre partenaire de confiance pour tous vos travaux électriques et solutions domotiques.",
  address: {
    street: "52 Rue Rouget de Lisle",
    city: "77550 Moissy-Cramayel",
    country: "France"
  },
  contact: {
    phone: "+33 0605583573",
    email: "contact@lassoued-energie.fr"
  },
  features: [
    "Services de confiance",
    "Support 24/24 - 7/7", 
    "Hautement qualifié"
  ]
};

export const services = [
  {
    id: 1,
    title: "Domotique",
    shortDescription: "Transformez votre maison en espace intelligent et sécurisé",
    fullDescription: "Nos solutions domotiques sur mesure vous permettent de contrôler l'éclairage, le chauffage, la sécurité et bien plus encore depuis votre smartphone ou tablette.",
    features: [
      "Éclairage intelligent",
      "Contrôle du chauffage",
      "Système de sécurité connecté",
      "Volets automatisés",
      "Portails motorisés",
      "Application mobile dédiée"
    ],
    icon: "home"
  },
  {
    id: 2,
    title: "Travaux Électriques", 
    shortDescription: "Solutions professionnelles garantissant fiabilité et sécurité",
    fullDescription: "Installation, rénovation et maintenance de tous types d'installations électriques selon les normes en vigueur.",
    features: [
      "Installation électrique complète",
      "Rénovation et mise aux normes",
      "Tableaux électriques",
      "Prises et interrupteurs",
      "Éclairage intérieur/extérieur",
      "Diagnostic électrique"
    ],
    icon: "zap"
  },
  {
    id: 3,
    title: "Éclairage LED",
    shortDescription: "Éclairage économique et moderne",
    fullDescription: "Installation d'éclairage LED pour réduire votre consommation énergétique tout en améliorant le confort visuel.",
    features: [
      "Éclairage LED intérieur",
      "Éclairage extérieur",
      "Spots encastrés",
      "Bandeau LED",
      "Variateurs d'intensité",
      "Économies d'énergie jusqu'à 80%"
    ],
    icon: "lightbulb"
  },
  {
    id: 4,
    title: "Maintenance & Dépannage",
    shortDescription: "Service de maintenance et dépannage d'urgence",
    fullDescription: "Service de maintenance préventive et dépannage d'urgence 24h/24 pour tous vos équipements électriques.",
    features: [
      "Dépannage 24h/24",
      "Maintenance préventive",
      "Diagnostic panne",
      "Réparation équipements",
      "Contrat de maintenance",
      "Intervention rapide"
    ],
    icon: "wrench"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Marie Dubois",
    location: "Moissy-Cramayel",
    rating: 5,
    comment: "Excellent service ! L'équipe a installé notre système domotique rapidement et efficacement. Je recommande vivement.",
    service: "Domotique",
    date: "2024-12-15"
  },
  {
    id: 2,
    name: "Pierre Martin", 
    location: "Melun",
    rating: 5,
    comment: "Intervention très professionnelle pour la rénovation électrique de notre maison. Travail soigné et respect des délais.",
    service: "Travaux Électriques",
    date: "2024-11-28"
  },
  {
    id: 3,
    name: "Sophie Laurent",
    location: "Savigny-le-Temple",
    rating: 5,
    comment: "Support 24/7 vraiment efficace. Dépannage d'urgence résolu en quelques heures. Merci à toute l'équipe !",
    service: "Dépannage",
    date: "2024-12-01"
  },
  {
    id: 4,
    name: "Jean-Claude Moreau",
    location: "Lieusaint",
    rating: 5,
    comment: "Installation d'éclairage LED dans toute la maison. Résultat parfait et économies d'énergie visibles dès le premier mois.",
    service: "Éclairage LED",
    date: "2024-10-20"
  },
  {
    id: 5,
    name: "Nathalie Petit",
    location: "Combs-la-Ville",
    rating: 5,
    comment: "Équipe très compétente et à l'écoute. Travaux de mise aux normes réalisés dans les temps et sans surprise sur le devis.",
    service: "Mise aux normes",
    date: "2024-11-15"
  },
  {
    id: 6,
    name: "Michel Rousseau",
    location: "Vert-Saint-Denis",
    rating: 5,
    comment: "Service après-vente excellent. Très réactifs pour les questions et ajustements après installation domotique.",
    service: "Domotique",
    date: "2024-12-10"
  }
];

export const teamMembers = [
  {
    id: 1,
    name: "Yassine Lassoued",
    position: "Fondateur & Inventeur Électrique",
    experience: "3 ans d'expérience - Électricien qualifié et talentueux",
    specialties: ["Inventions électriques", "Installations électriques", "Domotique", "Management"],
    certifications: ["Qualification IRVE", "Habilitation électrique", "Formation domotique", "Inventeur breveté"]
  },
  {
    id: 2,
    name: "Karim Bennani",
    position: "Technicien Domotique",
    experience: "8 ans d'expérience", 
    specialties: ["Systèmes connectés", "Automatisation", "Programmation"],
    certifications: ["Certification KNX", "Formation IoT", "Sécurité électronique"]
  },
  {
    id: 3,
    name: "Fabrice Durand",
    position: "Électricien Senior",
    experience: "12 ans d'expérience",
    specialties: ["Tableaux électriques", "Éclairage", "Maintenance"],
    certifications: ["Habilitation B2V", "Formation LED", "Diagnostic électrique"]
  }
];

export const projects = [
  {
    id: 1,
    title: "Rénovation électrique complète - Villa Moissy-Cramayel",
    category: "Travaux Électriques",
    description: "Rénovation complète de l'installation électrique d'une villa de 200m² avec mise aux normes NF C 15-100.",
    duration: "3 semaines",
    year: "2024",
    features: ["Nouveau tableau électrique", "Éclairage LED", "Prises USB", "Interrupteurs connectés"]
  },
  {
    id: 2,
    title: "Installation domotique - Maison contemporaine Melun",
    category: "Domotique", 
    description: "Installation complète d'un système domotique avec contrôle éclairage, volets, chauffage et sécurité.",
    duration: "2 semaines",
    year: "2024",
    features: ["Éclairage intelligent", "Volets automatisés", "Thermostat connecté", "Caméras de surveillance"]
  },
  {
    id: 3,
    title: "Éclairage LED commercial - Bureaux Savigny-le-Temple", 
    category: "Éclairage LED",
    description: "Remplacement de l'éclairage traditionnel par des LED dans des bureaux de 500m².",
    duration: "1 semaine",
    year: "2024", 
    features: ["Spots LED encastrés", "Variateurs d'intensité", "Économie 70%", "Maintenance réduite"]
  }
];

export const faqItems = [
  {
    id: 1,
    question: "Intervenez-vous vraiment 24h/24 ?",
    answer: "Oui, nous avons un service d'urgence disponible 24h/24 et 7j/7 pour tous les dépannages électriques urgents. Un technicien peut intervenir dans l'heure qui suit votre appel."
  },
  {
    id: 2,
    question: "Vos devis sont-ils gratuits ?", 
    answer: "Absolument ! Nous proposons des devis gratuits et sans engagement pour tous vos projets. Un technicien se déplace gratuitement pour étudier vos besoins."
  },
  {
    id: 3,
    question: "Êtes-vous assurés et certifiés ?",
    answer: "Oui, nous sommes une entreprise certifiée avec toutes les assurances professionnelles nécessaires. Nos techniciens possèdent les habilitations électriques requises."
  },
  {
    id: 4,
    question: "Quels sont vos délais d'intervention ?",
    answer: "Pour les urgences : intervention dans l'heure. Pour les travaux programmés : nous nous adaptons à votre planning, généralement sous 48h pour les petits travaux."
  },
  {
    id: 5,
    question: "Proposez-vous des contrats de maintenance ?",
    answer: "Oui, nous proposons des contrats de maintenance préventive adaptés à vos besoins, avec vérifications périodiques et tarifs préférentiels."
  }
];

export const serviceAreas = [
  "Moissy-Cramayel",
  "Melun", 
  "Savigny-le-Temple",
  "Lieusaint",
  "Vert-Saint-Denis",
  "Combs-la-Ville",
  "Saint-Germain-lès-Corbeil",
  "Tigery",
  "Évry-Courcouronnes",
  "Corbeil-Essonnes"
];