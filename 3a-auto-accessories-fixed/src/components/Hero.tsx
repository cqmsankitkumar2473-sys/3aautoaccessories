import React from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Wrench, 
  Truck, 
  CheckCircle2, 
  Car,
  ChevronDown
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenFitmentFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenFitmentFinder }) => {
  const { business, hero, getWhatsAppUrl } = useContent();

  const handleWhatsAppConsultation = () => {
    const text = `Hello ${business.name}! I am looking for custom accessories & upgrades for my vehicle. Can you share top recommendations and best price options?`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#070D1E]">
      {/* Dynamic Background Lighting Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-amber-500/15 via-blue-600/15 to-amber-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#070D1E] to-transparent z-10 pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs sm:text-sm font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 animate-spin text-amber-400" style={{ animationDuration: '6s' }} />
              <span>{hero.badgeText || 'Premium Automotive Styling & High-Tech Upgrades'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              {hero.titlePrefix || 'Transform Your Car into a'}{' '}
              <span className="text-gold-gradient block sm:inline">
                {hero.titleHighlight || 'Masterpiece on Wheels'}
              </span>{' '}
              {hero.titleSuffix && (
                <span className="text-white block sm:inline">{hero.titleSuffix}</span>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {hero.description || `${business.name}: precision laser 7D floor mats, 4K QLED Android systems, 64-color ambient cabin lighting, and Bi-LED headlights.`}
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm font-medium text-slate-200">
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-lg p-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Wire Splicing</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-lg p-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1-3 Yr Replacement</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-lg p-2.5 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pan-India Shipping</span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                id="hero-explore-catalog-btn"
                onClick={onExploreCatalog}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gold-gradient bg-gold-gradient-hover text-slate-950 font-bold text-base shadow-xl shadow-amber-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-fitment-finder-btn"
                onClick={onOpenFitmentFinder}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-semibold text-base flex items-center justify-center space-x-2 transition-all hover:border-amber-400 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Car className="w-5 h-5 text-amber-400" />
                <span>Vehicle Fitment Finder</span>
              </button>

              <button
                id="hero-whatsapp-btn"
                onClick={handleWhatsAppConsultation}
                className="w-full sm:w-auto px-5 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-950/40 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Instant WhatsApp Quote</span>
              </button>
            </div>

            {/* Social Proof & Rating Teaser */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 pt-4 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-white">4.9 / 5.0</span>
              <span className="text-slate-500">•</span>
              <span>Based on {business.totalReviews || '1,850+ Verified Car Owners'}</span>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-amber-500/30 via-slate-800/40 to-amber-500/10 shadow-2xl">
              <div className="relative rounded-[14px] overflow-hidden bg-[#0B1528] aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={hero.backgroundImage || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"}
                  alt={`${business.name} Premium Interior Makeover`}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Tag Badges */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center space-x-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Flagship Upgrade Package</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-[#070D1E] via-[#070D1E]/90 to-transparent p-4 rounded-xl border border-white/10 backdrop-blur-md">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Featured Package</span>
                      <h4 className="text-base font-bold text-white">Signature Cockpit & Matrix LED Kit</h4>
                      <p className="text-xs text-slate-300 mt-0.5">7D Mats + Ambient LED + QLED 4K Display</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 line-through">₹31,997</span>
                      <div className="text-base font-extrabold text-gold-gradient">₹23,297</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Mini Stats Cards Floating */}
            <div className="absolute -bottom-6 -left-6 bg-[#0E1A33]/95 border border-amber-500/30 p-3.5 rounded-xl shadow-2xl backdrop-blur-md hidden sm:flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">100% Genuine</div>
                <div className="text-xs text-slate-400">Direct Factory Warranty</div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-[#0E1A33]/95 border border-amber-500/30 p-3 rounded-xl shadow-2xl backdrop-blur-md hidden sm:flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Same-Day Dispatch</div>
                <div className="text-[10px] text-slate-400">Fast Tracked Delivery</div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Trust Metrics Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-gold-gradient">{hero.stat1Value || '10,000+'}</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">{hero.stat1Label || 'Cars Upgraded & Stylized'}</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-gold-gradient">{hero.stat2Value || '500+'}</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">{hero.stat2Label || 'Premium Accessories In Stock'}</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-gold-gradient">{hero.stat3Value || '15+ Years'}</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">{hero.stat3Label || 'Automotive Craftsmanship'}</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-gold-gradient">4.9 / 5.0 ★</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">Customer Satisfaction</div>
          </div>
        </div>

      </div>
    </section>
  );
};

