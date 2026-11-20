import React, { useState } from 'react';
import { useTailor } from '../context/TailorContext.jsx';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Scissors,
  ArrowRight,
  ShieldCheck,
  Send,
  Printer,
  ChevronLeft
} from 'lucide-react';

export const CartView = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    placeOrder,
    settings,
    setCurrentView,
    navigateToGarment
  } = useTailor();

  const [expandedMeasurements, setExpandedMeasurements] = useState({});

  // Customer checkout form state
  const [customer, setCustomer] = useState({
    name: 'Muhammad Daniyal',
    phone: '0300-8541299',
    city: 'Islamabad',
    address: 'House #42, Street 18, F-7/2',
    notes: 'Urgent for weekend wedding reception.'
  });

  const [formErrors, setFormErrors] = useState({});

  const totalAmount = cart.reduce((acc, item) => acc + item.itemTotal, 0);

  // Validate form
  const validateForm = () => {
    const errs = {};
    if (!customer.name.trim()) errs.name = 'Client name is required';
    if (!customer.phone.trim()) errs.phone = 'Phone / WhatsApp is required';
    if (!customer.city.trim()) errs.city = 'City is required';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Place Order Handler
  const handleCheckout = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    placeOrder(customer);
  };

  // Generate WhatsApp Message text
  const generateWhatsAppMessage = () => {
    let msg = `*NEW ORDER - ABDULLAH MELODY TAILOR*\n`;
    msg += `--------------------------------------\n`;
    msg += `*Client Name:* ${customer.name}\n`;
    msg += `*Phone:* ${customer.phone}\n`;
    msg += `*City/Address:* ${customer.city}, ${customer.address}\n\n`;
    msg += `*ORDER ITEMS:*\n`;

    cart.forEach((item, idx) => {
      msg += `\n${idx + 1}. *${item.title || item.garmentTitle}* (Qty: ${item.quantity})\n`;
      if (item.type === 'unstitched-fabric') {
        msg += `   • Brand: ${item.brand} (${item.origin})\n`;
        msg += `   • Length: ${item.meters} meters\n`;
        msg += `   • Rate: ${settings.currency}${item.pricePerMeter}/m\n`;
      } else if (item.type === 'bespoke-garment') {
        msg += `   • Stitching Base: ${settings.currency}${item.stitchingPrice}\n`;
        if (item.fabricDetails) {
          msg += `   • Paired Fabric: ${item.fabricDetails.fabricName} (${item.fabricDetails.meters}m)\n`;
        }
        if (item.designOptions) {
          const d = item.designOptions;
          if (d.collar) msg += `   • Collar: ${d.collar.title || d.collar.code}\n`;
          if (d.banStyle) msg += `   • Ban: ${d.banStyle.title || d.banStyle.code} (${d.banSize})\n`;
          if (d.pocket) msg += `   • Pockets: ${d.pocket.title}\n`;
          if (d.button) msg += `   • Button: ${d.button.title}\n`;
          if (d.pattiStyle) msg += `   • Front Patti: ${d.pattiStyle} (${d.pattiWidth})\n`;
          if (d.daman) msg += `   • Daman: ${d.daman}\n`;
          if (d.sewing) msg += `   • Sewing: ${d.sewing}\n`;
          if (d.pancha) msg += `   • Pancha: ${d.pancha}\n`;
          if (d.coatCategory) msg += `   • Coat: ${d.coatCategory} (${d.coatBack || ''})\n`;
          if (d.waistcoatCut) msg += `   • Waistcoat: ${d.waistcoatCut} (${d.waistcoatNeckline || ''})\n`;
          if (d.shoulderSlope) msg += `   • Shoulder: ${d.shoulderSlope.title}\n`;
        }
        if (item.measurements) {
          msg += `   • Measurements (Inches): `;
          const mEntries = Object.entries(item.measurements).filter(([_, v]) => v && v.trim() !== '');
          msg += mEntries.map(([k, v]) => `${k}:${v}"`).join(', ') + `\n`;
        }
      }
      msg += `   • Subtotal: ${settings.currency}${item.itemTotal.toLocaleString()}\n`;
    });

    msg += `\n--------------------------------------\n`;
    msg += `*TOTAL AMOUNT:* ${settings.currency} ${totalAmount.toLocaleString()}\n`;
    if (customer.notes) {
      msg += `*Client Notes:* ${customer.notes}\n`;
    }
    msg += `\nPlease confirm order receipt & cutting schedule!`;

    const cleanPhone = (settings.whatsappPhone || '923005123456').replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 px-4 max-w-3xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-obsidian-900 border border-obsidian-750 rounded-3xl mx-auto flex items-center justify-center text-gray-500 shadow-xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-white">Your Atelier Bag is Empty</h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto">
          Explore our fine imported & local fabric bolts, or configure custom bespoke tailoring in our 4-step studio.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => setCurrentView('fabrics')}
            className="bg-obsidian-850 hover:bg-obsidian-800 text-gray-200 border border-obsidian-700 px-6 py-3 rounded-xl text-xs font-bold transition-all"
          >
            Browse Fabrics
          </button>
          <button
            onClick={() => setCurrentView('studio')}
            className="bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-400 hover:to-champagne-500 text-obsidian-950 px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-champagne-500/20"
          >
            Custom Stitching Studio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="flex items-center justify-between border-b border-obsidian-800 pb-5 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-champagne-400 font-mono">
            Bespoke Atelier Order
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            Unified Shopping Bag ({cart.length} {cart.length === 1 ? 'Item' : 'Items'})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Empty Bag</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Line Items */}
        <div className="lg:col-span-7 space-y-6">
          {cart.map((item) => (
            <div
              key={item.cartId}
              className="bg-obsidian-900 border border-obsidian-750 hover:border-champagne-500/30 rounded-2xl p-5 sm:p-6 transition-all flex flex-col sm:flex-row gap-5"
            >
              {/* Thumbnail */}
              <div className="w-full sm:w-36 h-36 rounded-xl bg-obsidian-950 overflow-hidden flex-shrink-0 border border-obsidian-800">
                <img
                  src={item.image || '/images/designs/diagrams/collar-a1-standard-point.svg'}
                  alt={item.title || item.garmentTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-champagne-500/10 text-champagne-400 border border-champagne-500/20">
                      {item.type === 'unstitched-fabric' ? 'Unstitched Fabric' : 'Custom Bespoke Stitching'}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-gray-500 hover:text-red-400 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-serif text-base font-bold text-white">
                    {item.title || item.garmentTitle}
                  </h3>

                  {/* Fabric specific details */}
                  {item.type === 'unstitched-fabric' && (
                    <div className="text-xs text-gray-400 space-y-1 mt-2">
                      <p>• Brand: <strong className="text-gray-300">{item.brand}</strong> ({item.origin})</p>
                      <p>• Length: <strong className="text-champagne-300 font-mono font-bold">{item.meters} meters</strong></p>
                      <p>• Rate: <span className="font-mono">{settings.currency}{item.pricePerMeter}/m</span></p>
                    </div>
                  )}

                  {/* Bespoke Garment details */}
                  {item.type === 'bespoke-garment' && (
                    <div className="text-xs text-gray-400 space-y-1 mt-2">
                      <p>• Stitching Base: <span className="text-gray-300 font-mono">{settings.currency}{item.stitchingPrice.toLocaleString()}</span></p>
                      {item.fabricDetails ? (
                        <p className="text-champagne-300">
                          • Paired Fabric: <strong>{item.fabricDetails.fabricName}</strong> ({item.fabricDetails.meters}m @ {settings.currency}{item.fabricDetails.pricePerMeter}/m)
                        </p>
                      ) : (
                        <p className="text-gray-400">• Fabric: Client providing fabric</p>
                      )}
                      
                      {/* Compact design pills */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.designOptions?.collar && (
                          <span className="text-[10px] bg-obsidian-950 px-2 py-0.5 rounded border border-obsidian-800 text-gray-300">
                            Collar {item.designOptions.collar.code || item.designOptions.collar.title}
                          </span>
                        )}
                        {item.designOptions?.banStyle && (
                          <span className="text-[10px] bg-obsidian-950 px-2 py-0.5 rounded border border-obsidian-800 text-gray-300">
                            Ban {item.designOptions.banStyle.code || item.designOptions.banStyle.title} ({item.designOptions.banSize}")
                          </span>
                        )}
                        {item.designOptions?.pocket && (
                          <span className="text-[10px] bg-obsidian-950 px-2 py-0.5 rounded border border-obsidian-800 text-gray-300">
                            {item.designOptions.pocket.title || `Pocket ${item.designOptions.pocket}`}
                          </span>
                        )}
                        {item.designOptions?.button && (
                          <span className="text-[10px] bg-obsidian-950 px-2 py-0.5 rounded border border-obsidian-800 text-gray-300">
                            Btn {item.designOptions.button.code || item.designOptions.button}
                          </span>
                        )}
                        {item.designOptions?.shoulderSlope && (
                          <span className="text-[10px] bg-obsidian-950 px-2 py-0.5 rounded border border-champagne-500/30 text-champagne-300">
                            Slope: {item.designOptions.shoulderSlope.title || item.designOptions.shoulderSlope}
                          </span>
                        )}
                        {item.designOptions?.coatCategory && (
                          <span className="text-[10px] bg-obsidian-950 px-2 py-0.5 rounded border border-obsidian-800 text-gray-300">
                            {item.designOptions.coatCategory}
                          </span>
                        )}
                      </div>

                      {/* Expandable Exact Measurements in Inches */}
                      {item.measurements && Object.keys(item.measurements).length > 0 && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedMeasurements((prev) => ({
                                ...prev,
                                [item.cartId]: !prev[item.cartId]
                              }))
                            }
                            className="text-[11px] text-champagne-400 hover:text-champagne-300 font-semibold underline flex items-center gap-1"
                          >
                            <span>
                              {expandedMeasurements[item.cartId]
                                ? 'Hide Precise Measurements'
                                : 'Show All Measurements (Inches)'}
                            </span>
                          </button>

                          {expandedMeasurements[item.cartId] && (
                            <div className="mt-2 p-2.5 rounded-xl bg-obsidian-950 border border-obsidian-800 grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px]">
                              {Object.entries(item.measurements)
                                .filter(([_, v]) => v !== undefined && v !== null && v !== '')
                                .map(([k, v]) => (
                                  <div key={k} className="flex justify-between bg-obsidian-900/80 px-2 py-1 rounded border border-obsidian-850">
                                    <span className="text-gray-400 capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                                    <span className="font-mono font-bold text-champagne-300">{v}"</span>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Direct Page Link */}
                      {item.garmentId && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => navigateToGarment(item.garmentId)}
                            className="text-[10px] uppercase font-bold tracking-wider text-gray-400 hover:text-champagne-400 transition-colors"
                          >
                            &larr; Open {item.garmentTitle || 'Garment'} Measurement Studio
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Row: Quantity Stepper & Price */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-obsidian-800/80">
                  <div className="flex items-center gap-2 bg-obsidian-950 px-2 py-1 rounded-lg border border-obsidian-800">
                    <button
                      onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-xs font-bold text-white px-2">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="font-mono text-lg font-black text-champagne-400">
                    {settings.currency} {item.itemTotal.toLocaleString()}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Checkout Form & Total */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-obsidian-900 border border-obsidian-750 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            
            <div className="border-b border-obsidian-800 pb-4">
              <h3 className="font-serif text-lg font-bold text-white mb-1">
                Client & Delivery Details
              </h3>
              <p className="text-xs text-gray-400">
                Generated directly onto your official Master Tailor Cutting Slip.
              </p>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="e.g., Chaudhry Tariq Mehmood"
                  className={`w-full bg-obsidian-950 border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none ${
                    formErrors.name ? 'border-red-500' : 'border-obsidian-750 focus:border-champagne-500'
                  }`}
                />
                {formErrors.name && <span className="text-[10px] text-red-400">{formErrors.name}</span>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="text"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="0300-1234567"
                    className={`w-full bg-obsidian-950 border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none ${
                      formErrors.phone ? 'border-red-500' : 'border-obsidian-750 focus:border-champagne-500'
                    }`}
                  />
                  {formErrors.phone && <span className="text-[10px] text-red-400">{formErrors.phone}</span>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="Islamabad / Rawalpindi"
                    className={`w-full bg-obsidian-950 border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none ${
                      formErrors.city ? 'border-red-500' : 'border-obsidian-750 focus:border-champagne-500'
                    }`}
                  />
                  {formErrors.city && <span className="text-[10px] text-red-400">{formErrors.city}</span>}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Delivery Address / Atelier Pickup
                </label>
                <input
                  type="text"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="Street / Sector / House #"
                  className="w-full bg-obsidian-950 border border-obsidian-750 focus:border-champagne-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Special Atelier Directives
                </label>
                <textarea
                  rows={2}
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="Urgent delivery date, fabric shrinkage notes, extra trial fitting..."
                  className="w-full bg-obsidian-950 border border-obsidian-750 focus:border-champagne-500 rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              {/* Order Total Breakdown */}
              <div className="pt-4 border-t border-obsidian-800 space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Items Subtotal:</span>
                  <span className="font-mono text-gray-200">{settings.currency} {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Master Cutting & Pressing:</span>
                  <span className="text-emerald-400 font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-obsidian-800">
                  <span>Total Payable:</span>
                  <span className="font-mono text-champagne-400 text-xl font-black">
                    {settings.currency} {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Dual Submission CTAs */}
              <div className="space-y-3 pt-3">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-400 hover:to-champagne-500 text-obsidian-950 font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-champagne-500/20 transition-all"
                >
                  <Printer className="w-4 h-4 stroke-[2.5]" />
                  <span>Place Order & Print Cutting Slip</span>
                </button>

                <button
                  type="button"
                  onClick={generateWhatsAppMessage}
                  className="w-full bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Order Breakdown on WhatsApp</span>
                </button>
              </div>

            </form>

          </div>
        </div>

      </div>

    </div>
  );
};
