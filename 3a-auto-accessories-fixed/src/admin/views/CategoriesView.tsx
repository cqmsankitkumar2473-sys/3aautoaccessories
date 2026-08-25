import React, { useState } from 'react';
import { 
  Tags, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  Package, 
  Sparkles,
  Sliders
} from 'lucide-react';
import { useAdminData } from '../AdminDataContext';
import { CategoryItem } from '../../types/database';
import { ConfirmModal } from '../components/ConfirmModal';

export const CategoriesView: React.FC = () => {
  const { db, addCategory, updateCategory, deleteCategory, showToast } = useAdminData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const initialFormState: CategoryItem = {
    id: '',
    name: '',
    icon: 'Sparkles',
    count: 0,
    desc: 'High performance automotive upgrades'
  };

  const [formData, setFormData] = useState<CategoryItem>(initialFormState);

  const availableIcons = [
    'Sparkles', 'Armchair', 'Lightbulb', 'Cpu', 'Shield', 'Car', 
    'Volume2', 'Wrench', 'Compass', 'Zap', 'Flame', 'Sun'
  ];

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData(initialFormState);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setFormData({ ...cat });
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Category name is required', 'error');
      return;
    }

    const catId = editingCategory ? editingCategory.id : (formData.id.trim() || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-'));

    let ok = false;
    if (editingCategory) {
      ok = await updateCategory(editingCategory.id, {
        name: formData.name,
        icon: formData.icon,
        desc: formData.desc
      });
    } else {
      ok = await addCategory({
        ...formData,
        id: catId
      });
    }

    if (ok) {
      setIsFormOpen(false);
      setEditingCategory(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteCategory(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A1224] border border-amber-500/30">
        <div>
          <h2 className="text-lg font-black text-white flex items-center space-x-2">
            <Tags className="w-5 h-5 text-amber-400" />
            <span>Product Categories ({db.categories.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Organize catalog filters, navigation icons, and category showcases across the public website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-102 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {db.categories.map((cat) => {
          const productCount = db.products.filter(p => p.category === cat.id).length;
          return (
            <div
              key={cat.id}
              className="p-5 rounded-2xl bg-[#0A1224] border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between shadow-lg group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <Tags className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-[11px] font-bold text-slate-300">
                    {productCount} Products Linked
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
                <div className="text-xs text-slate-400 mt-1 font-mono">
                  ID: {cat.id}
                </div>
                {cat.desc && (
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                    {cat.desc}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                {cat.id !== 'all' && (
                  <button
                    onClick={() => setDeleteTargetId(cat.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 text-xs cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0B1528] border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-white mb-4">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Performance Carbon"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              {!editingCategory && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Category ID (Slug)
                  </label>
                  <input
                    type="text"
                    value={formData.id}
                    onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-') }))}
                    placeholder="e.g. performance-carbon"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Description / Subtitle
                </label>
                <textarea
                  rows={2}
                  value={formData.desc || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, desc: e.target.value }))}
                  placeholder="Bespoke carbon fiber mirrors, spoilers & body kits"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Select Icon Tag
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {availableIcons.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, icon: ic }))}
                      className={`p-2 rounded-xl text-xs font-semibold text-center border transition-colors cursor-pointer ${
                        formData.icon === ic
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400'
                          : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
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
                  className="px-5 py-2 rounded-xl bg-gold-gradient text-slate-950 text-xs font-bold"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Category?"
        message="Deleting this category will unlink it from navigation. Products inside this category will remain intact."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />

    </div>
  );
};
