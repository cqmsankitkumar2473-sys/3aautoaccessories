import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Menu, 
  X, 
  ShoppingBag, 
  Car, 
  Clock, 
  MapPin, 
  Sparkles,
  ChevronRight,
  Lock,
  UserCheck
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface NavbarProps {
  quoteCount: number;
  onOpenQuoteBuilder: () => void;
  onSelectCategory: (categoryId: string) => void;
  activeCategory: string;
  onOpenAdmin?: () => void;
  isAdminLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  quoteCount,
  onOpenQuoteBuilder,
  onSelectCategory,
  activeCategory,
  onOpenAdmin,
  isAdminLoggedIn
}) => {
  const { business, websiteSettings, getWhatsAppUrl } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Fitment Finder', href: '#fitment-finder' },
    { label: 'Categories', href: '#categories' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Why 3A', href: '#why-us' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleWhatsAppDirect = () => {
    const message = `Hi ${business.name}, I am visiting your website and would like to inquire about accessories for my car.`;
    window.open(getWhatsAppUrl(message), '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Notification / Quick Contact Bar */}
      {websiteSettings.enableNoticeBar !== false && (
        <div className="bg-gradient-to-r from-[#001433] via-[#0A1A3A] to-[#001433] text-xs text-slate-300 border-b border-amber-500/20 py-1.5 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <span className="flex items-center text-amber-400 font-medium">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
                {websiteSettings.headerNotice || 'Special Offer: Up to 30% Off on Full Makeover Packages + Free Fitting Support'}
              </span>
              <span className="flex items-center text-slate-300">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                {business.hours || 'Open 7 Days: 9:30 AM – 9:00 PM'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                100% Genuine Plug & Play Couplers
              </span>
              <a 
                href={`tel:${business.phone}`} 
                className="flex items-center text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                {business.phone}
              </a>
              {onOpenAdmin && (
                <button
                  id="topbar-admin-btn"
                  onClick={onOpenAdmin}
                  className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 text-[11px] font-bold transition-all cursor-pointer ml-2"
                  title="Store Owner & Admin Portal"
                >
                  {isAdminLoggedIn ? (
                    <>
                      <UserCheck className="w-3 h-3 text-emerald-400" />
                      <span>Admin Dashboard</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3 text-amber-400" />
                      <span>Admin Login</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#070D1E]/95 backdrop-blur-md shadow-2xl border-b border-amber-500/30 py-3' 
          : 'bg-[#070D1E]/85 backdrop-blur-sm border-b border-white/10 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Emblem */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#070D1E] rounded-[10px] flex items-center justify-center">
                <span className="font-brand font-black text-xl tracking-tighter text-gold-gradient">
                  3A
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-brand font-black text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {business.name || '3A AUTO'}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  Pro
                </span>
              </div>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 -mt-0.5">
                Accessories & Styling
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-200 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Custom Quote Package Builder Trigger */}
            <button
              id="quote-cart-trigger-btn"
              onClick={onOpenQuoteBuilder}
              className="relative flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-sm font-medium transition-all group cursor-pointer"
              title="View Custom Accessory Package Quote"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Quote Package</span>
              {quoteCount > 0 && (
                <span className="ml-1.5 px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-slate-950 animate-bounce">
                  {quoteCount}
                </span>
              )}
            </button>

            {/* WhatsApp Direct Chat Button */}
            <button
              id="header-whatsapp-btn"
              onClick={handleWhatsAppDirect}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-md shadow-emerald-900/30 transition-all hover:scale-102 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </button>

            {/* Header Admin Login Shortcut */}
            {onOpenAdmin && (
              <button
                id="header-admin-login-btn"
                onClick={onOpenAdmin}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer"
                title="Store Owner & Admin Portal"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin</span>
              </button>
            )}
          </div>

          {/* Mobile Menu & Quote Trigger */}
          <div className="flex items-center space-x-2 lg:hidden">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30"
                aria-label="Admin Login"
                title="Admin Login"
              >
                <Lock className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={onOpenQuoteBuilder}
              className="relative p-2 rounded-lg bg-slate-800 text-amber-400 border border-slate-700"
              aria-label="View Quote Package"
            >
              <ShoppingBag className="w-5 h-5" />
              {quoteCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-500 text-black">
                  {quoteCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white border border-slate-700"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A1224] border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-amber-400 bg-white/5 rounded-lg flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteBuilder();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-slate-800 text-slate-100 flex items-center justify-center space-x-2 text-sm font-medium border border-amber-500/30"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>View Custom Quote Package ({quoteCount} items)</span>
              </button>

              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center space-x-2 text-sm font-bold shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (+{business.whatsappNumber})</span>
              </button>

              <a
                href={`tel:${business.phone}`}
                className="w-full py-2.5 px-4 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center space-x-2 text-sm font-bold"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store: {business.phone}</span>
              </a>

              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-amber-500/20 to-amber-600/10 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 flex items-center justify-center space-x-2 text-sm font-bold cursor-pointer transition-colors"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>{isAdminLoggedIn ? 'Open Admin Dashboard' : 'Store Owner / Admin Login'}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
