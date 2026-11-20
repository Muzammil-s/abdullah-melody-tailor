import React, { useState, useEffect } from 'react';
import { useTailor } from '../../context/TailorContext.jsx';
import InchStepperInput from '../../components/InchStepperInput.jsx';
import { getManifestImage } from '../../data/defaultData.js';
import { GARMENT_SIZE_PRESETS } from '../../data/garmentPresets.js';
import { Ruler, Scissors, Check, ShoppingBag, Printer, Sparkles, ArrowLeft, Layers } from 'lucide-react';

export const CoatPantPage = ({ initialMode = 'prince' }) => {
  const { settings, addToCart, setCurrentView, setActiveSlipOrder, preselectedFabric, coatMode, setCoatMode } = useTailor();

  // Active Cut Mode: 'prince' | 'long' | 'sport' | 'pant-only'
  const [activeCut, setActiveCut] = useState(coatMode || initialMode || 'prince');

  // Suit Composition: 'both' (Coat + Pant) | 'coat-only' | 'pant-only'
  const [suitComposition, setSuitComposition] = useState(activeCut === 'pant-only' ? 'pant-only' : 'both');

  useEffect(() => {
    if (coatMode) {
      setActiveCut(coatMode);
      if (coatMode === 'pant-only') setSuitComposition('pant-only');
    }
  }, [coatMode]);

  const [activePreset, setActivePreset] = useState('M');
  const defaultVals = GARMENT_SIZE_PRESETS['coat-pant']['M'];

  // Measurements State (all in inches)
  const [measurements, setMeasurements] = useState({
    // Coat
    coatLength: defaultVals.coat.length,
    chest: defaultVals.coat.chest,
    gap: defaultVals.coat.gap,
    belly: defaultVals.coat.belly,
    hip: defaultVals.coat.hip,
    shoulder: defaultVals.coat.shoulder,
    sleeves: defaultVals.coat.sleeves,
    collar: defaultVals.coat.collar,
    // Pant
    pantWaist: defaultVals.pant.waist,
    pantHip: defaultVals.pant.hip,
    pantLength: defaultVals.pant.length,
    pantInside: defaultVals.pant.inside,
    pantThigh: defaultVals.pant.thigh,
    pantKnee: defaultVals.pant.knee,
    pantBottom: defaultVals.pant.bottom
  });

  // Coat Back Construction
  const [coatBack, setCoatBack] = useState('cross-back');

  // Prince Coat Specifics
  const [princeButtons, setPrinceButtons] = useState('six-button');
  const [princeBan, setPrinceBan] = useState('B2'); // B2 or B4
  const [princeChoke, setPrinceChoke] = useState('with-choke'); // 'with-choke' or 'without-choke'
  const [princeChokeType, setPrinceChokeType] = useState('side-choke'); // 'side-choke' or 'back-single'
  const [princeGhera, setPrinceGhera] = useState('round'); // 'round' or 'straight'

  // Long Coat Specifics
  const [longButtons, setLongButtons] = useState('two-button'); // 'one-button', 'two-button', 'three-button'
  const [longPocket, setLongPocket] = useState('flap'); // 'cross', 'flap'
  const [hasTicketPocket, setHasTicketPocket] = useState(false);
  const [lapelType, setLapelType] = useState('peak'); // 'peak' or 'normal'
  const [peakWidth, setPeakWidth] = useState(3.50); // 2.50 to 4.50
  const [normalWidth, setNormalWidth] = useState(3.00); // 2.25 to 4.50
  const [longChoke, setLongChoke] = useState('with-choke');
  const [longChokeType, setLongChokeType] = useState('back-single');

  // Sport Coat Specifics
  const [sportPocket, setSportPocket] = useState('patch'); // 'patch', 'flap', 'cross'
  const [sportButtons, setSportButtons] = useState('two-button');
  const [sportChoke, setSportChoke] = useState('with-choke');
  const [sportChokeType, setSportChokeType] = useState('side-choke');

  // Pant Design Specifics
  const [pantFront, setPantFront] = useState('plain'); // 'plain', 'one-pleat', 'two-pleat'
  const [pantPocket, setPantPocket] = useState('cross'); // 'side', 'cross'
  const [pantBottomFinish, setPantBottomFinish] = useState('turn-up'); // 'turn-up', 'plain'
  const [customerNotes, setCustomerNotes] = useState('');

  // Calculate Price based on Composition
  const fullSuitPrice = settings.stitchingRates['coat-pant'] || 12500;
  const coatOnlyPrice = Math.round(fullSuitPrice * 0.75);
  const pantOnlyPrice = Math.round(fullSuitPrice * 0.35);

  const activePrice = suitComposition === 'both'
    ? fullSuitPrice
    : suitComposition === 'coat-only'
    ? coatOnlyPrice
    : pantOnlyPrice;

  const applyPreset = (s) => {
    setActivePreset(s);
    const p = GARMENT_SIZE_PRESETS['coat-pant'][s];
    setMeasurements({
      coatLength: p.coat.length,
      chest: p.coat.chest,
      gap: p.coat.gap,
      belly: p.coat.belly,
      hip: p.coat.hip,
      shoulder: p.coat.shoulder,
      sleeves: p.coat.sleeves,
      collar: p.coat.collar,
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
    const coatMeasurements = {
      'Coat Length': `${measurements.coatLength}"`,
      'Chest': `${measurements.chest}"`,
      'Gap (Ease)': `${measurements.gap}"`,
      'Belly (Waist)': `${measurements.belly}"`,
      'Hip': `${measurements.hip}"`,
      'Shoulder Width': `${measurements.shoulder}"`,
      'Sleeves Length': `${measurements.sleeves}"`,
      'Collar / Neck': `${measurements.collar}"`
    };

    const pantMeasurements = {
      'Pant Waist': `${measurements.pantWaist}"`,
      'Pant Hip': `${measurements.pantHip}"`,
      'Pant Length': `${measurements.pantLength}"`,
      'Inside Leg (Asan)': `${measurements.pantInside}"`,
      'Thigh': `${measurements.pantThigh}"`,
      'Knee': `${measurements.pantKnee}"`,
      'Pant Bottom (Mori)': `${measurements.pantBottom}"`
    };

    let compiledM = {};
    if (suitComposition === 'both') {
      compiledM = { ...coatMeasurements, ...pantMeasurements };
    } else if (suitComposition === 'coat-only') {
      compiledM = coatMeasurements;
    } else {
      compiledM = pantMeasurements;
    }

    const styling = {
      cutMode: activeCut,
      suitComposition,
      coatBack: suitComposition !== 'pant-only' ? coatBack : null,
      princeCoatSpecs: activeCut === 'prince' && suitComposition !== 'pant-only' ? {
        buttons: 'Six Button Imperial Front',
        ban: `Ban ${princeBan}`,
        choke: princeChoke === 'with-choke' ? `With Choke (${princeChokeType})` : 'Without Choke (Ventless)',
        ghera: `${princeGhera} Ghera`
      } : null,
      longCoatSpecs: activeCut === 'long' && suitComposition !== 'pant-only' ? {
        buttons: longButtons,
        pockets: longPocket,
        ticketPocket: hasTicketPocket,
        lapel: lapelType === 'peak' ? `Peak Lapel (${peakWidth.toFixed(2)}")` : `Normal Lapel (${normalWidth.toFixed(2)}")`,
        choke: longChoke === 'with-choke' ? `With Choke (${longChokeType})` : 'Without Choke'
      } : null,
      sportCoatSpecs: activeCut === 'sport' && suitComposition !== 'pant-only' ? {
        pockets: `${sportPocket} Pocket (Highlight)`,
        buttons: sportButtons,
        choke: sportChoke === 'with-choke' ? `With Choke (${sportChokeType})` : 'Without Choke'
      } : null,
      pantSpecs: suitComposition !== 'coat-only' ? {
        front: pantFront,
        pockets: pantPocket,
        bottomFinish: pantBottomFinish
      } : null,
      notes: customerNotes
    };

    const cutLabels = {
      prince: 'Bespoke Prince Coat Suit',
      long: 'Bespoke Long Coat / Overcoat Suit',
      sport: 'Bespoke Sport Coat / Blazer Suit',
      'pant-only': 'Bespoke Formal Trousers'
    };

    return {
      id: `bespoke-cp-${Date.now()}`,
      type: 'bespoke',
      garmentId: 'coat-pant',
      garmentTitle: cutLabels[activeCut] || 'Bespoke Suit',
      price: activePrice,
      quantity: 1,
      image: getManifestImage('coat-pant', '/images/garments/coat-pant.jpg'),
      attachedFabric: preselectedFabric ? {
        id: preselectedFabric.fabric.id,
        name: preselectedFabric.fabric.name,
        meters: preselectedFabric.meters,
        pricePerMeter: preselectedFabric.fabric.pricePerMeter
      } : null,
      measurements: compiledM,
      styling
    };
  };

  const handleAddToBag = () => {
    addToCart(getBespokeItem());
    setCurrentView('cart');
  };

  const handlePrintPreview = () => {
    const item = getBespokeItem();
    setActiveSlipOrder({
      id: `AMT-CP-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      customerName: 'Valued Patron (Coat & Pant)',
      customerPhone: '+92 300 0000000',
      status: 'pending',
      items: [item],
      totalAmount: activePrice
    });
    setCurrentView('slip');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Breadcrumb & Presets */}
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

      {/* Hero Header */}
      <div className="bg-obsidian-900 border border-obsidian-800 p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-champagne-400 text-xs font-mono font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Canvas Sartorial Architecture</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
              Coat &amp; Pant Atelier Studio
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Order complete 2-piece suiting, coat only, or trousers only. Switch between Prince Coat, Long Coat, Sport Coat, and tailored trousers.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Active Order Fee</span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-champagne-400">
              {settings.currency} {activePrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* SUIT COMPOSITION SELECTOR: Coat+Pant vs Coat Only vs Pant Only */}
        <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-750 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase text-champagne-400 tracking-wider">
            Suit Order Composition:
          </span>
          <div className="flex items-center gap-1.5">
            {[
              { id: 'both', label: 'Coat + Pant (Full Suit)' },
              { id: 'coat-only', label: 'Coat Only' },
              { id: 'pant-only', label: 'Pant Only' }
            ].map((comp) => (
              <button
                key={comp.id}
                type="button"
                onClick={() => {
                  setSuitComposition(comp.id);
                  if (comp.id === 'pant-only') setActiveCut('pant-only');
                  else if (activeCut === 'pant-only') setActiveCut('prince');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  suitComposition === comp.id
                    ? 'bg-champagne-500 text-obsidian-950 shadow-md'
                    : 'bg-obsidian-800 text-gray-300 hover:text-white border border-obsidian-700'
                }`}
              >
                {comp.label}
              </button>
            ))}
          </div>
        </div>

        {/* DEDICATED FULL-VIEW TABS: Prince Coat | Long Coat | Sport Coat | Pant */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-obsidian-800 pt-4">
          <span className="text-xs font-bold uppercase text-gray-400 tracking-wider shrink-0 mr-2">
            Coat Style Tab:
          </span>
          {[
            { id: 'prince', label: 'Prince Coat' },
            { id: 'long', label: 'Long Coat (Overcoat)' },
            { id: 'sport', label: 'Sport Coat (Blazer)' },
            { id: 'pant-only', label: 'Pant Only' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveCut(tab.id);
                if (tab.id === 'pant-only') setSuitComposition('pant-only');
                else if (suitComposition === 'pant-only') setSuitComposition('both');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all ${
                activeCut === tab.id
                  ? 'bg-gradient-to-r from-champagne-500 to-champagne-600 text-obsidian-950 shadow-lg shadow-champagne-500/20 font-black'
                  : 'bg-obsidian-950 text-gray-300 hover:text-white border border-obsidian-750'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-10">
          
          {/* SECTION 1: COAT MEASUREMENTS (Visible if not Pant Only) */}
          {suitComposition !== 'pant-only' && (
            <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <Ruler className="w-5 h-5 text-champagne-400" />
                  <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                    1. Coat Measurements (Inches)
                  </h2>
                </div>
                <span className="text-[11px] text-gray-400 font-mono">Quarter-inch precision</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <InchStepperInput label="Coat Length" value={measurements.coatLength} onChange={(v) => updateMeasurement('coatLength', v)} min={24} max={45} hint="28 - 34" />
                <InchStepperInput label="Chest" value={measurements.chest} onChange={(v) => updateMeasurement('chest', v)} min={32} max={60} hint="36 - 48" />
                <InchStepperInput label="Gap (Ease)" value={measurements.gap} onChange={(v) => updateMeasurement('gap', v)} min={0.5} max={6} hint="1.5 - 3.0" />
                <InchStepperInput label="Belly (Waist)" value={measurements.belly} onChange={(v) => updateMeasurement('belly', v)} min={28} max={58} hint="32 - 46" />
                <InchStepperInput label="Hip" value={measurements.hip} onChange={(v) => updateMeasurement('hip', v)} min={32} max={62} hint="36 - 48" />
                <InchStepperInput label="Shoulder Width" value={measurements.shoulder} onChange={(v) => updateMeasurement('shoulder', v)} min={14} max={23} hint="16.5 - 20" />
                <InchStepperInput label="Sleeves Length" value={measurements.sleeves} onChange={(v) => updateMeasurement('sleeves', v)} min={20} max={32} hint="23 - 27" />
                <InchStepperInput label="Collar / Neck" value={measurements.collar} onChange={(v) => updateMeasurement('collar', v)} min={13} max={22} hint="14.5 - 18" />
              </div>

              {/* Coat Back Construction */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Coat Back Construction:</span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'cross-back', title: 'Cross-back Fit', desc: 'Anatomical cross darts for natural posture' },
                    { id: 'half-back', title: 'Half-back Fit', desc: 'Classic half-back drape with freedom of movement' }
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setCoatBack(b.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        coatBack === b.id ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-white block">{b.title}</span>
                      <span className="text-[10px] text-gray-400">{b.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* SECTION 2: DEDICATED COAT DESIGN BOXES (Prince / Long / Sport) */}
          {suitComposition !== 'pant-only' && activeCut === 'prince' && (
            <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
              <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide border-b border-obsidian-800 pb-3">
                2. Prince Coat Specifications
              </h2>

              {/* Buttons & Ban */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Buttons:</span>
                  <div className="p-3 bg-obsidian-950 rounded-xl border border-obsidian-750">
                    <span className="text-xs font-bold text-white block">Six Button Imperial Front</span>
                    <span className="text-[10px] text-gray-400">Classic double-row or single-column imperial closure</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Ban Category:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {['B2', 'B4'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setPrinceBan(b)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          princeBan === b ? 'bg-champagne-500 text-obsidian-950 font-bold' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                        }`}
                      >
                        <span className="text-xs font-bold block">Ban {b}</span>
                        <span className="text-[10px] opacity-80">{b === 'B2' ? 'Square Cut' : 'Overlap Chinese'}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Choke / Vent Selection (2 DISTINCT PRIMARY OPTIONS) */}
              <div className="space-y-3 pt-2 border-t border-obsidian-800">
                <span className="text-xs font-bold uppercase text-champagne-400 block">
                  Choke / Vent Selection (2 Distinct Primary Options):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPrinceChoke('with-choke')}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      princeChoke === 'with-choke' ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white uppercase">With Choke (Vented)</span>
                      {princeChoke === 'with-choke' && <Check className="w-4 h-4 text-champagne-400" />}
                    </div>
                    <p className="text-[10px] text-gray-400">Open vents for seat comfort and pocket access</p>

                    {princeChoke === 'with-choke' && (
                      <div className="mt-3 pt-2 border-t border-obsidian-750 flex gap-2">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setPrinceChokeType('side-choke'); }}
                          className={`flex-1 py-1 px-2 rounded text-[11px] font-bold ${
                            princeChokeType === 'side-choke' ? 'bg-champagne-500 text-obsidian-950' : 'bg-obsidian-800 text-gray-300'
                          }`}
                        >
                          Side Choke (Dual)
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setPrinceChokeType('back-single'); }}
                          className={`flex-1 py-1 px-2 rounded text-[11px] font-bold ${
                            princeChokeType === 'back-single' ? 'bg-champagne-500 text-obsidian-950' : 'bg-obsidian-800 text-gray-300'
                          }`}
                        >
                          Back Single Choke
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => setPrinceChoke('without-choke')}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      princeChoke === 'without-choke' ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white uppercase">Without Choke (Ventless)</span>
                      {princeChoke === 'without-choke' && <Check className="w-4 h-4 text-champagne-400" />}
                    </div>
                    <p className="text-[10px] text-gray-400">Solid seamless rear panel for clean silhouette</p>
                  </div>
                </div>
              </div>

              {/* Ghera Hem */}
              <div className="pt-2 border-t border-obsidian-800">
                <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Ghera (Bottom Hem):</span>
                <div className="grid grid-cols-2 gap-3">
                  {['round', 'straight'].map((gh) => (
                    <button
                      key={gh}
                      type="button"
                      onClick={() => setPrinceGhera(gh)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        princeGhera === gh ? 'bg-champagne-500 text-obsidian-950 font-bold' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase block">{gh} Ghera</span>
                      <span className="text-[10px] opacity-80">{gh === 'round' ? 'Classic curved bottom corners' : 'Sharp 90° square bottom'}</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* LONG COAT SPECIFIC DESIGN BOXES */}
          {suitComposition !== 'pant-only' && activeCut === 'long' && (
            <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
              <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide border-b border-obsidian-800 pb-3">
                2. Long Coat / Overcoat Specifications
              </h2>

              {/* Buttons */}
              <div>
                <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Buttons Count:</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'one-button', label: 'One Button' },
                    { id: 'two-button', label: 'Second (Two) Button' },
                    { id: 'three-button', label: 'Third (Three) Button' }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => setLongButtons(btn.id)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        longButtons === btn.id ? 'bg-champagne-500 text-obsidian-950 font-bold' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                      }`}
                    >
                      <span className="text-xs font-bold block">{btn.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pockets */}
              <div className="pt-2 border-t border-obsidian-800">
                <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Pocket Style &amp; Ticket Pocket:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { id: 'cross', title: 'Cross Pocket (Slanted)', desc: 'Angled welt pockets for natural hand resting' },
                    { id: 'flap', title: 'Normal Flap Pocket', desc: 'Standard formal horizontal flap pockets' }
                  ].map((pk) => (
                    <button
                      key={pk.id}
                      type="button"
                      onClick={() => setLongPocket(pk.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        longPocket === pk.id ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-white block">{pk.title}</span>
                      <span className="text-[10px] text-gray-400">{pk.desc}</span>
                    </button>
                  ))}
                </div>

                <div
                  onClick={() => setHasTicketPocket(!hasTicketPocket)}
                  className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${
                    hasTicketPocket ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                  }`}
                >
                  <span className="text-xs font-bold text-white">Add Ticket Pocket (Right Waist Flap Pocket)</span>
                  {hasTicketPocket && <Check className="w-4 h-4 text-champagne-400" />}
                </div>
              </div>

              {/* Lapels / Collar with Width Steppers */}
              <div className="pt-2 border-t border-obsidian-800 space-y-4">
                <span className="text-xs font-bold uppercase text-champagne-400 block">
                  Lapels / Collar (with Width Stepper):
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setLapelType('peak')}
                    className={`cursor-pointer p-4 rounded-xl border space-y-3 transition-all ${
                      lapelType === 'peak' ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase">Peak Collar / Lapel</span>
                      {lapelType === 'peak' && <Check className="w-4 h-4 text-champagne-400" />}
                    </div>
                    <p className="text-[10px] text-gray-400">Upward pointed lapel edges (2.50" to 4.50" in 0.25" steps)</p>
                    
                    <div onClick={(e) => e.stopPropagation()}>
                      <InchStepperInput
                        label="Peak Lapel Width"
                        value={peakWidth}
                        onChange={(v) => setPeakWidth(v)}
                        min={2.50}
                        max={4.50}
                        step={0.25}
                        hint="2.50 - 4.50"
                      />
                    </div>
                  </div>

                  <div
                    onClick={() => setLapelType('normal')}
                    className={`cursor-pointer p-4 rounded-xl border space-y-3 transition-all ${
                      lapelType === 'normal' ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase">Normal Collar / Notch Lapel</span>
                      {lapelType === 'normal' && <Check className="w-4 h-4 text-champagne-400" />}
                    </div>
                    <p className="text-[10px] text-gray-400">Standard notched angle (2.25" to 4.50" in 0.25" steps)</p>
                    
                    <div onClick={(e) => e.stopPropagation()}>
                      <InchStepperInput
                        label="Normal Lapel Width"
                        value={normalWidth}
                        onChange={(v) => setNormalWidth(v)}
                        min={2.25}
                        max={4.50}
                        step={0.25}
                        hint="2.25 - 4.50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Choke Vents */}
              <div className="pt-2 border-t border-obsidian-800">
                <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Choke Vent:</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLongChoke('with-choke')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      longChoke === 'with-choke' ? 'bg-champagne-500 text-obsidian-950 font-bold' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                    }`}
                  >
                    With Choke (Back Center Vent)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLongChoke('without-choke')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      longChoke === 'without-choke' ? 'bg-champagne-500 text-obsidian-950 font-bold' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                    }`}
                  >
                    Without Choke
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* SPORT COAT SPECIFIC DESIGN BOXES */}
          {suitComposition !== 'pant-only' && activeCut === 'sport' && (
            <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
              <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide border-b border-obsidian-800 pb-3">
                2. Sport Coat (Blazer) Specifications
              </h2>

              {/* Pockets with Patch Highlight */}
              <div>
                <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Pocket Styling (Patch Highlight):</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'patch', title: 'Patch Pocket (Highlight)', desc: 'Surface-stitched casual patch pockets' },
                    { id: 'flap', title: 'Normal Flap Pocket', desc: 'Standard formal flap' },
                    { id: 'cross', title: 'Cross Pocket', desc: 'Angled Italian welt pocket' }
                  ].map((pk) => (
                    <button
                      key={pk.id}
                      type="button"
                      onClick={() => setSportPocket(pk.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        sportPocket === pk.id ? 'bg-champagne-500/10 border-champagne-500 ring-1 ring-champagne-500' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-white block">{pk.title}</span>
                      <span className="text-[10px] text-gray-400">{pk.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Choke Vents */}
              <div className="pt-2 border-t border-obsidian-800">
                <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Choke Vent:</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSportChoke('with-choke')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      sportChoke === 'with-choke' ? 'bg-champagne-500 text-obsidian-950 font-bold' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                    }`}
                  >
                    With Choke (Side Vents)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSportChoke('without-choke')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      sportChoke === 'without-choke' ? 'bg-champagne-500 text-obsidian-950 font-bold' : 'bg-obsidian-950 border-obsidian-750 text-gray-300'
                    }`}
                  >
                    Without Choke
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* SECTION 3: PANT MEASUREMENTS & DESIGN (Visible if not Coat Only) */}
          {suitComposition !== 'coat-only' && (
            <section className="bg-obsidian-900/60 border border-obsidian-800 p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <Scissors className="w-5 h-5 text-champagne-400" />
                  <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                    {suitComposition === 'pant-only' ? '1. Trousers Measurements & Design' : '3. Trousers Measurements & Design'}
                  </h2>
                </div>
                <span className="text-[11px] text-gray-400 font-mono">7 Pant Metrics</span>
              </div>

              {/* Pant Measurements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <InchStepperInput label="Waist" value={measurements.pantWaist} onChange={(v) => updateMeasurement('pantWaist', v)} min={26} max={55} hint="30 - 44" />
                <InchStepperInput label="Hip" value={measurements.pantHip} onChange={(v) => updateMeasurement('pantHip', v)} min={32} max={65} hint="36 - 48" />
                <InchStepperInput label="Length" value={measurements.pantLength} onChange={(v) => updateMeasurement('pantLength', v)} min={32} max={50} hint="38 - 44" />
                <InchStepperInput label="Inside Leg" value={measurements.pantInside} onChange={(v) => updateMeasurement('pantInside', v)} min={22} max={38} hint="28 - 34" />
                <InchStepperInput label="Thigh" value={measurements.pantThigh} onChange={(v) => updateMeasurement('pantThigh', v)} min={20} max={36} hint="24 - 30" />
                <InchStepperInput label="Knee" value={measurements.pantKnee} onChange={(v) => updateMeasurement('pantKnee', v)} min={15} max={28} hint="18 - 22" />
                <InchStepperInput label="Bottom (Opening)" value={measurements.pantBottom} onChange={(v) => updateMeasurement('pantBottom', v)} min={12} max={22} hint="14 - 17" />
              </div>

              {/* Pant Design Boxes: Pleats, Pockets, Bottom Finish */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-obsidian-800">
                {/* Front Pleats */}
                <div>
                  <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Front Style:</span>
                  <div className="space-y-1.5">
                    {['plain', 'one-pleat', 'two-pleat'].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setPantFront(f)}
                        className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold capitalize transition-all ${
                          pantFront === f ? 'bg-champagne-500 text-obsidian-950' : 'bg-obsidian-950 text-gray-300 border border-obsidian-750'
                        }`}
                      >
                        {f.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pocket */}
                <div>
                  <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Pocket Style:</span>
                  <div className="space-y-1.5">
                    {[
                      { id: 'cross', label: 'Cross Pocket' },
                      { id: 'side', label: 'Side Seam Pocket' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPantPocket(p.id)}
                        className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                          pantPocket === p.id ? 'bg-champagne-500 text-obsidian-950' : 'bg-obsidian-950 text-gray-300 border border-obsidian-750'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Finish */}
                <div>
                  <span className="text-xs font-bold uppercase text-champagne-400 block mb-2">Bottom Finish:</span>
                  <div className="space-y-1.5">
                    {[
                      { id: 'turn-up', label: 'Bottom Turn-Up (Cuff)' },
                      { id: 'plain', label: 'Bottom Plain Hem' }
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setPantBottomFinish(b.id)}
                        className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                          pantBottomFinish === b.id ? 'bg-champagne-500 text-obsidian-950' : 'bg-obsidian-950 text-gray-300 border border-obsidian-750'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>

        {/* Right Sticky Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-obsidian-900 border border-obsidian-750 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">Live Tailor Card</h3>
                <span className="text-[10px] text-champagne-400 font-mono capitalize">
                  {activeCut.replace('-', ' ')} &bull; {suitComposition.replace('-', ' ')}
                </span>
              </div>
              <span className="text-lg font-mono font-bold text-champagne-400">
                {settings.currency} {activePrice.toLocaleString()}
              </span>
            </div>

            <div className="bg-obsidian-950 p-3 rounded-xl border border-obsidian-800 text-[11px] font-mono space-y-1.5">
              <div className="flex justify-between text-gray-400">
                <span>Cut Mode:</span>
                <span className="text-champagne-300 font-bold uppercase">{activeCut}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Composition:</span>
                <span className="text-white font-bold capitalize">{suitComposition}</span>
              </div>
              {suitComposition !== 'pant-only' && (
                <div className="flex justify-between text-gray-400">
                  <span>Coat Back:</span>
                  <span className="text-white font-bold capitalize">{coatBack}</span>
                </div>
              )}
              {suitComposition !== 'coat-only' && (
                <div className="flex justify-between text-gray-400">
                  <span>Pant Bottom:</span>
                  <span className="text-white font-bold capitalize">{pantBottomFinish}</span>
                </div>
              )}
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

export default CoatPantPage;
