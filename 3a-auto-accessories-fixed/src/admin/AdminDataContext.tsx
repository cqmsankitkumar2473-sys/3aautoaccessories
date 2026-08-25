import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { DatabaseState, ProductItem, CategoryItem, CustomerReviewItem, GalleryItem, FaqItem, BusinessDetails, WhyChooseUsContent, HeroContent, SocialLinks, WebsiteSettings } from '../types/database';
import { INITIAL_DATABASE_STATE } from '../data/defaultDatabaseState';
import { useAdminAuth } from './AdminAuthContext';
import { useContent } from '../context/ContentContext';

interface ToastInfo {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AdminDataContextType {
  db: DatabaseState;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
  fetchAdminData: () => Promise<void>;
  
  // High-level updates
  saveFullDatabase: (newDb: DatabaseState) => Promise<boolean>;
  saveBusinessDetails: (business: BusinessDetails) => Promise<boolean>;
  saveWebsiteSettings: (settings: WebsiteSettings) => Promise<boolean>;
  saveSocialLinks: (links: SocialLinks) => Promise<boolean>;
  saveHeroContent: (hero: HeroContent) => Promise<boolean>;
  saveWhyChooseUs: (whyChooseUs: WhyChooseUsContent) => Promise<boolean>;

  // Products CRUD
  addProduct: (product: Omit<ProductItem, 'id'> & { id?: string }) => Promise<boolean>;
  updateProduct: (id: string, product: Partial<ProductItem>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  duplicateProduct: (id: string) => Promise<boolean>;

  // Categories CRUD
  addCategory: (category: CategoryItem) => Promise<boolean>;
  updateCategory: (id: string, category: Partial<CategoryItem>) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;

  // Reviews CRUD
  addReview: (review: Omit<CustomerReviewItem, 'id'>) => Promise<boolean>;
  updateReview: (id: string | number, review: Partial<CustomerReviewItem>) => Promise<boolean>;
  deleteReview: (id: string | number) => Promise<boolean>;
  toggleReviewVisibility: (id: string | number) => Promise<boolean>;

  // Gallery CRUD
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<boolean>;
  updateGalleryItem: (id: string | number, item: Partial<GalleryItem>) => Promise<boolean>;
  deleteGalleryItem: (id: string | number) => Promise<boolean>;
  toggleGalleryVisibility: (id: string | number) => Promise<boolean>;
  reorderGallery: (startIndex: number, endIndex: number) => Promise<boolean>;

  // FAQs CRUD
  addFaq: (faq: Omit<FaqItem, 'id'>) => Promise<boolean>;
  updateFaq: (id: string | number, faq: Partial<FaqItem>) => Promise<boolean>;
  deleteFaq: (id: string | number) => Promise<boolean>;

  // Utilities & Backups
  uploadImage: (dataUrl: string, filename?: string) => Promise<{ success: boolean; url?: string; error?: string }>;
  resetToDefaults: () => Promise<boolean>;
  exportBackupJson: () => void;
  importBackupJson: (file: File) => Promise<boolean>;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token, isAuthenticated } = useAdminAuth();
  const { updateLocalContent, refetchContent } = useContent();

  const [db, setDb] = useState<DatabaseState>(INITIAL_DATABASE_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const fetchAdminData = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/admin/data', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setDb(json.data);
          updateLocalContent(json.data);
        }
      } else {
        throw new Error('Failed to load admin data');
      }
    } catch (err: any) {
      setError(err.message);
      showToast('Error loading administrative data from server', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [token, updateLocalContent, showToast]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated, fetchAdminData]);

  // Direct persistence helper
  const persistToServer = async (newDb: DatabaseState, successMessage?: string): Promise<boolean> => {
    if (!token) {
      showToast('Not authenticated. Please log in.', 'error');
      return false;
    }
    try {
      setIsSaving(true);
      const res = await fetch('/api/admin/data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newDb)
      });
      if (res.ok) {
        setDb(newDb);
        updateLocalContent(newDb);
        await refetchContent();
        if (successMessage) {
          showToast(successMessage, 'success');
        }
        return true;
      } else {
        const json = await res.json();
        throw new Error(json.error || 'Save failed');
      }
    } catch (err: any) {
      showToast(err.message || 'Error saving changes to database', 'error');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const saveFullDatabase = async (newDb: DatabaseState): Promise<boolean> => {
    return persistToServer(newDb, 'Website database saved successfully!');
  };

  const saveBusinessDetails = async (business: BusinessDetails): Promise<boolean> => {
    const updated = { ...db, business };
    return persistToServer(updated, 'Business & Owner information updated!');
  };

  const saveWebsiteSettings = async (websiteSettings: WebsiteSettings): Promise<boolean> => {
    const updated = { ...db, websiteSettings };
    return persistToServer(updated, 'Website settings & SEO updated!');
  };

  const saveSocialLinks = async (socialLinks: SocialLinks): Promise<boolean> => {
    const updated = { ...db, socialLinks };
    return persistToServer(updated, 'Social links & contact handles updated!');
  };

  const saveHeroContent = async (hero: HeroContent): Promise<boolean> => {
    const updated = { ...db, hero };
    return persistToServer(updated, 'Homepage Hero banner updated!');
  };

  const saveWhyChooseUs = async (whyChooseUs: WhyChooseUsContent): Promise<boolean> => {
    const updated = { ...db, whyChooseUs };
    return persistToServer(updated, 'About 3A & Why Choose Us updated!');
  };

  // Products CRUD
  const addProduct = async (productData: Omit<ProductItem, 'id'> & { id?: string }): Promise<boolean> => {
    const id = productData.id || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.floor(Math.random() * 1000);
    const newProduct: ProductItem = {
      ...productData,
      id,
      rating: productData.rating || 5.0,
      reviewCount: productData.reviewCount || 1,
      secondaryImages: productData.secondaryImages || [],
      specs: productData.specs || [],
      inStock: productData.inStock !== false
    };
    const updated = {
      ...db,
      products: [newProduct, ...db.products]
    };
    return persistToServer(updated, `Product "${newProduct.name}" added successfully!`);
  };

  const updateProduct = async (id: string, productUpdate: Partial<ProductItem>): Promise<boolean> => {
    const updatedProducts = db.products.map(p => (p.id === id ? { ...p, ...productUpdate } : p));
    const updated = { ...db, products: updatedProducts };
    return persistToServer(updated, 'Product details updated!');
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    const itemToDelete = db.products.find(p => p.id === id);
    const updatedProducts = db.products.filter(p => p.id !== id);
    const updated = { ...db, products: updatedProducts };
    return persistToServer(updated, `Product "${itemToDelete?.name || id}" deleted.`);
  };

  const duplicateProduct = async (id: string): Promise<boolean> => {
    const original = db.products.find(p => p.id === id);
    if (!original) return false;
    const duplicated: ProductItem = {
      ...original,
      id: `${original.id}-copy-${Date.now().toString().slice(-4)}`,
      name: `${original.name} (Copy)`
    };
    const updated = {
      ...db,
      products: [duplicated, ...db.products]
    };
    return persistToServer(updated, `Duplicated "${original.name}"`);
  };

  // Categories CRUD
  const addCategory = async (category: CategoryItem): Promise<boolean> => {
    if (db.categories.some(c => c.id === category.id)) {
      showToast(`Category with ID "${category.id}" already exists`, 'error');
      return false;
    }
    const updated = {
      ...db,
      categories: [...db.categories, category]
    };
    return persistToServer(updated, `Category "${category.name}" added!`);
  };

  const updateCategory = async (id: string, categoryUpdate: Partial<CategoryItem>): Promise<boolean> => {
    const updatedCategories = db.categories.map(c => (c.id === id ? { ...c, ...categoryUpdate } : c));
    const updated = { ...db, categories: updatedCategories };
    return persistToServer(updated, 'Category updated!');
  };

  const deleteCategory = async (id: string): Promise<boolean> => {
    if (id === 'all') {
      showToast('Cannot delete system category "All Accessories"', 'error');
      return false;
    }
    const updatedCategories = db.categories.filter(c => c.id !== id);
    const updated = { ...db, categories: updatedCategories };
    return persistToServer(updated, 'Category removed.');
  };

  // Reviews CRUD
  const addReview = async (reviewData: Omit<CustomerReviewItem, 'id'>): Promise<boolean> => {
    const newReview: CustomerReviewItem = {
      ...reviewData,
      id: Date.now(),
      date: reviewData.date || 'Just now',
      verified: reviewData.verified !== false,
      enabled: reviewData.enabled !== false
    };
    const updated = {
      ...db,
      reviews: [newReview, ...db.reviews]
    };
    return persistToServer(updated, 'Customer review added!');
  };

  const updateReview = async (id: string | number, reviewUpdate: Partial<CustomerReviewItem>): Promise<boolean> => {
    const updatedReviews = db.reviews.map(r => (String(r.id) === String(id) ? { ...r, ...reviewUpdate } : r));
    const updated = { ...db, reviews: updatedReviews };
    return persistToServer(updated, 'Review updated!');
  };

  const deleteReview = async (id: string | number): Promise<boolean> => {
    const updatedReviews = db.reviews.filter(r => String(r.id) !== String(id));
    const updated = { ...db, reviews: updatedReviews };
    return persistToServer(updated, 'Review removed.');
  };

  const toggleReviewVisibility = async (id: string | number): Promise<boolean> => {
    const review = db.reviews.find(r => String(r.id) === String(id));
    if (!review) return false;
    const newStatus = !review.enabled;
    const updatedReviews = db.reviews.map(r => (String(r.id) === String(id) ? { ...r, enabled: newStatus } : r));
    const updated = { ...db, reviews: updatedReviews };
    return persistToServer(updated, `Review is now ${newStatus ? 'visible publicly' : 'hidden'}.`);
  };

  // Gallery CRUD
  const addGalleryItem = async (itemData: Omit<GalleryItem, 'id'>): Promise<boolean> => {
    const newItem: GalleryItem = {
      ...itemData,
      id: Date.now(),
      order: (db.gallery.length || 0) + 1,
      enabled: itemData.enabled !== false
    };
    const updated = {
      ...db,
      gallery: [...db.gallery, newItem]
    };
    return persistToServer(updated, 'Showroom transformation added!');
  };

  const updateGalleryItem = async (id: string | number, itemUpdate: Partial<GalleryItem>): Promise<boolean> => {
    const updatedGallery = db.gallery.map(g => (String(g.id) === String(id) ? { ...g, ...itemUpdate } : g));
    const updated = { ...db, gallery: updatedGallery };
    return persistToServer(updated, 'Gallery item updated!');
  };

  const deleteGalleryItem = async (id: string | number): Promise<boolean> => {
    const updatedGallery = db.gallery.filter(g => String(g.id) !== String(id));
    const updated = { ...db, gallery: updatedGallery };
    return persistToServer(updated, 'Gallery item removed.');
  };

  const toggleGalleryVisibility = async (id: string | number): Promise<boolean> => {
    const item = db.gallery.find(g => String(g.id) === String(id));
    if (!item) return false;
    const newStatus = !item.enabled;
    const updatedGallery = db.gallery.map(g => (String(g.id) === String(id) ? { ...g, enabled: newStatus } : g));
    const updated = { ...db, gallery: updatedGallery };
    return persistToServer(updated, `Gallery item is now ${newStatus ? 'visible' : 'hidden'}.`);
  };

  const reorderGallery = async (startIndex: number, endIndex: number): Promise<boolean> => {
    const list: GalleryItem[] = [...db.gallery];
    if (startIndex < 0 || startIndex >= list.length || endIndex < 0 || endIndex >= list.length) return false;
    const removedItem = list[startIndex];
    list.splice(startIndex, 1);
    list.splice(endIndex, 0, removedItem);
    const reordered: GalleryItem[] = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    const updated = { ...db, gallery: reordered };
    return persistToServer(updated, 'Gallery display order updated.');
  };

  // FAQs CRUD
  const addFaq = async (faqData: Omit<FaqItem, 'id'>): Promise<boolean> => {
    const newFaq: FaqItem = {
      ...faqData,
      id: Date.now(),
      order: (db.faqs.length || 0) + 1
    };
    const updated = {
      ...db,
      faqs: [...db.faqs, newFaq]
    };
    return persistToServer(updated, 'FAQ added!');
  };

  const updateFaq = async (id: string | number, faqUpdate: Partial<FaqItem>): Promise<boolean> => {
    const updatedFaqs = db.faqs.map(f => (String(f.id) === String(id) ? { ...f, ...faqUpdate } : f));
    const updated = { ...db, faqs: updatedFaqs };
    return persistToServer(updated, 'FAQ updated!');
  };

  const deleteFaq = async (id: string | number): Promise<boolean> => {
    const updatedFaqs = db.faqs.filter(f => String(f.id) !== String(id));
    const updated = { ...db, faqs: updatedFaqs };
    return persistToServer(updated, 'FAQ deleted.');
  };

  // Utilities
  const uploadImage = async (dataUrl: string, filename?: string): Promise<{ success: boolean; url?: string; error?: string }> => {
    if (!token) return { success: false, error: 'Not authenticated' };
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ dataUrl, filename })
      });
      const data = await res.json();
      if (res.ok && data.url) {
        showToast('Image uploaded successfully!', 'success');
        return { success: true, url: data.url };
      }
      return { success: false, error: data.error || 'Upload failed' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Image upload error' };
    }
  };

  const resetToDefaults = async (): Promise<boolean> => {
    if (!token) return false;
    try {
      setIsSaving(true);
      const res = await fetch('/api/admin/reset', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setDb(json.data || INITIAL_DATABASE_STATE);
        updateLocalContent(json.data || INITIAL_DATABASE_STATE);
        await refetchContent();
        showToast('Website database reset to factory defaults!', 'info');
        return true;
      }
      return false;
    } catch (err: any) {
      showToast(err.message || 'Reset failed', 'error');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const exportBackupJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(db, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    const dateStr = new Date().toISOString().split('T')[0];
    const safeName = (db.business.name || '3A_Auto').replace(/[^a-zA-Z0-9]/g, '_');
    downloadAnchor.setAttribute('download', `${safeName}_backup_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Database backup JSON exported!', 'success');
  };

  const importBackupJson = async (file: File): Promise<boolean> => {
    if (!token) return false;
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          const parsed = JSON.parse(content);
          if (!parsed.business || !parsed.products) {
            showToast('Invalid backup file: Missing required schema', 'error');
            resolve(false);
            return;
          }
          const res = await fetch('/api/admin/import', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(parsed)
          });
          if (res.ok) {
            const json = await res.json();
            setDb(json.data);
            updateLocalContent(json.data);
            await refetchContent();
            showToast('Backup JSON successfully restored to live website!', 'success');
            resolve(true);
          } else {
            const errJson = await res.json();
            showToast(errJson.error || 'Import failed', 'error');
            resolve(false);
          }
        } catch (err) {
          showToast('Failed to parse backup JSON file', 'error');
          resolve(false);
        }
      };
      reader.readAsText(file);
    });
  };

  return (
    <AdminDataContext.Provider
      value={{
        db,
        isLoading,
        isSaving,
        error,
        toasts,
        showToast,
        dismissToast,
        fetchAdminData,
        saveFullDatabase,
        saveBusinessDetails,
        saveWebsiteSettings,
        saveSocialLinks,
        saveHeroContent,
        saveWhyChooseUs,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addReview,
        updateReview,
        deleteReview,
        toggleReviewVisibility,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        toggleGalleryVisibility,
        reorderGallery,
        addFaq,
        updateFaq,
        deleteFaq,
        uploadImage,
        resetToDefaults,
        exportBackupJson,
        importBackupJson
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = (): AdminDataContextType => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
