import React, { useState, useMemo } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Copy, 
  Check, 
  X, 
  Upload, 
  Sparkles, 
  Eye, 
  MessageSquare, 
  CheckCircle2,
  AlertCircle,
  Percent,
  Layers,
  Filter
} from 'lucide-react';
import { useAdminData } from '../AdminDataContext';
import { ProductItem } from '../../types/database';
import { ConfirmModal } from '../components/ConfirmModal';

export const ProductsManagementView: React.FC = () => {
  const { 
    db, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    duplicateProduct, 
    uploadImage, 
    showToast 
  } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'outstock'>('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Form local state
  const initialFormState: Omit<ProductItem, 'id'> = {
    name: '',
    category: db.categories[1]?.id || 'interior',
    categoryLabel: db.categories[1]?.name || 'Interior Luxury',
    price: 4999,
    originalPrice: 7999,
    rating: 4.9,
    reviewCount: 120,
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    secondaryImages: [],
    compatibility: 'Custom Precision Fit for All SUV & Sedan Models',
    specs: ['OEM Plug & Play', '100% Zero Wire Cut', '1 Year Replacement Warranty'],
    description: 'Engineered with premium aerospace materials for ultimate automotive refinement.',
    warranty: '2 Years Direct Replacement',
    installationTime: '45 - 60 Minutes',
    inStock: true,
    featured: false,
    customWhatsAppMessage: 'Hello 3A Auto Accessories, I would like to inquire about [PRODUCT_NAME] (₹[PRICE]). Please share compatibility with my vehicle.'
  };

  const [formData, setFormData] = useState<Omit<ProductItem, 'id'>>(initialFormState);
  const [specInput, setSpecInput] = useState('');
  const [secImageInput, setSecImageInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return db.products.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.compatibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesStock = 
        stockFilter === 'all' ? true :
        stockFilter === 'instock' ? p.inStock !== false :
        p.inStock === false;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [db.products, searchQuery, selectedCategory, stockFilter]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(initialFormState);
    setSpecInput('');
    setSecImageInput('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product: ProductItem) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      categoryLabel: product.categoryLabel,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      reviewCount: product.reviewCount,
      tag: product.tag || '',
      image: product.image,
      secondaryImages: product.secondaryImages || [],
      compatibility: product.compatibility,
      specs: product.specs || [],
      description: product.description,
      warranty: product.warranty,
      installationTime: product.installationTime,
      inStock: product.inStock !== false,
      featured: !!product.featured,
      customWhatsAppMessage: product.customWhatsAppMessage || ''
    });
    setSpecInput('');
    setSecImageInput('');
    setIsFormOpen(true);
  };

  const handleAddSpec = () => {
    if (specInput.trim()) {
      setFormData(prev => ({
        ...prev,
        specs: [...(prev.specs || []), specInput.trim()]
      }));
      setSpecInput('');
    }
  };

  const handleRemoveSpec = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index)
    }));
  };

  const handleAddSecondaryImage = () => {
    if (secImageInput.trim()) {
      setFormData(prev => ({
        ...prev,
        secondaryImages: [...(prev.secondaryImages || []), secImageInput.trim()]
      }));
      setSecImageInput('');
    }
  };

  const handleRemoveSecondaryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      secondaryImages: prev.secondaryImages.filter((_, i) => i !== index)
    }));
  };

  const handleMainImageUpload = async (file: File) => {
    const reader = new FileReader();
    setIsUploading(true);
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      const res = await uploadImage(dataUrl, `prod_${file.name}`);
      if (res.success && res.url) {
        setFormData(prev => ({ ...prev, image: res.url! }));
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Product Name is required', 'error');
      return;
    }

    const matchedCat = db.categories.find(c => c.id === formData.category);
    const categoryLabel = matchedCat ? matchedCat.name : formData.categoryLabel;

    const payload = {
      ...formData,
      categoryLabel
    };

    let ok = false;
    if (editingProduct) {
      ok = await updateProduct(editingProduct.id, payload);
    } else {
      ok = await addProduct(payload);
    }

    if (ok) {
      setIsFormOpen(false);
      setEditingProduct(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteProduct(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const discountPercent = (orig: number, cur: number) => {
    if (!orig || orig <= cur) return 0;
    return Math.round(((orig - cur) / orig) * 100);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A1224] border border-amber-500/30">
        <div>
          <h2 className="text-lg font-black text-white flex items-center space-x-2">
            <Package className="w-5 h-5 text-amber-400" />
            <span>Product Catalog ({db.products.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Add accessories, modify pricing & discounts, configure custom WhatsApp messages, and toggle stock.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-102 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0A1224] border border-white/10 flex flex-col md:flex-row md:items-center gap-3 justify-between">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title, category, compatibility..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-900 text-slate-200 text-xs font-semibold border border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">All Categories ({db.products.length})</option>
            {db.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="px-3 py-2.5 rounded-xl bg-slate-900 text-slate-200 text-xs font-semibold border border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">All Stock Status</option>
            <option value="instock">In Stock Only</option>
            <option value="outstock">Out of Stock</option>
          </select>
        </div>

      </div>

      {/* Products Grid / Table */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-[#0A1224] rounded-2xl border border-white/10">
          <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300">No products found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProducts.map((product) => {
            const disc = discountPercent(product.originalPrice, product.price);
            return (
              <div
                key={product.id}
                className="rounded-2xl bg-[#0A1224] border border-white/10 hover:border-amber-400/40 p-4 flex flex-col justify-between transition-all duration-200 group relative shadow-lg"
              >
                {/* Product Card Top */}
                <div>
                  {/* Image container */}
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-slate-900 mb-3 border border-white/5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {product.tag && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                          {product.tag}
                        </span>
                      )}
                      {disc > 0 && (
                        <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black">
                          {disc}% OFF
                        </span>
                      )}
                    </div>

                    {/* Stock Status Badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                        product.inStock !== false ? 'bg-emerald-500/90 text-white' : 'bg-rose-500/90 text-white'
                      }`}>
                        {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] font-medium text-slate-300">
                      {product.categoryLabel}
                    </div>
                  </div>

                  {/* Title & Compatibility */}
                  <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {product.compatibility}
                  </p>

                  {/* Price & Rating */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-base font-extrabold text-amber-400">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-slate-500 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-300 font-semibold flex items-center space-x-1">
                      <span className="text-amber-400">★</span>
                      <span>{product.rating}</span>
                      <span className="text-slate-500">({product.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-white/10">
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-amber-400/20 text-slate-300 hover:text-amber-300 text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                      title="Edit Product"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Edit</span>
                    </button>

                    <button
                      onClick={() => duplicateProduct(product.id)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-blue-400/20 text-slate-300 hover:text-blue-300 text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                      title="Duplicate Product"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setDeleteTargetId(product.id)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 text-xs transition-colors cursor-pointer"
                    title="Delete Product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0B1528] border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-white">
                {editingProduct ? 'Edit Product' : 'Add New Automotive Accessory'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Configure full product specs, pricing, warranty, and custom WhatsApp message.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              
              {/* Product Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. 7D Diamond Stitched Luxury Mats"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const catId = e.target.value;
                      const cat = db.categories.find(c => c.id === catId);
                      setFormData(prev => ({
                        ...prev,
                        category: catId,
                        categoryLabel: cat ? cat.name : prev.categoryLabel
                      }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                  >
                    {db.categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Badge Tag (e.g. Best Seller, Top Rated)
                  </label>
                  <input
                    type="text"
                    value={formData.tag || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
                    placeholder="Popular / Best Seller"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-2xl border border-white/5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-amber-400 font-bold text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Original MRP (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.originalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <div className="text-xs text-slate-400 font-semibold mb-1">
                    Calculated Discount:
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-slate-800 text-emerald-400 font-bold text-xs">
                    {discountPercent(formData.originalPrice, formData.price)}% OFF
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Main Product Image URL or File Upload *
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                  <label className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer shrink-0 border border-slate-700">
                    <Upload className="w-3.5 h-3.5 inline mr-1" />
                    <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleMainImageUpload(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              {/* Vehicle Compatibility & Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Vehicle Compatibility *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.compatibility}
                    onChange={(e) => setFormData(prev => ({ ...prev, compatibility: e.target.value }))}
                    placeholder="e.g. Custom Laser Cut for All Cars"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Warranty Period
                  </label>
                  <input
                    type="text"
                    value={formData.warranty}
                    onChange={(e) => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
                    placeholder="e.g. 2 Years Direct Replacement"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Dynamic Specs Tags */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Key Specifications / Highlights ({formData.specs.length})
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={specInput}
                    onChange={(e) => setSpecInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSpec();
                      }
                    }}
                    placeholder="Add spec (e.g. 100% Zero Wire Cut) and press Add"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
                  >
                    Add Spec
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.specs.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs border border-white/10 flex items-center space-x-1.5"
                    >
                      <span>{spec}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(idx)}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Custom WhatsApp Template */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center space-x-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Custom WhatsApp Enquiry Template</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.customWhatsAppMessage || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, customWhatsAppMessage: e.target.value }))}
                  placeholder="Hello [BUSINESS_NAME], I am interested in [PRODUCT_NAME] (₹[PRICE])..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-emerald-300 text-xs border border-emerald-500/30 focus:outline-none focus:border-emerald-400"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Placeholders available: <code>[BUSINESS_NAME]</code>, <code>[PRODUCT_NAME]</code>, <code>[PRICE]</code>
                </p>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-slate-900 border border-white/5">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock !== false}
                    onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-600 focus:ring-0"
                  />
                  <span className="text-xs font-bold text-white">Item In Stock (Available for Purchase)</span>
                </label>

                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-600 focus:ring-0"
                  />
                  <span className="text-xs font-bold text-amber-400">Featured Highlight on Homepage</span>
                </label>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold border border-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-slate-950 text-xs sm:text-sm font-black shadow-lg shadow-amber-500/20 hover:scale-102 cursor-pointer transition-all"
                >
                  {editingProduct ? 'Save Product Changes' : 'Create Product'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Accessory Product?"
        message="Are you sure you want to delete this product from the database? This action will immediately remove it from your live public catalog."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />

    </div>
  );
};
