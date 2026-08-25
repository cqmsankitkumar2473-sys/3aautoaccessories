import React from 'react';
import { 
  Sparkles, 
  Armchair, 
  SunMedium, 
  Radio, 
  CarFront, 
  ShieldCheck, 
  Wrench,
  ArrowRight
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface CategoryShowcaseProps {
  onSelectCategory: (categoryId: string) => void;
  activeCategory: string;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
  activeCategory
}) => {
  const { categories, products } = useContent();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Armchair': return <Armchair className="w-6 h-6" />;
      case 'SunMedium': return <SunMedium className="w-6 h-6" />;
      case 'Radio': return <Radio className="w-6 h-6" />;
      case 'CarFront': return <CarFront className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const getCategoryCount = (catId: string) => {
    return products.filter(p => p.category === catId).length;
  };

  return (
    <section id="categories" className="py-20 bg-[#070D1E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Tailored Collections</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore By <span className="text-gold-gradient">Product Category</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              From cockpit luxury leather to laser highway lighting and high-fidelity audio systems.
            </p>
          </div>

          <a 
            href="#products" 
            onClick={() => onSelectCategory('all')}
            className="inline-flex items-center space-x-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View All Accessories ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.filter(c => c.id !== 'all').map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`navy-card navy-card-hover rounded-2xl p-6 cursor-pointer border transition-all relative overflow-hidden group ${
                  isSelected ? 'border-amber-400 shadow-xl shadow-amber-500/10 bg-gradient-to-b from-[#16274e] to-[#0d1730]' : 'border-white/10'
                }`}
              >
                {/* Background ambient corner glow */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />

                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    {getIcon(cat.icon)}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {count} Products
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-amber-400/90 font-semibold">
                  <span>Browse Category</span>
                  <span className="text-slate-500 text-[11px]">100% Fitment</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

