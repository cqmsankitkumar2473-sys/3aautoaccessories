import React, { useState } from 'react';
import { 
  PhoneCall, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter, 
  Linkedin, 
  Save, 
  Globe,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useAdminData } from '../AdminDataContext';
import { SocialLinks, BusinessDetails } from '../../types/database';

export const ContactSocialView: React.FC = () => {
  const { db, saveSocialLinks, saveBusinessDetails, isSaving, showToast } = useAdminData();

  const [socials, setSocials] = useState<SocialLinks>({ ...db.socialLinks });
  const [businessContact, setBusinessContact] = useState<Partial<BusinessDetails>>({
    phone: db.business.phone,
    whatsappNumber: db.business.whatsappNumber,
    email: db.business.email,
    address: db.business.address,
    googleMapsUrl: db.business.googleMapsUrl,
    hours: db.business.hours
  });

  const handleSocialChange = (field: keyof SocialLinks, val: string) => {
    setSocials(prev => ({ ...prev, [field]: val }));
  };

  const handleContactChange = (field: keyof BusinessDetails, val: string) => {
    setBusinessContact(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save both
    const updatedBusiness: BusinessDetails = {
      ...db.business,
      phone: businessContact.phone || db.business.phone,
      whatsappNumber: (businessContact.whatsappNumber || db.business.whatsappNumber).replace(/\D/g, ''),
      email: businessContact.email || db.business.email,
      address: businessContact.address || db.business.address,
      googleMapsUrl: businessContact.googleMapsUrl || db.business.googleMapsUrl,
      hours: businessContact.hours || db.business.hours
    };

    const s1 = await saveBusinessDetails(updatedBusiness);
    const s2 = await saveSocialLinks(socials);

    if (s1 && s2) {
      showToast('Contact details and social links updated successfully!', 'success');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-300">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A1224] border border-amber-500/30">
        <div>
          <h2 className="text-lg font-black text-white flex items-center space-x-2">
            <PhoneCall className="w-5 h-5 text-amber-400" />
            <span>Contact Information & Social Links</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your official customer hotline, master WhatsApp line, showroom location, and social media channels.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-102 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving Changes...' : 'Save All Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Contact Channels (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
              <PhoneCall className="w-4 h-4" />
              <span>Direct Customer Channels</span>
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Master WhatsApp Number (e.g. 919876543210) *</span>
              </label>
              <input
                type="text"
                required
                value={businessContact.whatsappNumber || ''}
                onChange={(e) => handleContactChange('whatsappNumber', e.target.value.replace(/\D/g, ''))}
                placeholder="919876543210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-500/30 focus:outline-none focus:border-emerald-400"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Controls all WhatsApp quote buttons and floating chat widget globally.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Calling Hotline Number
              </label>
              <input
                type="text"
                value={businessContact.phone || ''}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Official Support Email
              </label>
              <input
                type="email"
                value={businessContact.email || ''}
                onChange={(e) => handleContactChange('email', e.target.value)}
                placeholder="support@3aautoaccessories.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Operating Days & Hours
              </label>
              <input
                type="text"
                value={businessContact.hours || ''}
                onChange={(e) => handleContactChange('hours', e.target.value)}
                placeholder="Mon - Sun: 9:30 AM - 9:00 PM (All 7 Days Open)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Physical Workshop Address
              </label>
              <textarea
                rows={3}
                value={businessContact.address || ''}
                onChange={(e) => handleContactChange('address', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Right: Social Media Handles & Google Maps (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Social Media Channels</span>
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>Instagram Profile URL</span>
              </label>
              <input
                type="url"
                value={socials.instagram}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                placeholder="https://instagram.com/3aautoaccessories"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
                <Facebook className="w-3.5 h-3.5 text-blue-400" />
                <span>Facebook Page URL</span>
              </label>
              <input
                type="url"
                value={socials.facebook}
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                placeholder="https://facebook.com/3aautoaccessories"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
                <Youtube className="w-3.5 h-3.5 text-rose-500" />
                <span>YouTube Channel URL</span>
              </label>
              <input
                type="url"
                value={socials.youtube}
                onChange={(e) => handleSocialChange('youtube', e.target.value)}
                placeholder="https://youtube.com/@3aautoaccessories"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
                <Twitter className="w-3.5 h-3.5 text-sky-400" />
                <span>Twitter / X Profile URL</span>
              </label>
              <input
                type="url"
                value={socials.twitter || ''}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                placeholder="https://twitter.com/3aauto"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Google Maps Studio Location URL</span>
              </label>
              <input
                type="url"
                value={businessContact.googleMapsUrl || ''}
                onChange={(e) => handleContactChange('googleMapsUrl', e.target.value)}
                placeholder="https://maps.google.com/?q=..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

      </div>

    </form>
  );
};
