import React from 'react';
import { useTailor } from './context/TailorContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { FabricsStore } from './components/FabricsStore.jsx';
import { StitchingHub } from './pages/measurements/StitchingHub.jsx';
import { ShalwarKameezPage } from './pages/measurements/ShalwarKameezPage.jsx';
import { KurtaPajamaPage } from './pages/measurements/KurtaPajamaPage.jsx';
import { KurtaShalwarPage } from './pages/measurements/KurtaShalwarPage.jsx';
import { DressShirtPage } from './pages/measurements/DressShirtPage.jsx';
import { SleepingSuitPage } from './pages/measurements/SleepingSuitPage.jsx';
import { WaistcoatPage } from './pages/measurements/WaistcoatPage.jsx';
import { CoatPantPage } from './pages/measurements/CoatPantPage.jsx';
import { SafariSuitPage } from './pages/measurements/SafariSuitPage.jsx';
import { UniformsPage } from './pages/measurements/UniformsPage.jsx';
import { CartView } from './components/CartView.jsx';
import { CuttingSlip } from './components/CuttingSlip.jsx';
import { AdminPanel } from './components/AdminPanel.jsx';
import { Scissors, Sparkles, ShieldCheck, Ruler, Clock, Phone, MapPin, Award } from 'lucide-react';

export default function App() {
  const { currentView, setCurrentView, navigateToGarment, settings } = useTailor();

  return (
    <div className="min-h-screen bg-obsidian-950 text-gray-100 selection:bg-champagne-500 selection:text-obsidian-950 flex flex-col font-sans">
      {/* Top Heritage Ribbon */}
      <header className="bg-obsidian-900 border-b border-champagne-500/20 py-1.5 px-4 text-xs font-serif text-champagne-400/90 flex items-center justify-between tracking-widest uppercase no-print">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-champagne-400 animate-pulse" />
          <span>Abdullah Melody Tailor &bull; Master Bespoke Atelier &bull; Est. {settings?.established || '1984'}</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[11px] font-sans text-gray-400">
          <span className="flex items-center gap-1.5">
            <Ruler className="w-3 h-3 text-champagne-400" /> All Tailoring Measurements in Inches (- / + 0.25")
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-champagne-400" /> Handcrafted Precision &amp; Topfused Interlining
          </span>
        </div>
      </header>

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'fabrics' && <FabricsStore />}
        {(currentView === 'stitching' || currentView === 'studio') && <StitchingHub />}
        {currentView === 'measurements-shalwar-kameez' && <ShalwarKameezPage />}
        {currentView === 'measurements-kurta-pajama' && <KurtaPajamaPage />}
        {currentView === 'measurements-kurta-shalwar' && <KurtaShalwarPage />}
        {currentView === 'measurements-dress-shirt' && <DressShirtPage />}
        {currentView === 'measurements-sleeping-suit' && <SleepingSuitPage />}
        {currentView === 'measurements-waistcoat' && <WaistcoatPage />}
        {currentView === 'measurements-coat-pant' && <CoatPantPage />}
        {currentView === 'measurements-safari-suit' && <SafariSuitPage />}
        {currentView === 'measurements-uniforms' && <UniformsPage />}
        {currentView === 'cart' && <CartView />}
        {currentView === 'slip' && <CuttingSlip />}
        {currentView === 'admin' && <AdminPanel />}
      </main>

      {/* Luxury Atelier Footer */}
      <footer className="bg-obsidian-900 border-t border-champagne-500/20 text-gray-400 mt-20 no-print">
        {/* Atelier Value Badges */}
        <div className="border-b border-obsidian-800 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Scissors className="w-6 h-6 text-champagne-400 mb-2" />
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Master Drafters</h4>
            <p className="text-[11px] text-gray-400 mt-1">Single &amp; Double needle bespoke stitch precision</p>
          </div>
          <div className="flex flex-col items-center">
            <Ruler className="w-6 h-6 text-champagne-400 mb-2" />
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Exact Fractional Steppers</h4>
            <p className="text-[11px] text-gray-400 mt-1">0.25-meter fabrics &amp; 0.25-inch tailoring intervals</p>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-champagne-400 mb-2" />
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Topfused Canvas</h4>
            <p className="text-[11px] text-gray-400 mt-1">Zero bubbling collars, bans &amp; cuffs guarantee</p>
          </div>
          <div className="flex flex-col items-center">
            <Phone className="w-6 h-6 text-champagne-400 mb-2" />
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Direct WhatsApp</h4>
            <p className="text-[11px] text-gray-400 mt-1">Instant digital cutting slip dispatch to master tailor</p>
          </div>
        </div>

        {/* Footer Links & Credits */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded border border-champagne-500/40 flex items-center justify-center bg-champagne-500/10">
                <Scissors className="w-4 h-4 text-champagne-400" />
              </div>
              <span className="font-serif text-lg tracking-wider text-champagne-400 font-bold">
                ABDULLAH MELODY
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Purveyors of Pakistani sartorial elegance and bespoke suiting. Specializing in classic Kameez Shalwar, Prince Coats, handcrafted Waistcoats, and official uniform tailoring.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-3">Atelier Collections</h4>
            <ul className="text-xs space-y-2">
              <li>
                <button onClick={() => setCurrentView('fabrics')} className="hover:text-champagne-400 transition-colors">
                  Imported Super 150s &amp; Egyptian Cottons
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('fabrics')} className="hover:text-champagne-400 transition-colors">
                  Local Wash &amp; Wear, Boski &amp; Karandi
                </button>
              </li>
              <li>
                <button onClick={() => navigateToGarment('shalwar-kameez')} className="hover:text-champagne-400 transition-colors">
                  Shalwar Kameez Configurator (A1–A4, B1–B4)
                </button>
              </li>
              <li>
                <button onClick={() => navigateToGarment('waistcoat')} className="hover:text-champagne-400 transition-colors">
                  Waistcoat &amp; 6 Shoulder Slope Designs
                </button>
              </li>
              <li>
                <button onClick={() => navigateToGarment('coat-pant', 'prince')} className="hover:text-champagne-400 transition-colors">
                  Prince Coat &amp; Long Coat Atelier
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-3">Studio &amp; Hours</h4>
            <div className="text-xs space-y-2 text-gray-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                <span>Commercial Market / Melody Market, Rawalpindi / Islamabad, Pakistan</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-champagne-400 shrink-0" />
                <span>Mon – Sat: 11:00 AM – 10:30 PM (Friday: 3 PM – 10:30 PM)</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-champagne-400 shrink-0" />
                <span>UAN / WhatsApp: +92 300 1234567</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-3">Master Quick Actions</h4>
            <div className="space-y-2 text-xs">
              <button 
                onClick={() => setCurrentView('cart')}
                className="w-full text-left py-1.5 px-3 rounded bg-obsidian-800 hover:bg-champagne-500/10 hover:text-champagne-400 transition-colors border border-obsidian-700"
              >
                View Active Bag &amp; Orders
              </button>
              <button 
                onClick={() => setCurrentView('admin')}
                className="w-full text-left py-1.5 px-3 rounded bg-obsidian-800 hover:bg-champagne-500/10 hover:text-champagne-400 transition-colors border border-obsidian-700 text-champagne-400/90"
              >
                Atelier Admin Dashboard &bull; Settings
              </button>
              <a 
                href="/review-gallery.html" 
                target="_blank" 
                rel="noreferrer"
                className="block text-left py-1.5 px-3 rounded bg-obsidian-800 hover:bg-champagne-500/10 hover:text-champagne-400 transition-colors border border-obsidian-700 text-gray-300"
              >
                Inspect 96 Visual Assets Gallery &rarr;
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-obsidian-800 py-4 px-4 text-center text-[11px] text-gray-500">
          &copy; {new Date().getFullYear()} Abdullah Melody Tailor. All rights reserved. Designed with precision for Pakistani Bespoke Men's Fashion.
        </div>
      </footer>
    </div>
  );
}