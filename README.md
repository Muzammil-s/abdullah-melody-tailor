# Abdullah Melody Tailor — Bespoke Sartorial Web Application

A luxury bespoke tailoring web application demo for **Abdullah Melody Tailor**, built with React, Vite, and Tailwind CSS.

![Aesthetic](https://img.shields.io/badge/Aesthetic-Obsidian%20%26%20Gold-111315?style=for-the-badge&labelColor=C8A96A)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)

## ✨ Features

### 🧵 Unstitched Fabrics Store
- Imported & Local fabric sections with brand sub-category filtering
- Exact **0.25-meter** fractional stepper controls with usage-category min/max enforcement
- Live price calculations (PKR) and dual CTAs: "Add Unstitched" & "Buy Fabric + Custom Stitch"

### ✂️ 4-Step Bespoke Studio & Measurement Configurator
- **10 Garment Categories**: Shalwar Kameez, Kurta Pajama, Dress Shirt, Sleeping Suit, Police Uniform, FIA Uniform, Kurta Shalwar, Waistcoat, Coat/Pant, Safari Suit
- **Topfused Collar Cards (A1–A4)** with exact 3-dimension specifications
- **Ban Styles (B1–B4)** with 0.25" height selectors (1.00" to 1.75")
- **6 Waistcoat Shoulder Slopes**: Normal/Medium/Full Down & Straight
- **Coat/Pant Dynamic Modes**: Prince Coat, Long Coat, Sport Coat with choke vents, lapels, and pant design
- All measurements strictly in **Inches** (accepting 0.25" decimals)

### 🛒 Checkout, Cutting Slip & WhatsApp
- Unified shopping bag with line-item breakdowns
- **Printable Master Tailor Cutting Slip** (`window.print()`)
- **WhatsApp order dispatch** with pre-formatted message

### ⚙️ Admin Dashboard
- Global max meter limit (cascades to storefront instantly)
- Fabric catalog & brand manager
- Order status tracker (Pending → Cutting → Stitching → Ready → Dispatched)
- Full `localStorage` persistence

## 🎨 Visual Identity
- **Obsidian/Charcoal** (#0A0B0D / #111315) backgrounds
- **Ivory Canvas** (#FAF8F5) for content areas
- **Champagne Gold** (#C8A96A) accents
- Cinzel serif headings + Inter sans-serif UI typography
- **96 verified visual assets** (client photos, generated photography, gold-on-charcoal SVG diagrams)

## 🚀 Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
abdullah-melody-tailor/
├── public/
│   └── images/
│       ├── fabrics/          # Imported & local fabric swatches
│       ├── garments/         # 10 garment category photos
│       ├── designs/          # Tailoring design option images
│       │   ├── shalwar-kameez/
│       │   ├── waistcoat/
│       │   ├── coat-pant/
│       │   ├── safari-suit/
│       │   ├── uniforms/
│       │   └── diagrams/     # Gold-on-charcoal SVG technical diagrams
│       └── unclassified/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── FabricsStore.jsx
│   │   ├── BespokeStudio.jsx
│   │   ├── CartView.jsx
│   │   ├── CuttingSlip.jsx
│   │   └── AdminPanel.jsx
│   ├── context/
│   │   └── TailorContext.jsx
│   ├── data/
│   │   ├── defaultData.js
│   │   └── imageManifest.json
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── _raw_images/              # Original unmodified client photos
├── review-gallery.html       # Visual asset review page
└── package.json
```

## 📐 Currency & Units
- **Currency**: PKR (Rs.) — editable from Admin Dashboard
- **Fabric Meters**: 0.25m step increments
- **Tailoring Measurements**: Strictly in Inches (0.25" precision)

## 📄 License
© Abdullah Melody Tailor. All rights reserved.
