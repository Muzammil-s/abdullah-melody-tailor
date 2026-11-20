import React, { useState } from 'react';
import { useTailor } from '../../context/TailorContext.jsx';
import InchStepperInput from '../../components/InchStepperInput.jsx';
import { getManifestImage } from '../../data/defaultData.js';
import { GARMENT_SIZE_PRESETS } from '../../data/garmentPresets.js';
import { Ruler, Scissors, ShoppingBag, Printer, Sparkles, ArrowLeft } from 'lucide-react';

export const SleepingSuitPage = () => {
  const { settings, addToCart, setCurrentView, setActiveSlipOrder, preselectedFabric } = useTailor();
  const basePrice = settings.stitchingRates['sleeping-suit'] || 2200;

  const [activePreset, setActivePreset] = useState('M');
  const defaultVals = GARMENT_SIZE_PRESETS['sleeping-suit']['M'];

  const [measurements, setMeasurements] = useState({
    shirtLength: defaultVals.shirt.length,
    chest: defaultVals.shirt.chest,
    gap: defaultVals.shirt.gap,
    belly: defaultVals.shirt.belly,
    hip: defaultVals.shirt.hip,
    shoulder: defaultVals.shirt.shoulder,
    sleeves: defaultVals.shirt.sleeves,
    collar: defaultVals.shirt.collar,
    pajamaWaist: defaultVals.pajama.waist,
    pajamaHip: defaultVals.pajama.hip,
    pajamaLength: defaultVals.pajama.length,
    pajamaInside: defaultVals.pajama.inside,
    pajamaThigh: defaultVals.pajama.thigh,
    pajamaKnee: defaultVals.pajama.knee,
    pajamaBottom: defaultVals.pajama.bottom
  });

  const [collarStyle, setCollarStyle] = useState('camp-piped');
  const [pipingColor, setPipingColor] = useState('champagne');
  const [pocketStyle, setPocketStyle] = useState('twin-chest');
  const [customerNotes, setCustomerNotes] = useState('');

  const applyPreset = (s) => {
    setActivePreset(s);
    const p = GARMENT_SIZE_PRESETS['sleeping-suit'][s];
    setMeasurements({
      shirtLength: p.shirt.length,
      chest: p.shirt.chest,
      gap: p.shirt.gap,
      belly: p.shirt.belly,
      hip: p.shirt.hip,
      shoulder: p.shirt.shoulder,
      sleeves: p.shirt.sleeves,
      collar: p.shirt.collar,
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
    return {
      id: `bespoke-ss-${Date.now()}`,
      type: 'bespoke',
      garmentId: 'sleeping-suit',
      garmentTitle: 'Luxury Sleeping Suit',
      price: basePrice,
      quantity: 1,
      image: getManifestImage('sleeping-suit', '/images/garments/sleeping-suit.jpg'),
      attachedFabric: preselectedFabric ? {
        id: preselectedFabric.fabric.id,
        name: preselectedFabric.fabric.name,
        meters: preselectedFabric.meters,
        pricePerMeter: preselectedFabric.fabric.pricePerMeter
      } : null,
      measurements: {
        'Shirt Length': `${measurements.shirtLength}"`,
        'Chest': `${measurements.chest}"`,
        'Gap': `${measurements.gap}"`,
        'Belly': `${measurements.belly}"`,
        'Hip': `${measurements.hip}"`,
        'Shoulder': `${measurements.shoulder}"`,
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
        collarStyle,
        pipingColor,
        pocketStyle,
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
      id: `AMT-SS-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      customerName: 'Valued Patron (Sleeping Suit)',
      customerPhone: '+92 300 0000000',
      status: 'pending',
      items: [item],
      totalAmount: basePrice
    });
    setCurrentView('slip');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
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

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-obsidian-900 border border-obsidian-800 p-6 sm:p-8 rounded-2xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-champagne-400 text-xs font-mono font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Silk-Touch Bespoke Loungewear</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
            Sleeping Suit Bespoke Studio
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Relaxed tailored sleeping suit featuring soft camp notch collar, contrast satin piping, and elasticated lounge trousers.
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
        <div className="lg:col-span-8 space-y-10">
          {/* Section 1: Shirt Measurements */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Ruler className="w-5 h-5 text-champagne-400" />
                <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                  1. Sleeping Shirt Measurements (Inches)
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">8 Measurements</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InchStepperInput label="Shirt Length" value={measurements.shirtLength} onChange={(v) => updateMeasurement('shirtLength', v)} min={24} max={38} hint="28 - 33" />
              <InchStepperInput label="Chest" value={measurements.chest} onChange={(v) => updateMeasurement('chest', v)} min={32} max={60} hint="38 - 50" />
              <InchStepperInput label="Gap (Looseness)" value={measurements.gap} onChange={(v) => updateMeasurement('gap', v)} min={1} max={8} hint="2.5 - 4.5" />
              <InchStepperInput label="Belly (Waist)" value={measurements.belly} onChange={(v) => updateMeasurement('belly', v)} min={28} max={58} hint="34 - 48" />
              <InchStepperInput label="Hip" value={measurements.hip} onChange={(v) => updateMeasurement('hip', v)} min={32} max={62} hint="38 - 50" />
              <InchStepperInput label="Shoulder" value={measurements.shoulder} onChange={(v) => updateMeasurement('shoulder', v)} min={14} max={23} hint="16.5 - 20" />
              <InchStepperInput label="Sleeves" value={measurements.sleeves} onChange={(v) => updateMeasurement('sleeves', v)} min={20} max={30} hint="23 - 27" />
              <InchStepperInput label="Collar" value={measurements.collar} onChange={(v) => updateMeasurement('collar', v)} min={13} max={21} hint="15 - 18" />
            </div>
          </section>

          {/* Section 2: Pajama Measurements */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Scissors className="w-5 h-5 text-champagne-400" />
                <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                  2. Lounge Pajama Measurements (Inches)
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">7 Measurements</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InchStepperInput label="Waist (Relaxed)" value={measurements.pajamaWaist} onChange={(v) => updateMeasurement('pajamaWaist', v)} min={24} max={55} hint="30 - 44" />
              <InchStepperInput label="Hip" value={measurements.pajamaHip} onChange={(v) => updateMeasurement('pajamaHip', v)} min={32} max={65} hint="38 - 50" />
              <InchStepperInput label="Length" value={measurements.pajamaLength} onChange={(v) => updateMeasurement('pajamaLength', v)} min={30} max={50} hint="38 - 44" />
              <InchStepperInput label="Inside Leg" value={measurements.pajamaInside} onChange={(v) => updateMeasurement('pajamaInside', v)} min={20} max={38} hint="26 - 32" />
              <InchStepperInput label="Thigh" value={measurements.pajamaThigh} onChange={(v) => updateMeasurement('pajamaThigh', v)} min={20} max={38} hint="24 - 30" />
              <InchStepperInput label="Knee" value={measurements.pajamaKnee} onChange={(v) => updateMeasurement('pajamaKnee', v)} min={16} max={30} hint="19 - 24" />
              <InchStepperInput label="Bottom Opening" value={measurements.pajamaBottom} onChange={(v) => updateMeasurement('pajamaBottom', v)} min={12} max={24} hint="16 - 20" />
            </div>
          </section>

          {/* Section 3: Collar & Piping Trims */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide border-b border-obsidian-800 pb-3">
              3. Camp Collar &amp; Contrast Piping
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-300 block mb-2">Collar Cut:</label>
                <div className="space-y-2">
                  {[
                    { id: 'camp-piped', title: 'Classic Camp Notch Collar', desc: 'Soft foldback open lapel with piped edge' },
                    { id: 'mandarin-piped', title: 'Piped Mandarin Ban', desc: 'Minimalist stand collar with satin cord' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCollarStyle(c.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        collarStyle === c.id ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-white block">{c.title}</span>
                      <span className="text-[10px] text-gray-400">{c.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-300 block mb-2">Satin Piping Color Accent:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'champagne', title: 'Champagne Gold' },
                    { id: 'ivory', title: 'Pure White / Ivory' },
                    { id: 'navy', title: 'Navy Blue Silk' },
                    { id: 'none', title: 'Self Fabric Tone' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPipingColor(p.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        pipingColor === p.id ? 'bg-champagne-500 text-obsidian-950 font-bold' : 'bg-obsidian-950 text-gray-300 border border-obsidian-750'
                      }`}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sticky Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-obsidian-900 border border-obsidian-750 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">Live Tailor Card</h3>
                <span className="text-[10px] text-champagne-400 font-mono">Sleeping Suit</span>
              </div>
              <span className="text-lg font-mono font-bold text-champagne-400">
                {settings.currency} {basePrice.toLocaleString()}
              </span>
            </div>

            <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800 text-[11px] font-mono space-y-1">
              <div className="flex justify-between text-gray-400">
                <span>Collar:</span>
                <span className="text-champagne-300 font-bold capitalize">{collarStyle}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Piping:</span>
                <span className="text-white font-bold capitalize">{pipingColor}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shirt Length:</span>
                <span className="text-champagne-300 font-bold">{measurements.shirtLength}"</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Pajama Length:</span>
                <span className="text-champagne-300 font-bold">{measurements.pajamaLength}"</span>
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

export default SleepingSuitPage;
