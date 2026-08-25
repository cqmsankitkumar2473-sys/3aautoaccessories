import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  UserCheck, 
  Package, 
  Tags, 
  Star, 
  Image, 
  PhoneCall, 
  FileEdit, 
  Sliders, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { useAdminData } from '../AdminDataContext';

export type AdminTab = 
  | 'dashboard' 
  | 'business' 
  | 'products' 
  | 'categories' 
  | 'reviews' 
  | 'gallery' 
  | 'contact' 
  | 'homepage' 
  | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onViewLiveSite: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  onViewLiveSite
}) => {
  const { logout, user } = useAdminAuth();
  const { db } = useAdminData();

  const menuItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'business', label: 'Business & Owner Details', icon: <Building2 className="w-5 h-5" /> },
    { id: 'products', label: 'Products', icon: <Package className="w-5 h-5" />, badge: db.products.length },
    { id: 'categories', label: 'Categories', icon: <Tags className="w-5 h-5" />, badge: db.categories.length },
    { id: 'reviews', label: 'Customer Reviews', icon: <Star className="w-5 h-5" />, badge: db.reviews.length },
    { id: 'gallery', label: 'Showroom Gallery', icon: <Image className="w-5 h-5" />, badge: db.gallery.length },
    { id: 'contact', label: 'Contact & Social Links', icon: <PhoneCall className="w-5 h-5" /> },
    { id: 'homepage', label: 'Homepage Content Editor', icon: <FileEdit className="w-5 h-5" /> },
    { id: 'settings', label: 'Website Settings & Backup', icon: <Sliders className="w-5 h-5" /> }
  ];

  const handleSelect = (tab: AdminTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-[#060B18] border-r border-amber-500/20 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-[#070D1E] rounded-[10px] flex items-center justify-center">
                <span className="font-brand font-black text-lg text-gold-gradient">3A</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-extrabold text-white tracking-tight leading-tight flex items-center space-x-1.5">
                <span>{db.business.name || '3A Auto'}</span>
              </div>
              <div className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                Owner Control Panel
              </div>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Owner Badge */}
        <div className="px-5 py-3 bg-[#0A1224] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 text-xs font-bold">
              {db.business.ownerName ? db.business.ownerName.charAt(0) : 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">
                {db.business.ownerName || 'Owner'}
              </div>
              <div className="text-[10px] text-emerald-400 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
                Live Control Mode
              </div>
            </div>
          </div>

          <button
            onClick={onViewLiveSite}
            title="Open Live Public Website"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400/15 text-amber-300 border border-amber-400/40 shadow-md shadow-amber-950/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-amber-500 text-slate-950' : 'bg-white/10 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          
          <button
            onClick={onViewLiveSite}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-2 border border-slate-700 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>View Public Website</span>
          </button>

          <button
            onClick={logout}
            className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center justify-center space-x-2 border border-rose-500/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out of Admin</span>
          </button>

        </div>

      </aside>
    </>
  );
};
