'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Language = 'fr' | 'en' | 'ar';

export interface Translations {
  [key: string]: string | Translations;
}

const translations: Record<Language, Translations> = {
  fr: {
    common: {
      home: 'Accueil',
      products: 'Produits',
      categories: 'Categories',
      about: 'A Propos',
      contact: 'Contact',
      quote: 'Demander un Devis',
      search: 'Rechercher',
      searchPlaceholder: 'Rechercher des produits par nom, SKU ou reference...',
      viewAll: 'Voir Tout',
      learnMore: 'En Savoir Plus',
      requestQuote: 'Demander un Devis',
      contactUs: 'Nous Contacter',
      exploreProducts: 'Explorer les Produits',
      featured: 'En Vedette',
      ourRange: 'Notre Gamme',
      industries: 'Industries',
      whyChooseUs: 'Pourquoi Nous Choisir',
      getStarted: 'Commencer',
      readyToStart: 'Pret a Commencer?',
      contactToday: 'Contactez-nous aujourd\'hui pour un devis personnalise.',
      trustedPartner: 'Votre Partenaire de Confiance',
    },
    hero: {
      badge: 'Fournisseur Leader en Algerie',
      title: 'Acier Inoxydable',
      subtitle: 'Produits Industriels',
      description: 'SARL INO-VAP ZONE fournit des solutions en acier inoxydable de classe mondiale pour les industries alimentaire, boisson, pharmaceutique et chimique en Algerie.',
      premiumStainless: 'Acier Inoxydable Premium',
      industrialProducts: 'Produits Industriels',
    },
    stats: {
      years: 'Annees d\'Experience',
      products: 'Produits',
      categories: 'Categories de Produits',
      satisfiedClients: 'Clients Satisfaits',
    },
    whyChooseUs: {
      premiumQuality: 'Qualite Premium',
      premiumQualityDesc: 'Produits en acier inoxydable AISI 304 et 316 conformes aux normes internationales.',
      expertSupport: 'Support Expert',
      expertSupportDesc: 'Assistance technique et selection de produits par des experts du secteur.',
      fastDelivery: 'Livraison Rapide',
      fastDeliveryDesc: 'Logistique efficace a travers l\'Algerie avec des delais rapides.',
      industrySolutions: 'Solutions Industrielles',
      industrySolutionsDesc: 'Produits specialises pour les industries alimentaire, pharmaceutique, laitier et chimique.',
    },
    industries: {
      foodBeverage: 'Alimentation et Boisson',
      pharmaceutical: 'Pharmaceutique',
      dairyProcessing: 'Industrie Laitiere',
      chemicalIndustry: 'Industrie Chimique',
      waterTreatment: 'Traitement d\'Eau',
      oilGas: 'Petrole et Gaz',
      industriesWeServe: 'Les Industries que Nous Servons',
      industriesDesc: 'Nos produits sont fiables dans divers secteurs industriels necessitant des solutions en acier inoxydable premium.',
    },
    product: {
      specifications: 'Specifications',
      technicalSpecs: 'Specifications Techniques',
      dimensions: 'Dimensions',
      applications: 'Applications',
      material: 'Materiau',
      standard: 'Norme',
      connection: 'Type de Raccord',
      pressureRating: 'Pression Nominale',
      temperatureRange: 'Plage de Temperature',
      surfaceFinish: 'Finition de Surface',
      weight: 'Poids',
      downloads: 'Telechargements',
      datasheet: 'Fiche Technique',
      certificate: 'Certificat',
      cad: 'CAO',
      manual: 'Manuel',
      relatedProducts: 'Produits Associes',
      addToFavorites: 'Ajouter aux Favoris',
      removeFromFavorites: 'Retirer des Favoris',
      compare: 'Comparer',
      share: 'Partager',
      whatsapp: 'WhatsApp',
      email: 'Email',
    },
    filters: {
      category: 'Categorie',
      material: 'Materiau',
      connectionType: 'Type de Raccord',
      standard: 'Norme',
      sortBy: 'Trier par',
      name: 'Nom',
      sku: 'SKU',
      newest: 'Plus Recents',
      price: 'Prix',
      clearAll: 'Tout Effacer',
      noResults: 'Aucun resultat trouve',
      showing: 'Affichage de',
      of: 'sur',
      products: 'produits',
    },
    favorites: {
      title: 'Mes Favoris',
      empty: 'Aucun produit dans vos favoris',
      add: 'Ajoute aux favoris',
      remove: 'Retire des favoris',
      clearAll: 'Tout Supprimer',
    },
    compare: {
      title: 'Comparer les Produits',
      selectProducts: 'Selectionnez des produits a comparer',
      addMore: 'Ajouter d\'autres produits',
      clear: 'Vider la Comparaison',
    },
    contact: {
      sendMessage: 'Envoyer un Message',
      name: 'Nom Complet',
      email: 'Adresse Email',
      phone: 'Numero de Telephone',
      company: 'Entreprise',
      subject: 'Sujet',
      message: 'Message',
      submit: 'Envoyer',
      address: 'Adresse',
      workingHours: 'Heures d\'Ouverture',
    },
    footer: {
      needSolutions: 'Besoin de Solutions Industrielles?',
      solutionsDesc: 'Contactez-nous pour des devis personnalises et un support technique.',
      whatsappQuote: 'Devis WhatsApp',
      quickLinks: 'Liens Rapides',
      productCategories: 'Categories de Produits',
      moreCategories: 'Autres Categories',
      copyright: 'Tous droits reserves.',
    },
    header: {
      stainlessSteelSolutions: 'Solutions en Acier Inoxydable',
      allProducts: 'Tous les Produits',
    },
  },
  en: {
    common: {
      home: 'Home',
      products: 'Products',
      categories: 'Categories',
      about: 'About Us',
      contact: 'Contact',
      quote: 'Request Quote',
      search: 'Search',
      searchPlaceholder: 'Search products by name, SKU, or reference...',
      viewAll: 'View All',
      learnMore: 'Learn More',
      requestQuote: 'Request Quote',
      contactUs: 'Contact Us',
      exploreProducts: 'Explore Products',
      featured: 'Featured',
      ourRange: 'Our Range',
      industries: 'Industries',
      whyChooseUs: 'Why Choose Us',
      getStarted: 'Get Started',
      readyToStart: 'Ready to Get Started?',
      contactToday: 'Contact us today for a custom quote. Our team is ready to help you find the perfect stainless steel solutions for your needs.',
      trustedPartner: 'Your Trusted Partner for Industrial Solutions',
    },
    hero: {
      badge: 'Leading Supplier in Algeria',
      title: 'Premium Stainless Steel',
      subtitle: 'Industrial Products',
      description: 'SARL INO-VAP ZONE delivers world-class stainless steel solutions for food, beverage, pharmaceutical, and chemical industries across Algeria.',
      premiumStainless: 'Premium Stainless Steel',
      industrialProducts: 'Industrial Products',
    },
    stats: {
      years: 'Years of Experience',
      products: 'Products',
      categories: 'Product Categories',
      satisfiedClients: 'Satisfied Clients',
    },
    whyChooseUs: {
      premiumQuality: 'Premium Quality',
      premiumQualityDesc: 'AISI 304 & 316 stainless steel products meeting international standards.',
      expertSupport: 'Expert Support',
      expertSupportDesc: 'Technical guidance and product selection assistance from industry experts.',
      fastDelivery: 'Fast Delivery',
      fastDeliveryDesc: 'Efficient logistics across Algeria with quick turnaround times.',
      industrySolutions: 'Industry Solutions',
      industrySolutionsDesc: 'Specialized products for food, pharma, dairy, and chemical industries.',
    },
    industries: {
      foodBeverage: 'Food & Beverage',
      pharmaceutical: 'Pharmaceutical',
      dairyProcessing: 'Dairy Processing',
      chemicalIndustry: 'Chemical Industry',
      waterTreatment: 'Water Treatment',
      oilGas: 'Oil & Gas',
      industriesWeServe: 'Industries We Serve',
      industriesDesc: 'Our products are trusted across diverse industrial sectors requiring premium stainless steel solutions.',
    },
    product: {
      specifications: 'Specifications',
      technicalSpecs: 'Technical Specifications',
      dimensions: 'Dimensions',
      applications: 'Applications',
      material: 'Material',
      standard: 'Standard',
      connection: 'Connection Type',
      pressureRating: 'Pressure Rating',
      temperatureRange: 'Temperature Range',
      surfaceFinish: 'Surface Finish',
      weight: 'Weight',
      downloads: 'Downloads',
      datasheet: 'Datasheet',
      certificate: 'Certificate',
      cad: 'CAD',
      manual: 'Manual',
      relatedProducts: 'Related Products',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      compare: 'Compare',
      share: 'Share',
      whatsapp: 'WhatsApp',
      email: 'Email',
    },
    filters: {
      category: 'Category',
      material: 'Material',
      connectionType: 'Connection Type',
      standard: 'Standard',
      sortBy: 'Sort By',
      name: 'Name',
      sku: 'SKU',
      newest: 'Newest',
      price: 'Price',
      clearAll: 'Clear All',
      noResults: 'No results found',
      showing: 'Showing',
      of: 'of',
      products: 'products',
    },
    favorites: {
      title: 'My Favorites',
      empty: 'No products in your favorites',
      add: 'Added to favorites',
      remove: 'Removed from favorites',
      clearAll: 'Clear All',
    },
    compare: {
      title: 'Compare Products',
      selectProducts: 'Select products to compare',
      addMore: 'Add more products',
      clear: 'Clear Comparison',
    },
    contact: {
      sendMessage: 'Send a Message',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      company: 'Company',
      subject: 'Subject',
      message: 'Message',
      submit: 'Submit',
      address: 'Address',
      workingHours: 'Working Hours',
    },
    footer: {
      needSolutions: 'Need Industrial Solutions?',
      solutionsDesc: 'Contact us for custom quotes and technical support.',
      whatsappQuote: 'WhatsApp Quote',
      quickLinks: 'Quick Links',
      productCategories: 'Product Categories',
      moreCategories: 'More Categories',
      copyright: 'All rights reserved.',
    },
    header: {
      stainlessSteelSolutions: 'Stainless Steel Solutions',
      allProducts: 'All Products',
    },
  },
  ar: {
    common: {
      home: 'الرئيسية',
      products: 'المنتجات',
      categories: 'الفئات',
      about: 'من نحن',
      contact: 'اتصل بنا',
      quote: 'طلب عرض سعر',
      search: 'بحث',
      searchPlaceholder: 'البحث عن المنتجات بالاسم أو الرقم المرجعي...',
      viewAll: 'عرض الكل',
      learnMore: 'معرفة المزيد',
      requestQuote: 'طلب عرض سعر',
      contactUs: 'اتصل بنا',
      exploreProducts: 'استكشف المنتجات',
      featured: 'المميزة',
      ourRange: 'مجموعتنا',
      industries: 'الصناعات',
      whyChooseUs: 'لماذا تختارنا',
      getStarted: 'ابدأ الآن',
      readyToStart: 'هل أنت مستعد للبدء؟',
      contactToday: 'تواصل معنا اليوم للحصول على عرض أسعار مخصص. فريقنا جاهز لمساعدتك في إيجاد حلول الفولاذ المقاوم للصدأ المثالية.',
      trustedPartner: 'شريكك الموثوق للحلول الصناعية',
    },
    hero: {
      badge: 'المورد الرائد في الجزائر',
      title: 'الفولاذ المقاوم للصدأ',
      subtitle: 'المنتجات الصناعية',
      description: 'شركة سارل إينو-فاب زون توفر حلول فولاذ مقاوم للصدأ عالمية المستوى لصناعات الأغذية والمشروبات والأدوية والكيماويات في الجزائر.',
      premiumStainless: 'الفولاذ المقاوم للصدأ الفاخر',
      industrialProducts: 'المنتجات الصناعية',
    },
    stats: {
      years: 'سنوات من الخبرة',
      products: 'منتج',
      categories: 'فئات المنتجات',
      satisfiedClients: 'عملاء راضون',
    },
    whyChooseUs: {
      premiumQuality: 'جودة عالية',
      premiumQualityDesc: 'منتجات من الفولاذ المقاوم للصدأ AISI 304 و 316 تلبي المعايير الدولية.',
      expertSupport: 'دعم متخصص',
      expertSupportDesc: 'إرشادات فنية ومساعدة في اختيار المنتجات من خبراء الصناعة.',
      fastDelivery: 'توصيل سريع',
      fastDeliveryDesc: 'خدمات لوجستية فعالة عبر الجزائر مع أوقات استجابة سريعة.',
      industrySolutions: 'حلول صناعية',
      industrySolutionsDesc: 'منتجات متخصصة لصناعات الأغذية والأدوية والألبان والكيماويات.',
    },
    industries: {
      foodBeverage: 'الأغذية والمشروبات',
      pharmaceutical: 'الأدوية',
      dairyProcessing: 'منتجات الألبان',
      chemicalIndustry: 'الصناعة الكيميائية',
      waterTreatment: 'معالجة المياه',
      oilGas: 'النفط والغاز',
      industriesWeServe: 'الصناعات التي نخدمها',
      industriesDesc: 'منتجاتنا موثوقة عبر قطاعات صناعية متنوعة تتطلب حلول فولاذ مقاوم للصدأ عالية الجودة.',
    },
    product: {
      specifications: 'المواصفات',
      technicalSpecs: 'المواصفات الفنية',
      dimensions: 'الأبعاد',
      applications: 'التطبيقات',
      material: 'المادة',
      standard: 'المعيار',
      connection: 'نوع التوصيل',
      pressureRating: 'تصنيف الضغط',
      temperatureRange: 'نطاق درجة الحرارة',
      surfaceFinish: 'التشطيب السطحي',
      weight: 'الوزن',
      downloads: 'التحميلات',
      datasheet: 'ورقة البيانات',
      certificate: 'الشهادة',
      cad: 'CAD',
      manual: 'الدليل',
      relatedProducts: 'منتجات ذات صلة',
      addToFavorites: 'إضافة إلى المفضلة',
      removeFromFavorites: 'إزالة من المفضلة',
      compare: 'مقارنة',
      share: 'مشاركة',
      whatsapp: 'واتساب',
      email: 'البريد الإلكتروني',
    },
    filters: {
      category: 'الفئة',
      material: 'المادة',
      connectionType: 'نوع التوصيل',
      standard: 'المعيار',
      sortBy: 'ترتيب حسب',
      name: 'الاسم',
      sku: 'SKU',
      newest: 'الأحدث',
      price: 'السعر',
      clearAll: 'مسح الكل',
      noResults: 'لم يتم العثور على نتائج',
      showing: 'عرض',
      of: 'من',
      products: 'منتج',
    },
    favorites: {
      title: 'المفضلة',
      empty: 'لا توجد منتجات في المفضلة',
      add: 'تمت الإضافة إلى المفضلة',
      remove: 'تمت الإزالة من المفضلة',
      clearAll: 'مسح الكل',
    },
    compare: {
      title: 'مقارنة المنتجات',
      selectProducts: 'اختر المنتجات للمقارنة',
      addMore: 'أضف المزيد من المنتجات',
      clear: 'مسح المقارنة',
    },
    contact: {
      sendMessage: 'إرسال رسالة',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      company: 'الشركة',
      subject: 'الموضوع',
      message: 'الرسالة',
      submit: 'إرسال',
      address: 'العنوان',
      workingHours: 'ساعات العمل',
    },
    footer: {
      needSolutions: 'هل تحتاج حلولاً صناعية؟',
      solutionsDesc: 'تواصل معنا للحصول على عروض أسعار مخصصة ودعم فني.',
      whatsappQuote: 'طلب عبر واتساب',
      quickLinks: 'روابط سريعة',
      productCategories: 'فئات المنتجات',
      moreCategories: 'فئات أخرى',
      copyright: 'جميع الحقوق محفوظة.',
    },
    header: {
      stainlessSteelSolutions: 'حلول الفولاذ المقاوم للصدأ',
      allProducts: 'جميع المنتجات',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['fr', 'en', 'ar'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }, [language]);

  const isRTL = language === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];
