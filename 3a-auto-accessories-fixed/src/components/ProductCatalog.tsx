import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  MessageSquare, 
  Eye, 
  Plus, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Zap,
  ArrowUpDown,
  X
} from 'lucide-react';
import { Product } from '../data/products';
import { useContent } from '../context/ContentContext';

interface ProductCatalogProps {
  onOpenProductDetail: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  isProductInQuote: (productId: string) => boolean;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onOpenProductDetail,
  onAddToQuote,
  isProductInQuote,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}) => {
  const { products, categories, business, getWhatsAppUrl } = useContent();
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category Match
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      // Search Query Match (Product name, description, specs, category, compatibility)
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || (
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.categoryLabel && product.categoryLabel.toLowerCase().includes(query)) ||
        (product.compatibility && product.compatibility.toLowerCase().includes(query)) ||
        (product.specs && product.specs.some(s => s.toLowerCase().includes(query)))
      );

      // In-stock match
      const matchesStock = !inStockOnly || product.inStock;

      return matchesCategory && matchesSearch && matchesStock;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      // Default: featured first, then rating
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, inStockOnly, sortBy]);

  const handleWhatsAppProduct = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Hello ${business.name}! 👋\n\nI want to inquire about the following product:\n📌 *${product.name}*\n💰 Price: ₹${product.price.toLocaleString('en-IN')}\n🏷️ Category: ${product.categoryLabel || product.category}\n\nCould you please check availability & fitment for my car?`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  const getTagColor = (tag?: string) => {
    if (!tag) return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    if (tag.includes('Best Seller')) return 'bg-amber-500 text-slate-950 font-extrabold';
    if (tag.includes('Pro') || tag.includes('Armor')) return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
    if (tag.includes('High') || tag.includes('Trending')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
  };

  return (
    <section id="products" className="py-20 bg-[#070D1E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Premium Product Range</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Premium Automotive <span className="text-gold-gradient">Accessories Catalog</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Browse our hand-selected catalog of OEM-spec interior, exterior, audio, lighting, and protection accessories.
          </p>
        </div>

        {/* Search, Filter Bar & Sorting */}
        <div className="bg-[#0B1528] rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl mb-8 space-y-4">
          
          {/* Top Row: Search input + Sort dropdown + In Stock Switch */}
          <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="product-search-input"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search accessories (e.g. 7D Mats, Laser LED, Android, Fortuner, Thar, Creta...)"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-900/90 text-slate-100 placeholder:text-slate-500 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs text-slate-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="bg-slate-900">Featured First</option>
                  <option value="price-low" className="bg-slate-900">Price: Low to High</option>
                  <option value="price-high" className="bg-slate-900">Price: High to Low</option>
                  <option value="rating" className="bg-slate-900">Top Customer Rated</option>
                </select>
              </div>

              {/* In-Stock Filter Toggle */}
              <label className="flex items-center space-x-2 cursor-pointer bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 shrink-0">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-600 text-amber-500 focus:ring-amber-400 w-3.5 h-3.5"
                />
                <span className="text-xs font-medium text-slate-300">In-Stock Only</span>
              </label>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const catCount = cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {catCount}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter / Active Query Tags */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
          <div>
            Showing <span className="font-bold text-white">{filteredProducts.length}</span> verified automotive accessories
            {searchQuery && (
              <span className="ml-2 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Search: "{searchQuery}"
              </span>
            )}
          </div>
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-amber-400 hover:underline flex items-center space-x-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Search</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="navy-card rounded-2xl p-12 text-center border border-white/10 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No Matching Accessories Found</h3>
            <p className="text-xs text-slate-400 mt-2">
              We carry custom orders for 200+ car models! Reach out on WhatsApp with your vehicle model for immediate availability.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => {
                  onSearchChange('');
                  onCategoryChange('all');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
              >
                Reset Filters
              </button>
              <button
                onClick={() => {
                  const text = `Hi ${business.name}, I am searching for "${searchQuery}" for my car. Can you check custom availability?`;
                  window.open(getWhatsAppUrl(text), '_blank');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center space-x-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask on WhatsApp</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inQuote = isProductInQuote(product.id);
              const discountPercent = product.originalPrice > product.price 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  onClick={() => onOpenProductDetail(product)}
                  className="navy-card navy-card-hover rounded-2xl overflow-hidden border border-white/10 flex flex-col group cursor-pointer relative"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/11] bg-[#0A1428] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Tag Badge */}
                    {product.tag && (
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border shadow-md ${getTagColor(product.tag)}`}>
                          {product.tag}
                        </span>
                      </div>
                    )}

                    {/* Discount Badge */}
                    {discountPercent > 0 && (
                      <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-md">
                        {discountPercent}% OFF
                      </div>
                    )}

                    {/* Quick View Hover Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3.5 py-1.5 rounded-lg bg-black/80 text-white text-xs font-semibold border border-amber-400/40 flex items-center space-x-1.5 backdrop-blur-sm">
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>Quick View Details</span>
                      </span>
                    </div>

                    {/* Category Label at bottom */}
                    <div className="absolute bottom-2 left-2 bg-[#070D1E]/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-slate-300 font-medium border border-white/10">
                      {product.categoryLabel || product.category}
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Review count */}
                      <div className="flex items-center space-x-2 text-xs mb-2">
                        <div className="flex items-center text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="ml-1 font-bold text-white">{product.rating || 5}</span>
                        </div>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400 text-[11px]">({product.reviewCount || 120} verified reviews)</span>
                      </div>

                      {/* Product Title */}
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                        {product.name}
                      </h3>

                      {/* Key Bullet Specs (Top 2) */}
                      {product.specs && product.specs.length > 0 && (
                        <ul className="mt-2.5 space-y-1 text-[11px] text-slate-300">
                          {product.specs.slice(0, 2).map((spec, i) => (
                            <li key={i} className="flex items-start space-x-1.5 line-clamp-1">
                              <span className="text-amber-400 font-bold shrink-0">•</span>
                              <span className="truncate">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Compatibility Hint */}
                      {product.compatibility && (
                        <div className="mt-3 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded truncate">
                          ✓ {product.compatibility}
                        </div>
                      )}
                    </div>

                    {/* Bottom Price & Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
                      {/* Price Section */}
                      <div className="flex items-baseline justify-between">
                        <div>
                          {product.originalPrice > product.price && (
                            <div className="text-xs text-slate-400 line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </div>
                          )}
                          <div className="text-lg font-black text-gold-gradient">
                            ₹{product.price.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400">Incl. GST & Warranty</span>
                      </div>

                      {/* Action Buttons: WhatsApp Direct + Add to Quote Bundle */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* WhatsApp Button */}
                        <button
                          onClick={(e) => handleWhatsAppProduct(product, e)}
                          className="w-full py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center space-x-1 shadow-md transition-colors cursor-pointer"
                          title="Instant WhatsApp Enquiry for this product"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>

                        {/* Add to Quote Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToQuote(product);
                          }}
                          className={`w-full py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 transition-all border cursor-pointer ${
                            inQuote
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                          }`}
                          title="Add to Custom Package Quote Builder"
                        >
                          {inQuote ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-amber-400" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 text-amber-400" />
                              <span>+ Quote</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

