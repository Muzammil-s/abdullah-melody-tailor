import React from 'react';
import { useTailor } from '../context/TailorContext.jsx';
import { Scissors, ShoppingBag, ShieldCheck, Ruler, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const { currentView, setCurrentView, cart, settings } = useTailor();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-obsidian-900/95 backdrop-blur-md border-b border-obsidian-700/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity */}
          <div 
            onClick={() => setCurrentView('fabrics')}
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

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-obsidian-950/70 p-1.5 rounded-xl border border-obsidian-700/60 shadow-inner">
            <button
              onClick={() => setCurrentView('fabrics')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                currentView === 'fabrics'
                  ? 'bg-champagne-500 text-obsidian-950 shadow-md font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-obsidian-800'
              }`}
            >
              Unstitched Fabrics
            </button>

            <button
              onClick={() => setCurrentView('studio')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                currentView === 'studio'
                  ? 'bg-champagne-500 text-obsidian-950 shadow-md font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-obsidian-800'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              Bespoke Studio (10 Outfits)
            </button>

            <button
              onClick={() => setCurrentView('admin')}
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

          {/* Right Actions: Currency + Shopping Bag */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-medium text-gray-400 bg-obsidian-800/80 px-3 py-1.5 rounded-md border border-obsidian-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{settings.currencyCode || 'PKR'} ({settings.currency || 'Rs.'})</span>
            </div>

            <button
              onClick={() => setCurrentView('cart')}
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
          </div>

        </div>
      </div>
    </header>
  );
};
