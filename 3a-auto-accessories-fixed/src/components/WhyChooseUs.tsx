import React from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  Truck, 
  RotateCcw, 
  Award, 
  Headphones, 
  Sparkles
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const WhyChooseUs: React.FC = () => {
  const { business, whyChooseUs } = useContent();

  const dynamicPillars = (whyChooseUs?.pillars && whyChooseUs.pillars.length > 0)
    ? whyChooseUs.pillars
    : [
        {
          id: 'p1',
          icon: 'ShieldCheck',
          title: 'Zero Wire Cut Guarantee',
          desc: 'All electronics, infotainment systems, and LED setups use OEM-spec harness couplers to preserve 100% factory car warranty.'
        },
        {
          id: 'p2',
          icon: 'Award',
          title: 'Aerospace & OEM Quality',
          desc: 'From Italian nappa leather textures to aviation-grade copper cooling LED pipes, every accessory undergoes strict heat & durability trials.'
        },
        {
          id: 'p3',
          icon: 'Wrench',
          title: 'Master Fitment Techs',
          desc: 'Over 15 years of precision automotive craft. We handle flagship luxury SUVs, 4x4s, sedans, and high-end imports with millimeter accuracy.'
        },
        {
          id: 'p4',
          icon: 'Truck',
          title: 'Express Pan-India Shipping',
          desc: 'Secure tracked courier delivery across all Indian pin codes, complete with video installation guides & remote mechanic support.'
        },
        {
          id: 'p5',
          icon: 'RotateCcw',
          title: '1 to 3 Years Direct Warranty',
          desc: 'No endless claims or delay. Direct replacement assurance against LED burnout, leather seam defects, and electronic glitches.'
        },
        {
          id: 'p6',
          icon: 'Headphones',
          title: 'Direct WhatsApp Concierge',
          desc: 'Get fast 1-on-1 advice from experienced automotive modding specialists before and after your purchase.'
        }
      ];

  const pillarIcons = [
    <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    <Award className="w-6 h-6 text-amber-400" />,
    <Wrench className="w-6 h-6 text-blue-400" />,
    <Truck className="w-6 h-6 text-purple-400" />,
    <RotateCcw className="w-6 h-6 text-amber-300" />,
    <Headphones className="w-6 h-6 text-emerald-300" />
  ];

  return (
    <section id="why-us" className="py-20 bg-[#070D1E] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{whyChooseUs?.sectionTag || `About ${business.name}`}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {whyChooseUs?.titleLine1 || 'Driven by Passion for'} <br />
              <span className="text-gold-gradient">{whyChooseUs?.titleLine2 || 'Automotive Perfection'}</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {whyChooseUs?.description1 || business.aboutStory || (
                <>Founded with a commitment to automotive aesthetics and engineering excellence, <strong>{business.name}</strong> has become the trusted destination for car enthusiasts, families, and high-performance drivers seeking uncompromised luxury and safety.</>
              )}
            </p>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {whyChooseUs?.description2 || business.description || 'Whether you are taking delivery of a brand-new showroom vehicle or refreshing your trusted SUV, our team ensures every stitch, LED beam, and audio frequency is calibrated to perfection.'}
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="bg-[#0B1528] p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-black text-gold-gradient">{whyChooseUs?.yearsStat || (business.yearsInBusiness ? `${business.yearsInBusiness}+` : '15+')}</div>
                <div className="text-xs text-slate-400 mt-0.5">{whyChooseUs?.yearsStatLabel || 'Years of Automotive Tuning'}</div>
              </div>
              <div className="bg-[#0B1528] p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-black text-gold-gradient">{whyChooseUs?.vehiclesStat || '10,000+'}</div>
                <div className="text-xs text-slate-400 mt-0.5">{whyChooseUs?.vehiclesStatLabel || 'Vehicles Upgraded & Protected'}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-amber-500/20 via-slate-800 to-amber-500/10 shadow-2xl">
              <img
                src={whyChooseUs?.workshopImage || "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80"}
                alt={`${business.name} Workshop`}
                className="rounded-xl w-full h-[360px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-transparent to-transparent rounded-xl flex items-end p-6">
                <div className="bg-[#0B1528]/95 backdrop-blur-md p-4 rounded-xl border border-amber-400/30 w-full">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">{whyChooseUs?.studioTag || 'Flagship Fitting Studio'}</div>
                  <div className="text-sm font-semibold text-white mt-1">
                    {whyChooseUs?.studioDescription || 'Dust-free audio tuning bays, laser alignment stations & bespoke leather stitching studio.'}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dynamicPillars.map((p, idx) => (
            <div
              key={idx}
              className="navy-card rounded-2xl p-6 border border-white/10 hover:border-amber-400/40 transition-colors space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                {pillarIcons[idx % pillarIcons.length]}
              </div>
              <h3 className="text-base font-bold text-white">{p.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


