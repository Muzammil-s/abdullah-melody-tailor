# Abdullah Melody Tailor — Bespoke Sartorial Web Application

A luxury bespoke tailoring web application demo for **Abdullah Melody Tailor**, built with React 18, Vite 6, and Tailwind CSS.

![Aesthetic](https://img.shields.io/badge/Aesthetic-Obsidian%20%26%20Gold-111315?style=for-the-badge&labelColor=C8A96A)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)
![GitHub](https://img.shields.io/badge/Repository-Muzammil--s%2Fabdullah--melody--tailor-181717?style=for-the-badge&logo=github)

---

## ✨ Key Features & Architecture

### 🧵 1. Unstitched Fabrics Store
- **Imported & Local Fabrics**: Categorized and filterable by authentic Pakistani & international menswear brands (Loro Piana, Ermenegildo Zegna, Scabal, Pashmina, Grace Fabrics, Pasha Fabrics, Gul Ahmed, Alkaram, Boski, etc.).
- **Fractional 0.25-Meter Steppers**: Fine-grained length selection (`- 0.25m` / `+ 0.25m`) with strict usage-category min/max boundaries:
  - Shalwar Kameez Fabric: `4.00m` – `18.00m`
  - Only Coat Fabric: `1.00m` – `18.00m`
  - 2-Piece Suit Fabric: `3.00m` – `18.00m`
  - Pant Only Fabric: `1.50m` – `18.00m`
  - Long Coat Fabric: `2.50m` – `18.00m`
- **Dual Conversion Actions**: "Add Unstitched Fabric to Bag" or "Buy Fabric + Custom Stitch" (seamlessly opens the paired garment's dedicated measurement studio).

---

### 📐 2. Dedicated Standalone Measurement Studios (`src/pages/measurements/`)
Rather than a cramped single form, every outfit has its own dedicated full-page atelier studio with interactive **`- 0.25"` / `+ 0.25"` inch stepper controls**, direct decimal entry, standard S/M/L/XL size presets, and live tailor spec summaries:

1. **`StitchingHub.jsx`**: Visual overview hub linking directly to all 10 garment studios.
2. **`ShalwarKameezPage.jsx`**:
   - **Topfused Collars (A1–A4)**: Shows exact 3-dimension aligned specs (`A1`: 1.3" \| 2.2" \| 2.25" to `A4`: 1.6" \| 2.5" \| 3.00").
   - **Ban Styles (B1–B4)**: Interactive height steppers from `1.00"` to `1.75"` in `0.25"` increments.
   - **Pockets 4, 5, 6**; **Buttons A, B, C, D, E, F**; **Front Patti** (1.00"–1.75" width stepper + Straight, Pointed, Ghum, Fold).
   - **Daman** (Straight vs. Gol); **Sewing** (Single vs. Double); **Pancha** (Plain, Net Jali, Dori).
3. **`KurtaPajamaPage.jsx`**: Full Kurta measurements + Pajama measurements (Waist, Hip, Length, Inside, Thigh, Knee, Bottom) + collar/hem styling.
4. **`KurtaShalwarPage.jsx`**: Kurta measurements + Shalwar measurements + traditional styling options.
5. **`DressShirtPage.jsx`**: Formal dress shirt measurements + Spread, Cutaway, Band collar selections, French/Barrel cuffs, and placket types.
6. **`SleepingSuitPage.jsx`**: Lounge shirt & pajama measurements + Camp Collar & Luxury Contrast Piping.
7. **`WaistcoatPage.jsx`**: Without Sleeves, Cross-back, Ban/Gol/V-neck, and **all 6 distinct Shoulder Slopes** (*Normal Down*, *Medium Down*, *Full Down*, *Normal Straight*, *Medium Straight*, *Full Straight*).
8. **`CoatPantPage.jsx`**: Supports **Coat + Pant**, **Coat Only**, or **Pant Only**:
   - **Prince Coat**: 6-button front, Ban B2/B4, With/Without Choke vents, Round vs. Straight Ghera.
   - **Long Coat**: 1/2/3 buttons, cross/flap/ticket pockets, **Peak Lapel** (2.50"–4.50" stepper) & **Normal Lapel** (2.25"–4.50" stepper), Choke vents.
   - **Sport Coat**: Soft tailored structure, patch pockets, horn buttons.
   - **Bespoke Pant**: Flat front vs. Single/Double Pleat, cross vs. side pockets, bottom turn-up cuff vs. plain hem.
9. **`SafariSuitPage.jsx`**: Safari shirt & trousers + Coat vs. Shirt collar, With/Without Choke, With/Without Belt.
10. **`UniformsPage.jsx`**: Dedicated tabs for **Police Uniform** and **FIA Uniform**, Dual flap chest pockets, Star & Epaulette rank badge straps, service notes.

---

### 📏 3. Reusable `InchStepperInput` (`src/components/InchStepperInput.jsx`)
- Single-click **`- 0.25"`** / **`+ 0.25"`** fractional stepper adjustments.
- Secondary **`- 1.0"`** / **`+ 1.0"`** quick toggles.
- Direct typing of any fraction or decimal with clean `"` (inch) formatting.
- Field-level reset and S/M/L/XL standard size preset loading.

---

### 🧭 4. "Custom Measurements" Mega Dropdown (`src/components/Navbar.jsx`)
- Desktop mega-dropdown with quick-access cards to all individual garments, Coat & Pant modes (*Prince Coat, Long Coat, Sport Coat, Pant Only*), and Uniform modes (*Police, FIA*).
- Mobile-responsive sliding drawer with one-tap access to every studio.

---

### 🛒 5. Unified Cart & Master Tailor Cutting Slip
- **Unified Bag (`CartView.jsx`)**: Displays fabric yardage and bespoke garments, complete with design spec pills, an expandable **"Show All Measurements (Inches)"** grid breakdown, and direct "Open Garment Measurement Studio" return buttons.
- **Master Cutting Slip (`CuttingSlip.jsx`)**: Official atelier cutting sheet with client information, design specifications, and inch cutting dimensions for immediate thermal/A4 printing (`window.print()`).
- **Direct WhatsApp Dispatch**: One-click formatted WhatsApp text to the master tailor phone.

---

### ⚙️ 6. Atelier Admin Dashboard (`AdminPanel.jsx`)
- Global fabric maximum meter limit editor (cascades dynamically to all fabric cards).
- Full Fabric Catalog & Brand Editor (add/edit/delete fabrics & brand categories).
- Order Management with status lifecycle tracking (*Confirmed → In Cutting → In Stitching → Trial Fitting → Dispatched*).
- Complete `localStorage` persistence across all features.

---

## 🎨 Visual Identity & Assets

- **Obsidian / Charcoal** (`#0A0B0D` / `#111315`) canvas
- **Ivory Canvas** (`#FAF8F5`) for structured atelier panels
- **Champagne Gold** (`#C8A96A` / `#D4AF37`) accents & active borders
- **Editorial Typography**: Cinzel serif headings + clean Inter sans-serif UI
- **96 Curated Visual Assets**: Client photos, royalty-free menswear imagery, and gold-on-charcoal SVG diagrams for collars, bans, shoulder slopes, choke vents, and damans.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Muzammil-s/abdullah-melody-tailor.git
cd abdullah-melody-tailor

# Install dependencies
npm install --legacy-peer-deps

# Start the development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Repository Structure

```
abdullah-melody-tailor/
├── public/
│   ├── images/
│   │   ├── fabrics/          # Imported & local fabric swatches
│   │   ├── garments/         # 10 garment category photos
│   │   ├── designs/          # Tailoring design option images
│   │   │   ├── shalwar-kameez/
│   │   │   ├── waistcoat/
│   │   │   ├── coat-pant/
│   │   │   ├── safari-suit/
│   │   │   ├── uniforms/
│   │   │   └── diagrams/     # Technical gold-on-charcoal SVG diagrams
│   │   └── unclassified/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Mega-dropdown navigation bar
│   │   ├── FabricsStore.jsx         # 0.25m fabrics catalogue
│   │   ├── InchStepperInput.jsx     # Reusable -/+ 0.25" inch stepper component
│   │   ├── CartView.jsx             # Unified bag & checkout
│   │   ├── CuttingSlip.jsx          # Printable master cutting ticket
│   │   └── AdminPanel.jsx           # Atelier settings & order management
│   ├── pages/
│   │   └── measurements/            # Dedicated Garment Measurement Studios
│   │       ├── StitchingHub.jsx     # All-garment selector hub
│   │       ├── ShalwarKameezPage.jsx
│   │       ├── KurtaPajamaPage.jsx
│   │       ├── KurtaShalwarPage.jsx
│   │       ├── DressShirtPage.jsx
│   │       ├── SleepingSuitPage.jsx
│   │       ├── WaistcoatPage.jsx
│   │       ├── CoatPantPage.jsx
│   │       ├── SafariSuitPage.jsx
│   │       └── UniformsPage.jsx
│   ├── context/
│   │   └── TailorContext.jsx        # Global state, cart, & route dispatcher
│   ├── data/
│   │   ├── defaultData.js           # Seed fabrics, brands, pricing & settings
│   │   ├── garmentPresets.js        # Standard S/M/L/XL size presets (Inches)
│   │   └── imageManifest.json       # 96-image asset mapping manifest
│   ├── App.jsx                      # Main layout & route controller
│   ├── main.jsx                     # Vite entry point
│   └── index.css                    # Tailwind CSS definitions
├── _raw_images/                     # Original unmodified client photos
├── review-gallery.html              # Standalone 96 visual assets inspector
└── package.json
```

---

## 📄 License & Attribution
© Abdullah Melody Tailor. Crafted with precision for Pakistani Bespoke Men's Fashion.
