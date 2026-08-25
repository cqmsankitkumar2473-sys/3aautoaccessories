import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageSquare, 
  ShoppingBag, 
  Sparkles, 
  Car, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Product } from '../data/products';
import { useContent } from '../context/ContentContext';

export interface QuoteItem {
  product: Product;
  quantity: number;
}

interface QuoteBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearQuote: () => void;
  onAddQuickProduct: (product: Product) => void;
}

export const QuoteBuilderModal: React.FC<QuoteBuilderModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearQuote,
  onAddQuickProduct
}) => {
  if (!isOpen) return null;

  const { business, products, getWhatsAppUrl } = useContent();
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [city, setCity] = useState('');
  const [customerName, setCustomerName] = useState('');

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalOriginal = items.reduce((sum, item) => sum + ((item.product.originalPrice || item.product.price) * item.quantity), 0);
  
  // Package Bundle Discount Rule: 5% extra off if 2 items, 10% extra off if 3+ items
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  let bundleDiscountRate = 0;
  if (itemCount >= 3) bundleDiscountRate = 0.10;
  else if (itemCount >= 2) bundleDiscountRate = 0.05;

  const bundleDiscountAmount = Math.round(subtotal * bundleDiscountRate);
  const finalTotal = subtotal - bundleDiscountAmount;
  const totalSavings = (totalOriginal - subtotal) + bundleDiscountAmount;

  const handleSendQuoteWhatsApp = () => {
    if (items.length === 0) return;

    let itemsList = items.map((item, idx) => 
      `${idx + 1}. *${item.product.name}* (Qty: ${item.quantity}) - ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`
    ).join('\n');

    const message = 
      `Hello ${business.name}! 👋\n\n` +
      `I would like to request a Custom Accessory Package Quote for my vehicle:\n\n` +
      `👤 *Customer Name:* ${customerName.trim() || 'Valued Customer'}\n` +
      `🚗 *Vehicle:* ${carModel.trim() || 'Not specified'} (${carYear.trim() || 'Year not specified'})\n` +
      `📍 *City / Delivery:* ${city.trim() || 'Pan-India Delivery'}\n\n` +
      `🛒 *Selected Accessories:* \n${itemsList}\n\n` +
      `💰 *Package Total:* ₹${finalTotal.toLocaleString('en-IN')} (Estimated)\n` +
      `🎁 *Total Savings:* ₹${totalSavings.toLocaleString('en-IN')}\n\n` +
      `Please verify stock and confirm the best bundled discount and fitting timeline!`;

    window.open(getWhatsAppUrl(message), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-[#0B1528] h-full shadow-2xl border-l border-amber-500/30 flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#070D1E] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Custom Package Quote</h3>
              <p className="text-[11px] text-slate-400">
                {items.length} unique accessory {items.length === 1 ? 'item' : 'items'} in bundle
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {items.length > 0 && (
              <button
                onClick={onClearQuote}
                className="text-xs text-red-400 hover:text-red-300 font-semibold px-2 py-1 cursor-pointer"
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {items.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white">Your Quote Package is Empty</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Add accessories from the catalog to calculate instant package bundle discounts and get a tailor-fit estimate.
              </p>

              {/* Quick Add Suggestions */}
              <div className="pt-4 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3">
                  🔥 Popular Additions:
                </span>
                <div className="space-y-2">
                  {products.slice(0, 3).map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center space-x-2">
                        <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <div className="text-xs font-bold text-white line-clamp-1">{p.name}</div>
                          <div className="text-[11px] text-amber-400">₹{p.price.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => onAddQuickProduct(p)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-black text-xs font-bold transition-colors cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Bundle Discount Banner */}
              {itemCount >= 2 ? (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                  <span className="flex items-center font-bold">
                    <Sparkles className="w-4 h-4 mr-1.5 text-amber-400" />
                    {itemCount >= 3 ? '10% Multi-Item Bundle Bonus Applied!' : '5% Multi-Item Bundle Bonus Applied!'}
                  </span>
                  <span className="font-extrabold text-white">-₹{bundleDiscountAmount.toLocaleString('en-IN')}</span>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  <span>Add 1 more item to unlock an extra 5% bundle discount!</span>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div 
                    key={item.product.id}
                    className="p-3.5 rounded-xl bg-[#070D1E] border border-white/10 flex items-center justify-between space-x-3"
                  >
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-14 h-14 rounded-lg object-cover border border-white/10 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">{item.product.name}</h5>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.product.categoryLabel || item.product.category}</div>
                      <div className="text-xs font-extrabold text-gold-gradient mt-1">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="w-6 h-6 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400 flex items-center justify-center ml-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Car & Location Details Form */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  🚗 Vehicle Details for Fitment Verification
                </span>
                
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Your Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ankit Sharma"
                      className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded-lg text-xs border border-slate-700 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">City / State</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai, Delhi, Bangalore"
                      className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded-lg text-xs border border-slate-700 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Car Make & Model *</label>
                    <input
                      type="text"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      placeholder="e.g. Thar / Fortuner / Creta"
                      className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded-lg text-xs border border-slate-700 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Year / Variant</label>
                    <input
                      type="text"
                      value={carYear}
                      onChange={(e) => setCarYear(e.target.value)}
                      placeholder="e.g. 2023 Top Model"
                      className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded-lg text-xs border border-slate-700 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Pricing Breakdown & WhatsApp Dispatch */}
        {items.length > 0 && (
          <div className="p-6 bg-[#070D1E] border-t border-white/10 space-y-4">
            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {bundleDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Package Bundle Bonus ({bundleDiscountRate * 100}%):</span>
                  <span>-₹{bundleDiscountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Total Catalog Savings:</span>
                <span className="text-emerald-400">Save ₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-white/10 text-base font-extrabold text-white">
                <span>Estimated Total:</span>
                <span className="text-xl text-gold-gradient font-black">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleSendQuoteWhatsApp}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-102 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Send Package to WhatsApp for Best Deal</span>
            </button>
            <div className="text-center text-[10px] text-slate-400">
              ✓ Our automotive specialist will respond with exact stock, coupler fitment & doorstep fitting options!
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

