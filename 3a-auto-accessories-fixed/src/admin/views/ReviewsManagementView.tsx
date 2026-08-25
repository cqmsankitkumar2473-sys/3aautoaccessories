import React, { useState } from 'react';
import { 
  Star, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  X, 
  Car,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAdminData } from '../AdminDataContext';
import { CustomerReviewItem } from '../../types/database';
import { ConfirmModal } from '../components/ConfirmModal';

export const ReviewsManagementView: React.FC = () => {
  const { 
    db, 
    addReview, 
    updateReview, 
    deleteReview, 
    toggleReviewVisibility, 
    showToast 
  } = useAdminData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<CustomerReviewItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | number | null>(null);

  const initialFormState: Omit<CustomerReviewItem, 'id'> = {
    name: '',
    car: 'Mahindra Thar Roxx / Scorpio-N',
    rating: 5,
    date: '1 week ago',
    verified: true,
    text: 'Outstanding fit and finish! The 7D mats fit with laser millimeter precision and the ambient lighting looks factory fitted.',
    itemsPurchased: ['7D Floor Mats', 'Bi-LED Projectors'],
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    enabled: true
  };

  const [formData, setFormData] = useState<Omit<CustomerReviewItem, 'id'>>(initialFormState);
  const [itemInput, setItemInput] = useState('');

  const handleOpenAdd = () => {
    setEditingReview(null);
    setFormData(initialFormState);
    setItemInput('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (review: CustomerReviewItem) => {
    setEditingReview(review);
    setFormData({
      name: review.name,
      car: review.car,
      rating: review.rating,
      date: review.date,
      verified: review.verified,
      text: review.text,
      itemsPurchased: review.itemsPurchased || [],
      avatar: review.avatar || '',
      enabled: review.enabled !== false
    });
    setItemInput('');
    setIsFormOpen(true);
  };

  const handleAddItem = () => {
    if (itemInput.trim()) {
      setFormData(prev => ({
        ...prev,
        itemsPurchased: [...(prev.itemsPurchased || []), itemInput.trim()]
      }));
      setItemInput('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itemsPurchased: (prev.itemsPurchased || []).filter((_, i) => i !== index)
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) {
      showToast('Customer Name and Review Text are required', 'error');
      return;
    }

    let ok = false;
    if (editingReview) {
      ok = await updateReview(editingReview.id, formData);
    } else {
      ok = await addReview(formData);
    }

    if (ok) {
      setIsFormOpen(false);
      setEditingReview(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId !== null) {
      await deleteReview(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A1224] border border-amber-500/30">
        <div>
          <h2 className="text-lg font-black text-white flex items-center space-x-2">
            <Star className="w-5 h-5 text-amber-400" />
            <span>Customer Testimonials ({db.reviews.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage genuine customer reviews, car owner badge verification, and toggle live public visibility.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-102 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Review</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {db.reviews.map((review) => {
          const isEnabled = review.enabled !== false;
          return (
            <div
              key={review.id}
              className={`p-5 rounded-2xl bg-[#0A1224] border transition-all flex flex-col justify-between shadow-lg relative ${
                isEnabled ? 'border-white/10 hover:border-amber-400/40' : 'border-rose-500/30 opacity-75'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 overflow-hidden flex items-center justify-center font-bold text-amber-400">
                      {review.avatar ? (
                        <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                      ) : (
                        review.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center space-x-1.5">
                        <span>{review.name}</span>
                        {review.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" title="Verified Customer" />
                        )}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center space-x-1">
                        <Car className="w-3 h-3 text-amber-400" />
                        <span>{review.car}</span>
                      </div>
                    </div>
                  </div>

                  {/* Public visibility badge */}
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                    isEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {isEnabled ? 'Live' : 'Hidden'}
                  </span>
                </div>

                {/* Rating & Date */}
                <div className="flex items-center justify-between my-2">
                  <div className="flex text-amber-400 text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">{review.date}</span>
                </div>

                {/* Text */}
                <p className="text-xs text-slate-300 italic leading-relaxed mt-2 line-clamp-4">
                  "{review.text}"
                </p>

                {/* Tags */}
                {review.itemsPurchased && review.itemsPurchased.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                    {review.itemsPurchased.map((item, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-amber-300/90 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => toggleReviewVisibility(review.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 cursor-pointer transition-colors ${
                    isEnabled 
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                      : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300'
                  }`}
                >
                  {isEnabled ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isEnabled ? 'Hide' : 'Show Live'}</span>
                </button>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleOpenEdit(review)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs cursor-pointer"
                    title="Edit Review"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(review.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 text-xs cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add / Edit Review Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0B1528] border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-white mb-1">
              {editingReview ? 'Edit Review' : 'Add Customer Testimonial'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Verified testimonials appear with star ratings and car tags on the live website.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Vikramaditya Rathore"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Vehicle Model *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.car}
                    onChange={(e) => setFormData(prev => ({ ...prev, car: e.target.value }))}
                    placeholder="e.g. Mahindra Thar Roxx"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-amber-400 font-bold text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Review Date Tag
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    placeholder="e.g. 2 days ago"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Review Text *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.text}
                  onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Describe the upgrade quality, fitting precision, or customer service..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Purchased items tags */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Purchased Items Tags
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={itemInput}
                    onChange={(e) => setItemInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddItem();
                      }
                    }}
                    placeholder="e.g. 7D Mats, Laser Headlights"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(formData.itemsPurchased || []).map((it, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-xs text-amber-300 flex items-center space-x-1">
                      <span>{it}</span>
                      <button type="button" onClick={() => handleRemoveItem(idx)}>
                        <X className="w-3 h-3 text-slate-400 hover:text-rose-400" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center space-x-6 p-3 rounded-xl bg-slate-900 border border-white/5">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.verified}
                    onChange={(e) => setFormData(prev => ({ ...prev, verified: e.target.checked }))}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-600 focus:ring-0"
                  />
                  <span className="text-xs font-bold text-emerald-400">Verified Buyer Badge</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enabled}
                    onChange={(e) => setFormData(prev => ({ ...prev, enabled: e.target.checked }))}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-600 focus:ring-0"
                  />
                  <span className="text-xs font-bold text-white">Visible on Live Website</span>
                </label>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gold-gradient text-slate-950 text-xs font-bold"
                >
                  {editingReview ? 'Update Review' : 'Add Review'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteTargetId !== null}
        title="Delete Customer Review?"
        message="Are you sure you want to delete this customer review permanently?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />

    </div>
  );
};
