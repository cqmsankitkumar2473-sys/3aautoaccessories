import React, { useState } from 'react';
import { AdminSidebar, AdminTab } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { ToastContainer } from './components/ToastContainer';
import { DashboardOverview } from './views/DashboardOverview';
import { BusinessDetailsView } from './views/BusinessDetailsView';
import { ProductsManagementView } from './views/ProductsManagementView';
import { CategoriesView } from './views/CategoriesView';
import { ReviewsManagementView } from './views/ReviewsManagementView';
import { GalleryManagementView } from './views/GalleryManagementView';
import { ContactSocialView } from './views/ContactSocialView';
import { HomepageEditorView } from './views/HomepageEditorView';
import { WebsiteSettingsView } from './views/WebsiteSettingsView';
import { useAdminData } from './AdminDataContext';

interface AdminDashboardProps {
  onNavigateToPublicSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateToPublicSite }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoading } = useAdminData();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardOverview
            onNavigate={(tab) => setActiveTab(tab)}
            onViewLiveSite={onNavigateToPublicSite}
          />
        );
      case 'business':
        return <BusinessDetailsView />;
      case 'products':
        return <ProductsManagementView />;
      case 'categories':
        return <CategoriesView />;
      case 'reviews':
        return <ReviewsManagementView />;
      case 'gallery':
        return <GalleryManagementView />;
      case 'contact':
        return <ContactSocialView />;
      case 'homepage':
        return <HomepageEditorView />;
      case 'settings':
        return <WebsiteSettingsView />;
      default:
        return <DashboardOverview onNavigate={(t) => setActiveTab(t)} onViewLiveSite={onNavigateToPublicSite} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#040813] text-slate-100 flex flex-col antialiased">
      
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onViewLiveSite={onNavigateToPublicSite}
      />

      {/* Main Content Area (offset by sidebar width on desktop) */}
      <div className="lg:pl-72 flex flex-col flex-1 min-w-0">
        
        {/* Header Bar */}
        <AdminHeader
          activeTab={activeTab}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onViewLiveSite={onNavigateToPublicSite}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="w-10 h-10 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-semibold text-slate-400">Loading database records...</p>
            </div>
          ) : (
            renderActiveView()
          )}
        </main>

      </div>

      {/* Global Admin Toast Notifications */}
      <ToastContainer />

    </div>
  );
};
