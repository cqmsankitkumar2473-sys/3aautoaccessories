import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VehicleFitmentFinder } from './components/VehicleFitmentFinder';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteBuilderModal, QuoteItem } from './components/QuoteBuilderModal';
import { ShowroomGallery } from './components/ShowroomGallery';
import { CustomerTestimonials } from './components/CustomerTestimonials';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Product } from './data/products';
import { ContentProvider } from './context/ContentContext';
import { AdminAuthProvider, useAdminAuth } from './admin/AdminAuthContext';
import { AdminDataProvider } from './admin/AdminDataContext';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminLogin } from './admin/AdminLogin';

function MainAppContent() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  
  // Simple path & hash based router
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (hash.startsWith('#admin')) return '/admin' + hash.replace('#admin', '');
    if (path.startsWith('/admin')) return path;
    return '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (hash.startsWith('#admin')) {
        setCurrentPath('/admin' + hash.replace('#admin', ''));
      } else if (path.startsWith('/admin')) {
        setCurrentPath(path);
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quote / Cart State
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [isQuoteBuilderOpen, setIsQuoteBuilderOpen] = useState<boolean>(false);

  // Product Detail Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Add Product to Custom Quote Package
  const handleAddToQuote = (product: Product) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromQuote = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearQuote = () => {
    setQuoteItems([]);
  };

  const isProductInQuote = (productId: string) => {
    return quoteItems.some((item) => item.product.id === productId);
  };

  const handleExploreCatalog = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenFitmentFinder = () => {
    const el = document.getElementById('fitment-finder');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchVehicleAccessories = (modelName: string) => {
    setSearchQuery(modelName);
    setSelectedCategory('all');
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Check if Admin Route
  const isAdminRoute = currentPath.startsWith('/admin');

  if (isAdminRoute) {
    if (isAuthLoading) {
      return (
        <div className="min-h-screen bg-[#040813] flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-amber-400">Verifying secure admin session...</p>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <AdminLogin
          onNavigateToSite={() => navigate('/')}
          onLoginSuccess={() => navigate('/admin')}
        />
      );
    }

    return (
      <AdminDataProvider>
        <AdminDashboard onNavigateToPublicSite={() => navigate('/')} />
      </AdminDataProvider>
    );
  }

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Fixed Luxury Navigation Bar */}
      <Navbar
        quoteCount={quoteItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        onOpenQuoteBuilder={() => setIsQuoteBuilderOpen(true)}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        activeCategory={selectedCategory}
        onOpenAdmin={() => navigate('/admin')}
        isAdminLoggedIn={isAuthenticated}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* High-Octane Automotive Hero Section */}
        <Hero
          onExploreCatalog={handleExploreCatalog}
          onOpenFitmentFinder={handleOpenFitmentFinder}
        />

        {/* Interactive Vehicle Fitment Finder */}
        <VehicleFitmentFinder
          onSearchVehicleAccessories={handleSearchVehicleAccessories}
        />

        {/* Visual Category Showcase */}
        <CategoryShowcase
          onSelectCategory={(catId) => setSelectedCategory(catId)}
          activeCategory={selectedCategory}
        />

        {/* Complete Product Catalog with Search, Filters & WhatsApp Triggers */}
        <ProductCatalog
          onOpenProductDetail={(prod) => setSelectedProduct(prod)}
          onAddToQuote={handleAddToQuote}
          isProductInQuote={isProductInQuote}
          selectedCategory={selectedCategory}
          onCategoryChange={(catId) => setSelectedCategory(catId)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
        />

        {/* Showroom & Master Installation Gallery */}
        <ShowroomGallery />

        {/* Verified Customer Reviews & Review Submission */}
        <CustomerTestimonials />

        {/* Why Choose 3A / Workshop Craftsmanship */}
        <WhyChooseUs />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Contact & WhatsApp Consultation Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer 
        onSelectCategory={(catId) => setSelectedCategory(catId)} 
        onOpenAdmin={() => navigate('/admin')}
        isAdminLoggedIn={isAuthenticated}
      />

      {/* Product Detail Popup Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToQuote={handleAddToQuote}
        isProductInQuote={selectedProduct ? isProductInQuote(selectedProduct.id) : false}
      />

      {/* Interactive Custom Quote Package Drawer */}
      <QuoteBuilderModal
        isOpen={isQuoteBuilderOpen}
        onClose={() => setIsQuoteBuilderOpen(false)}
        items={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromQuote}
        onClearQuote={handleClearQuote}
        onAddQuickProduct={handleAddToQuote}
      />

      {/* Floating WhatsApp Action Button & Interactive Chat Popup */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <ContentProvider>
        <MainAppContent />
      </ContentProvider>
    </AdminAuthProvider>
  );
}

