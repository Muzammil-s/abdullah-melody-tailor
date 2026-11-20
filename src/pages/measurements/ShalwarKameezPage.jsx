import React, { useState } from 'react';
import { useTailor } from '../../context/TailorContext.jsx';
import InchStepperInput from '../../components/InchStepperInput.jsx';
import {
  COLLAR_SPECIFICATIONS,
  BAN_SPECIFICATIONS,
  BAN_SIZES,
  POCKET_OPTIONS,
  BUTTON_OPTIONS,
  getManifestImage
} from '../../data/defaultData.js';
import { GARMENT_SIZE_PRESETS } from '../../data/garmentPresets.js';
import {
  Ruler,
  Scissors,
  Check,
  ShoppingBag,
  Printer,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Layers,
  Info
} from 'lucide-react';

export const ShalwarKameezPage = () => {
  const { settings, addToCart, setCurrentView, setActiveSlipOrder, preselectedFabric } = useTailor();
  const basePrice = settings.stitchingRates['shalwar-kameez'] || 2800;

  // Active Size Preset
  const [activePreset, setActivePreset] = useState('M');

  // Measurements State (all in inches)
  const defaultVals = GARMENT_SIZE_PRESETS['shalwar-kameez']['M'];
  const [measurements, setMeasurements] = useState({
    // Kameez
    shirtLength: defaultVals.kameez.length,
    chest: defaultVals.kameez.chest,
    gap: defaultVals.kameez.gap,
    belly: defaultVals.kameez.belly,
    hip: defaultVals.kameez.hip,
    shoulders: defaultVals.kameez.shoulder,
    sleeves: defaultVals.kameez.sleeves,
    collar: defaultVals.kameez.collar,
    // Shalwar
    shalwarLength: defaultVals.shalwar.length,
    bottom: defaultVals.shalwar.bottom,
    width: defaultVals.shalwar.width,
    inside: defaultVals.shalwar.inside
  });

  // Neckline Type: 'collar' or 'ban'
  const [necklineType, setNecklineType] = useState('collar');
  const [selectedCollar, setSelectedCollar] = useState('A1');
  const [selectedBan, setSelectedBan] = useState('B1');
  const [banSize, setBanSize] = useState(1.25);

  // Design Choices
  const [selectedPocket, setSelectedPocket] = useState('4');
  const [selectedButton, setSelectedButton] = useState('A');
  const [pattiWidth, setPattiWidth] = useState(1.25);
  const [pattiStyle, setPattiStyle] = useState('straight');
  const [damanStyle, setDamanStyle] = useState('straight');
  const [sewingStyle, setSewingStyle] = useState('single');
  const [panchaStyle, setPanchaStyle] = useState('plain');
  const [customerNotes, setCustomerNotes] = useState('');

  // Handle Preset Loading
  const applyPreset = (sizeKey) => {
    setActivePreset(sizeKey);
    const p = GARMENT_SIZE_PRESETS['shalwar-kameez'][sizeKey];
    setMeasurements({
      shirtLength: p.kameez.length,
      chest: p.kameez.chest,
      gap: p.kameez.gap,
      belly: p.kameez.belly,
      hip: p.kameez.hip,
      shoulders: p.kameez.shoulder,
      sleeves: p.kameez.sleeves,
      collar: p.kameez.collar,
      shalwarLength: p.shalwar.length,
      bottom: p.shalwar.bottom,
      width: p.shalwar.width,
      inside: p.shalwar.inside
    });
  };

  const updateMeasurement = (key, val) => {
    setMeasurements((prev) => ({ ...prev, [key]: val }));
    setActivePreset('Custom');
  };

  // Compile specifications object
  const getBespokeItem = () => {
    const collarObj = COLLAR_SPECIFICATIONS.find((c) => c.code === selectedCollar);
    const banObj = BAN_SPECIFICATIONS.find((b) => b.code === selectedBan);
    const pocketObj = POCKET_OPTIONS.find((p) => p.code === selectedPocket);
    const buttonObj = BUTTON_OPTIONS.find((b) => b.code === selectedButton);

    const styling = {
      necklineType,
      collar: necklineType === 'collar' ? { code: selectedCollar, title: collarObj?.title, dims: collarObj?.dims } : null,
      ban: necklineType === 'ban' ? { code: selectedBan, title: banObj?.title, size: `${banSize.toFixed(2)}"` } : null,
      pocket: { code: selectedPocket, title: pocketObj?.title },
      button: { code: selectedButton, title: buttonObj?.title },
      frontPatti: { width: `${pattiWidth.toFixed(2)}"`, style: pattiStyle },
      daman: damanStyle,
      sewing: sewingStyle,
      pancha: panchaStyle,
      notes: customerNotes
    };

    return {
      id: `bespoke-sk-${Date.now()}`,
      type: 'bespoke',
      garmentId: 'shalwar-kameez',
      garmentTitle: 'Shalwar Kameez',
      price: basePrice,
      quantity: 1,
      image: getManifestImage('shalwar-kameez', '/images/garments/shalwar-kameez.jpg'),
      attachedFabric: preselectedFabric ? {
        id: preselectedFabric.fabric.id,
        name: preselectedFabric.fabric.name,
        meters: preselectedFabric.meters,
        pricePerMeter: preselectedFabric.fabric.pricePerMeter
      } : null,
      measurements: {
        'Kameez Length': `${measurements.shirtLength}"`,
        'Chest': `${measurements.chest}"`,
        'Gap (Chest to Waist)': `${measurements.gap}"`,
        'Belly (Waist)': `${measurements.belly}"`,
        'Hip': `${measurements.hip}"`,
        'Shoulders': `${measurements.shoulders}"`,
        'Sleeves': `${measurements.sleeves}"`,
        'Collar / Neck': `${measurements.collar}"`,
        'Shalwar Length': `${measurements.shalwarLength}"`,
        'Shalwar Bottom (Paicha)': `${measurements.bottom}"`,
        'Shalwar Width (Ghera)': `${measurements.width}"`,
        'Shalwar Inside (Asan)': `${measurements.inside}"`
      },
      styling
    };
  };

  const handleAddToBag = () => {
    const item = getBespokeItem();
    addToCart(item);
    setCurrentView('cart');
  };

  const handlePrintPreview = () => {
    const item = getBespokeItem();
    const tempOrder = {
      id: `AMT-PREVIEW-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      customerName: 'Valued Atelier Patron (Preview)',
      customerPhone: '+92 300 0000000',
      status: 'pending',
      items: [item],
      totalAmount: basePrice
    };
    setActiveSlipOrder(tempOrder);
    setCurrentView('slip');
  };

  // Front Patti Style Options
  const pattiStyles = [
    { id: 'straight', title: 'Straight Patti', image: getManifestImage('front-patti-plain', '/images/designs/shalwar-kameez/front-patti-plain.svg'), desc: 'Square 90° bottom corner finish' },
    { id: 'pointed', title: 'Pointed (Tikka) Patti', image: getManifestImage('front-patti-v-cut', '/images/designs/shalwar-kameez/front-patti-v-cut.svg'), desc: 'Traditional triangular arrowhead tip' },
    { id: 'ghum-patti', title: 'Ghum (Concealed) Patti', image: getManifestImage('front-patti-gum-concealed', '/images/designs/shalwar-kameez/front-patti-gum-concealed.svg'), desc: 'Hidden stitching with seamless face' },
    { id: 'fold-patti', title: 'Fold (Double) Patti', image: getManifestImage('front-patti-double-stitch', '/images/designs/shalwar-kameez/front-patti-double-stitch.svg'), desc: 'Double needle stitched edge trim' }
  ];

  // Daman Style Options
  const damanStyles = [
    { id: 'straight', title: 'Straight Daman', image: getManifestImage('daman-straight', '/images/designs/shalwar-kameez/daman-straight.svg'), desc: 'Crisp 90° square hem corners' },
    { id: 'gol', title: 'Gol (Round) Daman', image: getManifestImage('daman-round', '/images/designs/shalwar-kameez/daman-round.svg'), desc: 'Artisanal curved hem corners' }
  ];

  // Pancha Options
  const panchaStyles = [
    { id: 'plain', title: 'Plain Pancha', image: getManifestImage('pancha-plain', '/images/designs/shalwar-kameez/pancha-plain.svg'), desc: 'Clean, smooth turned hem' },
    { id: 'net-jali', title: 'Net Jali Pancha', image: getManifestImage('pancha-bukram-stiff', '/images/designs/shalwar-kameez/pancha-bukram-stiff.svg'), desc: 'Delicate openwork embroidery band' },
    { id: 'dori', title: 'Dori wala Pancha', image: getManifestImage('pancha-multi-stitch', '/images/designs/shalwar-kameez/pancha-multi-stitch.svg'), desc: 'Multiple decorative corded stitch rows' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-obsidian-800">
        <button
          onClick={() => setCurrentView('stitching')}
          className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-champagne-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Outfits</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">Size Preset:</span>
          {['S', 'M', 'L', 'XL'].map((s) => (
            <button
              key={s}
              onClick={() => applyPreset(s)}
              className={`px-3 py-1 rounded-md text-xs font-bold font-mono transition-all ${
                activePreset === s
                  ? 'bg-champagne-500 text-obsidian-950 shadow-md'
                  : 'bg-obsidian-800 hover:bg-obsidian-700 text-gray-300 border border-obsidian-750'
              }`}
            >
              {s}
            </button>
          ))}
          {activePreset === 'Custom' && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold font-mono bg-champagne-500/10 text-champagne-400 border border-champagne-500/30">
              Custom (Adjusted)
            </span>
          )}
        </div>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-obsidian-900 border border-obsidian-800 p-6 sm:p-8 rounded-2xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-champagne-400 text-xs font-mono font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Atelier Configurator</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
            Shalwar Kameez Bespoke Studio
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Configure every tailoring specification: Topfused Collars A1–A4 (exact 3 dimensions), Ban B1–B4 (1.00"–1.75"), pockets, front patti, and daman. All measurements adjustable with 0.25-inch stepper buttons.
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Base Tailoring Fee</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-champagne-400">
            {settings.currency} {basePrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Main Grid: Measurements + Visual Styling Options */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Measurements & Styling Selectors */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* SECTION 1: KAMEEZ MEASUREMENTS (INCHES) */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Ruler className="w-5 h-5 text-champagne-400" />
                <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                  1. Kameez Measurements (Inches)
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">Use - / + or type directly</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InchStepperInput
                label="Shirt Length"
                value={measurements.shirtLength}
                onChange={(val) => updateMeasurement('shirtLength', val)}
                min={20}
                max={55}
                hint="38 - 46"
                helpText="From base of collar down to desired hem"
              />
              <InchStepperInput
                label="Chest"
                value={measurements.chest}
                onChange={(val) => updateMeasurement('chest', val)}
                min={28}
                max={60}
                hint="36 - 50"
                helpText="Full circumference under armpits"
              />
              <InchStepperInput
                label="Gap (Looseness)"
                value={measurements.gap}
                onChange={(val) => updateMeasurement('gap', val)}
                min={0}
                max={8}
                hint="1.5 - 3.5"
                helpText="Extra breathing room ease"
              />
              <InchStepperInput
                label="Belly (Waist)"
                value={measurements.belly}
                onChange={(val) => updateMeasurement('belly', val)}
                min={26}
                max={60}
                hint="32 - 48"
                helpText="Circumference around navel"
              />
              <InchStepperInput
                label="Hip"
                value={measurements.hip}
                onChange={(val) => updateMeasurement('hip', val)}
                min={30}
                max={65}
                hint="38 - 52"
                helpText="Fullest part of lower hip"
              />
              <InchStepperInput
                label="Shoulders (Teera)"
                value={measurements.shoulders}
                onChange={(val) => updateMeasurement('shoulders', val)}
                min={13}
                max={24}
                hint="16 - 20"
                helpText="Tip to tip across shoulder blades"
              />
              <InchStepperInput
                label="Sleeves Length"
                value={measurements.sleeves}
                onChange={(val) => updateMeasurement('sleeves', val)}
                min={18}
                max={30}
                hint="22 - 27"
                helpText="Shoulder bone to wrist line"
              />
              <InchStepperInput
                label="Collar / Neck"
                value={measurements.collar}
                onChange={(val) => updateMeasurement('collar', val)}
                min={12}
                max={22}
                hint="14 - 18"
                helpText="Circumference around base of neck"
              />
            </div>
          </section>

          {/* SECTION 2: SHALWAR MEASUREMENTS (INCHES) */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Scissors className="w-5 h-5 text-champagne-400" />
                <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                  2. Shalwar Measurements (Inches)
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">4 Core Shalwar Metrics</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InchStepperInput
                label="Shalwar Length"
                value={measurements.shalwarLength}
                onChange={(val) => updateMeasurement('shalwarLength', val)}
                min={28}
                max={50}
                hint="36 - 44"
                helpText="Waist line down to ankle bone"
              />
              <InchStepperInput
                label="Bottom (Paicha)"
                value={measurements.bottom}
                onChange={(val) => updateMeasurement('bottom', val)}
                min={6}
                max={15}
                hint="7.5 - 10"
                helpText="Ankle cuff opening width"
              />
              <InchStepperInput
                label="Width (Ghera)"
                value={measurements.width}
                onChange={(val) => updateMeasurement('width', val)}
                min={16}
                max={36}
                hint="22 - 28"
                helpText="Half ghera volume circumference"
              />
              <InchStepperInput
                label="Inside (Asan)"
                value={measurements.inside}
                onChange={(val) => updateMeasurement('inside', val)}
                min={20}
                max={38}
                hint="25 - 32"
                helpText="Crotch drop / inside leg length"
              />
            </div>
          </section>

          {/* SECTION 3: NECKLINE SPECIFICATIONS (COLLAR VS BAN) */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-3">
              <div>
                <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                  3. Neckline Design: Topfused Collar vs. Ban
                </h2>
                <p className="text-xs text-gray-400">Choose between structured shirt collar (A1–A4) or standalone ban (B1–B4)</p>
              </div>

              {/* Neckline Toggle Buttons */}
              <div className="flex items-center gap-1 bg-obsidian-950 p-1 rounded-xl border border-obsidian-750">
                <button
                  type="button"
                  onClick={() => setNecklineType('collar')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                    necklineType === 'collar'
                      ? 'bg-champagne-500 text-obsidian-950 shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Collar (A1–A4)
                </button>
                <button
                  type="button"
                  onClick={() => setNecklineType('ban')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                    necklineType === 'ban'
                      ? 'bg-champagne-500 text-obsidian-950 shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Ban (B1–B4)
                </button>
              </div>
            </div>

            {/* A) Collar Design (A1 - A4) with Aligned Vertical Dimensions */}
            {necklineType === 'collar' && (
              <div className="space-y-4">
                <span className="text-xs font-semibold text-champagne-400 uppercase tracking-widest block">
                  Topfused Collar Specification (Stand &bull; Point &bull; Spread in Inches):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {COLLAR_SPECIFICATIONS.map((collar) => {
                    const isSelected = selectedCollar === collar.code;
                    return (
                      <div
                        key={collar.code}
                        onClick={() => setSelectedCollar(collar.code)}
                        className={`cursor-pointer rounded-xl border p-4 transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500 shadow-lg shadow-champagne-500/10'
                            : 'bg-obsidian-950/70 border-obsidian-750 hover:border-obsidian-600'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm font-bold text-champagne-400 bg-obsidian-900 px-2 py-0.5 rounded border border-champagne-500/30">
                              {collar.code}
                            </span>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-champagne-500 text-obsidian-950 flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}
                          </div>

                          <div className="h-28 bg-obsidian-900 rounded-lg flex items-center justify-center p-2 border border-obsidian-800">
                            <img src={collar.image} alt={collar.title} className="max-h-full max-w-full object-contain" />
                          </div>

                          <h4 className="text-xs font-bold text-white uppercase">{collar.title}</h4>

                          {/* EXACT 3 ALIGNED DIMENSIONS */}
                          <div className="bg-obsidian-900/90 p-2 rounded border border-obsidian-800 font-mono text-[11px] space-y-1">
                            <div className="flex justify-between text-gray-400">
                              <span>Stand Height:</span>
                              <span className="text-champagne-300 font-bold">{collar.dims.stand}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                              <span>Point Length:</span>
                              <span className="text-champagne-300 font-bold">{collar.dims.point}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                              <span>Spread Width:</span>
                              <span className="text-champagne-300 font-bold">{collar.dims.spread}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-[10px] text-gray-400 mt-2 leading-tight">{collar.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* B) Ban Design (B1 - B4) with Size Stepper 1.00" - 1.75" */}
            {necklineType === 'ban' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-champagne-400 uppercase tracking-widest block">
                    Select Ban Style (B1–B4):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {BAN_SPECIFICATIONS.map((ban) => {
                      const isSelected = selectedBan === ban.code;
                      return (
                        <div
                          key={ban.code}
                          onClick={() => setSelectedBan(ban.code)}
                          className={`cursor-pointer rounded-xl border p-4 transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500 shadow-lg shadow-champagne-500/10'
                              : 'bg-obsidian-950/70 border-obsidian-750 hover:border-obsidian-600'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm font-bold text-champagne-400 bg-obsidian-900 px-2 py-0.5 rounded border border-champagne-500/30">
                                {ban.code}
                              </span>
                              {isSelected && (
                                <div className="w-5 h-5 rounded-full bg-champagne-500 text-obsidian-950 flex items-center justify-center">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                              )}
                            </div>

                            <div className="h-28 bg-obsidian-900 rounded-lg flex items-center justify-center p-2 border border-obsidian-800">
                              <img src={ban.image} alt={ban.title} className="max-h-full max-w-full object-contain" />
                            </div>

                            <h4 className="text-xs font-bold text-white uppercase">{ban.title}</h4>
                            <p className="text-[10px] text-gray-400 leading-tight">{ban.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Ban Size Stepper (1.00" - 1.75" in 0.25" steps) */}
                <div className="bg-obsidian-950 p-4 rounded-xl border border-obsidian-750 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-white uppercase tracking-wider block">
                      Ban Stand Height (Inches)
                    </span>
                    <p className="text-[11px] text-gray-400">Available from 1.00" to 1.75" in 0.25" increments</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {BAN_SIZES.map((sizeStr) => {
                      const num = parseFloat(sizeStr);
                      const isSel = banSize === num;
                      return (
                        <button
                          key={sizeStr}
                          type="button"
                          onClick={() => setBanSize(num)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                            isSel
                              ? 'bg-champagne-500 text-obsidian-950 shadow-md'
                              : 'bg-obsidian-800 hover:bg-obsidian-700 text-gray-300 border border-obsidian-700'
                          }`}
                        >
                          {sizeStr}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 4: POCKET & BUTTON DESIGN */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide border-b border-obsidian-800 pb-3">
              4. Pockets &amp; Buttons Selection
            </h2>

            {/* Pockets (4, 5, 6) */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-champagne-400 uppercase tracking-widest block">
                Pocket Layout (Styles 4, 5, 6):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {POCKET_OPTIONS.map((pocket) => {
                  const isSelected = selectedPocket === pocket.code;
                  return (
                    <div
                      key={pocket.code}
                      onClick={() => setSelectedPocket(pocket.code)}
                      className={`cursor-pointer rounded-xl border p-4 transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500 shadow-md'
                          : 'bg-obsidian-950/70 border-obsidian-750 hover:border-obsidian-600'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-bold text-champagne-400 bg-obsidian-900 px-2 py-0.5 rounded border border-champagne-500/30">
                            Style {pocket.code}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-champagne-500 text-obsidian-950 flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div className="h-28 bg-obsidian-900 rounded-lg flex items-center justify-center p-2 border border-obsidian-800">
                          <img src={pocket.image} alt={pocket.title} className="max-h-full max-w-full object-contain" />
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-white uppercase">{pocket.title}</h4>
                          <p className="text-[11px] text-champagne-300 font-mono mt-0.5">{pocket.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-[10px] text-gray-400 mt-2 leading-tight">{pocket.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buttons (A - F) */}
            <div className="space-y-3 pt-4 border-t border-obsidian-800">
              <span className="text-xs font-semibold text-champagne-400 uppercase tracking-widest block">
                Button &bull; Bottom Enclosure (Buttons A through F):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {BUTTON_OPTIONS.map((button) => {
                  const isSelected = selectedButton === button.code;
                  return (
                    <div
                      key={button.code}
                      onClick={() => setSelectedButton(button.code)}
                      className={`cursor-pointer rounded-xl border p-3 transition-all flex flex-col justify-between text-center ${
                        isSelected
                          ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500 shadow-md'
                          : 'bg-obsidian-950/70 border-obsidian-750 hover:border-obsidian-600'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-champagne-400">
                            Button {button.code}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-champagne-400" />}
                        </div>

                        <div className="h-20 bg-obsidian-900 rounded-lg flex items-center justify-center p-1 border border-obsidian-800">
                          <img src={button.image} alt={button.title} className="max-h-full max-w-full object-contain" />
                        </div>

                        <h4 className="text-[11px] font-bold text-white truncate">{button.title.replace(`Button ${button.code}: `, '')}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 5: FRONT PATTI, DAMAN, SEWING & PANCHA */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide border-b border-obsidian-800 pb-3">
              5. Front Patti, Daman &amp; Shalwar Pancha
            </h2>

            {/* Front Patti Width Stepper + Style */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-champagne-400 uppercase tracking-widest block">
                    Front Patti Width &amp; Style:
                  </span>
                  <p className="text-[11px] text-gray-400">Select placket width (1.00" to 1.75") and edge shape</p>
                </div>

                <div className="flex items-center gap-1.5 bg-obsidian-950 p-1 rounded-xl border border-obsidian-750">
                  {[1.00, 1.25, 1.50, 1.75].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setPattiWidth(w)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        pattiWidth === w
                          ? 'bg-champagne-500 text-obsidian-950 shadow-md'
                          : 'text-gray-300 hover:text-white hover:bg-obsidian-800'
                      }`}
                    >
                      {w.toFixed(2)}"
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Front Patti Styles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {pattiStyles.map((patti) => {
                  const isSel = pattiStyle === patti.id;
                  return (
                    <div
                      key={patti.id}
                      onClick={() => setPattiStyle(patti.id)}
                      className={`cursor-pointer rounded-xl border p-3 transition-all flex flex-col justify-between ${
                        isSel
                          ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500 shadow-md'
                          : 'bg-obsidian-950/70 border-obsidian-750 hover:border-obsidian-600'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-white">{patti.title}</span>
                          {isSel && <Check className="w-3.5 h-3.5 text-champagne-400" />}
                        </div>
                        <div className="h-20 bg-obsidian-900 rounded-lg flex items-center justify-center p-1 border border-obsidian-800">
                          <img src={patti.image} alt={patti.title} className="max-h-full max-w-full object-contain" />
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2 leading-tight">{patti.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Daman & Sewing Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-obsidian-800">
              {/* Daman Style */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-champagne-400 uppercase tracking-widest block">
                  Kameez Daman (Hem Corners):
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {damanStyles.map((dm) => {
                    const isSel = damanStyle === dm.id;
                    return (
                      <div
                        key={dm.id}
                        onClick={() => setDamanStyle(dm.id)}
                        className={`cursor-pointer rounded-xl border p-3 transition-all ${
                          isSel
                            ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500'
                            : 'bg-obsidian-950/70 border-obsidian-750 hover:border-obsidian-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-white">{dm.title}</span>
                          {isSel && <Check className="w-3.5 h-3.5 text-champagne-400" />}
                        </div>
                        <div className="h-20 bg-obsidian-900 rounded-lg flex items-center justify-center p-1 border border-obsidian-800 mb-2">
                          <img src={dm.image} alt={dm.title} className="max-h-full max-w-full object-contain" />
                        </div>
                        <p className="text-[10px] text-gray-400">{dm.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Kameez Sewing Style */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-champagne-400 uppercase tracking-widest block">
                  Kameez Sewing Craft:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'single', title: 'Single Sewing', desc: 'Refined single-needle seam for subtle formal wear' },
                    { id: 'double', title: 'Double Sewing', desc: 'Pronounced double-needle decorative topstitch' }
                  ].map((sw) => {
                    const isSel = sewingStyle === sw.id;
                    return (
                      <div
                        key={sw.id}
                        onClick={() => setSewingStyle(sw.id)}
                        className={`cursor-pointer rounded-xl border p-3.5 transition-all flex flex-col justify-between ${
                          isSel
                            ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500'
                            : 'bg-obsidian-950/70 border-obsidian-750 hover:border-obsidian-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-white uppercase">{sw.title}</span>
                          {isSel && <Check className="w-3.5 h-3.5 text-champagne-400" />}
                        </div>
                        <p className="text-[11px] text-gray-400 leading-tight">{sw.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Shalwar Pancha Style */}
            <div className="space-y-3 pt-4 border-t border-obsidian-800">
              <span className="text-xs font-semibold text-champagne-400 uppercase tracking-widest block">
                Shalwar Pancha (Bottom Finish):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {panchaStyles.map((pn) => {
                  const isSel = panchaStyle === pn.id;
                  return (
                    <div
                      key={pn.id}
                      onClick={() => setPanchaStyle(pn.id)}
                      className={`cursor-pointer rounded-xl border p-3 transition-all ${
                        isSel
                          ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500'
                          : 'bg-obsidian-950/70 border-obsidian-750 hover:border-obsidian-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white">{pn.title}</span>
                        {isSel && <Check className="w-3.5 h-3.5 text-champagne-400" />}
                      </div>
                      <div className="h-20 bg-obsidian-900 rounded-lg flex items-center justify-center p-1 border border-obsidian-800 mb-2">
                        <img src={pn.image} alt={pn.title} className="max-h-full max-w-full object-contain" />
                      </div>
                      <p className="text-[10px] text-gray-400">{pn.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Tailor Notes */}
            <div className="space-y-2 pt-4 border-t border-obsidian-800">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                Special Tailoring Instructions (Optional):
              </label>
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Please leave 2 inches extra inner margin on side seams; cuff button 1/4 inch looser."
                className="w-full bg-obsidian-950 border border-obsidian-750 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:border-champagne-400 outline-none"
              />
            </div>
          </section>
        </div>

        {/* Right Column (4 cols): Sticky Live Summary & Bag CTAs */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-obsidian-900 border border-obsidian-750 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                  Live Tailor Card
                </h3>
                <span className="text-[10px] text-champagne-400 font-mono">Bespoke Shalwar Kameez</span>
              </div>
              <span className="text-lg font-mono font-bold text-champagne-400">
                {settings.currency} {basePrice.toLocaleString()}
              </span>
            </div>

            {/* Attached Fabric Card */}
            {preselectedFabric && (
              <div className="bg-obsidian-950 p-3 rounded-xl border border-champagne-500/30 space-y-1">
                <span className="text-[10px] text-champagne-400 uppercase tracking-wider font-bold block">
                  Attached Fabric:
                </span>
                <p className="text-xs font-semibold text-white">{preselectedFabric.fabric.name}</p>
                <p className="text-[11px] text-gray-400 font-mono">
                  {preselectedFabric.meters} Meters &bull; {settings.currency} {preselectedFabric.fabric.pricePerMeter}/m
                </p>
              </div>
            )}

            {/* Selected Visual Specs Matrix */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                Selected Visual Specs:
              </span>
              <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-gray-400">Neckline:</span>
                  <span className="text-champagne-300 font-bold uppercase">
                    {necklineType === 'collar' ? `Collar ${selectedCollar}` : `Ban ${selectedBan} (${banSize.toFixed(2)}")`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pockets:</span>
                  <span className="text-white font-bold">{selectedPocket} Pockets</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Buttons:</span>
                  <span className="text-white font-bold">Button {selectedButton}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Front Patti:</span>
                  <span className="text-white font-bold">{pattiWidth.toFixed(2)}" ({pattiStyle})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Daman &amp; Sewing:</span>
                  <span className="text-white font-bold capitalize">{damanStyle} &bull; {sewingStyle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pancha:</span>
                  <span className="text-white font-bold capitalize">{panchaStyle}</span>
                </div>
              </div>
            </div>

            {/* Quick Measurements Digest */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                Measurements Digest (Inches):
              </span>
              <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div>Length: <span className="text-champagne-300 font-bold">{measurements.shirtLength}"</span></div>
                <div>Chest: <span className="text-champagne-300 font-bold">{measurements.chest}"</span></div>
                <div>Shoulder: <span className="text-champagne-300 font-bold">{measurements.shoulders}"</span></div>
                <div>Sleeves: <span className="text-champagne-300 font-bold">{measurements.sleeves}"</span></div>
                <div>Shalwar: <span className="text-champagne-300 font-bold">{measurements.shalwarLength}"</span></div>
                <div>Bottom: <span className="text-champagne-300 font-bold">{measurements.bottom}"</span></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAddToBag}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-400 hover:to-champagne-500 text-obsidian-950 flex items-center justify-center gap-2 shadow-lg shadow-champagne-500/20 active:scale-98 transition-all"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                <span>Add Custom Tailoring to Bag</span>
              </button>

              <button
                type="button"
                onClick={handlePrintPreview}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-gray-300 hover:text-white bg-obsidian-800 hover:bg-obsidian-750 border border-obsidian-700 flex items-center justify-center gap-2 transition-all"
              >
                <Printer className="w-4 h-4 text-champagne-400" />
                <span>Print Measurement Preview</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShalwarKameezPage;
