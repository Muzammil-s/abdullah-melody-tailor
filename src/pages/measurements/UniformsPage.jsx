import React, { useState, useEffect } from 'react';
import { useTailor } from '../../context/TailorContext.jsx';
import InchStepperInput from '../../components/InchStepperInput.jsx';
import { getManifestImage } from '../../data/defaultData.js';
import { GARMENT_SIZE_PRESETS } from '../../data/garmentPresets.js';
import { Ruler, Scissors, Check, ShoppingBag, Printer, Sparkles, ArrowLeft, Shield } from 'lucide-react';

export const UniformsPage = ({ initialBranch = 'police' }) => {
  const { settings, addToCart, setCurrentView, setActiveSlipOrder, preselectedFabric, uniformMode } = useTailor();

  // Active Branch: 'police' | 'fia'
  const [activeBranch, setActiveBranch] = useState(uniformMode || initialBranch || 'police');

  useEffect(() => {
    if (uniformMode) setActiveBranch(uniformMode);
  }, [uniformMode]);

  const basePrice = activeBranch === 'police'
    ? (settings.stitchingRates['police-uniform'] || 3200)
    : (settings.stitchingRates['fia-uniform'] || 3400);

  const [activePreset, setActivePreset] = useState('M');
  const defaultVals = GARMENT_SIZE_PRESETS['uniforms']['M'];

  const [measurements, setMeasurements] = useState({
    shirtLength: defaultVals.shirt.length,
    chest: defaultVals.shirt.chest,
    gap: defaultVals.shirt.gap,
    belly: defaultVals.shirt.belly,
    hip: defaultVals.shirt.hip,
    shoulder: defaultVals.shirt.shoulder,
    sleeves: defaultVals.shirt.sleeves,
    collar: defaultVals.shirt.collar,
    pantWaist: defaultVals.pant.waist,
    pantHip: defaultVals.pant.hip,
    pantLength: defaultVals.pant.length,
    pantInside: defaultVals.pant.inside,
    pantThigh: defaultVals.pant.thigh,
    pantKnee: defaultVals.pant.knee,
    pantBottom: defaultVals.pant.bottom
  });

  // Uniform Specific Options
  const [dualFlapPockets, setDualFlapPockets] = useState(true);
  const [penSlot, setPenSlot] = useState(true);
  const [shoulderEpaulettes, setShoulderEpaulettes] = useState(true);
  const [rankBadgeProvision, setRankBadgeProvision] = useState(true);
  const [starCount, setStarCount] = useState('2'); // '1', '2', '3', 'insignia'
  const [customerNotes, setCustomerNotes] = useState('');

  const applyPreset = (s) => {
    setActivePreset(s);
    const p = GARMENT_SIZE_PRESETS['uniforms'][s];
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

  const branchTitle = activeBranch === 'police' ? 'Pakistan Police Regulated Uniform' : 'FIA Federal Executive Uniform';
  const branchImage = activeBranch === 'police'
    ? getManifestImage('police-uniform', '/images/garments/police-uniform.jpg')
    : getManifestImage('fia-uniform', '/images/garments/fia-uniform.jpg');

  const getBespokeItem = () => {
    return {
      id: `bespoke-uni-${Date.now()}`,
      type: 'bespoke',
      garmentId: `${activeBranch}-uniform`,
      garmentTitle: branchTitle,
      price: basePrice,
      quantity: 1,
      image: branchImage,
      attachedFabric: preselectedFabric ? {
        id: preselectedFabric.fabric.id,
        name: preselectedFabric.fabric.name,
        meters: preselectedFabric.meters,
        pricePerMeter: preselectedFabric.fabric.pricePerMeter
      } : null,
      measurements: {
        'Shirt Length': `${measurements.shirtLength}"`,
        'Chest': `${measurements.chest}"`,
        'Gap (Looseness)': `${measurements.gap}"`,
        'Belly (Waist)': `${measurements.belly}"`,
        'Hip': `${measurements.hip}"`,
        'Shoulder Width': `${measurements.shoulder}"`,
        'Sleeves Length': `${measurements.sleeves}"`,
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
        branch: activeBranch.toUpperCase(),
        pockets: dualFlapPockets ? 'Standard Dual Flap Utility Pockets' : 'Plain Pockets',
        penSlot: penSlot ? 'Dedicated Pen Slot in Left Pocket' : 'No Pen Slot',
        epaulettes: shoulderEpaulettes ? 'Reinforced Shoulder Epaulettes' : 'No Epaulettes',
        rankBadges: rankBadgeProvision ? `Rank Badge Slot & ${starCount} Star Provisions` : 'None',
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
      id: `AMT-UNI-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      customerName: `Officer (Preview - ${activeBranch.toUpperCase()})`,
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

      {/* Hero Header with Department Branch Tabs */}
      <div className="bg-obsidian-900 border border-obsidian-800 p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-champagne-400 text-xs font-mono font-semibold uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" />
              <span>Official Law Enforcement Sartorial Cut</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
              Official Uniforms Bespoke Studio
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Precision military and police uniform tailoring. Includes box-pleat flap pockets, pen slots, shoulder star epaulettes, and heavy duty trousers.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Base Stitching Fee</span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-champagne-400">
              {settings.currency} {basePrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Branch Selection Tabs */}
        <div className="flex items-center gap-3 pt-2 border-t border-obsidian-800">
          <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Department Branch:</span>
          <button
            type="button"
            onClick={() => setActiveBranch('police')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeBranch === 'police'
                ? 'bg-gradient-to-r from-champagne-500 to-champagne-600 text-obsidian-950 font-black shadow-lg shadow-champagne-500/20'
                : 'bg-obsidian-950 text-gray-300 border border-obsidian-750'
            }`}
          >
            Pakistan Police Uniform
          </button>
          <button
            type="button"
            onClick={() => setActiveBranch('fia')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeBranch === 'fia'
                ? 'bg-gradient-to-r from-champagne-500 to-champagne-600 text-obsidian-950 font-black shadow-lg shadow-champagne-500/20'
                : 'bg-obsidian-950 text-gray-300 border border-obsidian-750'
            }`}
          >
            FIA Federal Executive Uniform
          </button>
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
                  1. Uniform Shirt Measurements (Inches)
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">8 Metrics</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InchStepperInput label="Shirt Length" value={measurements.shirtLength} onChange={(v) => updateMeasurement('shirtLength', v)} min={25} max={38} hint="29 - 33" />
              <InchStepperInput label="Chest" value={measurements.chest} onChange={(v) => updateMeasurement('chest', v)} min={32} max={60} hint="36 - 48" />
              <InchStepperInput label="Gap (Ease)" value={measurements.gap} onChange={(v) => updateMeasurement('gap', v)} min={1} max={6} hint="2.0 - 3.0" />
              <InchStepperInput label="Belly (Waist)" value={measurements.belly} onChange={(v) => updateMeasurement('belly', v)} min={28} max={58} hint="32 - 46" />
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
                  2. Uniform Trousers Measurements (Inches)
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">7 Metrics</span>
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

          {/* Section 3: Uniform Additions (Pockets, Stars & Epaulettes) */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide border-b border-obsidian-800 pb-3">
              3. Uniform Additions &amp; Insignia Provisions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setDualFlapPockets(!dualFlapPockets)}
                className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all ${
                  dualFlapPockets ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Dual Flap Chest Pockets</h4>
                  <p className="text-[11px] text-gray-400">Box-pleated pockets with button flap closures</p>
                </div>
                {dualFlapPockets && <Check className="w-4 h-4 text-champagne-400" />}
              </div>

              <div
                onClick={() => setPenSlot(!penSlot)}
                className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all ${
                  penSlot ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Dedicated Pen Slot</h4>
                  <p className="text-[11px] text-gray-400">Vertical pen opening slit on left pocket flap</p>
                </div>
                {penSlot && <Check className="w-4 h-4 text-champagne-400" />}
              </div>

              <div
                onClick={() => setShoulderEpaulettes(!shoulderEpaulettes)}
                className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all ${
                  shoulderEpaulettes ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Shoulder Epaulettes (Straps)</h4>
                  <p className="text-[11px] text-gray-400">Reinforced straps for rank slip-ons</p>
                </div>
                {shoulderEpaulettes && <Check className="w-4 h-4 text-champagne-400" />}
              </div>

              <div
                onClick={() => setRankBadgeProvision(!rankBadgeProvision)}
                className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all ${
                  rankBadgeProvision ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Star &amp; Badge Mount Slots</h4>
                  <p className="text-[11px] text-gray-400">Eyelet holes for metallic badge pins</p>
                </div>
                {rankBadgeProvision && <Check className="w-4 h-4 text-champagne-400" />}
              </div>
            </div>

            {/* Stars Count */}
            {rankBadgeProvision && (
              <div className="pt-2 border-t border-obsidian-800">
                <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Rank Star Count:</span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: '1', label: '1 Star (Inspector / Sub)' },
                    { id: '2', label: '2 Stars (DSP / AD)' },
                    { id: '3', label: '3 Stars (SP / DD)' },
                    { id: 'custom', label: 'Command Insignia' }
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setStarCount(st.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        starCount === st.id ? 'bg-champagne-500 text-obsidian-950' : 'bg-obsidian-950 text-gray-300 border border-obsidian-750'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Uniform Notes */}
            <div className="space-y-2 pt-2 border-t border-obsidian-800">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                Additional Uniform Notes:
              </label>
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Belt loops widened for 2-inch duty belt; reinforce trouser pocket corners."
                className="w-full bg-obsidian-950 border border-obsidian-750 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:border-champagne-400 outline-none"
              />
            </div>
          </section>
        </div>

        {/* Right Sticky Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-obsidian-900 border border-obsidian-750 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">Live Tailor Card</h3>
                <span className="text-[10px] text-champagne-400 font-mono uppercase">{activeBranch} Uniform</span>
              </div>
              <span className="text-lg font-mono font-bold text-champagne-400">
                {settings.currency} {basePrice.toLocaleString()}
              </span>
            </div>

            <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800 text-[11px] font-mono space-y-1.5">
              <div className="flex justify-between text-gray-400">
                <span>Branch:</span>
                <span className="text-champagne-300 font-bold uppercase">{activeBranch}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Pockets:</span>
                <span className="text-white font-bold">{dualFlapPockets ? 'Dual Flap' : 'Standard'}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Epaulettes:</span>
                <span className="text-white font-bold">{shoulderEpaulettes ? 'Yes (Straps)' : 'No'}</span>
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

export default UniformsPage;
