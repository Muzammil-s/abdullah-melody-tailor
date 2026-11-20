import React, { useState, useRef, useEffect } from 'react';
import { useTailor } from '../context/TailorContext.jsx';
import {
  Scissors,
  ShoppingBag,
  ShieldCheck,
  Ruler,
  Sparkles,
  ChevronDown,
  Layers,
  Menu,
  X,
  Check,
  Shirt
} from 'lucide-react';

export const Navbar = () => {
  const { currentView, setCurrentView, navigateToGarment, coatMode, uniformMode, cart, settings } = useTailor();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGarmentClick = (garmentId, subMode = null) => {
    navigateToGarment(garmentId, subMode);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const isMeasurementViewActive = currentView.startsWith('measurements-') || currentView === 'stitching' || currentView === 'studio';

  return (
    <header className="sticky top-0 z-50 bg-obsidian-900/95 backdrop-blur-md border-b border-obsidian-700/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity */}
          <div 
            onClick={() => { setCurrentView('fabrics'); setDropdownOpen(false); setMobileMenuOpen(false); }}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-champagne-400 via-champagne-500 to-champagne-700 p-0.5 shadow-lg shadow-champagne-500/10 group-hover:shadow-champagne-500/25 transition-all">
              <div className="w-full h-full bg-obsidian-900 rounded-[7px] flex items-center justify-center">
                <Scissors className="w-5 h-5 text-champagne-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-champagne-400 group-hover:text-champagne-300 transition-colors uppercase">
                  Abdullah Melody
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-champagne-500/10 text-champagne-400 border border-champagne-500/20">
                  Tailor
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans tracking-wide">
                Bespoke Sartorial Atelier • Est. {settings.established || '1988'}
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-obsidian-950/70 p-1.5 rounded-xl border border-obsidian-700/60 shadow-inner">
            
            {/* Unstitched Fabrics Tab */}
            <button
              onClick={() => { setCurrentView('fabrics'); setDropdownOpen(false); }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                currentView === 'fabrics'
                  ? 'bg-champagne-500 text-obsidian-950 shadow-md font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-obsidian-800'
              }`}
            >
              Unstitched Fabrics
            </button>

            {/* Custom Measurements Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                  isMeasurementViewActive
                    ? 'bg-champagne-500 text-obsidian-950 shadow-md font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-obsidian-800'
                }`}
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Custom Measurements</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-[460px] bg-obsidian-900 border border-champagne-500/30 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-obsidian-800">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-champagne-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-champagne-400 font-serif">
                        Dedicated Garment Fit Studios
                      </span>
                    </div>
                    <button
                      onClick={() => { setCurrentView('stitching'); setDropdownOpen(false); }}
                      className="text-[11px] text-gray-400 hover:text-champagne-300 transition-colors"
                    >
                      View All Hub &rarr;
                    </button>
                  </div>

                  {/* Garment Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    
                    {/* 1. Shalwar Kameez */}
                    <button
                      onClick={() => handleGarmentClick('shalwar-kameez')}
                      className={`text-left p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                        currentView === 'measurements-shalwar-kameez'
                          ? 'bg-champagne-500/15 border-champagne-500 text-champagne-300 font-bold'
                          : 'bg-obsidian-950/60 border-obsidian-800 hover:border-champagne-500/40 text-gray-300 hover:text-white'
                      }`}
                    >
                      <span className="text-base">👔</span>
                      <div>
                        <div className="font-semibold">Shalwar Kameez</div>
                        <div className="text-[10px] text-gray-500">Collar A1-A4, Ban B1-B4</div>
                      </div>
                    </button>

                    {/* 2. Kurta Pajama */}
                    <button
                      onClick={() => handleGarmentClick('kurta-pajama')}
                      className={`text-left p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                        currentView === 'measurements-kurta-pajama'
                          ? 'bg-champagne-500/15 border-champagne-500 text-champagne-300 font-bold'
                          : 'bg-obsidian-950/60 border-obsidian-800 hover:border-champagne-500/40 text-gray-300 hover:text-white'
                      }`}
                    >
                      <span className="text-base">✨</span>
                      <div>
                        <div className="font-semibold">Kurta Pajama</div>
                        <div className="text-[10px] text-gray-500">Traditional Lounge Pajama</div>
                      </div>
                    </button>

                    {/* 3. Kurta Shalwar */}
                    <button
                      onClick={() => handleGarmentClick('kurta-shalwar')}
                      className={`text-left p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                        currentView === 'measurements-kurta-shalwar'
                          ? 'bg-champagne-500/15 border-champagne-500 text-champagne-300 font-bold'
                          : 'bg-obsidian-950/60 border-obsidian-800 hover:border-champagne-500/40 text-gray-300 hover:text-white'
                      }`}
                    >
                      <span className="text-base">✂️</span>
                      <div>
                        <div className="font-semibold">Kurta Shalwar</div>
                        <div className="text-[10px] text-gray-500">Relaxed Heritage Cut</div>
                      </div>
                    </button>

                    {/* 4. Waistcoat */}
                    <button
                      onClick={() => handleGarmentClick('waistcoat')}
                      className={`text-left p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                        currentView === 'measurements-waistcoat'
                          ? 'bg-champagne-500/15 border-champagne-500 text-champagne-300 font-bold'
                          : 'bg-obsidian-950/60 border-obsidian-800 hover:border-champagne-500/40 text-gray-300 hover:text-white'
                      }`}
                    >
                      <span className="text-base">🦺</span>
                      <div>
                        <div className="font-semibold">Waistcoat</div>
                        <div className="text-[10px] text-gray-500">6 Shoulder Slopes &amp; Cuts</div>
                      </div>
                    </button>

                    {/* 5. Coat & Pant Suite */}
                    <div className="col-span-2 p-2.5 rounded-xl border border-obsidian-800 bg-obsidian-950/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-200 flex items-center gap-2">
                          <span>🧥</span> Coat &amp; Pant Atelier
                        </span>
                        <span className="text-[10px] uppercase font-mono text-champagne-400">Suits &amp; Separates</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 text-[11px]">
                        <button
                          onClick={() => handleGarmentClick('prince-coat')}
                          className={`p-1.5 rounded-lg border text-center transition-all ${
                            currentView === 'measurements-coat-pant' && coatMode === 'prince'
                              ? 'bg-champagne-500 text-obsidian-950 font-bold border-champagne-400'
                              : 'bg-obsidian-900 border-obsidian-750 text-gray-300 hover:text-white hover:border-champagne-500/40'
                          }`}
                        >
                          Prince Coat
                        </button>
                        <button
                          onClick={() => handleGarmentClick('long-coat')}
                          className={`p-1.5 rounded-lg border text-center transition-all ${
                            currentView === 'measurements-coat-pant' && coatMode === 'long'
                              ? 'bg-champagne-500 text-obsidian-950 font-bold border-champagne-400'
                              : 'bg-obsidian-900 border-obsidian-750 text-gray-300 hover:text-white hover:border-champagne-500/40'
                          }`}
                        >
                          Long Coat
                        </button>
                        <button
                          onClick={() => handleGarmentClick('sport-coat')}
                          className={`p-1.5 rounded-lg border text-center transition-all ${
                            currentView === 'measurements-coat-pant' && coatMode === 'sport'
                              ? 'bg-champagne-500 text-obsidian-950 font-bold border-champagne-400'
                              : 'bg-obsidian-900 border-obsidian-750 text-gray-300 hover:text-white hover:border-champagne-500/40'
                          }`}
                        >
                          Sport Coat
                        </button>
                        <button
                          onClick={() => handleGarmentClick('pant-only')}
                          className={`p-1.5 rounded-lg border text-center transition-all ${
                            currentView === 'measurements-coat-pant' && coatMode === 'pant'
                              ? 'bg-champagne-500 text-obsidian-950 font-bold border-champagne-400'
                              : 'bg-obsidian-900 border-obsidian-750 text-gray-300 hover:text-white hover:border-champagne-500/40'
                          }`}
                        >
                          Pant Only
                        </button>
                      </div>
                    </div>

                    {/* 6. Safari Suit */}
                    <button
                      onClick={() => handleGarmentClick('safari-suit')}
                      className={`text-left p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                        currentView === 'measurements-safari-suit'
                          ? 'bg-champagne-500/15 border-champagne-500 text-champagne-300 font-bold'
                          : 'bg-obsidian-950/60 border-obsidian-800 hover:border-champagne-500/40 text-gray-300 hover:text-white'
                      }`}
                    >
                      <span className="text-base">👔</span>
                      <div>
                        <div className="font-semibold">Safari Suit</div>
                        <div className="text-[10px] text-gray-500">Belted &amp; Choke Vents</div>
                      </div>
                    </button>

                    {/* 7. Dress Shirt */}
                    <button
                      onClick={() => handleGarmentClick('dress-shirt')}
                      className={`text-left p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                        currentView === 'measurements-dress-shirt'
                          ? 'bg-champagne-500/15 border-champagne-500 text-champagne-300 font-bold'
                          : 'bg-obsidian-950/60 border-obsidian-800 hover:border-champagne-500/40 text-gray-300 hover:text-white'
                      }`}
                    >
                      <span className="text-base">👔</span>
                      <div>
                        <div className="font-semibold">Dress Shirt</div>
                        <div className="text-[10px] text-gray-500">Spread / Band Collar</div>
                      </div>
                    </button>

                    {/* 8. Sleeping Suit */}
                    <button
                      onClick={() => handleGarmentClick('sleeping-suit')}
                      className={`text-left p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                        currentView === 'measurements-sleeping-suit'
                          ? 'bg-champagne-500/15 border-champagne-500 text-champagne-300 font-bold'
                          : 'bg-obsidian-950/60 border-obsidian-800 hover:border-champagne-500/40 text-gray-300 hover:text-white'
                      }`}
                    >
                      <span className="text-base">🌙</span>
                      <div>
                        <div className="font-semibold">Sleeping Suit</div>
                        <div className="text-[10px] text-gray-500">Camp Collar &amp; Piping</div>
                      </div>
                    </button>

                    {/* 9. Uniforms */}
                    <div className="p-2.5 rounded-xl border border-obsidian-800 bg-obsidian-950/60 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-200">Official Uniforms</div>
                        <div className="text-[10px] text-gray-500">Police &amp; FIA Protocol</div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleGarmentClick('police-uniform')}
                          className="px-2 py-1 bg-obsidian-850 hover:bg-champagne-500 hover:text-obsidian-950 text-[10px] font-bold rounded border border-obsidian-750 transition-colors"
                        >
                          Police
                        </button>
                        <button
                          onClick={() => handleGarmentClick('fia-uniform')}
                          className="px-2 py-1 bg-obsidian-850 hover:bg-champagne-500 hover:text-obsidian-950 text-[10px] font-bold rounded border border-obsidian-750 transition-colors"
                        >
                          FIA
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Hub Footer Link */}
                  <div className="pt-3 mt-3 border-t border-obsidian-800 flex justify-between items-center text-xs">
                    <span className="text-gray-400">Need to see all garments side by side?</span>
                    <button
                      onClick={() => { setCurrentView('stitching'); setDropdownOpen(false); }}
                      className="text-champagne-400 hover:text-champagne-300 font-bold"
                    >
                      Open Full Bespoke Hub &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Tab */}
            <button
              onClick={() => { setCurrentView('admin'); setDropdownOpen(false); }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                currentView === 'admin'
                  ? 'bg-champagne-500 text-obsidian-950 shadow-md font-bold'
                  : 'text-gray-400 hover:text-champagne-400 hover:bg-obsidian-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </button>
          </nav>

          {/* Right Actions: Currency + Shopping Bag + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-medium text-gray-400 bg-obsidian-800/80 px-3 py-1.5 rounded-md border border-obsidian-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{settings.currencyCode || 'PKR'} ({settings.currency || 'Rs.'})</span>
            </div>

            <button
              onClick={() => { setCurrentView('cart'); setDropdownOpen(false); setMobileMenuOpen(false); }}
              className="relative flex items-center gap-2 bg-gradient-to-r from-obsidian-800 to-obsidian-750 hover:from-obsidian-750 hover:to-obsidian-700 text-gray-100 px-4 py-2.5 rounded-xl border border-champagne-500/30 hover:border-champagne-400 transition-all shadow-md group"
            >
              <ShoppingBag className="w-4 h-4 text-champagne-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold tracking-wider uppercase text-gray-200">Bag</span>
              {cartCount > 0 && (
                <span className="bg-champagne-500 text-obsidian-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white bg-obsidian-800 border border-obsidian-700 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-obsidian-800 space-y-2 bg-obsidian-900/98 px-2 rounded-b-2xl animate-in slide-in-from-top duration-200">
            <button
              onClick={() => { setCurrentView('fabrics'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentView === 'fabrics' ? 'bg-champagne-500 text-obsidian-950' : 'text-gray-300 bg-obsidian-950'
              }`}
            >
              🧵 Unstitched Fabrics
            </button>

            <button
              onClick={() => { setCurrentView('stitching'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentView === 'stitching' ? 'bg-champagne-500 text-obsidian-950' : 'text-champagne-400 bg-obsidian-950'
              }`}
            >
              📐 All Garments Studio Hub
            </button>

            <div className="py-2 text-[11px] font-serif uppercase tracking-wider text-gray-400 px-2">
              Direct Garment Fit Studios
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleGarmentClick('shalwar-kameez')}
                className="text-left p-2 rounded-lg bg-obsidian-950 text-xs text-gray-200 border border-obsidian-800"
              >
                👔 Shalwar Kameez
              </button>
              <button
                onClick={() => handleGarmentClick('kurta-pajama')}
                className="text-left p-2 rounded-lg bg-obsidian-950 text-xs text-gray-200 border border-obsidian-800"
              >
                ✨ Kurta Pajama
              </button>
              <button
                onClick={() => handleGarmentClick('kurta-shalwar')}
                className="text-left p-2 rounded-lg bg-obsidian-950 text-xs text-gray-200 border border-obsidian-800"
              >
                ✂️ Kurta Shalwar
              </button>
              <button
                onClick={() => handleGarmentClick('waistcoat')}
                className="text-left p-2 rounded-lg bg-obsidian-950 text-xs text-gray-200 border border-obsidian-800"
              >
                🦺 Waistcoat
              </button>
              <button
                onClick={() => handleGarmentClick('prince-coat')}
                className="text-left p-2 rounded-lg bg-obsidian-950 text-xs text-gray-200 border border-obsidian-800"
              >
                🧥 Prince Coat
              </button>
              <button
                onClick={() => handleGarmentClick('long-coat')}
                className="text-left p-2 rounded-lg bg-obsidian-950 text-xs text-gray-200 border border-obsidian-800"
              >
                🧥 Long Coat
              </button>
              <button
                onClick={() => handleGarmentClick('sport-coat')}
                className="text-left p-2 rounded-lg bg-obsidian-950 text-xs text-gray-200 border border-obsidian-800"
              >
                🧥 Sport Coat
              </button>
              <button
                onClick={() => handleGarmentClick('pant-only')}
                className="text-left p-2 rounded-lg bg-obsidian-950 text-xs text-gray-200 border border-obsidian-800"
              >
                👖 Pant Only
              </button>
              <button
                onClick={() => handleGarmentClick('safari-suit')}
                className="text-left p-2 rounded-lg bg-obsidian-950 text-xs text-gray-200 border border-obsidian-800"
              >
                👔 Safari Suit
              </button>
              <button
                onClick={() => handleGarmentClick('dress-shirt')}
                className="text-left p-2 rounded-lg bg-obsidian-950 text-xs text-gray-200 border border-obsidian-800"
              >
                👔 Dress Shirt
              </button>
              <button
                onClick={() => handleGarmentClick('sleeping-suit')}
                className="text-left p-2 rounded-lg bg-obsidian-950 text-xs text-gray-200 border border-obsidian-800"
              >
                🌙 Sleeping Suit
              </button>
              <button
                onClick={() => handleGarmentClick('police-uniform')}
                className="text-left p-2 rounded-lg bg-obsidian-950 text-xs text-gray-200 border border-obsidian-800"
              >
                👮 Police Uniform
              </button>
            </div>

            <button
              onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-gray-400 bg-obsidian-950 border border-obsidian-800 mt-2"
            >
              🛡️ Atelier Admin
            </button>
          </div>
        )}

      </div>
    </header>
  );
};