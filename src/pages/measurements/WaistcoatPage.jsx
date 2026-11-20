import React, { useState } from 'react';
import { useTailor } from '../../context/TailorContext.jsx';
import InchStepperInput from '../../components/InchStepperInput.jsx';
import { SHOULDER_SLOPES, BUTTON_OPTIONS, getManifestImage } from '../../data/defaultData.js';
import { GARMENT_SIZE_PRESETS } from '../../data/garmentPresets.js';
import { Ruler, Scissors, Check, ShoppingBag, Printer, Sparkles, ArrowLeft } from 'lucide-react';

export const WaistcoatPage = () => {
  const { settings, addToCart, setCurrentView, setActiveSlipOrder, preselectedFabric } = useTailor();
  const basePrice = settings.stitchingRates['waistcoat'] || 3500;

  const [activePreset, setActivePreset] = useState('M');
  const defaultVals = GARMENT_SIZE_PRESETS['waistcoat']['M'];

  const [measurements, setMeasurements] = useState({
    length: defaultVals.length,
    chest: defaultVals.chest,
    gap: defaultVals.gap,
    belly: defaultVals.belly,
    hip: defaultVals.hip,
    shoulder: defaultVals.shoulder,
    sleeves: defaultVals.sleeves
  });

  // Cut/Style: Sleeves & Back
  const [isWithoutSleeves, setIsWithoutSleeves] = useState(true);
  const [isCrossBack, setIsCrossBack] = useState(false);

  // Neckline: Ban Neck, Gol, V-Neck
  const [neckline, setNeckline] = useState('ban');

  // All 6 Shoulder Slopes
  const [selectedSlope, setSelectedSlope] = useState('normal-down');

  // Button Choice
  const [selectedButton, setSelectedButton] = useState('B'); // Antique Brass Stud default
  const [customerNotes, setCustomerNotes] = useState('');

  const applyPreset = (s) => {
    setActivePreset(s);
    const p = GARMENT_SIZE_PRESETS['waistcoat'][s];
    setMeasurements({
      length: p.length,
      chest: p.chest,
      gap: p.gap,
      belly: p.belly,
      hip: p.hip,
      shoulder: p.shoulder,
      sleeves: p.sleeves
    });
  };

  const updateMeasurement = (key, val) => {
    setMeasurements((prev) => ({ ...prev, [key]: val }));
    setActivePreset('Custom');
  };

  const getBespokeItem = () => {
    const slopeObj = SHOULDER_SLOPES.find((sl) => sl.id === selectedSlope);
    const btnObj = BUTTON_OPTIONS.find((b) => b.code === selectedButton);

    const mList = {
      'Waistcoat Length': `${measurements.length}"`,
      'Chest': `${measurements.chest}"`,
      'Gap (Ease)': `${measurements.gap}"`,
      'Belly (Waist)': `${measurements.belly}"`,
      'Hip': `${measurements.hip}"`,
      'Shoulder Width': `${measurements.shoulder}"`
    };
    if (!isWithoutSleeves) {
      mList['Sleeves (Fitted)'] = `${measurements.sleeves}"`;
    }

    return {
      id: `bespoke-wc-${Date.now()}`,
      type: 'bespoke',
      garmentId: 'waistcoat',
      garmentTitle: 'Bespoke Waistcoat',
      price: basePrice,
      quantity: 1,
      image: getManifestImage('waistcoat', '/images/garments/waistcoat.jpg'),
      attachedFabric: preselectedFabric ? {
        id: preselectedFabric.fabric.id,
        name: preselectedFabric.fabric.name,
        meters: preselectedFabric.meters,
        pricePerMeter: preselectedFabric.fabric.pricePerMeter
      } : null,
      measurements: mList,
      styling: {
        cut: isWithoutSleeves ? 'Without Sleeves' : 'With Sleeves',
        back: isCrossBack ? 'Cross-back' : 'Standard Back',
        neckline: neckline === 'ban' ? 'Ban Neck' : neckline === 'gol' ? 'Gol (Round) Neck' : 'V-Neck',
        shoulderSlope: { id: selectedSlope, title: slopeObj?.title, pitch: slopeObj?.pitch },
        button: { code: selectedButton, title: btnObj?.title },
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
      id: `AMT-WC-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      customerName: 'Valued Patron (Waistcoat)',
      customerPhone: '+92 300 0000000',
      status: 'pending',
      items: [item],
      totalAmount: basePrice
    });
    setCurrentView('slip');
  };

  // Necklines definitions
  const necklineOptions = [
    { id: 'ban', title: 'Ban Neck', desc: 'Standing traditional Nehru / Sherwani ban', image: getManifestImage('waistcoat-ban-neck', '/images/designs/waistcoat/waistcoat-ban-neck.svg') },
    { id: 'gol', title: 'Gol (Round) Neck', desc: 'Curved scoop neck for festive layered wear', image: getManifestImage('waistcoat-gol-neck', '/images/designs/waistcoat/waistcoat-gol-neck.svg') },
    { id: 'vneck', title: 'V-Neck Waistcoat', desc: 'Sharp formal V-cut displaying shirt tie or placket', image: getManifestImage('waistcoat-v-neck', '/images/designs/waistcoat/waistcoat-v-neck.svg') }
  ];

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
            <span>Traditional &amp; Formal Outerwear</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
            Waistcoat (Waskat) Bespoke Studio
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Configure tailored Waistcoats with 6 distinct shoulder slope angles (Normal/Medium/Full Down &amp; Straight), Ban / Gol / V-Neck, and cross-back canvas.
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
          {/* Section 1: Measurements */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Ruler className="w-5 h-5 text-champagne-400" />
                <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                  1. Waistcoat Body Measurements (Inches)
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">Precision Fit</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <InchStepperInput label="Waistcoat Length" value={measurements.length} onChange={(v) => updateMeasurement('length', v)} min={22} max={36} hint="25 - 30" />
              <InchStepperInput label="Chest" value={measurements.chest} onChange={(v) => updateMeasurement('chest', v)} min={32} max={58} hint="36 - 48" />
              <InchStepperInput label="Gap (Ease)" value={measurements.gap} onChange={(v) => updateMeasurement('gap', v)} min={0.5} max={5} hint="1.5 - 2.5" />
              <InchStepperInput label="Belly (Waist)" value={measurements.belly} onChange={(v) => updateMeasurement('belly', v)} min={28} max={58} hint="32 - 46" />
              <InchStepperInput label="Hip" value={measurements.hip} onChange={(v) => updateMeasurement('hip', v)} min={32} max={60} hint="36 - 48" />
              <InchStepperInput label="Shoulder Width" value={measurements.shoulder} onChange={(v) => updateMeasurement('shoulder', v)} min={13} max={22} hint="15 - 19" />
              {!isWithoutSleeves && (
                <InchStepperInput label="Sleeves (Fitted)" value={measurements.sleeves} onChange={(v) => updateMeasurement('sleeves', v)} min={18} max={30} hint="22 - 27" />
              )}
            </div>
          </section>

          {/* Section 2: Cut & Neckline Options */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide border-b border-obsidian-800 pb-3">
              2. Cut &amp; Neckline Styling
            </h2>

            {/* Cut / Style Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setIsWithoutSleeves(!isWithoutSleeves)}
                className={`cursor-pointer rounded-xl border p-4 transition-all flex items-center justify-between ${
                  isWithoutSleeves ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Without Sleeves (Classic)</h4>
                  <p className="text-[11px] text-gray-400">Standard sleeveless armhole cut</p>
                </div>
                {isWithoutSleeves && <Check className="w-4 h-4 text-champagne-400" />}
              </div>

              <div
                onClick={() => setIsCrossBack(!isCrossBack)}
                className={`cursor-pointer rounded-xl border p-4 transition-all flex items-center justify-between ${
                  isCrossBack ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Cross-back Construction</h4>
                  <p className="text-[11px] text-gray-400">Artisanal rear cross darting for ergonomic shoulder fit</p>
                </div>
                {isCrossBack && <Check className="w-4 h-4 text-champagne-400" />}
              </div>
            </div>

            {/* 3 Neckline Boxes */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase text-champagne-400 block">Neckline Category:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {necklineOptions.map((opt) => {
                  const isSel = neckline === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setNeckline(opt.id)}
                      className={`cursor-pointer rounded-xl border p-4 transition-all flex flex-col justify-between ${
                        isSel ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500 shadow-md' : 'bg-obsidian-950 border-obsidian-750'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white uppercase">{opt.title}</span>
                          {isSel && <Check className="w-4 h-4 text-champagne-400" />}
                        </div>
                        <div className="h-20 bg-obsidian-900 rounded-lg flex items-center justify-center p-1 border border-obsidian-800">
                          <img src={opt.image} alt={opt.title} className="max-h-full object-contain" />
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2">{opt.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 3: ALL 6 SHOULDER SLOPE BOXES */}
          <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
            <div className="border-b border-obsidian-800 pb-3">
              <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                3. Shoulder Slope Designs (All 6 Distinct Boxes)
              </h2>
              <p className="text-xs text-gray-400">Select anatomical slope pitch to eliminate collar gaping and neck folds</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {SHOULDER_SLOPES.map((slope) => {
                const isSelected = selectedSlope === slope.id;
                return (
                  <div
                    key={slope.id}
                    onClick={() => setSelectedSlope(slope.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500 shadow-md'
                        : 'bg-obsidian-950 border-obsidian-750 hover:border-obsidian-600'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-champagne-400 bg-obsidian-900 px-2 py-0.5 rounded border border-champagne-500/30">
                          {slope.pitch}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-champagne-500 text-obsidian-950 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="h-24 bg-obsidian-900 rounded-lg flex items-center justify-center p-2 border border-obsidian-800">
                        <img src={slope.image} alt={slope.title} className="max-h-full object-contain" />
                      </div>

                      <h4 className="text-xs font-bold text-white uppercase">{slope.title}</h4>
                    </div>

                    <p className="text-[10px] text-gray-400 mt-2 leading-tight">{slope.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Sticky Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-obsidian-900 border border-obsidian-750 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">Live Tailor Card</h3>
                <span className="text-[10px] text-champagne-400 font-mono">Bespoke Waistcoat</span>
              </div>
              <span className="text-lg font-mono font-bold text-champagne-400">
                {settings.currency} {basePrice.toLocaleString()}
              </span>
            </div>

            <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800 text-[11px] font-mono space-y-1.5">
              <div className="flex justify-between text-gray-400">
                <span>Cut:</span>
                <span className="text-white font-bold">{isWithoutSleeves ? 'Without Sleeves' : 'With Sleeves'}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Back:</span>
                <span className="text-white font-bold">{isCrossBack ? 'Cross-back' : 'Standard'}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Neckline:</span>
                <span className="text-champagne-300 font-bold uppercase">{neckline} Neck</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shoulder Slope:</span>
                <span className="text-champagne-300 font-bold capitalize">{selectedSlope.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Length &bull; Chest:</span>
                <span className="text-white font-bold">{measurements.length}" &bull; {measurements.chest}"</span>
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

export default WaistcoatPage;
