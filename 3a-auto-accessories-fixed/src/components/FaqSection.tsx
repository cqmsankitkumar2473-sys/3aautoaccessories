import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Sparkles, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { FAQS } from '../data/products';
import { useContent } from '../context/ContentContext';

export const FaqSection: React.FC = () => {
  const { business, getWhatsAppUrl } = useContent();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleWhatsAppFaq = () => {
    const text = `Hi ${business.name}, I have a question about vehicle installation and accessories compatibility.`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <section id="faq" className="py-20 bg-[#070D1E] relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="text-gold-gradient">Questions</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Everything you need to know about warranty, zero-wire-cut installation, and delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="navy-card rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
                    <span className="text-amber-400 font-extrabold">Q.</span>
                    <span>{faq.question}</span>
                  </span>
                  <div className={`p-1.5 rounded-lg bg-white/5 text-amber-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-amber-500/20' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Prompt */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#0E1A33] to-[#0A1428] border border-amber-500/20 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white">Have a special query about your car model?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Our automotive technical team is available 7 days a week on WhatsApp.</p>
          </div>
          <button
            onClick={handleWhatsAppFaq}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask Us on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};

