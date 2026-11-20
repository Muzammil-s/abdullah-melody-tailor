import React, { useState } from 'react';
import { useTailor } from '../../context/TailorContext.jsx';
import InchStepperInput from '../../components/InchStepperInput.jsx';
import {
  COLLAR_SPECIFICATIONS,
  BAN_SPECIFICATIONS,
  BAN_SIZES,
  BUTTON_OPTIONS,
  getManifestImage
} from '../../data/defaultData.js';
import { GARMENT_SIZE_PRESETS } from '../../data/garmentPresets.js';
import { Ruler, Scissors, Check, ShoppingBag, Printer, Sparkles, ArrowLeft } from 'lucide-react';

export const KurtaPajamaPage = () => {
  const { settings, addToCart, setCurrentView, setActiveSlipOrder, preselectedFabric } = useTailor();
  const basePrice = settings.stitchingRates['kurta-pajama'] || 2600;

  const [activePreset, setActivePreset] = useState('M');
  const defaultVals = GARMENT_SIZE_PRESETS['kurta-pajama']['M'];

  const [measurements, setMeasurements] = useState({
    shirtLength: defaultVals.kurta.length,
    chest: defaultVals.kurta.chest,
    gap: defaultVals.kurta.gap,
    belly: defaultVals.kurta.belly,
    hip: defaultVals.kurta.hip,
    shoulders: defaultVals.kurta.shoulder,
    sleeves: defaultVals.kurta.sleeves,
    collar: defaultVals.kurta.collar,
    pajamaWaist: defaultVals.pajama.waist,
    pajamaHip: defaultVals.pajama.hip,
    pajamaLength: defaultVals.pajama.length,
    pajamaInside: defaultVals.pajama.inside,
    pajamaThigh: defaultVals.pajama.thigh,
    pajamaKnee: defaultVals.pajama.knee,
    pajamaBottom: defaultVals.pajama.bottom
  });

  const [necklineType, setNecklineType] = useState('ban');
  const [selectedCollar, setSelectedCollar] = useState('A1');
  const [selectedBan, setSelectedBan] = useState('B1');
  const [banSize, setBanSize] = useState(1.25);
  const [selectedButton, setSelectedButton] = useState('B');
  const [pattiWidth, setPattiWidth] = useState(1.25);
  const [pattiStyle, setPattiStyle] = useState('straight');
  const [damanStyle, setDamanStyle] = useState('straight');
  const [pajamaStyle, setPajamaStyle] = useState('straight');
  const [customerNotes, setCustomerNotes] = useState('');

  const applyPreset = (s) => {
    setActivePreset(s);
    const p = GARMENT_SIZE_PRESETS['kurta-pajama'][s];
    setMeasurements({
      shirtLength: p.kurta.length,
      chest: p.kurta.chest,
      gap: p.kurta.gap,
      belly: p.kurta.belly,
      hip: p.kurta.hip,
      shoulders: p.kurta.shoulder,
      sleeves: p.kurta.sleeves,
      collar: p.kurta.collar,
      pajamaWaist: p.pajama.waist,
      pajamaHip: p.pajama.hip,
      pajamaLength: p.pajama.length,
      pajamaInside: p.pajama.inside,
      pajamaThigh: p.pajama.thigh,
      pajamaKnee: p.pajama.knee,
      pajamaBottom: p.pajama.bottom
    });
  };

  const updateMeasurement = (key, val) => {
    setMeasurements((prev) => ({ ...prev, [key]: val }));
    setActivePreset('Custom');
  };

  const getBespokeItem = () => {
    const collarObj = COLLAR_SPECIFICATIONS.find((c) => c.code === selectedCollar);
    const banObj = BAN_SPECIFICATIONS.find((b) => b.code === selectedBan);
    const buttonObj = BUTTON_OPTIONS.find((b) => b.code === selectedButton);

    return {
      id: `bespoke-kp-${Date.now()}`,
      type: 'bespoke',
      garmentId: 'kurta-pajama',
      garmentTitle: 'Kurta Pajama',
      price: basePrice,
      quantity: 1,
      image: getManifestImage('kurta-pajama', '/images/garments/kurta-pajama.jpg'),
      attachedFabric: preselectedFabric ? {
        id: preselectedFabric.fabric.id,
        name: preselectedFabric.fabric.name,
        meters: preselectedFabric.meters,
        pricePerMeter: preselectedFabric.fabric.pricePerMeter
      } : null,
      measurements: {
        'Kurta Length': `${measurements.shirtLength}"`,
        'Chest': `${measurements.chest}"`,
        'Gap': `${measurements.gap}"`,
        'Belly': `${measurements.belly}"`,
        'Hip': `${measurements.hip}"`,
        'Shoulders': `${measurements.shoulders}"`,
        'Sleeves': `${measurements.sleeves}"`,
        'Collar / Neck': `${measurements.collar}"`,
        'Pajama Waist': `${measurements.pajamaWaist}"`,
        'Pajama Hip': `${measurements.pajamaHip}"`,
        'Pajama Length': `${measurements.pajamaLength}"`,
        'Inside Leg (Asan)': `${measurements.pajamaInside}"`,
        'Thigh': `${measurements.pajamaThigh}"`,
        'Knee': `${measurements.pajamaKnee}"`,
        'Pajama Bottom': `${measurements.pajamaBottom}"`
      },
      styling: {
        necklineType,
        collar: necklineType === 'collar' ? { code: selectedCollar, title: collarObj?.title } : null,
        ban: necklineType === 'ban' ? { code: selectedBan, title: banObj?.title, size: `${banSize.toFixed(2)}"` } : null,
        button: { code: selectedButton, title: buttonObj?.title },
        frontPatti: { width: `${pattiWidth.toFixed(2)}"`, style: pattiStyle },
        daman: damanStyle,
        pajamaStyle,
        notes: customerNotes
      }
    };
  };

  const handleAddToBag = () => {
    addToCart(getBespokeItem());
    setCurrentView('cart');
  };

  const handlePrintPreview = () => {
    const item = getBespokeItem();
    setActiveSlipOrder({
      id: `AMT-KP-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      customerName: 'Valued Patron (Kurta Pajama)',
      customerPhone: '+92 300 0000000',
      status: 'pending',
      items: [item],
      totalAmount: basePrice
    });
    setCurrentView('slip');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-obsidian-800">
        <button
          onClick={() => setCurrentView('stitching')}
          className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-champagne-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Outfits</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">Preset:</span>
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
              Custom
            </span>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-obsidian-900 border border-obsidian-800 p-6 sm:p-8 rounded-2xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-champagne-400 text-xs font-mono font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Royal Heritage Sartorial Cut</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
            Kurta Pajama Bespoke Studio
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Tailor a classic straight-cut Kurta paired with bespoke straight-leg Pajama trousers. Features exact chest ease, thigh, knee, and ankle bottom controls with 0.25" precision.
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Base Stitching Fee</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-champagne-400">
            {settings.currency} {basePrice.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Kurta + Pajama Measurements + Styling */}
        <div className="lg:col-span-8 space-y-10">
          {/* Section 1: Kurta Measurements */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Ruler className="w-5 h-5 text-champagne-400" />
                <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                  1. Kurta Measurements (Inches)
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">8 Kurta Metrics</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InchStepperInput label="Shirt Length" value={measurements.shirtLength} onChange={(v) => updateMeasurement('shirtLength', v)} min={20} max={55} hint="38 - 46" />
              <InchStepperInput label="Chest" value={measurements.chest} onChange={(v) => updateMeasurement('chest', v)} min={28} max={60} hint="36 - 50" />
              <InchStepperInput label="Gap (Looseness)" value={measurements.gap} onChange={(v) => updateMeasurement('gap', v)} min={0} max={8} hint="1.5 - 3.5" />
              <InchStepperInput label="Belly" value={measurements.belly} onChange={(v) => updateMeasurement('belly', v)} min={26} max={60} hint="32 - 48" />
              <InchStepperInput label="Hip" value={measurements.hip} onChange={(v) => updateMeasurement('hip', v)} min={30} max={65} hint="38 - 52" />
              <InchStepperInput label="Shoulders" value={measurements.shoulders} onChange={(v) => updateMeasurement('shoulders', v)} min={13} max={24} hint="16 - 20" />
              <InchStepperInput label="Sleeves" value={measurements.sleeves} onChange={(v) => updateMeasurement('sleeves', v)} min={18} max={30} hint="22 - 27" />
              <InchStepperInput label="Collar / Neck" value={measurements.collar} onChange={(v) => updateMeasurement('collar', v)} min={12} max={22} hint="14 - 18" />
            </div>
          </section>

          {/* Section 2: Pajama Measurements */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Scissors className="w-5 h-5 text-champagne-400" />
                <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                  2. Pajama Measurements (Inches)
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">7 Pajama Metrics</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InchStepperInput label="Waist" value={measurements.pajamaWaist} onChange={(v) => updateMeasurement('pajamaWaist', v)} min={24} max={55} hint="30 - 44" />
              <InchStepperInput label="Hip" value={measurements.pajamaHip} onChange={(v) => updateMeasurement('pajamaHip', v)} min={30} max={65} hint="36 - 50" />
              <InchStepperInput label="Length" value={measurements.pajamaLength} onChange={(v) => updateMeasurement('pajamaLength', v)} min={30} max={50} hint="38 - 44" />
              <InchStepperInput label="Inside Leg" value={measurements.pajamaInside} onChange={(v) => updateMeasurement('pajamaInside', v)} min={20} max={38} hint="26 - 32" />
              <InchStepperInput label="Thigh" value={measurements.pajamaThigh} onChange={(v) => updateMeasurement('pajamaThigh', v)} min={18} max={36} hint="23 - 30" />
              <InchStepperInput label="Knee" value={measurements.pajamaKnee} onChange={(v) => updateMeasurement('pajamaKnee', v)} min={14} max={28} hint="17 - 22" />
              <InchStepperInput label="Bottom (Opening)" value={measurements.pajamaBottom} onChange={(v) => updateMeasurement('pajamaBottom', v)} min={11} max={22} hint="14 - 18" />
            </div>
          </section>

          {/* Section 3: Neckline, Patti & Buttons */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide border-b border-obsidian-800 pb-3">
              3. Neckline &amp; Placket Styling
            </h2>

            {/* Neckline Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setNecklineType('ban')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                  necklineType === 'ban' ? 'bg-champagne-500 text-obsidian-950 font-bold' : 'bg-obsidian-800 text-gray-300'
                }`}
              >
                Traditional Ban (B1–B4)
              </button>
              <button
                type="button"
                onClick={() => setNecklineType('collar')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                  necklineType === 'collar' ? 'bg-champagne-500 text-obsidian-950 font-bold' : 'bg-obsidian-800 text-gray-300'
                }`}
              >
                Shirt Collar (A1–A4)
              </button>
            </div>

            {/* Ban selection */}
            {necklineType === 'ban' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BAN_SPECIFICATIONS.map((ban) => (
                  <div
                    key={ban.code}
                    onClick={() => setSelectedBan(ban.code)}
                    className={`cursor-pointer rounded-xl border p-3 text-center transition-all ${
                      selectedBan === ban.code
                        ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500'
                        : 'bg-obsidian-950 border-obsidian-750'
                    }`}
                  >
                    <div className="h-16 flex items-center justify-center p-1 mb-2">
                      <img src={ban.image} alt={ban.title} className="max-h-full object-contain" />
                    </div>
                    <span className="text-xs font-bold text-white block">{ban.code}</span>
                    <span className="text-[10px] text-gray-400 truncate block">{ban.title}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Collar selection */}
            {necklineType === 'collar' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {COLLAR_SPECIFICATIONS.map((collar) => (
                  <div
                    key={collar.code}
                    onClick={() => setSelectedCollar(collar.code)}
                    className={`cursor-pointer rounded-xl border p-3 text-center transition-all ${
                      selectedCollar === collar.code
                        ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500'
                        : 'bg-obsidian-950 border-obsidian-750'
                    }`}
                  >
                    <div className="h-16 flex items-center justify-center p-1 mb-2">
                      <img src={collar.image} alt={collar.title} className="max-h-full object-contain" />
                    </div>
                    <span className="text-xs font-bold text-white block">{collar.code}</span>
                    <span className="text-[10px] text-champagne-300 block">{collar.dims.spread} spread</span>
                  </div>
                ))}
              </div>
            )}

            {/* Daman & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-obsidian-800">
              <div>
                <label className="text-xs font-bold uppercase text-gray-300 block mb-2">Kurta Daman (Hem):</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDamanStyle('straight')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      damanStyle === 'straight' ? 'bg-champagne-500 text-obsidian-950' : 'bg-obsidian-950 text-gray-300 border border-obsidian-750'
                    }`}
                  >
                    Straight Daman
                  </button>
                  <button
                    type="button"
                    onClick={() => setDamanStyle('gol')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      damanStyle === 'gol' ? 'bg-champagne-500 text-obsidian-950' : 'bg-obsidian-950 text-gray-300 border border-obsidian-750'
                    }`}
                  >
                    Gol (Round) Daman
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-300 block mb-2">Pajama Cut:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPajamaStyle('straight')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      pajamaStyle === 'straight' ? 'bg-champagne-500 text-obsidian-950' : 'bg-obsidian-950 text-gray-300 border border-obsidian-750'
                    }`}
                  >
                    Straight Trouser
                  </button>
                  <button
                    type="button"
                    onClick={() => setPajamaStyle('churidar')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      pajamaStyle === 'churidar' ? 'bg-champagne-500 text-obsidian-950' : 'bg-obsidian-950 text-gray-300 border border-obsidian-750'
                    }`}
                  >
                    Churidar Style
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Sticky Summary */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-obsidian-900 border border-obsidian-750 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">Live Tailor Card</h3>
                <span className="text-[10px] text-champagne-400 font-mono">Kurta Pajama Suit</span>
              </div>
              <span className="text-lg font-mono font-bold text-champagne-400">
                {settings.currency} {basePrice.toLocaleString()}
              </span>
            </div>

            <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800 text-[11px] font-mono space-y-1">
              <div className="flex justify-between text-gray-400">
                <span>Neck:</span>
                <span className="text-champagne-300 font-bold uppercase">{necklineType === 'ban' ? `Ban ${selectedBan}` : `Collar ${selectedCollar}`}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Daman &amp; Cut:</span>
                <span className="text-white font-bold capitalize">{damanStyle} &bull; {pajamaStyle}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Kurta Length:</span>
                <span className="text-champagne-300 font-bold">{measurements.shirtLength}"</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Pajama Length:</span>
                <span className="text-champagne-300 font-bold">{measurements.pajamaLength}"</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Pajama Bottom:</span>
                <span className="text-champagne-300 font-bold">{measurements.pajamaBottom}"</span>
              </div>
            </div>

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

export default KurtaPajamaPage;
