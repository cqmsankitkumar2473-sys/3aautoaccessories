import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  DatabaseState, 
  BusinessDetails, 
  ProductItem, 
  CategoryItem, 
  CustomerReviewItem, 
  GalleryItem, 
  FaqItem, 
  WhyChooseUsContent, 
  HeroContent, 
  SocialLinks, 
  WebsiteSettings 
} from '../types/database';
import { INITIAL_DATABASE_STATE } from '../data/defaultDatabaseState';

interface ContentContextType {
  data: DatabaseState;
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
  isLoading: boolean;
  error: string | null;
  refetchContent: () => Promise<void>;
  updateLocalContent: (newData: Partial<DatabaseState>) => void;
  getWhatsAppUrl: (message?: string) => string;
  getProductWhatsAppUrl: (product: ProductItem, userCar?: string) => string;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DatabaseState>(INITIAL_DATABASE_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/public/data');
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      const json = await res.json();
      if (json && json.data) {
        setData(prev => ({ ...prev, ...json.data }));
      }
    } catch (err: any) {
      console.warn('Using default seed data as fallback:', err);
      // fallback to initial default
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const updateLocalContent = useCallback((newData: Partial<DatabaseState>) => {
    setData(prev => ({ ...prev, ...newData }));
  }, []);

  const getWhatsAppUrl = useCallback((message?: string) => {
    const rawNumber = (data.business.whatsappNumber || '919876543210').replace(/\D/g, '');
    const cleanNumber = rawNumber.startsWith('91') || rawNumber.length > 10 ? rawNumber : `91${rawNumber}`;
    const defaultMsg = message || `Hello ${data.business.name}! I am visiting your website and would like to inquire about accessories for my vehicle.`;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultMsg)}`;
  }, [data.business]);

  const getProductWhatsAppUrl = useCallback((product: ProductItem, userCar?: string) => {
    const rawNumber = (data.business.whatsappNumber || '919876543210').replace(/\D/g, '');
    const cleanNumber = rawNumber.startsWith('91') || rawNumber.length > 10 ? rawNumber : `91${rawNumber}`;
    
    let msg = product.customWhatsAppMessage || data.websiteSettings.defaultEnquiryMessage || 
      'Hello [BUSINESS_NAME], I am interested in [PRODUCT_NAME] (Price: ₹[PRICE]). Please share compatibility, warranty and fitting details.';
    
    msg = msg
      .replace(/\[BUSINESS_NAME\]/g, data.business.name)
      .replace(/\[PRODUCT_NAME\]/g, product.name)
      .replace(/\[PRICE\]/g, product.price.toLocaleString('en-IN'))
      .replace(/\[ID\]/g, product.id);

    if (userCar && userCar.trim()) {
      msg += `\n🚘 Vehicle: ${userCar.trim()}`;
    }

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
  }, [data.business, data.websiteSettings]);

  return (
    <ContentContext.Provider
      value={{
        data,
        business: data.business,
        products: data.products,
        categories: data.categories,
        reviews: data.reviews,
        gallery: data.gallery,
        faqs: data.faqs,
        whyChooseUs: data.whyChooseUs,
        hero: data.hero,
        socialLinks: data.socialLinks,
        websiteSettings: data.websiteSettings,
        isLoading,
        error,
        refetchContent: fetchContent,
        updateLocalContent,
        getWhatsAppUrl,
        getProductWhatsAppUrl
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
