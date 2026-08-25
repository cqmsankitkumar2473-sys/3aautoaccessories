import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Image, 
  Save, 
  Sparkles, 
  Upload, 
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useAdminData } from '../AdminDataContext';
import { BusinessDetails } from '../../types/database';

export const BusinessDetailsView: React.FC = () => {
  const { db, saveBusinessDetails, isSaving, uploadImage, showToast } = useAdminData();
  const [formData, setFormData] = useState<BusinessDetails>({ ...db.business });
  const [isUploading, setIsUploading] = useState<string | null>(null);

  const handleInputChange = (field: keyof BusinessDetails, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (field: 'logoUrl' | 'ownerPhotoUrl' | 'businessPhotoUrl', file: File) => {
    const reader = new FileReader();
    setIsUploading(field);
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      const res = await uploadImage(dataUrl, `${field}_${file.name}`);
      if (res.success && res.url) {
        handleInputChange(field, res.url);
      }
      setIsUploading(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Business Name is required', 'error');
      return;
    }
    await saveBusinessDetails(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A1224] border border-amber-500/30">
        <div>
          <h2 className="text-lg font-black text-white">Business & Owner Profile</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Changes made here instantly update the public navbar, footer, about section, and contact blocks.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-102 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <span className="inline-flex items-center space-x-2">
              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </span>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Live Public Display Badge Preview */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#0C162A] to-amber-500/5 border border-amber-400/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-amber-400/40 overflow-hidden flex items-center justify-center shrink-0">
            {formData.ownerPhotoUrl ? (
              <img src={formData.ownerPhotoUrl} alt={formData.ownerName} className="w-full h-full object-cover" />
            ) : (
              <div className="font-bold text-amber-400 text-xl font-brand">
                {formData.ownerName ? formData.ownerName.charAt(0) : '3A'}
              </div>
            )}
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-amber-400 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Public Representation</span>
            </div>
            <div className="text-xl font-extrabold text-white mt-0.5">
              {formData.name || '3A Auto Accessories'}
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              Owner: <strong className="text-amber-300 font-bold">{formData.ownerName || 'Ankit Kumar'}</strong> • {formData.city}, {formData.state}
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400 bg-slate-900/80 p-3 rounded-xl border border-white/5 md:text-right">
          <div className="text-emerald-400 font-semibold flex items-center md:justify-end space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Real-time Public Website Synchronization Active</span>
          </div>
          <div className="text-[11px] mt-0.5">Editing values below will update the live site upon clicking "Save Changes".</div>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Business & Owner Identity (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span>Store Identity & Owner Info</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Business / Store Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="3A Auto Accessories"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Owner Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  placeholder="e.g. Ankit Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Business Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
                placeholder="Premium Automotive Styling, High-Tech Electronics & Luxury Upgrades"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Business Description (Homepage & Hero)
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                About / Workshop Heritage Story
              </label>
              <textarea
                rows={3}
                value={formData.aboutStory}
                onChange={(e) => handleInputChange('aboutStory', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Years in Business
                </label>
                <input
                  type="text"
                  value={formData.yearsInBusiness}
                  onChange={(e) => handleInputChange('yearsInBusiness', e.target.value)}
                  placeholder="15+ Years of Automotive Craftsmanship"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Total Customer Ratings Display
                </label>
                <input
                  type="text"
                  value={formData.totalReviews}
                  onChange={(e) => handleInputChange('totalReviews', e.target.value)}
                  placeholder="1,850+ Verified Ratings"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Location & Physical Store */}
          <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Physical Workshop Location</span>
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Street Address
              </label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="3A Auto Accessories Studio, Main Ring Road, Sector 18..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="New Delhi"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Delhi NCR"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Pincode
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="110001"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Google Maps Directions URL
              </label>
              <input
                type="url"
                value={formData.googleMapsUrl}
                onChange={(e) => handleInputChange('googleMapsUrl', e.target.value)}
                placeholder="https://maps.google.com/?q=..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Contact Channels & Media (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct Channels */}
          <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Contact Numbers & WhatsApp</span>
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Master WhatsApp Number (Digits only with country code) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.whatsappNumber}
                  onChange={(e) => handleInputChange('whatsappNumber', e.target.value.replace(/\D/g, ''))}
                  placeholder="919876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-emerald-400 font-bold text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-emerald-400"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Used for all 1-click WhatsApp quotes, product inquiries, and fitment requests across the entire site.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Display Phone Number *
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Customer Support Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="support@3aautoaccessories.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Working Days & Hours
              </label>
              <input
                type="text"
                value={formData.hours}
                onChange={(e) => handleInputChange('hours', e.target.value)}
                placeholder="Mon - Sun: 9:30 AM - 9:00 PM (All 7 Days Open)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Owner Photo & Workshop Photos */}
          <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
              <Image className="w-4 h-4" />
              <span>Branding & Owner Photos</span>
            </h3>

            {/* Owner Photo */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Owner Photo URL / Upload
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={formData.ownerPhotoUrl || ''}
                  onChange={(e) => handleInputChange('ownerPhotoUrl', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700 focus:outline-none focus:border-amber-400"
                />
                <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer shrink-0 border border-slate-700">
                  <Upload className="w-3.5 h-3.5 inline mr-1" />
                  <span>{isUploading === 'ownerPhotoUrl' ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('ownerPhotoUrl', e.target.files[0])}
                  />
                </label>
              </div>
            </div>

            {/* Workshop / Studio Photo */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Workshop / Studio Photo
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={formData.businessPhotoUrl || ''}
                  onChange={(e) => handleInputChange('businessPhotoUrl', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700 focus:outline-none focus:border-amber-400"
                />
                <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer shrink-0 border border-slate-700">
                  <Upload className="w-3.5 h-3.5 inline mr-1" />
                  <span>{isUploading === 'businessPhotoUrl' ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('businessPhotoUrl', e.target.files[0])}
                  />
                </label>
              </div>
            </div>
          </div>

        </div>

      </div>

    </form>
  );
};
