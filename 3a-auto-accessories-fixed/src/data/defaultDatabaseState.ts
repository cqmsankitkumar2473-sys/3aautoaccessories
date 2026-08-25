import { DatabaseState } from '../types/database';
import { PRODUCTS, CATEGORIES, REVIEWS, GALLERY_ITEMS, FAQS } from './products';

export const INITIAL_DATABASE_STATE: DatabaseState = {
  business: {
    name: '3A Auto Accessories',
    ownerName: 'Ankit Kumar',
    tagline: 'Premium Automotive Styling, High-Tech Electronics & Luxury Upgrades',
    description: 'Founded with a commitment to automotive aesthetics and engineering excellence, 3A Auto Accessories is the trusted destination for car enthusiasts, families, and high-performance drivers seeking uncompromised luxury, safety, and precision fitment.',
    aboutStory: 'Whether you are taking delivery of a brand-new showroom vehicle or refreshing your trusted SUV, our team ensures every stitch, LED beam, and audio frequency is calibrated to perfection with zero factory wire cuts.',
    phone: '+91 99584 73159',
    whatsappNumber: '919958473159',
    email: 'support@3aautoaccessories.com',
    address: '3A Auto Accessories Flagship Studio, Auto Hub Boulevard, Main Ring Road, Sector 18, Commercial Zone',
    city: 'New Delhi',
    state: 'Delhi NCR',
    pincode: '110001',
    googleMapsUrl: 'https://maps.google.com/?q=3A+Auto+Accessories',
    hours: 'Mon - Sun: 9:30 AM - 9:00 PM (All 7 Days Open)',
    logoUrl: '',
    ownerPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    businessPhotoUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    totalReviews: '1,850+ Verified Ratings',
    yearsInBusiness: '15+ Years of Automotive Craftsmanship'
  },
  products: PRODUCTS.map((p, idx) => ({
    ...p,
    isNew: idx < 3,
    customWhatsAppMessage: `Hello 3A Auto Accessories, I am interested in ${p.name}. Please share the best price, vehicle compatibility, and availability.`
  })),
  categories: CATEGORIES.map((c) => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    count: c.count,
    desc: 'desc' in c ? (c as any).desc : 'High performance automotive upgrades'
  })),
  reviews: REVIEWS.map((r) => ({
    id: r.id,
    name: r.name,
    car: r.car,
    rating: r.rating,
    date: r.date,
    verified: r.verified,
    text: r.text,
    itemsPurchased: r.itemsPurchased,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    enabled: true
  })),
  gallery: GALLERY_ITEMS.map((g, idx) => ({
    id: g.id,
    title: g.title,
    category: g.category,
    image: g.image,
    description: g.description,
    order: idx + 1,
    enabled: true
  })),
  faqs: FAQS.map((f, idx) => ({
    id: idx + 1,
    question: f.question,
    answer: f.answer,
    order: idx + 1
  })),
  whyChooseUs: {
    sectionTag: 'About 3A Auto Accessories',
    titleLine1: 'Driven by Passion for',
    titleLine2: 'Automotive Perfection',
    description1: 'Founded with a commitment to automotive aesthetics and engineering excellence, 3A Auto Accessories has become the trusted destination for car enthusiasts, families, and high-performance drivers seeking uncompromised luxury and safety.',
    description2: 'Whether you are taking delivery of a brand-new showroom vehicle or refreshing your trusted SUV, our team ensures every stitch, LED beam, and audio frequency is calibrated to perfection.',
    yearsStat: '15+',
    yearsStatLabel: 'Years of Automotive Tuning',
    vehiclesStat: '10,000+',
    vehiclesStatLabel: 'Vehicles Upgraded & Protected',
    studioTag: 'Flagship Fitting Studio',
    studioDescription: 'Dust-free audio tuning bays, laser alignment stations & bespoke leather stitching studio.',
    workshopImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
    pillars: [
      {
        id: 'pillar-1',
        icon: 'ShieldCheck',
        title: 'Zero Wire Cut Guarantee',
        desc: 'All electronics, infotainment systems, and LED setups use OEM-spec harness couplers to preserve 100% factory car warranty.',
        color: 'emerald'
      },
      {
        id: 'pillar-2',
        icon: 'Award',
        title: 'Aerospace & OEM Quality',
        desc: 'From Italian nappa leather textures to aviation-grade copper cooling LED pipes, every accessory undergoes strict heat & durability trials.',
        color: 'amber'
      },
      {
        id: 'pillar-3',
        icon: 'Wrench',
        title: 'Master Fitment Techs',
        desc: 'Over 15 years of precision automotive craft. We handle flagship luxury SUVs, 4x4s, sedans, and high-end imports with millimeter accuracy.',
        color: 'blue'
      },
      {
        id: 'pillar-4',
        icon: 'Truck',
        title: 'Express Pan-India Shipping',
        desc: 'Secure tracked courier delivery across all Indian pin codes, complete with video installation guides & remote mechanic support.',
        color: 'purple'
      },
      {
        id: 'pillar-5',
        icon: 'RotateCcw',
        title: '1 to 3 Years Direct Warranty',
        desc: 'No endless claims or delay. Direct replacement assurance against LED burnout, leather seam defects, and electronic glitches.',
        color: 'amber'
      },
      {
        id: 'pillar-6',
        icon: 'Headphones',
        title: 'Direct WhatsApp Concierge',
        desc: 'Get fast 1-on-1 advice from experienced automotive modding specialists before and after your purchase.',
        color: 'emerald'
      }
    ]
  },
  hero: {
    badgeText: 'India’s Premier Car Upgrade Studio',
    titlePrefix: 'Elevate Your Drive With',
    titleHighlight: 'Precision Automotive',
    titleSuffix: 'Upgrades & Styling',
    description: 'Transform your vehicle with handcrafted 7D diamond leather mats, 4K Android infotainment, Bi-LED laser projectors, and 64-color symphony ambient lighting. 100% plug & play couplers with zero factory wire cutting.',
    primaryButtonText: 'Explore 2024 Collection',
    primaryButtonAction: '#products',
    secondaryButtonText: 'Vehicle Fitment Finder',
    secondaryButtonAction: '#fitment-finder',
    whatsappButtonText: 'Instant WhatsApp Advice',
    backgroundImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80',
    stat1Value: '10,000+',
    stat1Label: 'Upgraded Vehicles',
    stat2Value: '15+ Years',
    stat2Label: 'Master Tuning Craft',
    stat3Value: '4.9 / 5.0',
    stat3Label: 'Customer Rating'
  },
  socialLinks: {
    instagram: 'https://instagram.com/3aautoaccessories',
    facebook: 'https://facebook.com/3aautoaccessories',
    youtube: 'https://youtube.com/@3aautoaccessories',
    twitter: 'https://twitter.com/3aauto',
    linkedin: 'https://linkedin.com/company/3aautoaccessories',
    whatsapp: 'https://wa.me/919958473159',
    googleMaps: 'https://maps.google.com/?q=3A+Auto+Accessories'
  },
  websiteSettings: {
    websiteTitle: '3A Auto Accessories | Luxury Automotive Styling & Upgrades',
    metaDescription: 'Shop premium 7D car mats, Android 4K infotainment, Bi-LED laser headlights, and 64-color ambient lighting with direct WhatsApp consultation and zero wire-cut installation.',
    keywords: 'car accessories, 7d floor mats, car android system, bi-led headlights, ambient lighting, car ppf, 3a auto accessories, car modification, thar accessories, creta accessories, fortuner accessories',
    faviconUrl: '',
    logoUrl: '',
    defaultEnquiryMessage: 'Hello [BUSINESS_NAME], I am interested in [PRODUCT_NAME]. Please share the price, warranty, and availability for my car.',
    headerNotice: 'Special Offer: Up to 30% Off on Full Makeover Packages + Free Fitting Support',
    enableNoticeBar: true
  },
  adminUsers: [
    {
      id: 'admin-1',
      username: 'cqms_ankit_kumar',
      email: 'cqmsankitkumar2473@gmail.com',
      role: 'owner',
      name: 'Ankit Kumar',
      lastLogin: new Date().toISOString()
    }
  ]
};
