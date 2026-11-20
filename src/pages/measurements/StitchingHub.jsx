import React from 'react';
import { useTailor } from '../../context/TailorContext.jsx';
import { getManifestImage } from '../../data/defaultData.js';
import { Ruler, Scissors, ArrowRight, Sparkles, ShieldCheck, Layers, ChevronRight } from 'lucide-react';

export const StitchingHub = () => {
  const { settings, setCurrentView, navigateToGarment, preselectedFabric } = useTailor();

  const garments = [
    {
      id: 'shalwar-kameez',
      viewKey: 'measurements-shalwar-kameez',
      title: 'Shalwar Kameez',
      subtitle: 'Pakistani National Attire',
      basePrice: settings.stitchingRates['shalwar-kameez'] || 2800,
      image: getManifestImage('shalwar-kameez', '/images/garments/shalwar-kameez.jpg'),
      description: 'Handcrafted bespoke cut with Topfused Collars A1–A4, Bans B1–B4, custom pockets, and pancha finishes.',
      features: ['Collar A1-A4 (3 Aligned Dims)', 'Ban B1-B4 (1.00"-1.75")', 'Front Patti & Daman', 'Net Jali / Dori Pancha']
    },
    {
      id: 'kurta-pajama',
      viewKey: 'measurements-kurta-pajama',
      title: 'Kurta Pajama',
      subtitle: 'Royal Heritage Sartorial Cut',
      basePrice: settings.stitchingRates['kurta-pajama'] || 2600,
      image: getManifestImage('kurta-pajama', '/images/garments/kurta-pajama.jpg'),
      description: 'Straight-cut traditional kurta paired with custom straight-leg pajama trousers with knee and thigh precision.',
      features: ['8 Kurta Measurements', '7 Pajama Measurements', 'Collar & Ban Options', 'Resham Hand Stitching']
    },
    {
      id: 'kurta-shalwar',
      viewKey: 'measurements-kurta-shalwar',
      title: 'Kurta Shalwar',
      subtitle: 'Festive & Wedding Elegance',
      basePrice: settings.stitchingRates['kurta-shalwar'] || 2800,
      image: getManifestImage('kurta-shalwar', '/images/garments/kurta-shalwar.jpg'),
      description: 'Festive Resham-embroidered placket paired with traditionally pleated, draped shalwar.',
      features: ['Full Kurta Tailoring', 'Pleated Shalwar', 'Potli & Shell Buttons', 'Patti Width Steppers']
    },
    {
      id: 'dress-shirt',
      viewKey: 'measurements-dress-shirt',
      title: 'Bespoke Dress Shirt',
      subtitle: 'Savile Row Executive Fit',
      basePrice: settings.stitchingRates['dress-shirt'] || 1800,
      image: getManifestImage('dress-shirt', '/images/garments/dress-shirt.jpg'),
      description: 'Precision collar spreads, French or barrel cuffs, split back yoke, and exact sleeve length.',
      features: ['Topfused Spread Collars', 'French & Barrel Cuffs', 'Concealed Tuxedo Placket', 'Quarter-Inch Fit']
    },
    {
      id: 'sleeping-suit',
      viewKey: 'measurements-sleeping-suit',
      title: 'Luxury Sleeping Suit',
      subtitle: 'Silk-Touch Bespoke Loungewear',
      basePrice: settings.stitchingRates['sleeping-suit'] || 2200,
      image: getManifestImage('sleeping-suit', '/images/garments/sleeping-suit.jpg'),
      description: 'Soft piped camp collar shirt paired with relaxed, elasticated tailored pajama trousers.',
      features: ['Camp / Notch Collar', 'Satin Piping Trims', 'Comfort Thigh & Knee', 'Dual Chest Pockets']
    },
    {
      id: 'waistcoat',
      viewKey: 'measurements-waistcoat',
      title: 'Waistcoat (Waskat)',
      subtitle: 'Traditional & Formal Outerwear',
      basePrice: settings.stitchingRates['waistcoat'] || 3500,
      image: getManifestImage('waistcoat', '/images/garments/waistcoat.jpg'),
      description: 'Structured canvas waistcoat with 6 distinct shoulder slope angles and custom necklines.',
      features: ['6 Shoulder Slope Designs', 'Ban / Gol / V-Neck', 'Cross-Back & Sleeveless', 'Antique Brass Studs']
    },
    {
      id: 'coat-pant',
      viewKey: 'measurements-coat-pant',
      title: 'Coat & Pant Atelier',
      subtitle: 'Prince Coat • Long Coat • Sport Coat • Trousers',
      basePrice: settings.stitchingRates['coat-pant'] || 12500,
      image: getManifestImage('coat-pant', '/images/garments/coat-pant.jpg'),
      description: 'Full canvas tailored suiting. Choose Prince Coat, Long Coat, or Sport Coat, with or without trousers.',
      features: ['Prince Coat (6 Button + Ban)', 'Long Coat (Peak/Normal 2.25"-4.50")', 'With/Without Choke Vents', '1/2 Pleat Trousers'],
      subModes: [
        { label: 'Prince Coat', mode: 'prince' },
        { label: 'Long Coat', mode: 'long' },
        { label: 'Sport Coat', mode: 'sport' },
        { label: 'Pant Only', mode: 'pant' }
      ]
    },
    {
      id: 'safari-suit',
      viewKey: 'measurements-safari-suit',
      title: 'Safari Suit',
      subtitle: 'Classic Vintage Executive Cut',
      basePrice: settings.stitchingRates['safari-suit'] || 6500,
      image: getManifestImage('safari-suit', '/images/garments/safari-suit.jpg'),
      description: 'Military-inspired safari suiting with notched coat collar, back belt options, and choke vents.',
      features: ['Coat / Shirt Collar', 'With / Without Belt', 'Side or Back Choke Vents', 'Twin Flap Pockets']
    },
    {
      id: 'police-uniform',
      viewKey: 'measurements-uniforms',
      title: 'Pakistan Police Uniform',
      subtitle: 'Official Law Enforcement Regulated Cut',
      basePrice: settings.stitchingRates['police-uniform'] || 3200,
      image: getManifestImage('police-uniform', '/images/garments/police-uniform.jpg'),
      description: 'Box-pleated chest utility pockets, shoulder star epaulettes, and reinforced trousers.',
      features: ['Dual Chest Pockets + Pen Slot', 'Shoulder Epaulettes & Stars', 'Reinforced Pocket Bags', 'Regulated Pant Cut'],
      subMode: 'police'
    },
    {
      id: 'fia-uniform',
      viewKey: 'measurements-uniforms',
      title: 'FIA Executive Uniform',
      subtitle: 'Federal Investigation Agency Cut',
      basePrice: settings.stitchingRates['fia-uniform'] || 3400,
      image: getManifestImage('fia-uniform', '/images/garments/fia-uniform.jpg'),
      description: 'Executive dark navy tactical cut with stars, rank badge slots, and bespoke trousers.',
      features: ['Executive Navy Fit', 'Badge & Star Provisions', 'Dual Flap Utility Pockets', 'Custom Pant Bottoms'],
      subMode: 'fia'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Preselected Fabric Alert */}
      {preselectedFabric && (
        <div className="bg-gradient-to-r from-champagne-500/20 via-champagne-400/10 to-transparent border border-champagne-500/40 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-champagne-500/20 border border-champagne-500/40 flex items-center justify-center shrink-0">
              <Scissors className="w-5 h-5 text-champagne-400" />
            </div>
            <div>
              <span className="text-xs font-serif uppercase tracking-widest text-champagne-400 font-bold block">
                Fabric Attached For Custom Stitching
              </span>
              <p className="text-sm font-semibold text-white">
                {preselectedFabric.fabric.name} &bull; {preselectedFabric.meters} Meters
              </p>
            </div>
          </div>
          <span className="text-xs text-champagne-300 bg-obsidian-900 px-3 py-1.5 rounded-lg border border-champagne-500/30">
            Select an outfit below to tailor with this fabric
          </span>
        </div>
      )}

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/10 border border-champagne-500/25 text-champagne-400 text-xs font-mono font-semibold uppercase tracking-widest">
          <Ruler className="w-3.5 h-3.5" />
          <span>Standalone Measurement &amp; Design Configurator</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
          Bespoke Tailoring Studio
        </h1>
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
          Select any outfit below to open its dedicated design page. Choose your exact collar, ban, pockets, and vents, and adjust every single body measurement using our <span className="text-champagne-400 font-bold">0.25-inch stepper buttons</span>.
        </p>
      </div>

      {/* Garments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {garments.map((garment) => (
          <div
            key={garment.id}
            className="group relative bg-obsidian-900/90 rounded-2xl border border-obsidian-750 hover:border-champagne-500/60 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-champagne-500/10"
          >
            {/* Visual Thumbnail */}
            <div className="relative h-64 overflow-hidden bg-obsidian-950">
              <img
                src={garment.image}
                alt={garment.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/40 to-transparent" />
              
              {/* Top badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-obsidian-950/80 backdrop-blur-sm border border-champagne-500/30 text-champagne-400">
                  {garment.subtitle}
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-champagne-500 text-obsidian-950 shadow-md">
                  {settings.currency} {garment.basePrice.toLocaleString()}
                </span>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-champagne-300 transition-colors">
                  {garment.title}
                </h3>
              </div>
            </div>

            {/* Description & Feature Pills */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-gray-300 leading-relaxed">
                {garment.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 pt-2 border-t border-obsidian-800">
                <span className="text-[10px] uppercase font-bold tracking-wider text-champagne-400/80 block">
                  Tailoring Specifications:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {garment.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-[11px] text-gray-400">
                      <span className="w-1 h-1 rounded-full bg-champagne-400" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Sub-Mode Buttons if any (Coat Pant) */}
              {garment.subModes && (
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1.5">
                    Jump Directly To Cut:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {garment.subModes.map((sm) => (
                      <button
                        key={sm.mode}
                        onClick={() => navigateToGarment('coat-pant', sm.mode)}
                        className="text-[11px] font-semibold py-1.5 px-2 rounded-lg bg-obsidian-800 hover:bg-champagne-500/20 text-gray-300 hover:text-champagne-300 border border-obsidian-700 transition-all text-center truncate"
                      >
                        {sm.label} &rarr;
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Action Button */}
              <button
                onClick={() => {
                  if (garment.id === 'police-uniform') {
                    navigateToGarment('uniforms', 'police');
                  } else if (garment.id === 'fia-uniform') {
                    navigateToGarment('uniforms', 'fia');
                  } else if (garment.id === 'coat-pant') {
                    navigateToGarment('coat-pant', 'prince');
                  } else {
                    setCurrentView(garment.viewKey);
                  }
                }}
                className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-400 hover:to-champagne-500 text-obsidian-950 flex items-center justify-center gap-2 shadow-lg shadow-champagne-500/10 group-hover:shadow-champagne-500/25 transition-all"
              >
                <span>Customize Measurements &amp; Design</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Atelier Craftsmanship Footer Note */}
      <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl p-6 text-center space-y-2">
        <h4 className="font-serif text-lg text-champagne-400 font-bold uppercase tracking-wide">
          Atelier Master Guarantee
        </h4>
        <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Every custom garment is individually cut by master artisans with topfused interlinings to prevent bubbling. All measurements are confirmed prior to cutting on our digital cutting slip.
        </p>
      </div>
    </div>
  );
};

export default StitchingHub;
