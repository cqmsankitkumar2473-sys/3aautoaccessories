import React, { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  Eye, 
  X, 
  ChevronRight, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { GalleryItem } from '../types/database';
import { useContent } from '../context/ContentContext';

export const ShowroomGallery: React.FC = () => {
  const { gallery, business, getWhatsAppUrl } = useContent();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const enabledGallery = gallery.filter(g => g.enabled !== false);

  // Extract unique categories from gallery
  const categoriesInGallery = Array.from(new Set(enabledGallery.map(g => g.category)));
  const filters = ['All', ...categoriesInGallery];

  const filteredItems = selectedFilter === 'All' 
    ? enabledGallery 
    : enabledGallery.filter(item => item.category === selectedFilter);

  const handleWhatsAppMakeover = (item: GalleryItem) => {
    const message = `Hello ${business.name}! I saw the "${item.title}" in your gallery showcase. Can I get a similar installation and quote for my car?`;
    window.open(getWhatsAppUrl(message), '_blank');
  };

  return (
    <section id="gallery" className="py-20 bg-[#070D1E] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Master Technician Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Showroom & <span className="text-gold-gradient">Installation Gallery</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Take a look at real vehicle transformations executed at our precision tuning and installation bay.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="navy-card navy-card-hover rounded-2xl overflow-hidden border border-white/10 group cursor-pointer relative"
            >
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                
                {/* Category Pill */}
                <div className="absolute top-3 left-3 bg-[#070D1E]/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-400 border border-amber-400/30">
                  {item.category} Makeover
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-lg bg-black/80 text-white text-xs font-semibold border border-amber-400/40 flex items-center space-x-1.5 backdrop-blur-sm">
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Project</span>
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-amber-400 font-semibold">
                  <span>View Full Details</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setActiveItem(null)}
          >
            <div 
              className="relative max-w-3xl w-full bg-[#0B1528] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] bg-black">
                <img 
                  src={activeItem.image} 
                  alt={activeItem.title} 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-2 text-xs text-amber-400 font-bold uppercase">
                  <span>{activeItem.category} Upgrade</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 font-normal">Executed by {business.name} Master Fitters</span>
                </div>
                <h3 className="text-xl font-bold text-white">{activeItem.title}</h3>
                <p className="text-sm text-slate-300">{activeItem.description}</p>

                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Factory Warranty Safe • Zero Wire Cut</span>
                  </div>

                  <button
                    onClick={() => handleWhatsAppMakeover(activeItem)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire About Similar Upgrade</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

