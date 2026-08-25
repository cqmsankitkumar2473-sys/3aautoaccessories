import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const FloatingWhatsApp: React.FC = () => {
  const { business, getWhatsAppUrl } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');
  const [carName, setCarName] = useState('');
  const [hasPrompted, setHasPrompted] = useState(false);

  useEffect(() => {
    // Show polite prompt after 6 seconds of browsing
    const timer = setTimeout(() => {
      if (!hasPrompted) {
        setIsOpen(true);
        setHasPrompted(true);
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [hasPrompted]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    const vehicleText = carName.trim() ? ` for my ${carName.trim()}` : '';
    const queryText = quickMessage.trim() || `Hi ${business.name}, I want to check accessory options and pricing for my car!`;
    
    const text = `Hello ${business.name}! 👋\n\n${queryText}${vehicleText}\n\nPlease share recommendations!`;
    window.open(getWhatsAppUrl(text), '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Interactive Popup Box */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-[#0B1528] rounded-2xl shadow-2xl border border-amber-500/40 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  {business.name.substring(0, 2).toUpperCase() || '3A'}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-700 rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">{business.name} Specialist</h4>
                <p className="text-[11px] text-emerald-100 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping inline-block mr-1" />
                  Online • Instant Reply
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Chat Bubble Form */}
          <div className="p-4 space-y-3 bg-[#070D1E]">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 leading-relaxed">
              👋 <strong>Hi there!</strong> Need help choosing the right 7D mats, LED headlights, Android screen or custom upgrades for your car? Ask us directly!
            </div>

            <form onSubmit={handleSendChat} className="space-y-2">
              <input
                type="text"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                placeholder="Your Car Model (e.g. Creta, Thar, Fortuner)..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 text-slate-100 text-xs border border-slate-700 focus:outline-none focus:border-amber-400"
              />

              <input
                type="text"
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                placeholder="What accessory are you looking for?"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 text-slate-100 text-xs border border-slate-700 focus:outline-none focus:border-amber-400"
              />

              <button
                type="submit"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md transition-transform hover:scale-102 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start WhatsApp Chat</span>
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        id="floating-whatsapp-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center space-x-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-2xl shadow-emerald-950/60 border border-emerald-400/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Open WhatsApp Chat"
      >
        {/* Pulsating Ring */}
        <span className="absolute -inset-0.5 rounded-full bg-emerald-400/40 animate-ping group-hover:hidden" style={{ animationDuration: '3s' }} />
        
        <MessageSquare className="w-5 h-5 relative z-10" />
        <span className="relative z-10 hidden sm:inline">WhatsApp Us</span>
      </button>

    </div>
  );
};
