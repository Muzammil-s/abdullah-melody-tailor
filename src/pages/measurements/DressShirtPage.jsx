import React, { useState } from 'react';
import { useTailor } from '../../context/TailorContext.jsx';
import InchStepperInput from '../../components/InchStepperInput.jsx';
import { COLLAR_SPECIFICATIONS, getManifestImage } from '../../data/defaultData.js';
import { GARMENT_SIZE_PRESETS } from '../../data/garmentPresets.js';
import { Ruler, Check, ShoppingBag, Printer, Sparkles, ArrowLeft } from 'lucide-react';

export const DressShirtPage = () => {
  const { settings, addToCart, setCurrentView, setActiveSlipOrder, preselectedFabric } = useTailor();
  const basePrice = settings.stitchingRates['dress-shirt'] || 1800;

  const [activePreset, setActivePreset] = useState('M');
  const defaultVals = GARMENT_SIZE_PRESETS['dress-shirt']['M'];

  const [measurements, setMeasurements] = useState({
    shirtLength: defaultVals.length,
    chest: defaultVals.chest,
    gap: defaultVals.gap,
    belly: defaultVals.belly,
    hip: defaultVals.hip,
    shoulder: defaultVals.shoulder,
    sleeves: defaultVals.sleeves,
    collar: defaultVals.collar
  });

  const [collarStyle, setCollarStyle] = useState('A2');
  const [cuffStyle, setCuffStyle] = useState('french');
  const [placketStyle, setPlacketStyle] = useState('french');
  const [pocketStyle, setPocketStyle] = useState('none');
  const [customerNotes, setCustomerNotes] = useState('');

  const applyPreset = (s) => {
    setActivePreset(s);
    const p = GARMENT_SIZE_PRESETS['dress-shirt'][s];
    setMeasurements({
      shirtLength: p.length,
      chest: p.chest,
      gap: p.gap,
      belly: p.belly,
      hip: p.hip,
      shoulder: p.shoulder,
      sleeves: p.sleeves,
      collar: p.collar
    });
  };

  const updateMeasurement = (key, val) => {
    setMeasurements((prev) => ({ ...prev, [key]: val }));
    setActivePreset('Custom');
  };

  const getBespokeItem = () => {
    const collarObj = COLLAR_SPECIFICATIONS.find((c) => c.code === collarStyle);
    return {
      id: `bespoke-ds-${Date.now()}`,
      type: 'bespoke',
      garmentId: 'dress-shirt',
      garmentTitle: 'Bespoke Dress Shirt',
      price: basePrice,
      quantity: 1,
      image: getManifestImage('dress-shirt', '/images/garments/dress-shirt.jpg'),
      attachedFabric: preselectedFabric ? {
        id: preselectedFabric.fabric.id,
        name: preselectedFabric.fabric.name,
        meters: preselectedFabric.meters,
        pricePerMeter: preselectedFabric.fabric.pricePerMeter
      } : null,
      measurements: {
        'Shirt Length': `${measurements.shirtLength}"`,
        'Chest': `${measurements.chest}"`,
        'Gap (Ease)': `${measurements.gap}"`,
        'Belly (Waist)': `${measurements.belly}"`,
        'Hip': `${measurements.hip}"`,
        'Shoulder (Yoke)': `${measurements.shoulder}"`,
        'Sleeves Length': `${measurements.sleeves}"`,
        'Collar / Neck': `${measurements.collar}"`
      },
      styling: {
        collar: { code: collarStyle, title: collarObj?.title, dims: collarObj?.dims },
        cuffStyle,
        placketStyle,
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
      id: `AMT-DS-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      customerName: 'Valued Patron (Dress Shirt)',
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
            <span>Savile Row Precision Cut</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
            Bespoke Dress Shirt Studio
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Engineered formal shirts with German topfused collar stays, French cuffs for cufflinks or double-button barrel cuffs, and custom split yoke.
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
          {/* Measurements */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Ruler className="w-5 h-5 text-champagne-400" />
                <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                  1. Shirt Measurements (Inches)
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">Quarter-inch precision</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InchStepperInput label="Shirt Length" value={measurements.shirtLength} onChange={(v) => updateMeasurement('shirtLength', v)} min={24} max={38} hint="28 - 33" />
              <InchStepperInput label="Chest" value={measurements.chest} onChange={(v) => updateMeasurement('chest', v)} min={32} max={60} hint="36 - 48" />
              <InchStepperInput label="Gap (Looseness)" value={measurements.gap} onChange={(v) => updateMeasurement('gap', v)} min={0} max={6} hint="1.5 - 3.0" />
              <InchStepperInput label="Belly (Waist)" value={measurements.belly} onChange={(v) => updateMeasurement('belly', v)} min={28} max={58} hint="32 - 46" />
              <InchStepperInput label="Hip" value={measurements.hip} onChange={(v) => updateMeasurement('hip', v)} min={32} max={62} hint="36 - 48" />
              <InchStepperInput label="Shoulder (Yoke)" value={measurements.shoulder} onChange={(v) => updateMeasurement('shoulder', v)} min={14} max={23} hint="16.5 - 19.5" />
              <InchStepperInput label="Sleeves Length" value={measurements.sleeves} onChange={(v) => updateMeasurement('sleeves', v)} min={20} max={32} hint="23 - 27" />
              <InchStepperInput label="Collar / Neck" value={measurements.collar} onChange={(v) => updateMeasurement('collar', v)} min={13} max={21} hint="14.5 - 17.5" />
            </div>
          </section>

          {/* Styling Options */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide border-b border-obsidian-800 pb-3">
              2. Collar Spreads &amp; Cuff Engineering
            </h2>

            {/* Collar Spreads A1 - A4 */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase text-champagne-400 block">Collar Style (Topfused Stays):</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {COLLAR_SPECIFICATIONS.map((col) => (
                  <div
                    key={col.code}
                    onClick={() => setCollarStyle(col.code)}
                    className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                      collarStyle === col.code ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750'
                    }`}
                  >
                    <div className="h-16 flex items-center justify-center p-1 mb-2">
                      <img src={col.image} alt={col.title} className="max-h-full object-contain" />
                    </div>
                    <span className="text-xs font-bold text-white block">{col.code}</span>
                    <span className="text-[10px] text-gray-400 block">{col.title.replace(`Collar ${col.code}: `, '')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cuffs & Placket */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-obsidian-800">
              <div>
                <label className="text-xs font-bold uppercase text-gray-300 block mb-2">Cuff Engineering:</label>
                <div className="space-y-2">
                  {[
                    { id: 'french', title: 'Double French Cuff', desc: 'Foldback cuff for bespoke cufflinks' },
                    { id: 'barrel', title: 'Two-Button Barrel Cuff', desc: 'Adjustable dual button closure' },
                    { id: 'single', title: 'Single Classic Button Cuff', desc: 'Clean everyday business barrel' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCuffStyle(c.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                        cuffStyle === c.id ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-white block">{c.title}</span>
                      <span className="text-[10px] text-gray-400">{c.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-300 block mb-2">Placket &amp; Pocket:</label>
                <div className="space-y-2">
                  {[
                    { id: 'french', title: 'Standard French Placket', desc: 'Clean turned placket' },
                    { id: 'flyfront', title: 'Concealed Fly-Front', desc: 'Hidden buttons beneath placket' },
                    { id: 'tuxedo', title: 'Tuxedo Pleated Front', desc: 'Formal evening pleated bib' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlacketStyle(p.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                        placketStyle === p.id ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-white block">{p.title}</span>
                      <span className="text-[10px] text-gray-400">{p.desc}</span>
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
                <span className="text-[10px] text-champagne-400 font-mono">Bespoke Dress Shirt</span>
              </div>
              <span className="text-lg font-mono font-bold text-champagne-400">
                {settings.currency} {basePrice.toLocaleString()}
              </span>
            </div>

            <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800 text-[11px] font-mono space-y-1">
              <div className="flex justify-between text-gray-400">
                <span>Collar:</span>
                <span className="text-champagne-300 font-bold uppercase">{collarStyle}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Cuffs:</span>
                <span className="text-white font-bold capitalize">{cuffStyle} Cuff</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Length:</span>
                <span className="text-champagne-300 font-bold">{measurements.shirtLength}"</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Chest:</span>
                <span className="text-champagne-300 font-bold">{measurements.chest}"</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Sleeves:</span>
                <span className="text-champagne-300 font-bold">{measurements.sleeves}"</span>
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

export default DressShirtPage;
