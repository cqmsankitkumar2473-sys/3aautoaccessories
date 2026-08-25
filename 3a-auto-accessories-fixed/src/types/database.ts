export interface BusinessDetails {
  name: string;
  ownerName: string;
  tagline: string;
  description: string;
  aboutStory: string;
  phone: string;
  whatsappNumber: string; // digits only e.g. 919876543210
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  googleMapsUrl: string;
  hours: string;
  logoUrl?: string;
  ownerPhotoUrl?: string;
  businessPhotoUrl?: string;
  rating: number;
  totalReviews: string;
  yearsInBusiness: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  tag?: string;
  image: string;
  secondaryImages: string[];
  compatibility: string;
  specs: string[];
  description: string;
  warranty: string;
  installationTime: string;
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
  customWhatsAppMessage?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  count?: number;
  desc?: string;
  image?: string;
}

export interface CustomerReviewItem {
  id: string | number;
  name: string;
  car: string;
  rating: number;
  date: string;
  verified: boolean;
  text: string;
  itemsPurchased?: string[];
  avatar?: string;
  enabled: boolean;
}

export interface GalleryItem {
  id: string | number;
  title: string;
  category: string;
  image: string;
  description: string;
  order?: number;
  enabled: boolean;
}

export interface FaqItem {
  id?: string | number;
  question: string;
  answer: string;
  order?: number;
}

export interface WhyChooseUsPillar {
  id: string;
  icon: string;
  title: string;
  desc: string;
  color?: string;
}

export interface WhyChooseUsContent {
  sectionTag: string;
  titleLine1: string;
  titleLine2: string;
  description1: string;
  description2: string;
  yearsStat: string;
  yearsStatLabel: string;
  vehiclesStat: string;
  vehiclesStatLabel: string;
  studioTag: string;
  studioDescription: string;
  workshopImage: string;
  pillars: WhyChooseUsPillar[];
}

export interface HeroContent {
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  primaryButtonText: string;
  primaryButtonAction: string;
  secondaryButtonText: string;
  secondaryButtonAction: string;
  whatsappButtonText: string;
  backgroundImage: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  youtube: string;
  twitter?: string;
  linkedin?: string;
  whatsapp: string;
  googleMaps: string;
}

export interface WebsiteSettings {
  websiteTitle: string;
  metaDescription: string;
  keywords: string;
  faviconUrl?: string;
  logoUrl?: string;
  defaultEnquiryMessage: string;
  headerNotice: string;
  enableNoticeBar: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'owner' | 'admin';
  name: string;
  lastLogin?: string;
}

export interface DatabaseState {
  business: BusinessDetails;
  products: ProductItem[];
  categories: CategoryItem[];
  reviews: CustomerReviewItem[];
  gallery: GalleryItem[];
  faqs: FaqItem[];
  whyChooseUs: WhyChooseUsContent;
  hero: HeroContent;
  socialLinks: SocialLinks;
  websiteSettings: WebsiteSettings;
  adminUsers: AdminUser[];
}
