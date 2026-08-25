import React from 'react';
import { 
  Menu, 
  ExternalLink, 
  Sparkles, 
  Save, 
  RefreshCw, 
  CheckCircle2,
  Database,
  Globe,
  Bell
} from 'lucide-react';
import { useAdminData } from '../AdminDataContext';
import { useAdminAuth } from '../AdminAuthContext';
import { AdminTab } from './AdminSidebar';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onToggleMobileMenu: () => void;
  onViewLiveSite: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onToggleMobileMenu,
  onViewLiveSite
}) => {
  const { isSaving, db, fetchAdminData } = useAdminData();
  const { user } = useAdminAuth();

  const tabTitles: Record<AdminTab, { title: string; subtitle: string }> = {
    dashboard: {
      title: 'Dashboard Overview',
      subtitle: 'Real-time performance metrics, inventory stats and website status.'
    },
    business: {
      title: 'Business & Owner Details',
      subtitle: 'Manage business identity, owner name, description, address, and branding.'
    },
    products: {
      title: 'Product Catalog Management',
      subtitle: 'Add, edit, duplicate, and manage accessories, prices, specs & WhatsApp triggers.'
    },
    categories: {
      title: 'Category Management',
      subtitle: 'Organize accessory collections and navigation icons across the store.'
    },
    reviews: {
      title: 'Customer Reviews & Feedback',
      subtitle: 'Manage customer testimonials, car owner verification and public visibility.'
    },
    gallery: {
      title: 'Showroom Transformations Gallery',
      subtitle: 'Upload and organize customer vehicle upgrades, lighting shots, and styling photos.'
    },
    contact: {
      title: 'Contact Details & Social Media',
      subtitle: 'Configure phone, unified WhatsApp number, Google Maps, and social channels.'
    },
    homepage: {
      title: 'Homepage Content Editor',
      subtitle: 'Customize hero headline, banner imagery, Why 3A features, and FAQs live.'
    },
    settings: {
      title: 'Website Settings & Data Backups',
      subtitle: 'Manage SEO meta tags, backup export/import, factory reset, and credentials.'
    }
  };

  const currentMeta = tabTitles[activeTab] || { title: 'Admin Section', subtitle: 'Manage your automotive store.' };

  return (
    <header className="sticky top-0 z-30 bg-[#070D1E]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
      
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white border border-slate-700"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-tight">
            {currentMeta.title}
          </h1>
          <p className="hidden sm:block text-xs text-slate-400">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        
        {/* Real-time saving status indicator */}
        <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-medium">Database Synced</span>
        </div>

        {/* View Live Website Button */}
        <button
          onClick={onViewLiveSite}
          className="flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold transition-all hover:scale-102 cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">View Public Website</span>
          <span className="sm:hidden">Live Site</span>
        </button>

      </div>

    </header>
  );
};
