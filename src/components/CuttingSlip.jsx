import React from 'react';
import { useTailor } from '../context/TailorContext.jsx';
import { Printer, ArrowLeft, Send, CheckCircle2, Scissors } from 'lucide-react';

export const CuttingSlip = () => {
  const { activeSlipOrder, orders, setCurrentView, settings } = useTailor();

  // If no active slip order selected, use the latest order or sample
  const order = activeSlipOrder || orders[0];

  if (!order) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-400">No active tailor slip found.</p>
        <button
          onClick={() => setCurrentView('fabrics')}
          className="mt-4 px-4 py-2 bg-champagne-500 text-obsidian-950 font-bold rounded-lg text-xs"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    let msg = `*CONFIRMED ORDER - ABDULLAH MELODY TAILOR*\n`;
    msg += `*Order Slip #:* ${order.id}\n`;
    msg += `*Client:* ${order.customer.name} (${order.customer.phone})\n`;
    msg += `*Delivery Destination:* ${order.customer.city}\n\n`;
    msg += `*Total Amount:* ${settings.currency} ${order.totalAmount.toLocaleString()}\n`;
    msg += `*Status:* ${order.status || 'Confirmed'}\n`;
    msg += `\nYour master tailor cutting slip is prepared and assigned to master cutters.`;

    const cleanPhone = (order.customer.phone || '').replace(/[^0-9]/g, '') || settings.whatsappPhone;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Top Action Bar (hidden on print) */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-obsidian-900 border border-obsidian-750 p-4 rounded-2xl mb-8 shadow-xl">
        <button
          onClick={() => setCurrentView('fabrics')}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Storefront</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleSendWhatsApp}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
            <span>WhatsApp Slip</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-champagne-500/20"
          >
            <Printer className="w-4 h-4 stroke-[2.5]" />
            <span>Print Master Slip</span>
          </button>
        </div>
      </div>

      {/* Printable Master Cutting Slip Document */}
      <div
        id="printable-slip"
        className="bg-white text-gray-900 rounded-2xl p-8 sm:p-12 shadow-2xl border border-gray-300 relative font-sans leading-relaxed"
      >
        {/* Document Header */}
        <div className="border-b-2 border-gray-900 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-widest mb-1">
                <Scissors className="w-4 h-4" />
                <span>Bespoke Sartorial Atelier</span>
              </div>
              <h1 className="font-serif text-3xl font-black text-gray-950 uppercase tracking-wider">
                Abdullah Melody Tailor
              </h1>
              <p className="text-xs text-gray-600">
                {settings.address || 'Shop #14, Melody Market, Sector G-6, Islamabad'} • Tel: {settings.storePhone || '+92 300 5123456'}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-gray-100 text-gray-900 border border-gray-300 inline-block mb-1">
                Cutting Job Ticket
              </span>
              <div className="font-mono text-2xl font-black text-gray-950">
                #{order.id}
              </div>
              <div className="text-xs text-gray-500">
                Date: {new Date(order.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>

        {/* Client & Fitting Metadata Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 text-xs">
          <div>
            <span className="text-gray-500 block uppercase text-[10px] font-bold">Client Name:</span>
            <strong className="text-gray-950 text-sm">{order.customer.name}</strong>
          </div>
          <div>
            <span className="text-gray-500 block uppercase text-[10px] font-bold">Phone / WhatsApp:</span>
            <strong className="text-gray-950 text-sm font-mono">{order.customer.phone}</strong>
          </div>
          <div>
            <span className="text-gray-500 block uppercase text-[10px] font-bold">City / Address:</span>
            <span className="text-gray-800 font-medium">{order.customer.city}{order.customer.address ? `, ${order.customer.address}` : ''}</span>
          </div>
        </div>

        {/* Order Items Breakdown */}
        <div className="space-y-6 mb-8">
          {order.items.map((item, idx) => (
            <div key={idx} className="border border-gray-300 rounded-xl p-5 bg-white space-y-4">
              
              <div className="flex justify-between items-baseline border-b border-gray-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gray-900 text-white text-[11px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="font-serif text-base font-bold text-gray-950">
                    {item.title || item.garmentTitle}
                  </h3>
                  <span className="text-xs text-gray-500 font-mono">
                    (Qty: {item.quantity})
                  </span>
                </div>
                <div className="font-mono text-sm font-bold text-gray-900">
                  {settings.currency} {item.itemTotal.toLocaleString()}
                </div>
              </div>

              {/* Unstitched Fabric Item Specs */}
              {item.type === 'unstitched-fabric' && (
                <div className="grid grid-cols-3 gap-4 text-xs bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div>
                    <span className="text-gray-500 block">Brand:</span>
                    <strong>{item.brand} ({item.origin})</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Exact Meterage:</span>
                    <strong className="font-mono text-amber-800">{item.meters} meters</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Unit Rate:</span>
                    <span className="font-mono">{settings.currency}{item.pricePerMeter}/m</span>
                  </div>
                </div>
              )}

              {/* Bespoke Garment Styling & Measurements */}
              {item.type === 'bespoke-garment' && (
                <div className="space-y-4">
                  
                  {/* Fabric note */}
                  {item.fabricDetails ? (
                    <div className="text-xs bg-amber-50 text-amber-900 p-2.5 rounded-lg border border-amber-200 flex items-center justify-between">
                      <span><strong>Paired Fabric:</strong> {item.fabricDetails.fabricName} ({item.fabricDetails.meters}m)</span>
                      <span className="font-mono font-bold">{settings.currency}{item.fabricDetails.fabricCost.toLocaleString()}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500 italic">
                      Fabric Source: Client providing original cloth.
                    </div>
                  )}

                  {/* Selected Design Options Matrix */}
                  {item.designOptions && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-2">
                        Bespoke Styling Choices:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        {Object.entries(item.designOptions).map(([k, v]) => {
                          if (!v) return null;
                          let label = k.replace(/([A-Z])/g, ' $1');
                          let val = typeof v === 'object' ? (v.title || v.code || JSON.stringify(v)) : String(v);
                          return (
                            <div key={k} className="bg-gray-50 p-2 rounded border border-gray-200">
                              <span className="text-[9px] text-gray-400 uppercase block font-semibold">{label}:</span>
                              <strong className="text-gray-900 text-[11px] truncate block">{val}</strong>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Complete Measurement Table (Inches) */}
                  {item.measurements && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-2">
                        Tailor Master Measurements (All in Inches "):
                      </span>
                      <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-gray-100 text-gray-700 font-mono text-[10px] uppercase border-b border-gray-300">
                            <tr>
                              {Object.entries(item.measurements)
                                .filter(([_, v]) => v && v.trim() !== '')
                                .map(([key]) => (
                                  <th key={key} className="py-1.5 px-2 font-bold border-r border-gray-200 last:border-0">
                                    {key.replace(/([A-Z])/g, ' $1')}
                                  </th>
                                ))}
                            </tr>
                          </thead>
                          <tbody className="font-mono font-bold text-gray-950 text-center">
                            <tr>
                              {Object.entries(item.measurements)
                                .filter(([_, v]) => v && v.trim() !== '')
                                .map(([key, val]) => (
                                  <td key={key} className="py-2 px-2 border-r border-gray-200 last:border-0 bg-white">
                                    {val}"
                                  </td>
                                ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          ))}
        </div>

        {/* Special Instructions & Directives */}
        {order.customer.notes && (
          <div className="mb-6 p-4 rounded-xl border border-dashed border-gray-400 bg-gray-50 text-xs text-gray-800">
            <strong className="block text-gray-950 mb-1 uppercase text-[10px] tracking-wider">
              Special Cutting Directives:
            </strong>
            <p className="italic">{order.customer.notes}</p>
          </div>
        )}

        {/* Total & Sign-off Footer */}
        <div className="border-t-2 border-gray-900 pt-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            
            {/* Atelier Signatures */}
            <div className="grid grid-cols-2 gap-8 text-center text-xs">
              <div className="w-36 pt-6 border-t border-gray-400 text-gray-600">
                <span className="block text-[10px] uppercase font-bold text-gray-900">Master Cutter</span>
                Signature
              </div>
              <div className="w-36 pt-6 border-t border-gray-400 text-gray-600">
                <span className="block text-[10px] uppercase font-bold text-gray-900">Quality Checker</span>
                Passed & Inspected
              </div>
            </div>

            {/* Total Balance */}
            <div className="text-right">
              <span className="text-xs text-gray-500 uppercase font-semibold">Total Order Value:</span>
              <div className="font-mono text-3xl font-black text-gray-950">
                {settings.currency} {order.totalAmount.toLocaleString()}
              </div>
              <span className="text-[10px] text-gray-500">All taxes & master cutting included</span>
            </div>

          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="text-center text-[10px] text-gray-400 mt-8 pt-4 border-t border-gray-200">
          Abdullah Melody Tailor • Melody Market, G-6, Islamabad • Handcrafted Bespoke Excellence Since 1988
        </div>

      </div>

    </div>
  );
};
