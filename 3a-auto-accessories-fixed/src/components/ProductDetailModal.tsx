import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MessageSquare, 
  ShieldCheck, 
  Wrench, 
  Clock, 
  Check, 
  Plus, 
  Truck, 
  ChevronRight, 
  Sparkles,
  Car,
  Share2
} from 'lucide-react';
import { Product } from '../data/products';
import { useContent } from '../context/ContentContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product) => void;
  isProductInQuote: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  isProductInQuote
}) => {
  if (!product) return null;

  const { business, getWhatsAppUrl } = useContent();
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [carModelInput, setCarModelInput] = useState<string>('');

  const allImages = [product.image, ...(product.secondaryImages || [])];
  const discountPercent = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWhatsAppEnquiry = () => {
    const vehicleDetail = carModelInput.trim() ? ` for my car (${carModelInput.trim()})` : '';
    const text = `Hello ${business.name}! 👋\n\nI am interested in:\n📌 *${product.name}*\n🏷️ Category: ${product.categoryLabel || product.category}\n💰 Special Price: ₹${product.price.toLocaleString('en-IN')}\n🚗 Vehicle: ${vehicleDetail || 'Please check my car model'}\n\nCan you confirm delivery timeline, fitment, and fitting assistance?`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#0B1528] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Close Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070D1E]">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {product.categoryLabel || product.category}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-300">Item #{String(product.id).slice(0, 8)}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left: Gallery Column */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.tag && (
                  <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded-md shadow-lg">
                    {product.tag}
                  </div>
                )}
                {discountPercent > 0 && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-extrabold px-2 py-0.5 rounded-md">
                    {discountPercent}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex items-center space-x-3 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        activeImage === img ? 'border-amber-400 scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Guarantees */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center space-x-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold text-white">Warranty</div>
                    <div className="text-slate-400">{product.warranty || '1 Year Direct Replacement'}</div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center space-x-2.5">
                  <Wrench className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold text-white">Fitting Time</div>
                    <div className="text-slate-400">{product.installationTime || '30-45 mins'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Info & Pricing Column */}
            <div className="md:col-span-6 space-y-6 flex flex-col justify-between">
              <div>
                {/* Rating & Reviews */}
                <div className="flex items-center space-x-3 text-xs mb-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-white text-sm">{product.rating || 5}</span>
                  <span className="text-slate-400">({product.reviewCount || 120} verified reviews)</span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  {product.name}
                </h2>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline space-x-3 bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
                  <span className="text-2xl sm:text-3xl font-black text-gold-gradient">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-slate-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Compatibility Box */}
                {product.compatibility && (
                  <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300">
                    <div className="font-bold flex items-center space-x-1.5 text-white mb-1">
                      <Car className="w-4 h-4 text-emerald-400" />
                      <span>Fitment & Compatibility:</span>
                    </div>
                    {product.compatibility}
                  </div>
                )}

                {/* Description */}
                <div className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {product.description}
                </div>

                {/* Key Technical Specifications */}
                {product.specs && product.specs.length > 0 && (
                  <div className="mt-5 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Key Features & Technical Specs
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {product.specs.map((spec, i) => (
                        <li key={i} className="flex items-start space-x-2 bg-white/5 p-2 rounded-lg">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Optional Car Input for instant WhatsApp customization */}
                <div className="mt-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Your Car Model & Year (Optional for faster consultation)
                  </label>
                  <div className="relative">
                    <Car className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={carModelInput}
                      onChange={(e) => setCarModelInput(e.target.value)}
                      placeholder="e.g. Fortuner 2023, Thar 4x4, Creta 2024..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 text-slate-100 text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleWhatsAppEnquiry}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-102 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Enquire on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => onAddToQuote(product)}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 border transition-all cursor-pointer ${
                      isProductInQuote
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-gold-gradient bg-gold-gradient-hover text-slate-950 font-extrabold'
                    }`}
                  >
                    {isProductInQuote ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Quote Package</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add to Quote Package</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center text-[11px] text-slate-400 flex items-center justify-center space-x-2">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Express pan-India delivery or professional fitting at our Flagship Studio</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

