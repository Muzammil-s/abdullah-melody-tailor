import React, { useState } from 'react';
import { useTailor } from '../../context/TailorContext.jsx';
import InchStepperInput from '../../components/InchStepperInput.jsx';
import { getManifestImage } from '../../data/defaultData.js';
import { GARMENT_SIZE_PRESETS } from '../../data/garmentPresets.js';
import { Ruler, Scissors, Check, ShoppingBag, Printer, Sparkles, ArrowLeft } from 'lucide-react';

export const SafariSuitPage = () => {
  const { settings, addToCart, setCurrentView, setActiveSlipOrder, preselectedFabric } = useTailor();
  const basePrice = settings.stitchingRates['safari-suit'] || 6500;

  const [activePreset, setActivePreset] = useState('M');
  const defaultVals = GARMENT_SIZE_PRESETS['safari-suit']['M'];

  const [measurements, setMeasurements] = useState({
    // Shirt
    shirtLength: defaultVals.shirt.length,
    chest: defaultVals.shirt.chest,
    gap: defaultVals.shirt.gap,
    belly: defaultVals.shirt.belly,
    hip: defaultVals.shirt.hip,
    shoulder: defaultVals.shirt.shoulder,
    sleeves: defaultVals.shirt.sleeves,
    collar: defaultVals.shirt.collar,
    // Pant
    pantWaist: defaultVals.pant.waist,
    pantHip: defaultVals.pant.hip,
    pantLength: defaultVals.pant.length,
    pantInside: defaultVals.pant.inside,
    pantThigh: defaultVals.pant.thigh,
    pantKnee: defaultVals.pant.knee,
    pantBottom: defaultVals.pant.bottom
  });

  // Design Boxes
  const [collarChoice, setCollarChoice] = useState('coat-collar'); // 'coat-collar' or 'shirt-collar'
  const [chokeChoice, setChokeChoice] = useState('with-choke'); // 'with-choke' or 'without-choke'
  const [chokeType, setChokeType] = useState('side-choke'); // 'side-choke' or 'back-single'
  const [beltChoice, setBeltChoice] = useState('with-belt'); // 'with-belt' or 'without-belt'
  const [customerNotes, setCustomerNotes] = useState('');

  const applyPreset = (s) => {
    setActivePreset(s);
    const p = GARMENT_SIZE_PRESETS['safari-suit'][s];
    setMeasurements({
      shirtLength: p.shirt.length,
      chest: p.shirt.chest,
      gap: p.shirt.gap,
      belly: p.shirt.belly,
      hip: p.shirt.hip,
      shoulder: p.shirt.shoulder,
      sleeves: p.shirt.sleeves,
      collar: p.shirt.collar,
      pantWaist: p.pant.waist,
      pantHip: p.pant.hip,
      pantLength: p.pant.length,
      pantInside: p.pant.inside,
      pantThigh: p.pant.thigh,
      pantKnee: p.pant.knee,
      pantBottom: p.pant.bottom
    });
  };

  const updateMeasurement = (key, val) => {
    setMeasurements((prev) => ({ ...prev, [key]: val }));
    setActivePreset('Custom');
  };

  const getBespokeItem = () => {
    return {
      id: `bespoke-safari-${Date.now()}`,
      type: 'bespoke',
      garmentId: 'safari-suit',
      garmentTitle: 'Bespoke Safari Suit',
      price: basePrice,
      quantity: 1,
      image: getManifestImage('safari-suit', '/images/garments/safari-suit.jpg'),
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
        'Pant Waist': `${measurements.pantWaist}"`,
        'Pant Hip': `${measurements.pantHip}"`,
        'Pant Length': `${measurements.pantLength}"`,
        'Inside Leg (Asan)': `${measurements.pantInside}"`,
        'Thigh': `${measurements.pantThigh}"`,
        'Knee': `${measurements.pantKnee}"`,
        'Pant Bottom': `${measurements.pantBottom}"`
      },
      styling: {
        collar: collarChoice === 'coat-collar' ? 'Coat Collar (Open Lapel)' : 'Shirt Collar',
        choke: chokeChoice === 'with-choke' ? `With Choke (${chokeType})` : 'Without Choke (Ventless)',
        belt: beltChoice === 'with-belt' ? 'With Half Back Belt' : 'Without Belt (Clean Plain)',
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
      id: `AMT-SAFARI-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      customerName: 'Valued Patron (Safari Suit)',
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
            <span>Classic Vintage Executive Cut</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
            Safari Suit Bespoke Studio
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Tailor a timeless Safari Suit with coat or shirt collar, dual choke vents, back half belt, and matching tailored trousers.
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
          {/* Section 1: Safari Shirt Measurements */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Ruler className="w-5 h-5 text-champagne-400" />
                <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                  1. Safari Jacket / Shirt Measurements (Inches)
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">8 Measurements</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InchStepperInput label="Shirt Length" value={measurements.shirtLength} onChange={(v) => updateMeasurement('shirtLength', v)} min={25} max={38} hint="29 - 33" />
              <InchStepperInput label="Chest" value={measurements.chest} onChange={(v) => updateMeasurement('chest', v)} min={32} max={60} hint="36 - 48" />
              <InchStepperInput label="Gap (Ease)" value={measurements.gap} onChange={(v) => updateMeasurement('gap', v)} min={1} max={6} hint="2.0 - 3.5" />
              <InchStepperInput label="Belly (Waist)" value={measurements.belly} onChange={(v) => updateMeasurement('belly', v)} min={28} max={58} hint="33 - 46" />
              <InchStepperInput label="Hip" value={measurements.hip} onChange={(v) => updateMeasurement('hip', v)} min={32} max={62} hint="36 - 48" />
              <InchStepperInput label="Shoulder Width" value={measurements.shoulder} onChange={(v) => updateMeasurement('shoulder', v)} min={14} max={23} hint="16.5 - 20" />
              <InchStepperInput label="Sleeves Length" value={measurements.sleeves} onChange={(v) => updateMeasurement('sleeves', v)} min={20} max={32} hint="23 - 27" />
              <InchStepperInput label="Collar / Neck" value={measurements.collar} onChange={(v) => updateMeasurement('collar', v)} min={13} max={22} hint="14.5 - 18" />
            </div>
          </section>

          {/* Section 2: Pant Measurements */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Scissors className="w-5 h-5 text-champagne-400" />
                <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                  2. Safari Trousers Measurements (Inches)
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">7 Measurements</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InchStepperInput label="Waist" value={measurements.pantWaist} onChange={(v) => updateMeasurement('pantWaist', v)} min={26} max={55} hint="30 - 44" />
              <InchStepperInput label="Hip" value={measurements.pantHip} onChange={(v) => updateMeasurement('pantHip', v)} min={32} max={65} hint="36 - 48" />
              <InchStepperInput label="Length" value={measurements.pantLength} onChange={(v) => updateMeasurement('pantLength', v)} min={32} max={50} hint="38 - 44" />
              <InchStepperInput label="Inside Leg" value={measurements.pantInside} onChange={(v) => updateMeasurement('pantInside', v)} min={22} max={38} hint="28 - 34" />
              <InchStepperInput label="Thigh" value={measurements.pantThigh} onChange={(v) => updateMeasurement('pantThigh', v)} min={20} max={36} hint="24 - 30" />
              <InchStepperInput label="Knee" value={measurements.pantKnee} onChange={(v) => updateMeasurement('pantKnee', v)} min={15} max={28} hint="18 - 22" />
              <InchStepperInput label="Bottom Opening" value={measurements.pantBottom} onChange={(v) => updateMeasurement('pantBottom', v)} min={12} max={22} hint="15 - 18" />
            </div>
          </section>

          {/* Section 3: Collar, Choke Vents & Belt */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide border-b border-obsidian-800 pb-3">
              3. Collar, Choke Vents &amp; Back Belt Styling
            </h2>

            {/* Collar Choice */}
            <div>
              <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Collar Design:</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'coat-collar', title: 'Coat Collar (Open Notch Lapel)', desc: 'Tailored suit-style notch collar' },
                  { id: 'shirt-collar', title: 'Shirt Collar (Button Placket)', desc: 'Classic spread shirt collar style' }
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCollarChoice(c.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      collarChoice === c.id ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-white block">{c.title}</span>
                    <span className="text-[10px] text-gray-400">{c.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Choke Vents (2 Separate Primary Options) */}
            <div className="pt-2 border-t border-obsidian-800">
              <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">
                Choke Vents (2 Separate Primary Options):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setChokeChoice('with-choke')}
                  className={`cursor-pointer p-4 rounded-xl border transition-all ${
                    chokeChoice === 'with-choke' ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white uppercase">With Choke (Vented)</span>
                    {chokeChoice === 'with-choke' && <Check className="w-4 h-4 text-champagne-400" />}
                  </div>
                  <p className="text-[10px] text-gray-400">Rear vents for comfortable sitting and mobility</p>

                  {chokeChoice === 'with-choke' && (
                    <div className="mt-3 pt-2 border-t border-obsidian-750 flex gap-2">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setChokeType('side-choke'); }}
                        className={`flex-1 py-1 px-2 rounded text-[11px] font-bold ${
                          chokeType === 'side-choke' ? 'bg-champagne-500 text-obsidian-950' : 'bg-obsidian-800 text-gray-300'
                        }`}
                      >
                        Side Choke (Dual)
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setChokeType('back-single'); }}
                        className={`flex-1 py-1 px-2 rounded text-[11px] font-bold ${
                          chokeType === 'back-single' ? 'bg-champagne-500 text-obsidian-950' : 'bg-obsidian-800 text-gray-300'
                        }`}
                      >
                        Back Single Choke
                      </button>
                    </div>
                  )}
                </div>

                <div
                  onClick={() => setChokeChoice('without-choke')}
                  className={`cursor-pointer p-4 rounded-xl border transition-all ${
                    chokeChoice === 'without-choke' ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white uppercase">Without Choke (Ventless)</span>
                    {chokeChoice === 'without-choke' && <Check className="w-4 h-4 text-champagne-400" />}
                  </div>
                  <p className="text-[10px] text-gray-400">Closed back hem with zero vents</p>
                </div>
              </div>
            </div>

            {/* Belt Options */}
            <div className="pt-2 border-t border-obsidian-800">
              <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Back Waist Belt:</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'with-belt', title: 'With Half Belt', desc: 'Stitched back waist band accent with button tabs' },
                  { id: 'without-belt', title: 'Without Belt', desc: 'Seamless clean back jacket panel' }
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBeltChoice(b.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      beltChoice === b.id ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-white block">{b.title}</span>
                    <span className="text-[10px] text-gray-400">{b.desc}</span>
                  </button>
                ))}
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
                <span className="text-[10px] text-champagne-400 font-mono">Safari Suit</span>
              </div>
              <span className="text-lg font-mono font-bold text-champagne-400">
                {settings.currency} {basePrice.toLocaleString()}
              </span>
            </div>

            <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800 text-[11px] font-mono space-y-1.5">
              <div className="flex justify-between text-gray-400">
                <span>Collar:</span>
                <span className="text-champagne-300 font-bold capitalize">{collarChoice.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Choke:</span>
                <span className="text-white font-bold capitalize">{chokeChoice === 'with-choke' ? chokeType : 'Ventless'}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Belt:</span>
                <span className="text-white font-bold capitalize">{beltChoice.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shirt Length:</span>
                <span className="text-champagne-300 font-bold">{measurements.shirtLength}"</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Pant Length:</span>
                <span className="text-champagne-300 font-bold">{measurements.pantLength}"</span>
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

export default SafariSuitPage;
