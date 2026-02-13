// Best Hire Transport - Site Configuration
// Location: UAE

export const SITE_CONFIG = {
  name: "Best Hire",
  fullName: "Best Hire Transport and Gen. Contracting",
  tagline: "Transport & General Contracting",
  slogan: "24 Hours Service",
  description: "Premium construction equipment rental and transport services in UAE. Forklifts, excavators, dozers, wheel loaders and more.",
  logo: "/logo.jpg",           // Full size logo for display
  logoIcon: "/logo.png",       // Small icon version for favicon
  
  // Contact Information
  contact: {
    // Wajid Munir
    phone: "+971543967119",
    phoneDisplay: "054 3967119",
    whatsapp: "+971544712118", // Wajid Munir WhatsApp
    // Kashif Munir
    phone2: "+971503261458",
    phone2Display: "050 3261458",
    email: "besthiretrans@gmail.com",
    address: "Abu Dhabi, U.A.E.",
    workingHours: "24 Hours Service",
  },
  
  
  // Company Stats
  stats: {
    projects: "500+",
    projectsLabel: "Successfully Delivered Projects",
    experience: "16",
    experienceLabel: "Years of Experience",
  },
  
  // Social Media Links
  social: {
    facebook: "https://facebook.com/besthiretransport",
    instagram: "https://instagram.com/besthiretransport",
    linkedin: "https://linkedin.com/company/besthiretransport",
    twitter: "https://twitter.com/besthiretrans",
  },
  
  // Currency
  currency: {
    code: "AED",
    symbol: "AED",
    name: "UAE Dirham",
  },
};

// Admin Configuration
export const ADMIN_CONFIG = {
  // Secret admin ID for accessing admin panel
  // Access via: /admin/{adminId}
  adminId: "besthire-admin-2024-secure-xyz",
};

// Review Categories
export const REVIEW_CATEGORIES = [
  { value: "bad", label: "Bad", color: "red", emoji: "😞" },
  { value: "good", label: "Good", color: "yellow", emoji: "🙂" },
  { value: "very_good", label: "Very Good", color: "blue", emoji: "😊" },
  { value: "excellent", label: "Excellent", color: "green", emoji: "🌟" },
];

// Booking Status Options
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

// USP (Unique Selling Points)
export const USP_ITEMS = [
  {
    title: "Best Equipment",
    description: "Top-quality branded machinery from Caterpillar, Komatsu, Volvo and more",
    icon: "equipment",
  },
  {
    title: "Certified Experience",
    description: "Years of experience with certified operators and technicians",
    icon: "certificate",
  },
  {
    title: "Cost Effective",
    description: "Competitive rates with flexible rental terms to suit your project needs",
    icon: "cost",
  },
  {
    title: "24/7 Service",
    description: "Round-the-clock support with quick delivery across UAE",
    icon: "support",
  },
];

// Navigation Links
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

// Footer Links
export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Reviews", href: "/reviews" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Rental Terms", href: "/rental-terms" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

// WhatsApp Helper
export function getWhatsAppLink(message = "Hello, I'm interested in renting equipment from Best Hire Transport.") {
  const phone = SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Machinery-specific WhatsApp message
export function getMachineryWhatsAppLink(machineryName) {
  const message = `Hi There, I just want a quote about the "${machineryName}"`;
  return getWhatsAppLink(message);
}

// Booking WhatsApp message
export function getBookingWhatsAppLink(machineryName, startDate, endDate) {
  const message = `Hello, I would like to book: ${machineryName}\nFrom: ${startDate}\nTo: ${endDate}\nPlease confirm availability.`;
  return getWhatsAppLink(message);
}
