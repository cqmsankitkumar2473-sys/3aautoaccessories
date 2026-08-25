import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Mail, 
  Send, 
  CheckCircle2, 
  Car, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const ContactSection: React.FC = () => {
  const { business, getWhatsAppUrl } = useContent();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [carDetails, setCarDetails] = useState('');
  const [accessoryNeed, setAccessoryNeed] = useState('Full Interior & Cockpit Upgrade');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const whatsappMessage = 
      `Hello ${business.name}! 🚗\n\n` +
      `I would like to enquire about accessories for my car:\n` +
      `👤 *Name:* ${name.trim()}\n` +
      `📞 *Phone:* ${phone.trim()}\n` +
      `🚘 *Vehicle Model & Year:* ${carDetails.trim() || 'Not specified'}\n` +
      `🎯 *Upgrade Requirement:* ${accessoryNeed}\n` +
      `💬 *Specific Notes:* ${message.trim() || 'Please share product catalogue & pricing.'}\n\n` +
      `Please contact me with fitment details and best pricing!`;

    // Open WhatsApp
    window.open(getWhatsAppUrl(whatsappMessage), '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#0A1224] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Fast Consultation & Store Visits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Connect with <span className="text-gold-gradient">{business.name}</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Get instant quotes, check stock availability for your specific car model, or schedule a workshop fitting session.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Studio Address */}
          <div className="lg:col-span-5 space-y-6">
            <div className="navy-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
              
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>Flagship Studio & Support</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Phone */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Call Direct Support</div>
                    <a href={`tel:${business.phone}`} className="text-amber-400 hover:underline font-semibold block mt-0.5">
                      {business.phone}
                    </a>
                    <div className="text-[11px] text-slate-400">Available 9:30 AM – 9:00 PM</div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Instant WhatsApp Line</div>
                    <a 
                      href={getWhatsAppUrl('Hi! I would like to enquire about car accessories.')}
                      target="_blank" 
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline font-semibold block mt-0.5"
                    >
                      Chat on WhatsApp ({business.whatsappNumber})
                    </a>
                    <div className="text-[11px] text-slate-400">Instant responses in under 2 mins</div>
                  </div>
                </div>

                {/* Studio Location */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Workshop & Fitting Bay</div>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      {business.address}
                    </p>
                    <a 
                      href={business.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(business.address)}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-amber-400 hover:underline text-xs font-semibold inline-flex items-center space-x-1 mt-1"
                    >
                      <span>Get Driving Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Working Hours</div>
                    <p className="text-slate-300 mt-0.5">{business.hours}</p>
                    <div className="text-[11px] text-emerald-400 font-semibold">Open All 7 Days for Fitting</div>
                  </div>
                </div>

              </div>

              {/* Direct Quick WhatsApp Banner */}
              <div className="pt-2">
                <a
                  href={getWhatsAppUrl(`Hi ${business.name}, I would like to schedule a fitting appointment.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-102"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Book Installation Appointment</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right: Interactive Enquiry & WhatsApp Quote Form */}
          <div className="lg:col-span-7">
            <div className="navy-card rounded-2xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl relative">
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    Request Fast Quote & Fitment Check
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill in your requirements — opens direct in WhatsApp for instant reply & images!
                  </p>
                </div>
                <div className="hidden sm:flex w-10 h-10 rounded-full bg-amber-500/20 items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-bold flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Inquiry sent to WhatsApp! Our specialist will respond shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 XXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Car Make, Model & Year
                    </label>
                    <input
                      type="text"
                      value={carDetails}
                      onChange={(e) => setCarDetails(e.target.value)}
                      placeholder="e.g. Mahindra Thar 2023 / Fortuner"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Accessory / Upgrade Category
                    </label>
                    <select
                      value={accessoryNeed}
                      onChange={(e) => setAccessoryNeed(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                    >
                      <option value="Full Interior & Cockpit Upgrade">Full Interior & Cockpit Upgrade</option>
                      <option value="7D Diamond Leather Mats">7D Diamond Leather Mats</option>
                      <option value="Bi-LED / Laser Headlight Projectors">Bi-LED / Laser Headlight Projectors</option>
                      <option value="Android Infotainment & CarPlay Screen">Android Infotainment & CarPlay Screen</option>
                      <option value="64-Color Symphony Ambient Lighting">64-Color Symphony Ambient Lighting</option>
                      <option value="Underseat Subwoofer & Audio Upgrade">Underseat Subwoofer & Audio Upgrade</option>
                      <option value="Dual 4K Dashcam Setup">Dual 4K Dashcam Setup</option>
                      <option value="Self Healing PPF & Ceramic Film">Self Healing PPF & Ceramic Film</option>
                      <option value="Full Vehicle Exterior Aero Styling">Full Vehicle Exterior Aero Styling</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Any Specific Requirements / Questions
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Please share video of ambient light colors and confirm doorstep installation time in my city..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gold-gradient bg-gold-gradient-hover text-slate-950 font-black text-sm flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to WhatsApp (Instant Reply)</span>
                  </button>
                  <div className="mt-2 text-center text-[11px] text-slate-400">
                    🔒 Zero Spam • Direct Consultation with {business.name} Certified Master Fitters
                  </div>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

