import React, { useState } from 'react';
import { 
  Image, 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Upload, 
  X, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAdminData } from '../AdminDataContext';
import { GalleryItem } from '../../types/database';
import { ConfirmModal } from '../components/ConfirmModal';

export const GalleryManagementView: React.FC = () => {
  const { 
    db, 
    addGalleryItem, 
    updateGalleryItem, 
    deleteGalleryItem, 
    toggleGalleryVisibility, 
    reorderGallery, 
    uploadImage, 
    showToast 
  } = useAdminData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const initialFormState: Omit<GalleryItem, 'id'> = {
    title: '',
    category: 'Interior Fitment',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
    description: 'Bespoke precision installation with OEM coupler matching.',
    order: (db.gallery.length || 0) + 1,
    enabled: true
  };

  const [formData, setFormData] = useState<Omit<GalleryItem, 'id'>>(initialFormState);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData(initialFormState);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      image: item.image,
      description: item.description,
      order: item.order || 1,
      enabled: item.enabled !== false
    });
    setIsFormOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    setIsUploading(true);
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      const res = await uploadImage(dataUrl, `gallery_${file.name}`);
      if (res.success && res.url) {
        setFormData(prev => ({ ...prev, image: res.url! }));
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image.trim()) {
      showToast('Title and Image are required', 'error');
      return;
    }

    let ok = false;
    if (editingItem) {
      ok = await updateGalleryItem(editingItem.id, formData);
    } else {
      ok = await addGalleryItem(formData);
    }

    if (ok) {
      setIsFormOpen(false);
      setEditingItem(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId !== null) {
      await deleteGalleryItem(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const moveUp = (index: number) => {
    if (index > 0) {
      reorderGallery(index, index - 1);
    }
  };

  const moveDown = (index: number) => {
    if (index < db.gallery.length - 1) {
      reorderGallery(index, index + 1);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A1224] border border-amber-500/30">
        <div>
          <h2 className="text-lg font-black text-white flex items-center space-x-2">
            <Image className="w-5 h-5 text-amber-400" />
            <span>Showroom Gallery & Transformations ({db.gallery.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Add vehicle transformation photos, interior lighting shots, exterior styling builds, and change display order.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-102 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Transformation</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {db.gallery.map((item, index) => {
          const isEnabled = item.enabled !== false;
          return (
            <div
              key={item.id}
              className={`rounded-2xl bg-[#0A1224] border p-4 flex flex-col justify-between transition-all duration-200 group shadow-lg ${
                isEnabled ? 'border-white/10 hover:border-amber-400/40' : 'border-rose-500/30 opacity-75'
              }`}
            >
              <div>
                {/* Image */}
                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-slate-900 mb-3 border border-white/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] font-bold text-amber-300">
                    {item.category}
                  </div>

                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      isEnabled ? 'bg-emerald-500/90 text-white' : 'bg-rose-500/90 text-white'
                    }`}>
                      {isEnabled ? 'Live' : 'Hidden'}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Action Controls */}
              <div className="flex items-center justify-between pt-3 mt-4 border-t border-white/10">
                {/* Reorder Buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    disabled={index === 0}
                    onClick={() => moveUp(index)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300"
                    title="Move Up in Order"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={index === db.gallery.length - 1}
                    onClick={() => moveDown(index)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300"
                    title="Move Down in Order"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Edit & Visibility */}
                <div className="flex items-center space-x-1.5">
                  <button
                    type="button"
                    onClick={() => toggleGalleryVisibility(item.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title={isEnabled ? 'Hide from public gallery' : 'Make visible publicly'}
                  >
                    {isEnabled ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                  
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                    title="Edit Item"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setDeleteTargetId(item.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400"
                    title="Delete Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0B1528] border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-white mb-4">
              {editingItem ? 'Edit Transformation' : 'Add Vehicle Transformation'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Build Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Fortuner GR-Sport Complete Makeover"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Category Tag
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g. Interior Fitment / Headlight Upgrades"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Image Input & Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Transformation Photo URL or File Upload *
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
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Description / Transformation Highlights
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Custom 7D cognac mats, Android 4K infotainment, Bi-LED laser retrofit with zero wire cut."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Visibility Checkbox */}
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enabled}
                    onChange={(e) => setFormData(prev => ({ ...prev, enabled: e.target.checked }))}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-600 focus:ring-0"
                  />
                  <span className="text-xs font-bold text-white">Visible on Public Showroom Gallery</span>
                </label>
              </div>

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
                  {editingItem ? 'Save Changes' : 'Add to Gallery'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteTargetId !== null}
        title="Delete Gallery Item?"
        message="Are you sure you want to delete this transformation photo from your showroom gallery?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />

    </div>
  );
};
