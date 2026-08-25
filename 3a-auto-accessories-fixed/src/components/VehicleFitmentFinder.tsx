import React, { useState } from 'react';
import { 
  Car, 
  Check, 
  ChevronRight, 
  Sparkles, 
  MessageSquare, 
  Search, 
  CheckCircle2, 
  ShieldAlert, 
  SlidersHorizontal 
} from 'lucide-react';
import { POPULAR_VEHICLES, BUSINESS_INFO } from '../data/products';

interface VehicleFitmentFinderProps {
  onSearchVehicleAccessories: (vehicleQuery: string) => void;
}

export const VehicleFitmentFinder: React.FC<VehicleFitmentFinderProps> = ({ onSearchVehicleAccessories }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('Toyota');
  const [selectedModel, setSelectedModel] = useState<string>('Fortuner');
  const [selectedYear, setSelectedYear] = useState<string>('2022 - 2024 (Latest)');
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([
    '7D Floor Mats & Interior',
    'Laser Bi-LED Headlights'
  ]);

  const yearOptions = [
    '2024 - 2025 (All-New Gen)',
    '2021 - 2023 (Facelift)',
    '2017 - 2020 (Pre-Facelift)',
    '2016 & Prior'
  ];

  const upgradeOptions = [
    '7D Floor Mats & Interior',
    'Laser Bi-LED Headlights',
    '64-Color Ambient Cabin LED',
    '4K QLED Android & CarPlay',
    'Under-Seat Slim Subwoofer',
    '4K Front & Rear Dashcam',
    'Exterior Chrome & Spoiler',
    'Self-Healing TPU PPF & Tint'
  ];

  const currentModels = POPULAR_VEHICLES.find(b => b.brand === selectedBrand)?.models || [];

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const brandData = POPULAR_VEHICLES.find(b => b.brand === brand);
    if (brandData && brandData.models.length > 0) {
      setSelectedModel(brandData.models[0]);
    }
  };

  const toggleUpgrade = (upgrade: string) => {
    if (selectedUpgrades.includes(upgrade)) {
      setSelectedUpgrades(selectedUpgrades.filter(u => u !== upgrade));
    } else {
      setSelectedUpgrades([...selectedUpgrades, upgrade]);
    }
  };

  const handleWhatsAppFitmentInquiry = () => {
    const upgradeList = selectedUpgrades.length > 0 ? selectedUpgrades.join(', ') : 'All Essential Accessories';
    const message = encodeURIComponent(
      `Hello 3A Auto Accessories! 🚗\n\nI need guaranteed fitment accessories for my vehicle:\n- Car: ${selectedBrand} ${selectedModel}\n- Year/Model: ${selectedYear}\n- Desired Upgrades: ${upgradeList}\n\nPlease send me exact fitment options, pricing, and installation details!`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleBrowseTailoredProducts = () => {
    onSearchVehicleAccessories(selectedModel);
  };

  return (
    <section id="fitment-finder" className="py-20 bg-[#0A1224] relative overflow-hidden border-y border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Car className="w-3.5 h-3.5" />
            <span>Precision Fitment Guarantee</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive <span className="text-gold-gradient">Vehicle Fitment Finder</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Select your car make, model, and year to discover guaranteed compatible accessories with zero wire splicing and OEM-level finish.
          </p>
        </div>

        {/* Interactive Fitment Wizard Box */}
        <div className="navy-card rounded-2xl p-6 sm:p-8 border border-amber-500/20 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Step 1: Select Car Brand */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
                <span>Step 1: Select Car Brand</span>
                <span className="text-slate-400 font-normal text-[11px]">{POPULAR_VEHICLES.length} Brands</span>
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {POPULAR_VEHICLES.map((vehicle) => (
                  <button
                    key={vehicle.brand}
                    onClick={() => handleBrandChange(vehicle.brand)}
                    className={`px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      selectedBrand === vehicle.brand
                        ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                    }`}
                  >
                    <span className="truncate">{vehicle.brand}</span>
                    {selectedBrand === vehicle.brand && <Check className="w-3.5 h-3.5 ml-1 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Model & Year */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Step 2: Select {selectedBrand} Model
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
                  {currentModels.map((model) => (
                    <button
                      key={model}
                      onClick={() => setSelectedModel(model)}
                      className={`px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        selectedModel === model
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                      }`}
                    >
                      <span className="truncate">{model}</span>
                      {selectedModel === model && <Check className="w-3.5 h-3.5 ml-1 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Registration / Manufacturing Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 text-xs font-medium focus:outline-none focus:border-amber-400"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Desired Upgrades Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
                <span>Step 3: Desired Accessories</span>
                <span className="text-slate-400 font-normal text-[11px]">Select Multi</span>
              </label>
              <div className="grid grid-cols-1 gap-1.5 max-h-64 overflow-y-auto pr-1">
                {upgradeOptions.map((upgrade) => {
                  const isChecked = selectedUpgrades.includes(upgrade);
                  return (
                    <button
                      key={upgrade}
                      onClick={() => toggleUpgrade(upgrade)}
                      className={`px-3 py-2 rounded-lg text-left text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-amber-500/15 border border-amber-400/50 text-amber-300' 
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                      }`}
                    >
                      <span>{upgrade}</span>
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                        isChecked ? 'bg-amber-500 border-amber-500 text-black' : 'border-slate-600'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Fitment Result & Action Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 bg-black/40 p-4 rounded-xl">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center space-x-2">
                  <span>{selectedBrand} {selectedModel}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Fitment Verified ✓
                  </span>
                </div>
                <div className="text-xs text-slate-300">
                  {selectedUpgrades.length} Upgrades selected ({selectedYear}) • 100% Plug-and-Play Couplers
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                id="fitment-browse-catalog-btn"
                onClick={handleBrowseTailoredProducts}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 border border-slate-700 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Show {selectedModel} Products</span>
              </button>

              <button
                id="fitment-whatsapp-inquiry-btn"
                onClick={handleWhatsAppFitmentInquiry}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-105 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Fitment Advice</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
