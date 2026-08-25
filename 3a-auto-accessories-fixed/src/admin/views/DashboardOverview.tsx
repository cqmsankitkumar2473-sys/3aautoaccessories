import React from 'react';
import { 
  Package, 
  Tags, 
  Star, 
  Image, 
  Building2, 
  Phone, 
  MessageSquare, 
  ExternalLink, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  PlusCircle
} from 'lucide-react';
import { useAdminData } from '../AdminDataContext';
import { AdminTab } from '../components/AdminSidebar';

interface DashboardOverviewProps {
  onNavigate: (tab: AdminTab) => void;
  onViewLiveSite: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate, onViewLiveSite }) => {
  const { db } = useAdminData();

  const totalProducts = db.products.length;
  const inStockProducts = db.products.filter(p => p.inStock !== false).length;
  const totalCategories = db.categories.length;
  const activeReviews = db.reviews.filter(r => r.enabled !== false).length;
  const activeGallery = db.gallery.filter(g => g.enabled !== false).length;

  const stats = [
    {
      label: 'Total Products',
      value: totalProducts,
      sub: `${inStockProducts} In-Stock & Ready`,
      icon: <Package className="w-6 h-6 text-amber-400" />,
      color: 'border-amber-500/30 bg-amber-500/5',
      action: () => onNavigate('products')
    },
    {
      label: 'Accessory Categories',
      value: totalCategories,
      sub: 'Dynamic Navigation Trees',
      icon: <Tags className="w-6 h-6 text-blue-400" />,
      color: 'border-blue-500/30 bg-blue-500/5',
      action: () => onNavigate('categories')
    },
    {
      label: 'Public Reviews',
      value: `${activeReviews} / ${db.reviews.length}`,
      sub: `${db.business.rating}★ Store Average`,
      icon: <Star className="w-6 h-6 text-emerald-400" />,
      color: 'border-emerald-500/30 bg-emerald-500/5',
      action: () => onNavigate('reviews')
    },
    {
      label: 'Showroom Gallery',
      value: activeGallery,
      sub: 'High-Res Transformations',
      icon: <Image className="w-6 h-6 text-purple-400" />,
      color: 'border-purple-500/30 bg-purple-500/5',
      action: () => onNavigate('gallery')
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0C172E] via-[#0A1326] to-[#070D1E] border border-amber-500/30 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Owner Control Active</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome, <span className="text-gold-gradient">{db.business.ownerName || 'Ankit Kumar'}</span>!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every detail you customize here immediately syncs with your live public website. No coding required to update products, pricing, owner branding, photos, or WhatsApp templates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('products')}
              className="px-4 py-2.5 rounded-xl bg-gold-gradient text-slate-950 text-xs font-bold flex items-center space-x-2 shadow-lg shadow-amber-500/20 hover:scale-102 transition-transform cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
            <button
              onClick={onViewLiveSite}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold flex items-center space-x-2 border border-slate-700 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-amber-400" />
              <span>Live Site Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            onClick={stat.action}
            className={`rounded-2xl p-5 border ${stat.color} hover:border-amber-400/50 transition-all cursor-pointer group shadow-lg flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.label}</span>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
              <div className="text-[11px] text-slate-400 mt-1">{stat.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Business Status & Live Quick Checks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Business Identity & WhatsApp Channel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>Live Business Configuration</span>
              </h3>
              <button
                onClick={() => onNavigate('business')}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                Edit Details →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <div className="text-slate-400 text-[11px] font-bold uppercase">Store / Brand Name</div>
                <div className="font-extrabold text-white text-sm">{db.business.name}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <div className="text-slate-400 text-[11px] font-bold uppercase">Owner Name</div>
                <div className="font-extrabold text-amber-400 text-sm">{db.business.ownerName || 'Not Set'}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <div className="text-slate-400 text-[11px] font-bold uppercase">Primary Phone</div>
                <div className="font-semibold text-white">{db.business.phone}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <div className="text-slate-400 text-[11px] font-bold uppercase">Master WhatsApp Line</div>
                <div className="font-semibold text-emerald-400">+{db.business.whatsappNumber}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1 text-xs">
              <div className="text-slate-400 text-[11px] font-bold uppercase">Store Address</div>
              <div className="text-slate-200">{db.business.address}</div>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Hub & Shortcuts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Owner Shortcuts</span>
            </h3>

            <div className="space-y-2.5">
              <button
                onClick={() => onNavigate('business')}
                className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-left border border-white/5 hover:border-amber-400/30 flex items-center justify-between text-xs font-bold text-slate-200 transition-all cursor-pointer"
              >
                <span>Change Owner Name or Tagline</span>
                <span className="text-amber-400">Edit</span>
              </button>

              <button
                onClick={() => onNavigate('products')}
                className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-left border border-white/5 hover:border-amber-400/30 flex items-center justify-between text-xs font-bold text-slate-200 transition-all cursor-pointer"
              >
                <span>Update Prices & Discounts</span>
                <span className="text-amber-400">Edit</span>
              </button>

              <button
                onClick={() => onNavigate('homepage')}
                className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-left border border-white/5 hover:border-amber-400/30 flex items-center justify-between text-xs font-bold text-slate-200 transition-all cursor-pointer"
              >
                <span>Edit Hero Headline & Why 3A</span>
                <span className="text-amber-400">Edit</span>
              </button>

              <button
                onClick={() => onNavigate('reviews')}
                className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-left border border-white/5 hover:border-amber-400/30 flex items-center justify-between text-xs font-bold text-slate-200 transition-all cursor-pointer"
              >
                <span>Approve / Hide Customer Reviews</span>
                <span className="text-amber-400">Manage</span>
              </button>

              <button
                onClick={() => onNavigate('settings')}
                className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-left border border-white/5 hover:border-amber-400/30 flex items-center justify-between text-xs font-bold text-slate-200 transition-all cursor-pointer"
              >
                <span>Download Complete JSON Backup</span>
                <span className="text-emerald-400">Backup</span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
