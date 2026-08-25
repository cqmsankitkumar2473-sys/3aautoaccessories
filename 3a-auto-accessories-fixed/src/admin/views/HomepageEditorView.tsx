import React, { useState } from 'react';
import { 
  FileEdit, 
  Sparkles, 
  Save, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Image, 
  Upload, 
  Award, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useAdminData } from '../AdminDataContext';
import { HeroContent, WhyChooseUsContent, FaqItem } from '../../types/database';
import { ConfirmModal } from '../components/ConfirmModal';

export const HomepageEditorView: React.FC = () => {
  const { 
    db, 
    saveHeroContent, 
    saveWhyChooseUs, 
    addFaq, 
    updateFaq, 
    deleteFaq, 
    uploadImage, 
    isSaving, 
    showToast 
  } = useAdminData();

  const [activeSubTab, setActiveSubTab] = useState<'hero' | 'about' | 'faqs'>('hero');

  // Hero state
  const [heroData, setHeroData] = useState<HeroContent>({ ...db.hero });
  
  // Why Choose Us state
  const [whyData, setWhyData] = useState<WhyChooseUsContent>({ ...db.whyChooseUs });

  // FAQs state
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [faqFormData, setFaqFormData] = useState<Omit<FaqItem, 'id'>>({ question: '', answer: '' });
  const [deleteFaqId, setDeleteFaqId] = useState<string | number | null>(null);

  const [isUploading, setIsUploading] = useState<string | null>(null);

  const handleHeroChange = (field: keyof HeroContent, val: string) => {
    setHeroData(prev => ({ ...prev, [field]: val }));
  };

  const handleWhyChange = (field: keyof WhyChooseUsContent, val: any) => {
    setWhyData(prev => ({ ...prev, [field]: val }));
  };

  const handlePillarChange = (index: number, field: string, val: string) => {
    const updated = [...whyData.pillars];
    updated[index] = { ...updated[index], [field]: val };
    setWhyData(prev => ({ ...prev, pillars: updated }));
  };

  const handleImageUpload = async (field: 'heroBg' | 'workshopImage', file: File) => {
    const reader = new FileReader();
    setIsUploading(field);
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      const res = await uploadImage(dataUrl, `${field}_${file.name}`);
      if (res.success && res.url) {
        if (field === 'heroBg') {
          handleHeroChange('backgroundImage', res.url);
        } else {
          handleWhyChange('workshopImage', res.url);
        }
      }
      setIsUploading(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAll = async () => {
    const s1 = await saveHeroContent(heroData);
    const s2 = await saveWhyChooseUs(whyData);
    if (s1 && s2) {
      showToast('Homepage hero, about section and features saved!', 'success');
    }
  };

  // FAQ handlers
  const handleOpenAddFaq = () => {
    setEditingFaq(null);
    setFaqFormData({ question: '', answer: '' });
    setIsFaqModalOpen(true);
  };

  const handleOpenEditFaq = (faq: FaqItem) => {
    setEditingFaq(faq);
    setFaqFormData({ question: faq.question, answer: faq.answer });
    setIsFaqModalOpen(true);
  };

  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqFormData.question.trim() || !faqFormData.answer.trim()) {
      showToast('Question and Answer are required', 'error');
      return;
    }

    let ok = false;
    if (editingFaq && editingFaq.id) {
      ok = await updateFaq(editingFaq.id, faqFormData);
    } else {
      ok = await addFaq(faqFormData);
    }

    if (ok) {
      setIsFaqModalOpen(false);
      setEditingFaq(null);
    }
  };

  const handleDeleteFaqConfirm = async () => {
    if (deleteFaqId !== null) {
      await deleteFaq(deleteFaqId);
      setDeleteFaqId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A1224] border border-amber-500/30">
        <div>
          <h2 className="text-lg font-black text-white flex items-center space-x-2">
            <FileEdit className="w-5 h-5 text-amber-400" />
            <span>Homepage Content Editor</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Fine-tune hero banners, headline typography, workshop heritage story, and interactive customer FAQs.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-102 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Live Content'}</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveSubTab('hero')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeSubTab === 'hero' 
              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' 
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Hero Banner & Headline
        </button>
        <button
          onClick={() => setActiveSubTab('about')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeSubTab === 'about' 
              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' 
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          About 3A & Feature Pillars
        </button>
        <button
          onClick={() => setActiveSubTab('faqs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeSubTab === 'faqs' 
              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' 
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Frequently Asked Questions ({db.faqs.length})
        </button>
      </div>

      {/* SubTab 1: Hero Banner */}
      {activeSubTab === 'hero' && (
        <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Main Showcase Hero Banner</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Top Badge Text
              </label>
              <input
                type="text"
                value={heroData.badgeText}
                onChange={(e) => handleHeroChange('badgeText', e.target.value)}
                placeholder="India’s Premier Car Upgrade Studio"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Headline Prefix (Line 1)
              </label>
              <input
                type="text"
                value={heroData.titlePrefix}
                onChange={(e) => handleHeroChange('titlePrefix', e.target.value)}
                placeholder="Elevate Your Drive With"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                Headline Gold Highlight Text
              </label>
              <input
                type="text"
                value={heroData.titleHighlight}
                onChange={(e) => handleHeroChange('titleHighlight', e.target.value)}
                placeholder="Precision Automotive"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-amber-300 font-bold text-xs sm:text-sm border border-amber-500/40 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Headline Suffix (Line 2)
              </label>
              <input
                type="text"
                value={heroData.titleSuffix}
                onChange={(e) => handleHeroChange('titleSuffix', e.target.value)}
                placeholder="Upgrades & Styling"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Hero Subtitle Description
              </label>
              <textarea
                rows={3}
                value={heroData.description}
                onChange={(e) => handleHeroChange('description', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Hero Background Image */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Hero Automotive Background Image URL
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={heroData.backgroundImage}
                onChange={(e) => handleHeroChange('backgroundImage', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700 focus:outline-none focus:border-amber-400"
              />
              <label className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer shrink-0 border border-slate-700">
                <Upload className="w-3.5 h-3.5 inline mr-1" />
                <span>{isUploading === 'heroBg' ? 'Uploading...' : 'Upload'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload('heroBg', e.target.files[0])}
                />
              </label>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Stat 1 Value / Label</label>
              <input
                type="text"
                value={heroData.stat1Value}
                onChange={(e) => handleHeroChange('stat1Value', e.target.value)}
                className="w-full mb-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs border border-slate-700"
              />
              <input
                type="text"
                value={heroData.stat1Label}
                onChange={(e) => handleHeroChange('stat1Label', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 text-xs border border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Stat 2 Value / Label</label>
              <input
                type="text"
                value={heroData.stat2Value}
                onChange={(e) => handleHeroChange('stat2Value', e.target.value)}
                className="w-full mb-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs border border-slate-700"
              />
              <input
                type="text"
                value={heroData.stat2Label}
                onChange={(e) => handleHeroChange('stat2Label', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 text-xs border border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Stat 3 Value / Label</label>
              <input
                type="text"
                value={heroData.stat3Value}
                onChange={(e) => handleHeroChange('stat3Value', e.target.value)}
                className="w-full mb-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs border border-slate-700"
              />
              <input
                type="text"
                value={heroData.stat3Label}
                onChange={(e) => handleHeroChange('stat3Label', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 text-xs border border-slate-700"
              />
            </div>
          </div>
        </div>
      )}

      {/* SubTab 2: About 3A & Feature Pillars */}
      {activeSubTab === 'about' && (
        <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>Why Choose 3A & Master Craftsmanship</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Title Line 1
              </label>
              <input
                type="text"
                value={whyData.titleLine1}
                onChange={(e) => handleWhyChange('titleLine1', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Title Line 2 (Gold Emphasis)
              </label>
              <input
                type="text"
                value={whyData.titleLine2}
                onChange={(e) => handleWhyChange('titleLine2', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-amber-300 font-bold text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Description Paragraph 1
              </label>
              <textarea
                rows={2}
                value={whyData.description1}
                onChange={(e) => handleWhyChange('description1', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Description Paragraph 2
              </label>
              <textarea
                rows={2}
                value={whyData.description2}
                onChange={(e) => handleWhyChange('description2', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700"
              />
            </div>
          </div>

          {/* Pillars List */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              6 Core Quality Pillars
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whyData.pillars.map((pillar, idx) => (
                <div key={pillar.id} className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-amber-400">Pillar #{idx + 1}</span>
                    <input
                      type="text"
                      value={pillar.icon}
                      onChange={(e) => handlePillarChange(idx, 'icon', e.target.value)}
                      placeholder="Icon Tag"
                      className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs w-28 text-right border border-slate-700"
                    />
                  </div>
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => handlePillarChange(idx, 'title', e.target.value)}
                    placeholder="Pillar Title"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 text-white font-bold text-xs border border-slate-700"
                  />
                  <textarea
                    rows={2}
                    value={pillar.desc}
                    onChange={(e) => handlePillarChange(idx, 'desc', e.target.value)}
                    placeholder="Pillar Description"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs border border-slate-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SubTab 3: FAQs */}
      {activeSubTab === 'faqs' && (
        <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4" />
                <span>Customer FAQs Management</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Answer common questions regarding warranty, wire cut policies, shipping and fitment.
              </p>
            </div>

            <button
              onClick={handleOpenAddFaq}
              className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {db.faqs.map((faq, idx) => (
              <div key={faq.id || idx} className="p-4 rounded-xl bg-slate-900 border border-white/5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white flex items-center space-x-2">
                    <span className="text-amber-400 font-mono text-xs">Q{idx + 1}:</span>
                    <span>{faq.question}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={() => handleOpenEditFaq(faq)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Edit FAQ"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteFaqId(faq.id || idx)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit FAQ Modal */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0B1528] border border-amber-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsFaqModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">
              {editingFaq ? 'Edit FAQ' : 'Add FAQ'}
            </h3>

            <form onSubmit={handleFaqSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={faqFormData.question}
                  onChange={(e) => setFaqFormData(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="e.g. Will installing these void my car's manufacturer warranty?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={faqFormData.answer}
                  onChange={(e) => setFaqFormData(prev => ({ ...prev, answer: e.target.value }))}
                  placeholder="No. All 3A electronics use plug-and-play couplers..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-gradient text-slate-950 text-xs font-bold"
                >
                  {editingFaq ? 'Save FAQ' : 'Add FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete FAQ confirmation */}
      <ConfirmModal
        isOpen={deleteFaqId !== null}
        title="Delete FAQ?"
        message="Are you sure you want to remove this question and answer?"
        onConfirm={handleDeleteFaqConfirm}
        onCancel={() => setDeleteFaqId(null)}
      />

    </div>
  );
};
