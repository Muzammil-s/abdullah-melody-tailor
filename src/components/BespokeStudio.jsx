import React, { useState, useEffect } from 'react';
import { useTailor } from '../context/TailorContext.jsx';
import {
  COLLAR_SPECIFICATIONS,
  BAN_SPECIFICATIONS,
  BAN_SIZES,
  POCKET_OPTIONS,
  BUTTON_OPTIONS,
  SHOULDER_SLOPES,
  getManifestImage
} from '../data/defaultData.js';
import {
  Ruler,
  Scissors,
  Check,
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
  Sparkles,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

export const BespokeStudio = () => {
  const {
    settings,
    addToCart,
    setCurrentView,
    preselectedFabric,
    setPreselectedFabric
  } = useTailor();

  // 4-Step Bespoke Wizard
  // Step 1: Select Garment
  // Step 2: Select Styling & Design Boxes
  // Step 3: Enter Measurements (All in Inches)
  // Step 4: Review Bespoke Tailor Card & Add to Bag
  const [currentStep, setCurrentStep] = useState(1);

  // 10 Core Garments Definition
  const garments = [
    {
      id: 'shalwar-kameez',
      title: 'Shalwar Kameez',
      subtitle: 'Pakistani National Attire',
      basePrice: settings.stitchingRates['shalwar-kameez'] || 2800,
      image: getManifestImage('shalwar-kameez', '/images/garments/shalwar-kameez.jpg'),
      description: 'Handcrafted master cut with custom collar, ban, pockets, patti, and daman.'
    },
    {
      id: 'kurta-pajama',
      title: 'Kurta Pajama',
      subtitle: 'Royal Ivory Heritage Cut',
      basePrice: settings.stitchingRates['kurta-pajama'] || 2600,
      image: getManifestImage('kurta-pajama', '/images/garments/kurta-pajama.jpg'),
      description: 'Straight-cut traditional kurta paired with bespoke straight-leg pajama.'
    },
    {
      id: 'dress-shirt',
      title: 'Bespoke Dress Shirt',
      subtitle: 'Formal Savile Row Fit',
      basePrice: settings.stitchingRates['dress-shirt'] || 1800,
      image: getManifestImage('dress-shirt', '/images/garments/dress-shirt.jpg'),
      description: 'Precision collar spreads, French or barrel cuffs, and split back yoke.'
    },
    {
      id: 'sleeping-suit',
      title: 'Sleeping Suit',
      subtitle: 'Luxury Bespoke Loungewear',
      basePrice: settings.stitchingRates['sleeping-suit'] || 2200,
      image: getManifestImage('sleeping-suit', '/images/garments/sleeping-suit.jpg'),
      description: 'Soft piped collar shirt with relaxed elasticated pajama trousers.'
    },
    {
      id: 'police-uniform',
      title: 'Pakistan Police Uniform',
      subtitle: 'Official Regulated Cut',
      basePrice: settings.stitchingRates['police-uniform'] || 3200,
      image: getManifestImage('police-uniform', '/images/garments/police-uniform.jpg'),
      description: 'Box-pleated chest pockets, star epaulettes, and reinforced utility trousers.'
    },
    {
      id: 'fia-uniform',
      title: 'FIA Executive Uniform',
      subtitle: 'Federal Law Enforcement',
      basePrice: settings.stitchingRates['fia-uniform'] || 3400,
      image: getManifestImage('fia-uniform', '/images/garments/fia-uniform.jpg'),
      description: 'Executive dark navy tactical cut with shoulder epaulettes and rank badge slots.'
    },
    {
      id: 'kurta-shalwar',
      title: 'Kurta Shalwar',
      subtitle: 'Festive & Wedding Elegance',
      basePrice: settings.stitchingRates['kurta-shalwar'] || 2800,
      image: getManifestImage('kurta-shalwar', '/images/garments/kurta-shalwar.jpg'),
      description: 'Festive resham-embroidered collar and placket with classic draped shalwar.'
    },
    {
      id: 'waistcoat',
      title: 'Waistcoat (Wasket)',
      subtitle: 'Traditional Nehru Layering',
      basePrice: settings.stitchingRates['waistcoat'] || 3500,
      image: getManifestImage('waistcoat', '/images/garments/waistcoat.jpg'),
      description: 'Regal Ban, Gol, or V-neck with 6 shoulder slope alignments and cross-back.'
    },
    {
      id: 'coat-pant',
      title: 'Coat Pant (Lounge Suit)',
      subtitle: 'Master Handcrafted 2-Piece',
      basePrice: settings.stitchingRates['coat-pant'] || 12500,
      image: getManifestImage('coat-pant', '/images/garments/coat-pant.jpg'),
      description: 'Prince Coat, Long Coat, or Sport Coat with custom lapels, vents, and trousers.'
    },
    {
      id: 'safari-suit',
      title: 'Safari Suit',
      subtitle: 'Classic Field & Executive Cut',
      basePrice: settings.stitchingRates['safari-suit'] || 6500,
      image: getManifestImage('safari-suit', '/images/garments/safari-suit.jpg'),
      description: '4 pleated patch pockets, camp or shirt collar, with or without waist belt.'
    }
  ];

  // Selected Garment
  const [selectedGarment, setSelectedGarment] = useState(garments[0]);

  // Design Selections State
  const [designs, setDesigns] = useState({
    // Shalwar Kameez
    collar: COLLAR_SPECIFICATIONS[0], // A1
    banStyle: BAN_SPECIFICATIONS[0], // B1
    banSize: '1.25"',
    pocket: POCKET_OPTIONS[0], // 4
    button: BUTTON_OPTIONS[0], // A
    pattiWidth: '1.25"',
    pattiStyle: 'Ghum Patti', // Straight, Pointed, Ghum Patti, Fold Patti
    daman: 'Straight', // Straight, Gol / Round
    sewing: 'Double Sewing', // Single Sewing, Double Sewing
    pancha: 'Net Jali Pancha', // Plain, Net Jali Pancha, Dori wala Pancha

    // Waistcoat
    waistcoatCut: 'Without Sleeves', // 'Without Sleeves' | 'Cross-back'
    waistcoatNeckline: 'Ban Neck', // 'Ban Neck' | 'Gol (Round)' | 'V-Neck'
    shoulderSlope: SHOULDER_SLOPES[0], // Normal Down

    // Coat / Pant
    coatBack: 'Half-back', // 'Cross-back' | 'Half-back'
    coatCategory: 'Long Coat', // 'Prince Coat' | 'Long Coat' | 'Sport Coat'
    princeButtons: 'Six Button',
    princeBan: 'B2', // B2 or B4
    coatChokeType: 'With Choke', // 'With Choke' | 'Without Choke'
    coatChokeSub: 'Back Single Choke', // 'Side Choke' | 'Back Single Choke'
    princeGhera: 'Straight', // 'Round' | 'Straight'
    longCoatButtons: 'Two Button', // One, Two, Three Button
    longCoatPockets: 'Cross Pocket', // Cross Pocket, Normal Flap Pocket
    ticketPocket: true,
    lapelType: 'Peak Collar', // Peak Collar, Normal Collar
    lapelWidth: '3.50"', // 2.50 to 4.50 for Peak, 2.25 to 4.50 for Normal
    sportCoatPocket: 'Patch Pocket', // Patch Pocket, Normal Flap Pocket, Cross Pocket
    pantFront: 'Plain', // Plain, One Pleat, Two Pleat
    pantPocket: 'Cross Pocket', // Side Pocket, Cross Pocket
    pantBottom: 'Bottom Turn-Up', // Bottom Turn-Up, Bottom Plain

    // Safari Suit
    safariCollar: 'Coat Collar', // Coat Collar, Shirt Collar
    safariChokeType: 'With Choke',
    safariChokeSub: 'Back Single Choke',
    safariBelt: 'With Belt', // With Belt, Without Belt

    // Uniforms
    uniformChestPockets: 'Standard Dual Flap Pockets with Pen Slot',
    epaulettesWithStars: true,
    starRankCount: '3 Stars (Inspector / Officer Rank)',
    uniformNotes: 'Official service regulation badges on right arm.'
  });

  // Measurements State (Strictly in Inches)
  const [measurements, setMeasurements] = useState({
    // Standard Kameez / Shirt / Coat
    shirtLength: '42.5',
    chest: '40.0',
    gap: '4.0',
    belly: '38.0',
    hip: '42.0',
    shoulders: '18.5',
    sleeves: '24.25',
    collar: '15.5',

    // Shalwar
    shalwarLength: '39.0',
    bottom: '8.5',
    width: '21.0',
    inside: '28.0',

    // Pant / Pajama
    waist: '34.0',
    pantHip: '41.0',
    pantLength: '41.5',
    pantInside: '30.5',
    thigh: '25.0',
    knee: '18.0',
    pantBottom: '16.5',

    // Waistcoat Length
    waistcoatLength: '27.5',
    coatLength: '29.5'
  });

  // Client notes
  const [customerNotes, setCustomerNotes] = useState('');

  // Auto-scroll on step change
  useEffect(() => {
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }, [currentStep]);

  // Handle measurement field changes (clean numeric/decimal inches)
  const handleMeasurementChange = (field, val) => {
    setMeasurements(prev => ({ ...prev, [field]: val }));
  };

  // Add Customized Garment to Bag
  const handleAddToBag = () => {
    let fabricNote = 'Customer provides fabric';
    let fabricCost = 0;

    if (preselectedFabric) {
      fabricCost = Math.round(preselectedFabric.meters * preselectedFabric.fabric.pricePerMeter);
      fabricNote = `${preselectedFabric.fabric.name} (${preselectedFabric.meters}m @ ${settings.currency}${preselectedFabric.fabric.pricePerMeter}/m)`;
    }

    const stitchingCost = selectedGarment.basePrice;
    const itemTotal = stitchingCost + fabricCost;

    addToCart({
      type: 'bespoke-garment',
      garmentId: selectedGarment.id,
      garmentTitle: selectedGarment.title,
      stitchingPrice: stitchingCost,
      fabricOption: preselectedFabric ? 'atelier-fabric' : 'client-provided',
      fabricDetails: preselectedFabric ? {
        fabricId: preselectedFabric.fabric.id,
        fabricName: preselectedFabric.fabric.name,
        meters: preselectedFabric.meters,
        pricePerMeter: preselectedFabric.fabric.pricePerMeter,
        fabricCost: fabricCost,
        image: preselectedFabric.fabric.image
      } : null,
      designOptions: { ...designs },
      measurements: { ...measurements },
      customerNotes: customerNotes,
      image: selectedGarment.image,
      quantity: 1,
      itemTotal: itemTotal
    });

    // Clear preselected fabric and go to cart
    setPreselectedFabric(null);
    setCurrentView('cart');
  };

  // Helper check for active card border and gold tick
  const VisualCard = ({ isSelected, onSelect, image, title, subtitle, specs, badge, children }) => (
    <div
      onClick={onSelect}
      className={`group relative rounded-xl overflow-hidden cursor-pointer p-4 transition-all duration-300 flex flex-col justify-between ${
        isSelected
          ? 'bg-obsidian-850 border-2 border-champagne-500 shadow-xl shadow-champagne-500/10'
          : 'bg-obsidian-900 border border-obsidian-750 hover:border-obsidian-600 hover:bg-obsidian-850'
      }`}
    >
      {/* Top row with badge & active checkmark */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {badge ? (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-champagne-500/10 text-champagne-400 border border-champagne-500/25">
            {badge}
          </span>
        ) : <span />}

        <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
          isSelected
            ? 'bg-champagne-500 border-champagne-400 text-obsidian-950 scale-110'
            : 'border-obsidian-700 bg-obsidian-800 text-transparent'
        }`}>
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      </div>

      {/* Image Thumbnail */}
      {image && (
        <div className="relative h-44 rounded-lg bg-obsidian-950 overflow-hidden mb-3 border border-obsidian-800">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      {/* Title & Specs */}
      <div>
        <h4 className="font-serif text-sm font-bold text-white mb-0.5 group-hover:text-champagne-400 transition-colors">
          {title}
        </h4>
        {subtitle && (
          <div className="text-xs text-champagne-400 font-medium mb-1 font-mono">
            {subtitle}
          </div>
        )}
        {specs && (
          <p className="text-[11px] text-gray-400 leading-relaxed mb-2">
            {specs}
          </p>
        )}
      </div>

      {children}
    </div>
  );

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Step Header Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-champagne-400">
              Master Bespoke Configurator
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              Step {currentStep}: {
                currentStep === 1 ? 'Select Bespoke Garment' :
                currentStep === 2 ? `Customize ${selectedGarment.title} Styling` :
                currentStep === 3 ? `Enter Exact Measurements (Inches)` :
                'Review Bespoke Tailor Card'
              }
            </h1>
          </div>

          {preselectedFabric && (
            <div className="hidden md:flex items-center gap-3 bg-champagne-500/10 border border-champagne-500/30 px-3.5 py-2 rounded-xl text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-champagne-400 animate-pulse"></span>
              <div>
                <span className="text-gray-400">Fabric Paired:</span>
                <span className="font-bold text-champagne-300 ml-1">
                  {preselectedFabric.fabric.name} ({preselectedFabric.meters}m)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Step Progress Line */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { num: 1, label: '1. Garment' },
            { num: 2, label: '2. Design Boxes' },
            { num: 3, label: '3. Measurements' },
            { num: 4, label: '4. Tailor Card' }
          ].map(s => (
            <button
              key={s.num}
              onClick={() => {
                if (s.num < currentStep) setCurrentStep(s.num);
              }}
              disabled={s.num > currentStep}
              className={`text-left p-3 rounded-xl border transition-all ${
                currentStep === s.num
                  ? 'bg-champagne-500 text-obsidian-950 font-bold border-champagne-400 shadow-md'
                  : currentStep > s.num
                  ? 'bg-obsidian-900 text-champagne-400 border-champagne-500/30 hover:border-champagne-500'
                  : 'bg-obsidian-950/60 text-gray-500 border-obsidian-800 cursor-not-allowed'
              }`}
            >
              <div className="text-[11px] font-mono tracking-wider uppercase">{s.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* STEP 1: SELECT GARMENT (10 Garments Grid)                */}
      {/* ======================================================== */}
      {currentStep === 1 && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {garments.map((garment) => {
              const isSelected = selectedGarment.id === garment.id;
              return (
                <div
                  key={garment.id}
                  onClick={() => setSelectedGarment(garment)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-obsidian-850 border-2 border-champagne-500 shadow-xl shadow-champagne-500/15'
                      : 'bg-obsidian-900 border border-obsidian-750 hover:border-obsidian-600 hover:bg-obsidian-850 hover:-translate-y-1'
                  }`}
                >
                  {/* Photo Canvas */}
                  <div className="relative h-64 bg-obsidian-950 overflow-hidden">
                    <img
                      src={garment.image}
                      alt={garment.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Active Tick Badge */}
                    <div className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center border shadow-lg transition-all ${
                      isSelected
                        ? 'bg-champagne-500 border-champagne-300 text-obsidian-950 scale-110'
                        : 'border-obsidian-700 bg-obsidian-950/80 text-transparent'
                    }`}>
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>

                    {/* Stitching Rate Floating Tag */}
                    <div className="absolute bottom-3 left-3 bg-obsidian-950/90 backdrop-blur-md px-3 py-1 rounded-md border border-obsidian-700/80 text-xs font-mono font-bold text-champagne-400">
                      Stitching: {settings.currency} {garment.basePrice.toLocaleString()}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white mb-1 group-hover:text-champagne-400 transition-colors">
                        {garment.title}
                      </h3>
                      <div className="text-xs text-champagne-400/90 font-medium mb-2 font-mono">
                        {garment.subtitle}
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {garment.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-obsidian-800 flex items-center justify-between text-xs font-bold text-champagne-400">
                      <span>{isSelected ? 'Selected' : 'Select Silhouette'}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step 1 Next Button */}
          <div className="flex justify-end pt-6 border-t border-obsidian-800">
            <button
              onClick={() => setCurrentStep(2)}
              className="bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-400 hover:to-champagne-500 text-obsidian-950 font-bold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-xl shadow-champagne-500/15"
            >
              <span>Continue to Styling Options</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 2: SELECT DESIGN & STYLING BOXES (Visual Cards)      */}
      {/* ======================================================== */}
      {currentStep === 2 && (
        <div className="space-y-12">
          
          {/* 1. SHALWAR KAMEEZ & KURTA SPECIFIC DESIGN BOXES */}
          {(selectedGarment.id === 'shalwar-kameez' || selectedGarment.id === 'kurta-shalwar' || selectedGarment.id === 'kurta-pajama') && (
            <div className="space-y-10">

              {/* A) Collar Design (Topfused) - 3 Aligned Dimensions */}
              <div>
                <div className="flex items-baseline justify-between mb-4 border-b border-obsidian-800 pb-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      1. Collar Design (Topfused Specification)
                    </h3>
                    <p className="text-xs text-gray-400">
                      Topfused precision collar. Each article displays exact Stand, Point, and Spread measurements in inches.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-champagne-400 font-bold">
                    Selected: {designs.collar.code}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {COLLAR_SPECIFICATIONS.map((spec) => (
                    <VisualCard
                      key={spec.code}
                      isSelected={designs.collar.code === spec.code}
                      onSelect={() => setDesigns(prev => ({ ...prev, collar: spec }))}
                      image={spec.image}
                      badge={`ARTICLE ${spec.code}`}
                      title={spec.title}
                      specs={spec.desc}
                    >
                      {/* Exact 3 Aligned Dimensions in Inches */}
                      <div className="mt-3 bg-obsidian-950 p-2.5 rounded-lg border border-obsidian-800 grid grid-cols-3 text-center divide-x divide-obsidian-800 font-mono text-xs">
                        <div>
                          <div className="text-[10px] text-gray-500">Stand</div>
                          <div className="font-bold text-champagne-400">{spec.dims.stand}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-500">Point</div>
                          <div className="font-bold text-champagne-400">{spec.dims.point}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-500">Spread</div>
                          <div className="font-bold text-champagne-400">{spec.dims.spread}</div>
                        </div>
                      </div>
                    </VisualCard>
                  ))}
                </div>
              </div>

              {/* B) Ban Design (B1 to B4) + Full Size Selector 1.00" to 1.75" */}
              <div>
                <div className="flex items-baseline justify-between mb-4 border-b border-obsidian-800 pb-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      2. Ban Collar Design & Height Stand
                    </h3>
                    <p className="text-xs text-gray-400">
                      Select Ban Style (B1–B4). Choose exact stand height from 1.00" to 1.75" in 0.25" steps.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Stand Height:</span>
                    <div className="flex bg-obsidian-900 rounded-lg p-1 border border-obsidian-750">
                      {BAN_SIZES.map(size => (
                        <button
                          key={size}
                          onClick={() => setDesigns(prev => ({ ...prev, banSize: size }))}
                          className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md transition-all ${
                            designs.banSize === size
                              ? 'bg-champagne-500 text-obsidian-950 shadow'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {BAN_SPECIFICATIONS.map((ban) => (
                    <VisualCard
                      key={ban.code}
                      isSelected={designs.banStyle.code === ban.code}
                      onSelect={() => setDesigns(prev => ({ ...prev, banStyle: ban }))}
                      image={ban.image}
                      badge={ban.code}
                      title={ban.title}
                      subtitle={`Current Height: ${designs.banSize}`}
                      specs={ban.desc}
                    />
                  ))}
                </div>
              </div>

              {/* C) Pocket Design (Styles 4, 5, 6) */}
              <div>
                <div className="flex items-baseline justify-between mb-4 border-b border-obsidian-800 pb-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      3. Pocket Configuration Layout
                    </h3>
                    <p className="text-xs text-gray-400">
                      Styles 4, 5, and 6 with mobile pockets and inner security compartments.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-champagne-400 font-bold">
                    {designs.pocket.code} Pockets
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {POCKET_OPTIONS.map((pkt) => (
                    <VisualCard
                      key={pkt.code}
                      isSelected={designs.pocket.code === pkt.code}
                      onSelect={() => setDesigns(prev => ({ ...prev, pocket: pkt }))}
                      image={pkt.image}
                      badge={`STYLE ${pkt.code}`}
                      title={pkt.title}
                      subtitle={pkt.subtitle}
                      specs={pkt.desc}
                    />
                  ))}
                </div>
              </div>

              {/* D) Button Design (A - F) */}
              <div>
                <div className="flex items-baseline justify-between mb-4 border-b border-obsidian-800 pb-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      4. Placket Button / Hardware Style
                    </h3>
                    <p className="text-xs text-gray-400">
                      Buttons A through F from Mother-of-Pearl shell to antique brass studs and concealed fly-front.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-champagne-400 font-bold">
                    Button {designs.button.code}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {BUTTON_OPTIONS.map((btn) => (
                    <VisualCard
                      key={btn.code}
                      isSelected={designs.button.code === btn.code}
                      onSelect={() => setDesigns(prev => ({ ...prev, button: btn }))}
                      image={btn.image}
                      badge={`BTN ${btn.code}`}
                      title={btn.title}
                      subtitle={btn.subtitle}
                      specs={btn.desc}
                    />
                  ))}
                </div>
              </div>

              {/* E) Front Patti Style & Width (1.00" to 1.75") */}
              <div>
                <div className="flex items-baseline justify-between mb-4 border-b border-obsidian-800 pb-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      5. Front Patti Style & Width
                    </h3>
                    <p className="text-xs text-gray-400">
                      Placket construction with width selector (1.00" to 1.75" in 0.25" steps).
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Patti Width:</span>
                    <div className="flex bg-obsidian-900 rounded-lg p-1 border border-obsidian-750">
                      {['1.00"', '1.25"', '1.50"', '1.75"'].map(w => (
                        <button
                          key={w}
                          onClick={() => setDesigns(prev => ({ ...prev, pattiWidth: w }))}
                          className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md transition-all ${
                            designs.pattiWidth === w
                              ? 'bg-champagne-500 text-obsidian-950 shadow'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    { id: 'Straight', title: 'Straight Patti', image: getManifestImage('front-patti-plain'), desc: 'Standard 1-needle clean topstitched front placket.' },
                    { id: 'Pointed', title: 'Pointed / V-Cut', image: getManifestImage('front-patti-v-cut'), desc: 'Classic arrowhead V-point lower finial.' },
                    { id: 'Ghum Patti', title: 'Ghum (Concealed)', image: getManifestImage('front-patti-gum-concealed'), desc: 'Blind stitched fly-front hiding all buttons.' },
                    { id: 'Fold Patti', title: 'Double Stitch Fold', image: getManifestImage('front-patti-double-stitch'), desc: 'Twin parallel needle stitch for structured fall.' }
                  ].map(p => (
                    <VisualCard
                      key={p.id}
                      isSelected={designs.pattiStyle === p.id}
                      onSelect={() => setDesigns(prev => ({ ...prev, pattiStyle: p.id }))}
                      image={p.image}
                      title={p.title}
                      subtitle={`Width: ${designs.pattiWidth}`}
                      specs={p.desc}
                    />
                  ))}
                </div>
              </div>

              {/* F) Daman, Sewing & Shalwar Pancha */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                
                {/* Daman */}
                <div className="bg-obsidian-900 p-5 rounded-2xl border border-obsidian-750 space-y-3">
                  <h4 className="font-serif text-sm font-bold text-white flex items-center justify-between">
                    <span>Daman Finish</span>
                    <span className="text-xs font-mono text-champagne-400">{designs.daman}</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'Straight', title: 'Straight (Chakor)', image: getManifestImage('daman-straight') },
                      { id: 'Gol / Round', title: 'Gol / Round Daman', image: getManifestImage('daman-round') }
                    ].map(d => (
                      <div
                        key={d.id}
                        onClick={() => setDesigns(prev => ({ ...prev, daman: d.id }))}
                        className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                          designs.daman === d.id
                            ? 'bg-champagne-500/10 border-champagne-500 text-champagne-300 font-bold'
                            : 'bg-obsidian-950 border-obsidian-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        <img src={d.image} alt={d.title} className="w-full h-20 object-contain mb-2 rounded" />
                        <span className="text-xs">{d.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sewing */}
                <div className="bg-obsidian-900 p-5 rounded-2xl border border-obsidian-750 space-y-3">
                  <h4 className="font-serif text-sm font-bold text-white flex items-center justify-between">
                    <span>Kameez Sewing</span>
                    <span className="text-xs font-mono text-champagne-400">{designs.sewing}</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {['Single Sewing', 'Double Sewing'].map(s => (
                      <div
                        key={s}
                        onClick={() => setDesigns(prev => ({ ...prev, sewing: s }))}
                        className={`p-4 rounded-xl border cursor-pointer text-center flex flex-col items-center justify-center h-28 transition-all ${
                          designs.sewing === s
                            ? 'bg-champagne-500/10 border-champagne-500 text-champagne-300 font-bold'
                            : 'bg-obsidian-950 border-obsidian-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        <Layers className="w-5 h-5 mb-2 text-champagne-400" />
                        <span className="text-xs">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shalwar Pancha */}
                <div className="bg-obsidian-900 p-5 rounded-2xl border border-obsidian-750 space-y-3">
                  <h4 className="font-serif text-sm font-bold text-white flex items-center justify-between">
                    <span>Shalwar Pancha Finish</span>
                    <span className="text-xs font-mono text-champagne-400">{designs.pancha}</span>
                  </h4>
                  <div className="space-y-2">
                    {[
                      { id: 'Plain', title: 'Plain Standard Hem', image: getManifestImage('pancha-plain') },
                      { id: 'Net Jali Pancha', title: 'Net Jali Pancha (Multi-Needle)', image: getManifestImage('pancha-multi-stitch') },
                      { id: 'Dori wala Pancha', title: 'Dori / Bukram Stiff Pancha', image: getManifestImage('pancha-bukram-stiff') }
                    ].map(p => (
                      <div
                        key={p.id}
                        onClick={() => setDesigns(prev => ({ ...prev, pancha: p.id }))}
                        className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between gap-3 transition-all ${
                          designs.pancha === p.id
                            ? 'bg-champagne-500/10 border-champagne-500 text-champagne-300 font-bold'
                            : 'bg-obsidian-950 border-obsidian-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={p.image} alt={p.title} className="w-10 h-10 rounded object-contain bg-obsidian-900" />
                          <span className="text-xs">{p.title}</span>
                        </div>
                        {designs.pancha === p.id && <Check className="w-4 h-4 text-champagne-400" />}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 2. WAISTCOAT SPECIFIC DESIGN BOXES */}
          {selectedGarment.id === 'waistcoat' && (
            <div className="space-y-10">
              
              {/* Cut / Style */}
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-3">
                  Waistcoat Cut & Back Construction
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'Without Sleeves', title: 'Without Sleeves (Classic Vest)', desc: 'Standard sleeveless bespoke Nehru wasket.' },
                    { id: 'Cross-back', title: 'Cross-Back Yoke Seam', desc: 'Sartorial rear cross seam for superior back shoulder drape.' }
                  ].map(c => (
                    <div
                      key={c.id}
                      onClick={() => setDesigns(prev => ({ ...prev, waistcoatCut: c.id }))}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        designs.waistcoatCut === c.id
                          ? 'bg-champagne-500/10 border-champagne-500 text-champagne-300 font-bold'
                          : 'bg-obsidian-900 border-obsidian-750 text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white">{c.title}</span>
                        {designs.waistcoatCut === c.id && <Check className="w-4 h-4 text-champagne-400" />}
                      </div>
                      <p className="text-xs text-gray-400">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neckline Category */}
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-3">
                  Waistcoat Neckline Category
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {[
                    { id: 'Ban Neck', title: 'Ban Neck (Stand Collar)', image: getManifestImage('waistcoat-ban-neck'), desc: 'Mandarin stand collar with full button front.' },
                    { id: 'Gol (Round)', title: 'Gol Neck (Round Scoop)', image: getManifestImage('waistcoat-gol-neck'), desc: 'Clean round collarless opening framing the kurta.' },
                    { id: 'V-Neck', title: 'V-Neck Style', image: getManifestImage('waistcoat-v-neck'), desc: 'Formal suiting V-opening designed for shirts and ties.' }
                  ].map(n => (
                    <VisualCard
                      key={n.id}
                      isSelected={designs.waistcoatNeckline === n.id}
                      onSelect={() => setDesigns(prev => ({ ...prev, waistcoatNeckline: n.id }))}
                      image={n.image}
                      title={n.title}
                      specs={n.desc}
                    />
                  ))}
                </div>
              </div>

              {/* 6 Shoulder Slope Designs */}
              <div>
                <div className="flex items-baseline justify-between mb-4 border-b border-obsidian-800 pb-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      Waistcoat Shoulder Slope (6 Distinct Anatomical Angles)
                    </h3>
                    <p className="text-xs text-gray-400">
                      Precision pitch calibration preventing collar gaping or back wrinkles.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-champagne-400 font-bold">
                    {designs.shoulderSlope.title} ({designs.shoulderSlope.pitch})
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {SHOULDER_SLOPES.map(slope => (
                    <VisualCard
                      key={slope.id}
                      isSelected={designs.shoulderSlope.id === slope.id}
                      onSelect={() => setDesigns(prev => ({ ...prev, shoulderSlope: slope }))}
                      image={slope.image}
                      title={slope.title}
                      subtitle={slope.pitch}
                      specs={slope.desc}
                    />
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 3. COAT / PANT SPECIFIC DESIGN BOXES */}
          {selectedGarment.id === 'coat-pant' && (
            <div className="space-y-10">

              {/* Back Construction */}
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-3">
                  Coat Back Construction
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Half-back', 'Cross-back'].map(b => (
                    <div
                      key={b}
                      onClick={() => setDesigns(prev => ({ ...prev, coatBack: b }))}
                      className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        designs.coatBack === b
                          ? 'bg-champagne-500/10 border-champagne-500 text-champagne-300 font-bold'
                          : 'bg-obsidian-900 border-obsidian-750 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span className="text-sm">{b} Construction</span>
                      {designs.coatBack === b && <Check className="w-4 h-4 text-champagne-400" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Coat Category: Prince Coat, Long Coat, Sport Coat */}
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  Main Coat Silhouette Category
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  Selecting a silhouette dynamically reveals its dedicated tailoring options.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {[
                    { id: 'Prince Coat', title: 'Prince Coat (Bandhgala)', image: getManifestImage('prince-coat'), desc: 'Regal six-button front with closed high stand ban.' },
                    { id: 'Long Coat', title: 'Long Coat / Overcoat', image: getManifestImage('long-coat-pinstripe-front'), desc: 'Knee-length overcoat with 1-3 buttons and peak/notch lapels.' },
                    { id: 'Sport Coat', title: 'Sport Coat / Blazer', image: getManifestImage('two-button-front-coat'), desc: 'Modern tailored jacket featuring signature patch pockets.' }
                  ].map(c => (
                    <VisualCard
                      key={c.id}
                      isSelected={designs.coatCategory === c.id}
                      onSelect={() => setDesigns(prev => ({ ...prev, coatCategory: c.id }))}
                      image={c.image}
                      title={c.title}
                      specs={c.desc}
                    />
                  ))}
                </div>
              </div>

              {/* Sub-Category: A) Prince Coat Options */}
              {designs.coatCategory === 'Prince Coat' && (
                <div className="p-6 rounded-2xl bg-obsidian-900 border border-champagne-500/30 space-y-6">
                  <h4 className="font-serif text-base font-bold text-champagne-400">
                    Prince Coat Tailoring Specifications
                  </h4>

                  {/* Buttons & Ban B2 / B4 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-obsidian-950 p-4 rounded-xl border border-obsidian-800">
                      <span className="text-xs text-gray-400 font-bold block mb-2">Buttons:</span>
                      <div className="font-mono text-sm text-white font-bold">Six Button Signature Front</div>
                    </div>

                    <div className="bg-obsidian-950 p-4 rounded-xl border border-obsidian-800">
                      <span className="text-xs text-gray-400 font-bold block mb-2">Ban Category:</span>
                      <div className="flex gap-2">
                        {['B2', 'B4'].map(b => (
                          <button
                            key={b}
                            onClick={() => setDesigns(prev => ({ ...prev, princeBan: b }))}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                              designs.princeBan === b
                                ? 'bg-champagne-500 text-obsidian-950 shadow'
                                : 'bg-obsidian-900 text-gray-400 border border-obsidian-750'
                            }`}
                          >
                            Ban {b} ({b === 'B2' ? 'Square Cut' : 'Overlap Chinese'})
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Choke / Vent Selection (Two Distinct Primary Options) */}
                  <div className="bg-obsidian-950 p-4 rounded-xl border border-obsidian-800 space-y-3">
                    <span className="text-xs text-gray-400 font-bold block">Choke / Vent Selection:</span>
                    <div className="grid grid-cols-2 gap-3">
                      {['With Choke', 'Without Choke'].map(v => (
                        <button
                          key={v}
                          onClick={() => setDesigns(prev => ({ ...prev, coatChokeType: v }))}
                          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                            designs.coatChokeType === v
                              ? 'bg-champagne-500 text-obsidian-950 shadow'
                              : 'bg-obsidian-900 text-gray-400 border border-obsidian-750'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>

                    {designs.coatChokeType === 'With Choke' && (
                      <div className="pt-2 flex gap-3 text-xs">
                        <span className="text-gray-400 py-1">Vent Style:</span>
                        {['Side Choke', 'Back Single Choke'].map(sub => (
                          <button
                            key={sub}
                            onClick={() => setDesigns(prev => ({ ...prev, coatChokeSub: sub }))}
                            className={`px-3 py-1 rounded-md text-xs font-semibold ${
                              designs.coatChokeSub === sub
                                ? 'bg-champagne-500/20 text-champagne-300 border border-champagne-500/50'
                                : 'bg-obsidian-900 text-gray-400'
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Ghera: Round vs Straight */}
                  <div className="bg-obsidian-950 p-4 rounded-xl border border-obsidian-800 space-y-2">
                    <span className="text-xs text-gray-400 font-bold block">Ghera (Bottom Cut):</span>
                    <div className="grid grid-cols-2 gap-3">
                      {['Round', 'Straight'].map(g => (
                        <button
                          key={g}
                          onClick={() => setDesigns(prev => ({ ...prev, princeGhera: g }))}
                          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                            designs.princeGhera === g
                              ? 'bg-champagne-500 text-obsidian-950 shadow'
                              : 'bg-obsidian-900 text-gray-400 border border-obsidian-750'
                          }`}
                        >
                          {g} Ghera
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Category: B) Long Coat Options */}
              {designs.coatCategory === 'Long Coat' && (
                <div className="p-6 rounded-2xl bg-obsidian-900 border border-champagne-500/30 space-y-6">
                  <h4 className="font-serif text-base font-bold text-champagne-400">
                    Long Coat Tailoring Specifications
                  </h4>

                  {/* Buttons */}
                  <div>
                    <span className="text-xs text-gray-400 font-bold block mb-2">Buttons:</span>
                    <div className="grid grid-cols-3 gap-3">
                      {['One Button', 'Two Button', 'Three Button'].map(b => (
                        <button
                          key={b}
                          onClick={() => setDesigns(prev => ({ ...prev, longCoatButtons: b }))}
                          className={`py-2 rounded-lg text-xs font-bold transition-all ${
                            designs.longCoatButtons === b
                              ? 'bg-champagne-500 text-obsidian-950 shadow'
                              : 'bg-obsidian-950 text-gray-400 border border-obsidian-800'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pockets + Ticket Pocket */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-gray-400 font-bold block mb-2">Pockets:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {['Cross Pocket', 'Normal Flap Pocket'].map(p => (
                          <button
                            key={p}
                            onClick={() => setDesigns(prev => ({ ...prev, longCoatPockets: p }))}
                            className={`py-2 rounded-lg text-xs font-bold transition-all ${
                              designs.longCoatPockets === p
                                ? 'bg-champagne-500 text-obsidian-950 shadow'
                                : 'bg-obsidian-950 text-gray-400 border border-obsidian-800'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-obsidian-950 p-4 rounded-xl border border-obsidian-800">
                      <div>
                        <span className="text-xs text-white font-bold block">Ticket Pocket</span>
                        <span className="text-[11px] text-gray-400">Bespoke 3rd jetted waist pocket</span>
                      </div>
                      <button
                        onClick={() => setDesigns(prev => ({ ...prev, ticketPocket: !prev.ticketPocket }))}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          designs.ticketPocket ? 'bg-champagne-500' : 'bg-obsidian-800'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full bg-obsidian-950 absolute top-1 transition-transform ${
                          designs.ticketPocket ? 'right-1' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  {/* Lapels / Collar Width Selector */}
                  <div className="space-y-3 bg-obsidian-950 p-4 rounded-xl border border-obsidian-800">
                    <span className="text-xs text-gray-400 font-bold block">Lapels & Width Selector:</span>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {['Peak Collar', 'Normal Collar'].map(lap => (
                        <button
                          key={lap}
                          onClick={() => {
                            setDesigns(prev => ({
                              ...prev,
                              lapelType: lap,
                              lapelWidth: lap === 'Peak Collar' ? '3.50"' : '3.00"'
                            }));
                          }}
                          className={`py-2 rounded-lg text-xs font-bold transition-all ${
                            designs.lapelType === lap
                              ? 'bg-champagne-500 text-obsidian-950 shadow'
                              : 'bg-obsidian-900 text-gray-400 border border-obsidian-750'
                          }`}
                        >
                          {lap}
                        </button>
                      ))}
                    </div>

                    {/* Width selector in 0.25" steps */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gray-400">
                        {designs.lapelType} Width ({designs.lapelType === 'Peak Collar' ? '2.50" to 4.50"' : '2.25" to 4.50"'}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {(designs.lapelType === 'Peak Collar'
                          ? ['2.50"', '2.75"', '3.00"', '3.25"', '3.50"', '3.75"', '4.00"', '4.25"', '4.50"']
                          : ['2.25"', '2.50"', '2.75"', '3.00"', '3.25"', '3.50"', '3.75"', '4.00"', '4.25"', '4.50"']
                        ).map(w => (
                          <button
                            key={w}
                            onClick={() => setDesigns(prev => ({ ...prev, lapelWidth: w }))}
                            className={`px-2 py-1 text-xs font-mono font-bold rounded ${
                              designs.lapelWidth === w
                                ? 'bg-champagne-500 text-obsidian-950'
                                : 'bg-obsidian-900 text-gray-400 hover:text-white'
                            }`}
                          >
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Choke / Vent */}
                  <div className="bg-obsidian-950 p-4 rounded-xl border border-obsidian-800 space-y-2">
                    <span className="text-xs text-gray-400 font-bold block">Choke / Vent Selection:</span>
                    <div className="grid grid-cols-2 gap-3">
                      {['With Choke', 'Without Choke'].map(v => (
                        <button
                          key={v}
                          onClick={() => setDesigns(prev => ({ ...prev, coatChokeType: v }))}
                          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                            designs.coatChokeType === v
                              ? 'bg-champagne-500 text-obsidian-950 shadow'
                              : 'bg-obsidian-900 text-gray-400 border border-obsidian-750'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Category: C) Sport Coat Options */}
              {designs.coatCategory === 'Sport Coat' && (
                <div className="p-6 rounded-2xl bg-obsidian-900 border border-champagne-500/30 space-y-6">
                  <h4 className="font-serif text-base font-bold text-champagne-400">
                    Sport Coat Tailoring Specifications
                  </h4>

                  {/* Pockets with Patch Pocket Default Highlight */}
                  <div>
                    <span className="text-xs text-gray-400 font-bold block mb-2">Pockets:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'Patch Pocket', title: 'Patch Pocket (Sport Standard)', badge: 'Default' },
                        { id: 'Normal Flap Pocket', title: 'Normal Flap Pocket', badge: 'Formal' },
                        { id: 'Cross Pocket', title: 'Cross Slanted Pocket', badge: 'Riding' }
                      ].map(p => (
                        <button
                          key={p.id}
                          onClick={() => setDesigns(prev => ({ ...prev, sportCoatPocket: p.id }))}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            designs.sportCoatPocket === p.id
                              ? 'bg-champagne-500/10 border-champagne-500 text-champagne-300 font-bold'
                              : 'bg-obsidian-950 border-obsidian-800 text-gray-400 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">{p.title}</span>
                            <span className="text-[9px] bg-obsidian-800 px-1.5 py-0.5 rounded text-gray-300">{p.badge}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Choke / Vent */}
                  <div className="bg-obsidian-950 p-4 rounded-xl border border-obsidian-800 space-y-2">
                    <span className="text-xs text-gray-400 font-bold block">Choke / Vent Selection:</span>
                    <div className="grid grid-cols-2 gap-3">
                      {['With Choke', 'Without Choke'].map(v => (
                        <button
                          key={v}
                          onClick={() => setDesigns(prev => ({ ...prev, coatChokeType: v }))}
                          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                            designs.coatChokeType === v
                              ? 'bg-champagne-500 text-obsidian-950 shadow'
                              : 'bg-obsidian-900 text-gray-400 border border-obsidian-750'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Pant Design Boxes */}
              <div className="bg-obsidian-900 p-6 rounded-2xl border border-obsidian-750 space-y-6">
                <h4 className="font-serif text-base font-bold text-white">
                  Pant / Trouser Design Boxes
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Front Style */}
                  <div>
                    <span className="text-xs text-gray-400 font-bold block mb-2">Front Style:</span>
                    <div className="space-y-2">
                      {['Plain', 'One Pleat', 'Two Pleat'].map(pl => (
                        <button
                          key={pl}
                          onClick={() => setDesigns(prev => ({ ...prev, pantFront: pl }))}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold text-left flex items-center justify-between transition-all ${
                            designs.pantFront === pl
                              ? 'bg-champagne-500/10 border border-champagne-500 text-champagne-300'
                              : 'bg-obsidian-950 border border-obsidian-800 text-gray-400'
                          }`}
                        >
                          <span>{pl}</span>
                          {designs.pantFront === pl && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pockets */}
                  <div>
                    <span className="text-xs text-gray-400 font-bold block mb-2">Pockets:</span>
                    <div className="space-y-2">
                      {['Cross Pocket', 'Side Pocket'].map(pk => (
                        <button
                          key={pk}
                          onClick={() => setDesigns(prev => ({ ...prev, pantPocket: pk }))}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold text-left flex items-center justify-between transition-all ${
                            designs.pantPocket === pk
                              ? 'bg-champagne-500/10 border border-champagne-500 text-champagne-300'
                              : 'bg-obsidian-950 border border-obsidian-800 text-gray-400'
                          }`}
                        >
                          <span>{pk}</span>
                          {designs.pantPocket === pk && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Finish */}
                  <div>
                    <span className="text-xs text-gray-400 font-bold block mb-2">Bottom Finish:</span>
                    <div className="space-y-2">
                      {['Bottom Turn-Up', 'Bottom Plain'].map(bt => (
                        <button
                          key={bt}
                          onClick={() => setDesigns(prev => ({ ...prev, pantBottom: bt }))}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold text-left flex items-center justify-between transition-all ${
                            designs.pantBottom === bt
                              ? 'bg-champagne-500/10 border border-champagne-500 text-champagne-300'
                              : 'bg-obsidian-950 border border-obsidian-800 text-gray-400'
                          }`}
                        >
                          <span>{bt}</span>
                          {designs.pantBottom === bt && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* 4. SAFARI SUIT SPECIFIC DESIGN BOXES */}
          {selectedGarment.id === 'safari-suit' && (
            <div className="space-y-8 bg-obsidian-900 p-6 rounded-2xl border border-obsidian-750">
              <h3 className="font-serif text-lg font-bold text-white mb-2">
                Safari Suit Customization Boxes
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Collar */}
                <div className="space-y-2">
                  <span className="text-xs text-gray-400 font-bold block">Collar Style:</span>
                  {['Coat Collar', 'Shirt Collar'].map(c => (
                    <button
                      key={c}
                      onClick={() => setDesigns(prev => ({ ...prev, safariCollar: c }))}
                      className={`w-full py-3 px-4 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                        designs.safariCollar === c
                          ? 'bg-champagne-500/10 border-champagne-500 text-champagne-300'
                          : 'bg-obsidian-950 border-obsidian-800 text-gray-400'
                      }`}
                    >
                      <span>{c}</span>
                      {designs.safariCollar === c && <Check className="w-4 h-4 text-champagne-400" />}
                    </button>
                  ))}
                </div>

                {/* Choke / Vent */}
                <div className="space-y-2">
                  <span className="text-xs text-gray-400 font-bold block">Choke / Vent:</span>
                  {['With Choke', 'Without Choke'].map(v => (
                    <button
                      key={v}
                      onClick={() => setDesigns(prev => ({ ...prev, safariChokeType: v }))}
                      className={`w-full py-3 px-4 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                        designs.safariChokeType === v
                          ? 'bg-champagne-500/10 border-champagne-500 text-champagne-300'
                          : 'bg-obsidian-950 border-obsidian-800 text-gray-400'
                      }`}
                    >
                      <span>{v}</span>
                      {designs.safariChokeType === v && <Check className="w-4 h-4 text-champagne-400" />}
                    </button>
                  ))}
                </div>

                {/* Belt */}
                <div className="space-y-2">
                  <span className="text-xs text-gray-400 font-bold block">Waist Belt:</span>
                  {['With Belt', 'Without Belt'].map(b => (
                    <button
                      key={b}
                      onClick={() => setDesigns(prev => ({ ...prev, safariBelt: b }))}
                      className={`w-full py-3 px-4 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                        designs.safariBelt === b
                          ? 'bg-champagne-500/10 border-champagne-500 text-champagne-300'
                          : 'bg-obsidian-950 border-obsidian-800 text-gray-400'
                      }`}
                    >
                      <span>{b}</span>
                      {designs.safariBelt === b && <Check className="w-4 h-4 text-champagne-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. POLICE & FIA UNIFORM ADDITIONS */}
          {(selectedGarment.id === 'police-uniform' || selectedGarment.id === 'fia-uniform') && (
            <div className="space-y-6 bg-obsidian-900 p-6 rounded-2xl border border-obsidian-750">
              <h3 className="font-serif text-lg font-bold text-white mb-1">
                Official Uniform Additions & Provisions
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Service regulations specifications for Pakistan Police & FIA uniforms.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Chest Pockets */}
                <div className="bg-obsidian-950 p-4 rounded-xl border border-obsidian-800 space-y-2">
                  <span className="text-xs text-gray-400 font-bold block">Chest Pockets:</span>
                  <div className="flex items-center gap-2 text-xs font-bold text-champagne-400">
                    <Check className="w-4 h-4" />
                    <span>Standard Dual Flap Pockets with Left Pen Slot</span>
                  </div>
                </div>

                {/* Epaulettes & Stars */}
                <div className="bg-obsidian-950 p-4 rounded-xl border border-obsidian-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-bold">Shoulder Epaulettes & Rank Stars:</span>
                    <button
                      onClick={() => setDesigns(prev => ({ ...prev, epaulettesWithStars: !prev.epaulettesWithStars }))}
                      className={`text-xs px-2.5 py-1 rounded font-bold ${
                        designs.epaulettesWithStars ? 'bg-champagne-500 text-obsidian-950' : 'bg-obsidian-800 text-gray-400'
                      }`}
                    >
                      {designs.epaulettesWithStars ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={designs.starRankCount}
                    onChange={(e) => setDesigns(prev => ({ ...prev, starRankCount: e.target.value }))}
                    placeholder="Enter rank star count / designation..."
                    className="w-full bg-obsidian-900 border border-obsidian-750 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-champagne-500 font-mono"
                  />
                </div>
              </div>

              {/* Additional Uniform Notes */}
              <div>
                <span className="text-xs text-gray-400 font-bold block mb-1.5">Additional Uniform Directives:</span>
                <textarea
                  rows={2}
                  value={designs.uniformNotes}
                  onChange={(e) => setDesigns(prev => ({ ...prev, uniformNotes: e.target.value }))}
                  placeholder="Specify arm badges, belt loop heights, or duty patch placements..."
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-champagne-500"
                />
              </div>
            </div>
          )}

          {/* Step 2 Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-obsidian-800">
            <button
              onClick={() => setCurrentStep(1)}
              className="bg-obsidian-900 hover:bg-obsidian-800 text-gray-300 font-semibold px-6 py-3 rounded-xl text-xs flex items-center gap-1.5 border border-obsidian-750"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Garments</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-400 hover:to-champagne-500 text-obsidian-950 font-bold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-xl shadow-champagne-500/15"
            >
              <span>Continue to Measurements</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 3: ENTER MEASUREMENTS (Strictly in Inches)           */}
      {/* ======================================================== */}
      {currentStep === 3 && (
        <div className="space-y-8">
          
          <div className="bg-obsidian-900/60 p-4 rounded-xl border border-champagne-500/25 flex items-center gap-3 text-xs text-gray-300">
            <Info className="w-5 h-5 text-champagne-400 flex-shrink-0" />
            <div>
              <strong className="text-champagne-300">All Measurements in Inches ("):</strong> Standard master tailor specifications. You can enter clean decimals like <code className="bg-obsidian-950 px-1 py-0.5 rounded text-white font-mono">0.25</code>, <code className="bg-obsidian-950 px-1 py-0.5 rounded text-white font-mono">0.5</code>, or <code className="bg-obsidian-950 px-1 py-0.5 rounded text-white font-mono">0.75</code>.
            </div>
          </div>

          {/* Section 1: Top Garment Measurements (Kameez / Shirt / Coat / Waistcoat) */}
          <div className="bg-obsidian-900 p-6 sm:p-8 rounded-2xl border border-obsidian-750 space-y-6">
            <div className="border-b border-obsidian-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Upper Body Measurements (Inches)
                </h3>
                <p className="text-xs text-gray-400">
                  {selectedGarment.title} precision length and girth specifications.
                </p>
              </div>
              <span className="text-xs font-mono text-champagne-400 font-bold">
                8 Standard Points
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {[
                { id: 'shirtLength', label: 'Shirt / Coat Length', hint: '38" - 46"' },
                { id: 'chest', label: 'Chest (Chhati)', hint: '36" - 48"' },
                { id: 'gap', label: 'Gap (Fitting Allowance)', hint: '3" - 5"' },
                { id: 'belly', label: 'Belly / Waist (Pet)', hint: '34" - 46"' },
                { id: 'hip', label: 'Hip (Ghera)', hint: '38" - 50"' },
                { id: 'shoulders', label: 'Shoulders (Teera)', hint: '17" - 21"' },
                { id: 'sleeves', label: 'Sleeves (Baazu)', hint: '23" - 26"' },
                { id: 'collar', label: 'Collar / Neck', hint: '14" - 18"' }
              ].map(f => (
                <div key={f.id} className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-300 block flex items-center justify-between">
                    <span>{f.label}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{f.hint}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={measurements[f.id] || ''}
                      onChange={(e) => handleMeasurementChange(f.id, e.target.value)}
                      placeholder='0.0"'
                      className="w-full bg-obsidian-950 border border-obsidian-750 focus:border-champagne-500 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono font-bold focus:outline-none transition-colors"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono">
                      in
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Lower Body Measurements (Shalwar / Pant / Pajama) */}
          {(selectedGarment.id === 'shalwar-kameez' || selectedGarment.id === 'kurta-shalwar') && (
            <div className="bg-obsidian-900 p-6 sm:p-8 rounded-2xl border border-obsidian-750 space-y-6">
              <div className="border-b border-obsidian-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Shalwar Measurements (Inches)
                  </h3>
                  <p className="text-xs text-gray-400">
                    Exact length, pancha bottom, flare width, and inside seam.
                  </p>
                </div>
                <span className="text-xs font-mono text-champagne-400 font-bold">
                  4 Shalwar Points
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {[
                  { id: 'shalwarLength', label: 'Shalwar Length', hint: '37" - 42"' },
                  { id: 'bottom', label: 'Bottom (Pancha)', hint: '7.5" - 10"' },
                  { id: 'width', label: 'Width (Ghair / Paat)', hint: '20" - 24"' },
                  { id: 'inside', label: 'Inside Seam (Asan)', hint: '26" - 30"' }
                ].map(f => (
                  <div key={f.id} className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-300 block flex items-center justify-between">
                      <span>{f.label}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{f.hint}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={measurements[f.id] || ''}
                        onChange={(e) => handleMeasurementChange(f.id, e.target.value)}
                        placeholder='0.0"'
                        className="w-full bg-obsidian-950 border border-obsidian-750 focus:border-champagne-500 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono font-bold focus:outline-none transition-colors"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono">
                        in
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Pant / Pajama Measurements for Suiting / Pajama / Uniforms */}
          {(selectedGarment.id === 'coat-pant' || selectedGarment.id === 'kurta-pajama' || selectedGarment.id === 'sleeping-suit' || selectedGarment.id === 'police-uniform' || selectedGarment.id === 'fia-uniform' || selectedGarment.id === 'safari-suit') && (
            <div className="bg-obsidian-900 p-6 sm:p-8 rounded-2xl border border-obsidian-750 space-y-6">
              <div className="border-b border-obsidian-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Pant / Pajama Measurements (Inches)
                  </h3>
                  <p className="text-xs text-gray-400">
                    Waist, hip, length, inside, thigh, knee, and bottom opening.
                  </p>
                </div>
                <span className="text-xs font-mono text-champagne-400 font-bold">
                  7 Trouser Points
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {[
                  { id: 'waist', label: 'Waist (Kamar)', hint: '30" - 44"' },
                  { id: 'pantHip', label: 'Hip Girth', hint: '36" - 48"' },
                  { id: 'pantLength', label: 'Length (Lambaee)', hint: '38" - 44"' },
                  { id: 'pantInside', label: 'Inside Leg', hint: '28" - 33"' },
                  { id: 'thigh', label: 'Thigh (Raan)', hint: '22" - 28"' },
                  { id: 'knee', label: 'Knee (Ghutna)', hint: '16" - 20"' },
                  { id: 'pantBottom', label: 'Bottom Opening (Mori)', hint: '14" - 18"' }
                ].map(f => (
                  <div key={f.id} className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-300 block flex items-center justify-between">
                      <span>{f.label}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{f.hint}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={measurements[f.id] || ''}
                        onChange={(e) => handleMeasurementChange(f.id, e.target.value)}
                        placeholder='0.0"'
                        className="w-full bg-obsidian-950 border border-obsidian-750 focus:border-champagne-500 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono font-bold focus:outline-none transition-colors"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono">
                        in
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Special Cutting Notes */}
          <div className="bg-obsidian-900 p-6 rounded-2xl border border-obsidian-750 space-y-2">
            <label className="text-xs font-bold text-white block">
              Master Tailor Directives & Fitting Preferences:
            </label>
            <textarea
              rows={3}
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              placeholder="E.g., Slightly loose fit around belly, stiff bukram in cuffs, watch sleeve 0.25 inch shorter on left wrist..."
              className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-champagne-500"
            />
          </div>

          {/* Step 3 Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-obsidian-800">
            <button
              onClick={() => setCurrentStep(2)}
              className="bg-obsidian-900 hover:bg-obsidian-800 text-gray-300 font-semibold px-6 py-3 rounded-xl text-xs flex items-center gap-1.5 border border-obsidian-750"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Styling</span>
            </button>

            <button
              onClick={() => setCurrentStep(4)}
              className="bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-400 hover:to-champagne-500 text-obsidian-950 font-bold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-xl shadow-champagne-500/15"
            >
              <span>Review Bespoke Tailor Card</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 4: REVIEW TAILOR CARD & ADD TO BAG                  */}
      {/* ======================================================== */}
      {currentStep === 4 && (
        <div className="space-y-8">
          
          <div className="bg-obsidian-900 border border-champagne-500/40 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-champagne-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-obsidian-800 pb-8 mb-8">
              <div className="flex items-center gap-5">
                <img
                  src={selectedGarment.image}
                  alt={selectedGarment.title}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-champagne-500/40 shadow-lg"
                />
                <div>
                  <span className="text-[11px] font-bold text-champagne-400 font-mono tracking-widest uppercase">
                    Bespoke Atelier Order Specification
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedGarment.title}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Bespoke Handcrafted Tailoring • Abdullah Melody Tailor
                  </p>
                </div>
              </div>

              <div className="text-left md:text-right bg-obsidian-950 p-4 rounded-2xl border border-obsidian-800">
                <span className="text-xs text-gray-400">Total Bespoke Cost:</span>
                <div className="font-mono text-2xl font-black text-champagne-400">
                  {settings.currency} {(
                    selectedGarment.basePrice + (preselectedFabric ? Math.round(preselectedFabric.meters * preselectedFabric.fabric.pricePerMeter) : 0)
                  ).toLocaleString()}
                </div>
                <div className="text-[11px] text-gray-400">
                  Stitching: {settings.currency}{selectedGarment.basePrice.toLocaleString()}
                  {preselectedFabric && ` + Fabric (${preselectedFabric.meters}m): ${settings.currency}${Math.round(preselectedFabric.meters * preselectedFabric.fabric.pricePerMeter).toLocaleString()}`}
                </div>
              </div>
            </div>

            {/* Design & Styling Selections Summary */}
            <div className="mb-8">
              <h4 className="font-serif text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-champagne-400" />
                <span>Selected Styling Specifications</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                {selectedGarment.id === 'shalwar-kameez' && (
                  <>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Collar Article:</span>
                      <strong className="text-champagne-300">{designs.collar.title}</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Ban Stand & Height:</span>
                      <strong className="text-champagne-300">{designs.banStyle.title} ({designs.banSize})</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Pocket Style:</span>
                      <strong className="text-champagne-300">{designs.pocket.title}</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Button Hardware:</span>
                      <strong className="text-champagne-300">{designs.button.title}</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Front Patti:</span>
                      <strong className="text-champagne-300">{designs.pattiStyle} ({designs.pattiWidth})</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Daman Cut:</span>
                      <strong className="text-champagne-300">{designs.daman}</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Kameez Sewing:</span>
                      <strong className="text-champagne-300">{designs.sewing}</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Pancha Finish:</span>
                      <strong className="text-champagne-300">{designs.pancha}</strong>
                    </div>
                  </>
                )}

                {selectedGarment.id === 'waistcoat' && (
                  <>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Cut / Style:</span>
                      <strong className="text-champagne-300">{designs.waistcoatCut}</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Neckline:</span>
                      <strong className="text-champagne-300">{designs.waistcoatNeckline}</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Shoulder Slope:</span>
                      <strong className="text-champagne-300">{designs.shoulderSlope.title} ({designs.shoulderSlope.pitch})</strong>
                    </div>
                  </>
                )}

                {selectedGarment.id === 'coat-pant' && (
                  <>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Coat Silhouette:</span>
                      <strong className="text-champagne-300">{designs.coatCategory}</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Back Style:</span>
                      <strong className="text-champagne-300">{designs.coatBack}</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Vent Choice:</span>
                      <strong className="text-champagne-300">{designs.coatChokeType} {designs.coatChokeType === 'With Choke' ? `(${designs.coatChokeSub})` : ''}</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Pant Front:</span>
                      <strong className="text-champagne-300">{designs.pantFront}</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Pant Bottom:</span>
                      <strong className="text-champagne-300">{designs.pantBottom}</strong>
                    </div>
                  </>
                )}

                {selectedGarment.id === 'safari-suit' && (
                  <>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Collar:</span>
                      <strong className="text-champagne-300">{designs.safariCollar}</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Choke:</span>
                      <strong className="text-champagne-300">{designs.safariChokeType}</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Belt:</span>
                      <strong className="text-champagne-300">{designs.safariBelt}</strong>
                    </div>
                  </>
                )}

                {(selectedGarment.id === 'police-uniform' || selectedGarment.id === 'fia-uniform') && (
                  <>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Chest Pockets:</span>
                      <strong className="text-champagne-300">{designs.uniformChestPockets}</strong>
                    </div>
                    <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                      <span className="text-gray-500 block text-[10px]">Epaulettes & Stars:</span>
                      <strong className="text-champagne-300">{designs.starRankCount}</strong>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Measurements Grid Review (Inches) */}
            <div className="mb-8">
              <h4 className="font-serif text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-champagne-400" />
                <span>Measurement Specifications (Inches)</span>
              </h4>

              <div className="bg-obsidian-950 p-4 rounded-2xl border border-obsidian-800">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
                  {Object.entries(measurements)
                    .filter(([_, val]) => val && val.trim() !== '')
                    .map(([key, val]) => (
                      <div key={key} className="bg-obsidian-900/80 p-2.5 rounded-xl border border-obsidian-800">
                        <div className="text-[10px] text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="font-mono text-sm font-bold text-white mt-0.5">{val}"</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-obsidian-800">
              <button
                onClick={() => setCurrentStep(3)}
                className="w-full sm:w-auto bg-obsidian-900 hover:bg-obsidian-800 text-gray-300 font-semibold px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-obsidian-750"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Adjust Measurements</span>
              </button>

              <button
                onClick={handleAddToBag}
                className="w-full sm:w-auto bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-400 hover:to-champagne-500 text-obsidian-950 font-bold px-10 py-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-2xl shadow-champagne-500/25"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                <span>Add Custom Tailoring to Bag</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
