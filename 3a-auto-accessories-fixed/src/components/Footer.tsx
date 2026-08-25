import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare, 
  ArrowUp,
  Clock,
  Heart,
  Lock,
  UserCheck
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface FooterProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenAdmin?: () => void;
  isAdminLoggedIn?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAdmin, isAdminLoggedIn }) => {
  const { business, categories, getWhatsAppUrl } = useContent();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040813] text-slate-400 border-t border-amber-500/20 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Overview (5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#070D1E] rounded-[10px] flex items-center justify-center">
                  <span className="font-brand font-black text-lg text-gold-gradient">
                    {business.name.substring(0, 2).toUpperCase() || '3A'}
                  </span>
                </div>
              </div>
              <div>
                <span className="font-brand font-black text-lg text-white block uppercase">{business.name}</span>
                <span className="text-[10px] text-amber-400 font-semibold tracking-widest uppercase block">
                  {business.tagline || 'Precision Styling & Upgrades'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {business.description || 'Your premier destination for high-end 7D diamond floor mats, Android 4K QLED infotainment, 64-color symphony ambient lighting, Bi-LED laser headlights, and custom car styling.'}
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs text-slate-300">
              <span className="flex items-center text-emerald-400">
                <ShieldCheck className="w-4 h-4 mr-1" />
                100% Plug & Play Couplers
              </span>
              <span>•</span>
              <span className="text-amber-400">Pan-India Delivery</span>
            </div>
          </div>

          {/* Quick Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.filter(c => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#products"
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-amber-400 transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-600">({cat.count})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#products" className="hover:text-amber-400 transition-colors">Catalog</a></li>
              <li><a href="#fitment-finder" className="hover:text-amber-400 transition-colors">Vehicle Fitment Finder</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Showroom Gallery</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Customer Reviews</a></li>
              <li><a href="#why-us" className="hover:text-amber-400 transition-colors">About {business.name}</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Warranty & FAQs</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Store Directions</a></li>
              {onOpenAdmin && (
                <li className="pt-1 border-t border-white/5">
                  <button
                    onClick={onOpenAdmin}
                    className="hover:text-amber-400 text-amber-500/80 transition-colors flex items-center space-x-1.5 cursor-pointer font-medium"
                  >
                    <Lock className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{isAdminLoggedIn ? 'Admin Dashboard' : 'Admin Login'}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Flagship Studio
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-tight">{business.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${business.phone}`} className="hover:text-amber-400 font-semibold text-white">
                  {business.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{business.hours}</span>
              </div>
              <div className="pt-2">
                <a
                  href={getWhatsAppUrl(`Hi ${business.name}, I would like to get more information.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-colors text-xs font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Direct Support</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-4">
            <span>© {new Date().getFullYear()} {business.name}. All Rights Reserved. OEM Coupler Safe.</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:inline-flex items-center space-x-1 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer border-l border-white/10 pl-4"
              >
                <Lock className="w-3 h-3 text-amber-500" />
                <span>Store Management Login</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-6">
            <span>Crafted for Automotive Enthusiasts</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

