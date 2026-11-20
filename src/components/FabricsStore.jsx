import React, { useState } from 'react';
import { useTailor } from '../context/TailorContext.jsx';
import { USAGE_CATEGORIES } from '../data/defaultData.js';
import { Scissors, ShoppingBag, Plus, Minus, Check, Sparkles, Filter, Search, Tag, Info } from 'lucide-react';

export const FabricsStore = () => {
  const {
    fabrics,
    brands,
    settings,
    addToCart,
    buyFabricWithStitch
  } = useTailor();

  // Tab: 'imported' | 'local'
  const [activeOrigin, setActiveOrigin] = useState('imported');
  // Brand filter: 'all' | string
  const [selectedBrand, setSelectedBrand] = useState('all');
  // Usage category filter: 'all' | string
  const [selectedUsage, setSelectedUsage] = useState('all');
  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Selected meters state per fabric: { [fabricId]: number }
  const [metersState, setMetersState] = useState(() => {
    const initial = {};
    fabrics.forEach(f => {
      const usageInfo = USAGE_CATEGORIES[f.usageCategory] || USAGE_CATEGORIES['shalwar-kameez'];
      initial[f.id] = f.minMeters || usageInfo.minMeters;
    });
    return initial;
  });

  // Success toast feedback for adding
  const [addedNotice, setAddedNotice] = useState(null);

  // Stepper handlers
  const handleMeterChange = (fabric, newMeters) => {
    const usageInfo = USAGE_CATEGORIES[fabric.usageCategory] || USAGE_CATEGORIES['shalwar-kameez'];
    const min = fabric.minMeters || usageInfo.minMeters;
    const max = fabric.maxMeters || settings.globalMaxMeterLimit || 18.00;

    let val = parseFloat(newMeters);
    if (isNaN(val)) val = min;

    // Round to nearest 0.25
    val = Math.round(val * 4) / 4;

    if (val < min) val = min;
    if (val > max) val = max;

    setMetersState(prev => ({ ...prev, [fabric.id]: val }));
  };

  const stepMeters = (fabric, delta) => {
    const current = metersState[fabric.id] || fabric.minMeters || 4.0;
    handleMeterChange(fabric, current + delta);
  };

  // Add Unstitched Fabric to Bag
  const handleAddUnstitchedToBag = (fabric) => {
    const meters = metersState[fabric.id] || fabric.minMeters || 4.0;
    const itemTotal = Math.round(meters * fabric.pricePerMeter);

    addToCart({
      type: 'unstitched-fabric',
      fabricId: fabric.id,
      title: `${fabric.name} (${meters}m Unstitched)`,
      fabricName: fabric.name,
      brand: fabric.brand,
      origin: fabric.origin,
      meters: meters,
      pricePerMeter: fabric.pricePerMeter,
      usageCategory: fabric.usageCategory,
      image: fabric.image,
      quantity: 1,
      itemTotal: itemTotal
    });

    setAddedNotice(`Added ${meters}m of ${fabric.name} to Bag!`);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  // Filter fabrics
  const currentBrands = brands[activeOrigin] || [];
  const filteredFabrics = fabrics.filter(f => {
    if (f.origin !== activeOrigin) return false;
    if (selectedBrand !== 'all' && f.brand !== selectedBrand) return false;
    if (selectedUsage !== 'all' && f.usageCategory !== selectedUsage) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = f.name.toLowerCase().includes(q);
      const matchBrand = f.brand.toLowerCase().includes(q);
      const matchDesc = (f.description || '').toLowerCase().includes(q);
      const matchTag = (f.tags || []).some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchBrand && !matchDesc && !matchTag) return false;
    }
    return true;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Editorial Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-obsidian-700/80 p-8 sm:p-12 mb-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-champagne-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/10 border border-champagne-500/25 text-champagne-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Mill Rolls & Heritage Bolts
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide leading-tight mb-4">
            Fine Unstitched Fabrics
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            Hand-selected premium English worsted wools, Egyptian Giza cottons, natural Irish linens, and legendary Pakistani 8-Pound Boski silk. Purchase cut-length unstitched fabric or pair instantly with our master bespoke tailoring service.
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1.5 bg-obsidian-800/80 px-3 py-1.5 rounded-lg border border-obsidian-700">
              <span className="w-2 h-2 rounded-full bg-champagne-400"></span>
              Strict 0.25m Precision Cuts
            </div>
            <div className="flex items-center gap-1.5 bg-obsidian-800/80 px-3 py-1.5 rounded-lg border border-obsidian-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Max {settings.globalMaxMeterLimit || 18}m Continuous Bolt
            </div>
            <div className="flex items-center gap-1.5 bg-obsidian-800/80 px-3 py-1.5 rounded-lg border border-obsidian-700">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Free Atelier Cutting & Shrink-Press
            </div>
          </div>
        </div>
      </div>

      {/* Main Origin Tabs: Imported vs Local */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-obsidian-800 pb-5 mb-8">
        <div className="flex items-center bg-obsidian-900 p-1.5 rounded-xl border border-obsidian-700/80 shadow-md">
          <button
            onClick={() => {
              setActiveOrigin('imported');
              setSelectedBrand('all');
            }}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeOrigin === 'imported'
                ? 'bg-gradient-to-r from-champagne-500 to-champagne-600 text-obsidian-950 shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>Imported Fabrics</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              activeOrigin === 'imported' ? 'bg-obsidian-950/20 text-obsidian-950 font-black' : 'bg-obsidian-800 text-gray-400'
            }`}>
              {fabrics.filter(f => f.origin === 'imported').length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveOrigin('local');
              setSelectedBrand('all');
            }}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeOrigin === 'local'
                ? 'bg-gradient-to-r from-champagne-500 to-champagne-600 text-obsidian-950 shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>Local & Heritage</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              activeOrigin === 'local' ? 'bg-obsidian-950/20 text-obsidian-950 font-black' : 'bg-obsidian-800 text-gray-400'
            }`}>
              {fabrics.filter(f => f.origin === 'local').length}
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by fabric, brand, or tag..."
            className="w-full bg-obsidian-900 border border-obsidian-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-champagne-500 transition-colors"
          />
        </div>
      </div>

      {/* Brand Sub-Categories Bar */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
          <Filter className="w-3.5 h-3.5 text-champagne-400" />
          <span>Filter by Brand:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedBrand('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedBrand === 'all'
                ? 'bg-champagne-500/20 text-champagne-300 border border-champagne-500/50'
                : 'bg-obsidian-900 text-gray-400 border border-obsidian-800 hover:border-obsidian-700 hover:text-white'
            }`}
          >
            All Brands
          </button>
          {currentBrands.map(b => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedBrand === b
                  ? 'bg-champagne-500/20 text-champagne-300 border border-champagne-500/50'
                  : 'bg-obsidian-900 text-gray-400 border border-obsidian-800 hover:border-obsidian-700 hover:text-white'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Usage Category Sub-Filter */}
      <div className="mb-8 flex flex-wrap items-center gap-2 bg-obsidian-900/60 p-2 rounded-xl border border-obsidian-800/80">
        <span className="text-xs text-gray-400 font-medium px-2">Usage Category:</span>
        <button
          onClick={() => setSelectedUsage('all')}
          className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
            selectedUsage === 'all'
              ? 'bg-obsidian-800 text-champagne-400 font-bold border border-champagne-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          All Categories
        </button>
        {Object.entries(USAGE_CATEGORIES).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => setSelectedUsage(key)}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
              selectedUsage === key
                ? 'bg-obsidian-800 text-champagne-400 font-bold border border-champagne-500/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {cat.label} (Min {cat.minMeters}m)
          </button>
        ))}
      </div>

      {/* Toast Feedback */}
      {addedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-champagne-500 text-obsidian-950 font-bold text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce border border-champagne-300">
          <Check className="w-4 h-4 text-obsidian-950 stroke-[3]" />
          {addedNotice}
        </div>
      )}

      {/* Fabrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFabrics.map((fabric) => {
          const usageInfo = USAGE_CATEGORIES[fabric.usageCategory] || USAGE_CATEGORIES['shalwar-kameez'];
          const minMeters = fabric.minMeters || usageInfo.minMeters;
          const maxMeters = fabric.maxMeters || settings.globalMaxMeterLimit || 18.00;
          const currentMeters = metersState[fabric.id] || minMeters;
          const totalPrice = Math.round(currentMeters * fabric.pricePerMeter);

          return (
            <div
              key={fabric.id}
              className="group bg-obsidian-900 border border-obsidian-750 hover:border-champagne-500/60 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1"
            >
              {/* Product Visual Container */}
              <div className="relative h-64 w-full bg-obsidian-950 overflow-hidden">
                <img
                  src={fabric.image}
                  alt={fabric.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Brand Badge */}
                <div className="absolute top-3 left-3 bg-obsidian-950/85 backdrop-blur-md border border-obsidian-700/80 px-2.5 py-1 rounded-md text-[10px] font-bold text-champagne-400 tracking-wider uppercase">
                  {fabric.brand}
                </div>

                {/* Origin Badge */}
                <div className="absolute top-3 right-3 bg-obsidian-950/85 backdrop-blur-md border border-obsidian-700/80 px-2.5 py-1 rounded-md text-[10px] font-bold text-gray-300 tracking-wider uppercase">
                  {fabric.origin === 'imported' ? 'Imported Mill' : 'Heritage Pakistani'}
                </div>

                {/* Usage Category Floating Pill */}
                <div className="absolute bottom-3 left-3 right-3 bg-obsidian-950/90 backdrop-blur-md border border-obsidian-700/80 px-3 py-1.5 rounded-lg flex items-center justify-between text-xs">
                  <span className="text-gray-400 text-[11px]">Usage:</span>
                  <span className="font-semibold text-gray-200 text-[11px]">{usageInfo.label}</span>
                </div>
              </div>

              {/* Product Info & Stepper */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white mb-1 group-hover:text-champagne-400 transition-colors">
                    {fabric.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                    {fabric.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {(fabric.tags || []).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-obsidian-950 text-gray-400 px-2 py-0.5 rounded border border-obsidian-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Precision Meter Selector Rules & Price */}
                <div className="pt-4 border-t border-obsidian-800 space-y-4">
                  
                  {/* Price Rate Display */}
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-gray-400">Rate per Meter:</span>
                      <div className="text-base font-bold text-champagne-400 font-mono">
                        {settings.currency} {fabric.pricePerMeter.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">Total Calculation:</span>
                      <div className="text-xl font-extrabold text-white font-mono">
                        {settings.currency} {totalPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Meter Stepper (0.25m steps) */}
                  <div className="bg-obsidian-950 p-2.5 rounded-xl border border-obsidian-800">
                    <div className="flex items-center justify-between text-[11px] text-gray-400 mb-2">
                      <span>Cut Length (0.25m step):</span>
                      <span className="text-champagne-400/80 font-mono font-medium">
                        Min: {minMeters.toFixed(2)}m • Max: {maxMeters.toFixed(2)}m
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => stepMeters(fabric, -0.25)}
                        disabled={currentMeters <= minMeters}
                        className="w-10 h-10 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 disabled:opacity-30 disabled:hover:bg-obsidian-800 text-white flex items-center justify-center font-bold text-sm transition-colors border border-obsidian-700"
                        title="Decrease by 0.25 meter"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <div className="flex-1 text-center flex items-center justify-center gap-1">
                        <input
                          type="number"
                          step="0.25"
                          min={minMeters}
                          max={maxMeters}
                          value={currentMeters}
                          onChange={(e) => handleMeterChange(fabric, e.target.value)}
                          className="w-20 bg-transparent text-center font-mono text-lg font-bold text-white focus:outline-none focus:text-champagne-400"
                        />
                        <span className="text-sm font-semibold text-gray-400">Meters</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => stepMeters(fabric, +0.25)}
                        disabled={currentMeters >= maxMeters}
                        className="w-10 h-10 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 disabled:opacity-30 disabled:hover:bg-obsidian-800 text-white flex items-center justify-center font-bold text-sm transition-colors border border-obsidian-700"
                        title="Increase by 0.25 meter"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Dual Action CTAs */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => handleAddUnstitchedToBag(fabric)}
                      className="w-full bg-obsidian-800 hover:bg-obsidian-750 text-gray-200 hover:text-white py-2.5 px-3 rounded-xl border border-obsidian-700 hover:border-gray-500 font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-1.5 shadow"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-champagne-400" />
                      <span>Add Unstitched</span>
                    </button>

                    <button
                      onClick={() => buyFabricWithStitch(fabric, currentMeters)}
                      className="w-full bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-400 hover:to-champagne-500 text-obsidian-950 py-2.5 px-3 rounded-xl font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-md shadow-champagne-500/10 hover:shadow-champagne-500/25"
                    >
                      <Scissors className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Buy + Stitch</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredFabrics.length === 0 && (
        <div className="text-center py-20 bg-obsidian-900/40 rounded-2xl border border-obsidian-800">
          <Info className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No matching fabrics found</h3>
          <p className="text-xs text-gray-400">Try clearing filters or search keywords.</p>
        </div>
      )}

    </div>
  );
};
