import manifest from './imageManifest.json';

export const INITIAL_SETTINGS = {
  currency: 'Rs.',
  currencyCode: 'PKR',
  globalMaxMeterLimit: 18.00,
  storeName: 'Abdullah Melody Tailor',
  tagline: 'Master Bespoke Tailoring & Fine Fabrics',
  storePhone: '+92 300 5123456',
  whatsappPhone: '923005123456',
  address: 'Shop #14, Melody Market, Sector G-6, Islamabad, Pakistan',
  established: '1988',
  stitchingRates: {
    'shalwar-kameez': 2800,
    'kurta-pajama': 2600,
    'dress-shirt': 1800,
    'sleeping-suit': 2200,
    'police-uniform': 3200,
    'fia-uniform': 3400,
    'kurta-shalwar': 2800,
    'waistcoat': 3500,
    'coat-pant': 12500,
    'safari-suit': 6500,
  }
};

export const USAGE_CATEGORIES = {
  'shalwar-kameez': {
    id: 'shalwar-kameez',
    label: 'Shalwar Kameez Fabric',
    minMeters: 4.00,
    defaultMeters: 4.00,
    maxMeters: 18.00,
    step: 0.25,
    description: 'Requires standard 4.00m to 4.50m for adult suit.'
  },
  'only-coat': {
    id: 'only-coat',
    label: 'Only Coat Fabric',
    minMeters: 1.00,
    defaultMeters: 2.00,
    maxMeters: 18.00,
    step: 0.25,
    description: 'Requires 1.00m to 2.00m for single coat or blazer.'
  },
  'two-piece-pant-coat': {
    id: 'two-piece-pant-coat',
    label: '2-Piece Pant Coat Fabric',
    minMeters: 3.00,
    defaultMeters: 3.25,
    maxMeters: 18.00,
    step: 0.25,
    description: 'Requires 3.00m to 3.50m for complete 2-piece lounge suit.'
  },
  'pant-only': {
    id: 'pant-only',
    label: 'Pant Only Fabric',
    minMeters: 1.50,
    defaultMeters: 1.50,
    maxMeters: 18.00,
    step: 0.25,
    description: 'Requires 1.50m for formal tailored trousers.'
  },
  'long-coat': {
    id: 'long-coat',
    label: 'Long Coat Fabric',
    minMeters: 2.50,
    defaultMeters: 3.00,
    maxMeters: 18.00,
    step: 0.25,
    description: 'Requires 2.50m to 3.50m for knee-length tailored overcoat.'
  }
};

export const INITIAL_BRANDS = {
  imported: [
    'Scabal Select',
    'Dormeuil Classic',
    'Thomas Mason Giza',
    'Huddersfield Mills',
    'Baird McNutt Linen',
    'Loro Piana Style'
  ],
  local: [
    'Pasha Fabrics',
    'Grace Fabrics International',
    'Ahmad Fabrics Kamalia',
    'Latif Fabrics',
    'Gul Ahmed Executive',
    'Bareeze Men'
  ]
};

// Helper to extract image relativePath from imageManifest
export const getManifestImage = (id, fallback = '/images/designs/diagrams/collar-a1-standard-point.svg') => {
  for (const cat of manifest.categories) {
    const item = cat.items.find(i => i.id === id);
    if (item) return item.relativePath;
  }
  return fallback;
};

export const INITIAL_FABRICS = [
  // Imported
  {
    id: 'super-wool',
    name: 'Super 150s Worsted Wool',
    brand: 'Huddersfield Mills',
    origin: 'imported',
    pricePerMeter: 6500,
    usageCategory: 'two-piece-pant-coat',
    image: getManifestImage('super-wool', '/images/fabrics/imported/super-wool.jpg'),
    description: 'Ultra-fine worsted wool twill from English mills. Lightweight, breathable with natural rebound.',
    tags: ['Super 150s', 'Worsted Wool', 'All-Season', 'Italian Cut'],
    minMeters: 3.00,
    maxMeters: 18.00,
    inStock: true
  },
  {
    id: 'egyptian-giza-cotton',
    name: 'Egyptian Giza 87 Cotton',
    brand: 'Thomas Mason Giza',
    origin: 'imported',
    pricePerMeter: 3800,
    usageCategory: 'shalwar-kameez',
    image: getManifestImage('egyptian-giza-cotton', '/images/fabrics/imported/egyptian-giza-cotton.jpg'),
    description: 'Extra long staple Egyptian Giza cotton with a silky touch and luminous white finish.',
    tags: ['Egyptian Cotton', 'Giza 87', 'High Thread Count', 'Luxury'],
    minMeters: 4.00,
    maxMeters: 18.00,
    inStock: true
  },
  {
    id: 'irish-linen',
    name: 'Pure Irish Linen',
    brand: 'Baird McNutt Linen',
    origin: 'imported',
    pricePerMeter: 4200,
    usageCategory: 'shalwar-kameez',
    image: getManifestImage('irish-linen', '/images/fabrics/imported/irish-linen.jpg'),
    description: 'Authentic Irish flax linen with organic slub texture, maximum aeration, and bespoke drape.',
    tags: ['Pure Linen', 'Flax', 'Summer Bespoke', 'Textured'],
    minMeters: 4.00,
    maxMeters: 18.00,
    inStock: true
  },
  {
    id: 'tropical-poly-wool',
    name: 'Tropical Poly-Wool Twill',
    brand: 'Dormeuil Classic',
    origin: 'imported',
    pricePerMeter: 4800,
    usageCategory: 'two-piece-pant-coat',
    image: getManifestImage('tropical-poly-wool', '/images/fabrics/imported/tropical-poly-wool.svg'),
    description: '280 GSM wrinkle-resistant fine herringbone poly-wool blend for year-round corporate suiting.',
    tags: ['280 GSM', 'Wrinkle-Free', 'Corporate', 'Poly-Wool'],
    minMeters: 3.00,
    maxMeters: 18.00,
    inStock: true
  },
  {
    id: 'italian-silk-blend',
    name: 'Italian Silk-Wool Blend',
    brand: 'Loro Piana Style',
    origin: 'imported',
    pricePerMeter: 7200,
    usageCategory: 'only-coat',
    image: getManifestImage('italian-silk-blend', '/images/fabrics/imported/italian-silk-blend.svg'),
    description: '310 GSM lustrous emerald raw silk and fine wool blend for waistcoats, prince coats, and evening wear.',
    tags: ['310 GSM', 'Silk-Wool', 'Festive', 'Lustrous'],
    minMeters: 1.00,
    maxMeters: 18.00,
    inStock: true
  },
  {
    id: 'cashmere-blend',
    name: 'Winter Cashmere-Wool Blend',
    brand: 'Scabal Select',
    origin: 'imported',
    pricePerMeter: 8500,
    usageCategory: 'long-coat',
    image: getManifestImage('cashmere-blend', '/images/fabrics/imported/cashmere-blend.svg'),
    description: '380 GSM camel brushed luxury cashmere-wool blend with a velvet hand feel for bespoke overcoats.',
    tags: ['380 GSM', 'Cashmere', 'Winter', 'Overcoat'],
    minMeters: 2.50,
    maxMeters: 18.00,
    inStock: true
  },

  // Local
  {
    id: 'pashmina-boski',
    name: 'Pure Chinese / Pakistani Boski',
    brand: 'Pasha Fabrics',
    origin: 'local',
    pricePerMeter: 9500,
    usageCategory: 'shalwar-kameez',
    image: getManifestImage('pashmina-boski', '/images/fabrics/local/pashmina-boski.svg'),
    description: 'Authentic 8-Pound pure spun silk with hallmark cream ivory tone and flowing regal fall.',
    tags: ['8-Pound Boski', 'Pure Silk', 'Prestige', 'Pakistani National'],
    minMeters: 4.00,
    maxMeters: 18.00,
    inStock: true
  },
  {
    id: 'kamalia-khaddar',
    name: 'Kamalia Handspun Khaddar',
    brand: 'Ahmad Fabrics Kamalia',
    origin: 'local',
    pricePerMeter: 1850,
    usageCategory: 'shalwar-kameez',
    image: getManifestImage('kamalia-khaddar', '/images/fabrics/local/kamalia-khaddar.svg'),
    description: 'Traditional handloom spun winter cotton in warm walnut brown. Dense, durable, and thermal.',
    tags: ['Kamalia Khaddar', 'Handloom', 'Heritage', 'Winter Cotton'],
    minMeters: 4.00,
    maxMeters: 18.00,
    inStock: true
  },
  {
    id: 'karandi',
    name: 'Traditional Winter Karandi',
    brand: 'Bareeze Men',
    origin: 'local',
    pricePerMeter: 2600,
    usageCategory: 'shalwar-kameez',
    image: getManifestImage('karandi', '/images/fabrics/local/karandi.svg'),
    description: 'Tactile cross-weave raw cotton-silk slub fabric in slate grey with textured depth.',
    tags: ['Karandi', 'Raw Slub', 'Winter', 'Distinctive Texture'],
    minMeters: 4.00,
    maxMeters: 18.00,
    inStock: true
  },
  {
    id: 'latif-cotton',
    name: 'Latif Super Fine Latha',
    brand: 'Latif Fabrics',
    origin: 'local',
    pricePerMeter: 1600,
    usageCategory: 'shalwar-kameez',
    image: getManifestImage('latif-cotton', '/images/fabrics/local/latif-cotton.svg'),
    description: 'Crisp snow-white 100% fine combed cotton with smooth glazed press for pristine national wear.',
    tags: ['Super Latha', 'Pure White', 'Glazed Finish', 'National Wear'],
    minMeters: 4.00,
    maxMeters: 18.00,
    inStock: true
  },
  {
    id: 'grace-fabrics',
    name: 'Grace Executive Suiting',
    brand: 'Grace Fabrics International',
    origin: 'local',
    pricePerMeter: 3400,
    usageCategory: 'two-piece-pant-coat',
    image: getManifestImage('grace-fabrics', '/images/fabrics/local/grace-fabrics.svg'),
    description: 'Wrinkle-free wash-and-wear microfiber suiting in midnight navy for effortless boardroom presence.',
    tags: ['Grace International', 'Wash & Wear', 'Executive Suiting'],
    minMeters: 3.00,
    maxMeters: 18.00,
    inStock: true
  },
  {
    id: 'gul-ahmed-cotton',
    name: 'Gul Ahmed Luxury Dyed Cotton',
    brand: 'Gul Ahmed Executive',
    origin: 'local',
    pricePerMeter: 2200,
    usageCategory: 'shalwar-kameez',
    image: getManifestImage('gul-ahmed-cotton', '/images/fabrics/local/gul-ahmed-cotton.svg'),
    description: 'Combed dyed pure cotton in soft sky blue. Breathable and gentle for hot summer days.',
    tags: ['Combed Cotton', 'Vat Dyed', 'Summer Comfort', 'Sky Blue'],
    minMeters: 4.00,
    maxMeters: 18.00,
    inStock: true
  }
];

// Collar A1 - A4 Exact 3 Aligned Dimensions
export const COLLAR_SPECIFICATIONS = [
  {
    code: 'A1',
    title: 'Collar A1: Standard Point',
    dims: { stand: '1.3"', point: '2.2"', spread: '2.25"' },
    image: getManifestImage('collar-a1-standard-point', '/images/designs/shalwar-kameez/collar-a1-standard-point.svg'),
    desc: 'Classic narrow forward point spread for traditional and formal kameez.'
  },
  {
    code: 'A2',
    title: 'Collar A2: Spread Collar',
    dims: { stand: '1.4"', point: '2.3"', spread: '2.50"' },
    image: getManifestImage('collar-a2-spread', '/images/designs/shalwar-kameez/collar-a2-spread.svg'),
    desc: 'Wider contemporary spread creating a balanced, modern neckline.'
  },
  {
    code: 'A3',
    title: 'Collar A3: Cutaway Collar',
    dims: { stand: '1.5"', point: '2.4"', spread: '2.75"' },
    image: getManifestImage('collar-a3-cutaway', '/images/designs/shalwar-kameez/collar-a3-cutaway.svg'),
    desc: 'Bold cutaway points angled horizontally toward shoulders.'
  },
  {
    code: 'A4',
    title: 'Collar A4: Button-Down Collar',
    dims: { stand: '1.6"', point: '2.5"', spread: '3.00"' },
    image: getManifestImage('collar-a4-button-down', '/images/designs/shalwar-kameez/collar-a4-button-down.svg'),
    desc: 'Corner button anchors keeping the collar points permanently in place.'
  }
];

// Ban B1 - B4 Specifications
export const BAN_SPECIFICATIONS = [
  {
    code: 'B1',
    title: 'Ban B1: Full Round Ban',
    style: 'Full Round (Curved front edges)',
    image: getManifestImage('ban-b1-full-round', '/images/designs/shalwar-kameez/ban-b1-full-round.svg'),
    desc: 'Smooth curved tips in front. Traditional royal Sherwani and Kurta collar.'
  },
  {
    code: 'B2',
    title: 'Ban B2: Square Cut Ban',
    style: 'Square Cut (90° Sharp corners)',
    image: getManifestImage('ban-b2-square-cut', '/images/designs/shalwar-kameez/ban-b2-square-cut.svg'),
    desc: 'Geometric 90° squared tips delivering a crisp, sharp presence.'
  },
  {
    code: 'B3',
    title: 'Ban B3: Half Ban / Semi Ban',
    style: 'Half Ban (Low profile neck stand)',
    image: getManifestImage('ban-b3-half-ban', '/images/designs/shalwar-kameez/ban-b3-half-ban.svg'),
    desc: 'Lower profile stand for maximum neck comfort and summer wear.'
  },
  {
    code: 'B4',
    title: 'Ban B4: Overlap Chinese Ban',
    style: 'Overlap Chinese (Asymmetric wrap)',
    image: getManifestImage('ban-b4-overlap-chinese', '/images/designs/shalwar-kameez/ban-b4-overlap-chinese.svg'),
    desc: 'Asymmetric crossover wrap fastened with an offset button or ring.'
  }
];

export const BAN_SIZES = ['1.00"', '1.25"', '1.50"', '1.75"'];

// Pocket Options
export const POCKET_OPTIONS = [
  {
    code: '4',
    title: '4 Pockets Layout',
    subtitle: '1 Chest + 2 Sides + 1 Inner Secret',
    image: getManifestImage('pockets-4-layout', '/images/designs/shalwar-kameez/pockets-4-layout.svg'),
    desc: 'Standard bespoke layout for clean essential carry.'
  },
  {
    code: '5',
    title: '5 Pockets Layout',
    subtitle: '1 Chest + 2 Sides + 1 Inner + 1 Shalwar Mobile',
    image: getManifestImage('pockets-5-layout', '/images/designs/shalwar-kameez/pockets-5-layout.svg'),
    desc: 'Adds dedicated concealed zipper pocket on shalwar waist.'
  },
  {
    code: '6',
    title: '6 Pockets Layout',
    subtitle: '2 Chests + 2 Sides + 1 Inner + 1 Shalwar Mobile',
    image: getManifestImage('pockets-6-layout', '/images/designs/shalwar-kameez/pockets-6-layout.svg'),
    desc: 'Twin chest utility configuration for executive and workwear storage.'
  }
];

// Buttons A - F
export const BUTTON_OPTIONS = [
  {
    code: 'A',
    title: 'Button A: Pearl / Shell',
    subtitle: 'Natural Mother-of-Pearl',
    image: getManifestImage('button-a-pearl-shell', '/images/designs/shalwar-kameez/button-a-pearl-shell.svg'),
    desc: '4-hole natural shell button with luminous luster.'
  },
  {
    code: 'B',
    title: 'Button B: Antique Brass Stud',
    subtitle: 'Engraved Metallic Stud',
    image: getManifestImage('button-b-antique-brass', '/images/designs/shalwar-kameez/button-b-antique-brass.svg'),
    desc: 'Solid antique brass stud button for festive kurta plackets.'
  },
  {
    code: 'C',
    title: 'Button C: Matte Black',
    subtitle: 'Minimalist Satin Tone',
    image: getManifestImage('button-c-matte-black', '/images/designs/shalwar-kameez/button-c-matte-black.svg'),
    desc: 'Non-reflective matte black button for understated corporate elegance.'
  },
  {
    code: 'D',
    title: 'Button D: Horn / Wood Effect',
    subtitle: 'Organic Grain Striations',
    image: getManifestImage('button-d-horn-wood', '/images/designs/shalwar-kameez/button-d-horn-wood.svg'),
    desc: 'Natural horn-effect buttons with unique grain patterns.'
  },
  {
    code: 'E',
    title: 'Button E: Concealed Placket',
    subtitle: 'Hidden Fly-Front Enclosure',
    image: getManifestImage('button-e-concealed', '/images/designs/shalwar-kameez/button-e-concealed.svg'),
    desc: 'Buttons hidden completely beneath outer placket with zero visible hardware.'
  },
  {
    code: 'F',
    title: 'Button F: Handcrafted Potli',
    subtitle: 'Artisanal Silk-Wrapped Spheres',
    image: getManifestImage('button-f-potli-fabric', '/images/designs/shalwar-kameez/button-f-potli-fabric.svg'),
    desc: 'Handmade spherical fabric potli buttons with fabric loop enclosures.'
  }
];

// Shoulder Slopes for Waistcoat
export const SHOULDER_SLOPES = [
  {
    id: 'normal-down',
    title: 'Normal Down',
    pitch: '22° Natural Drop',
    image: getManifestImage('shoulder-slope-normal-down', '/images/designs/waistcoat/shoulder-slope-normal-down.svg'),
    desc: 'Standard natural slope matching normal anatomical shoulder angle.'
  },
  {
    id: 'medium-down',
    title: 'Medium Down',
    pitch: '25° Relaxed Drop',
    image: getManifestImage('shoulder-slope-normal-down', '/images/designs/waistcoat/shoulder-slope-normal-down.svg'),
    desc: 'Gentle increased slope for sloped or relaxed shoulder builds.'
  },
  {
    id: 'full-down',
    title: 'Full Down',
    pitch: '28° Deep Drop',
    image: getManifestImage('shoulder-slope-normal-down', '/images/designs/waistcoat/shoulder-slope-normal-down.svg'),
    desc: 'Deep drop shoulder fit preventing neck wrinkles on steep shoulders.'
  },
  {
    id: 'normal-straight',
    title: 'Normal Straight',
    pitch: '16° Semi-Square',
    image: getManifestImage('shoulder-slope-full-straight', '/images/designs/waistcoat/shoulder-slope-full-straight.svg'),
    desc: 'Subtly squared shoulder line for balanced posture.'
  },
  {
    id: 'medium-straight',
    title: 'Medium Straight',
    pitch: '12° Square Pitch',
    image: getManifestImage('shoulder-slope-full-straight', '/images/designs/waistcoat/shoulder-slope-full-straight.svg'),
    desc: 'Elevated shoulder pitch tailored for erect, square postures.'
  },
  {
    id: 'full-straight',
    title: 'Full Straight',
    pitch: '8° Athletic Square',
    image: getManifestImage('shoulder-slope-full-straight', '/images/designs/waistcoat/shoulder-slope-full-straight.svg'),
    desc: 'Direct horizontal shoulder alignment for padded or gym-built shoulders.'
  }
];
