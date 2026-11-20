import React, { useState } from 'react';
import { useTailor } from '../context/TailorContext.jsx';
import { USAGE_CATEGORIES } from '../data/defaultData.js';
import {
  ShieldCheck,
  Settings,
  Package,
  Layers,
  ShoppingBag,
  Plus,
  Trash2,
  Edit2,
  Check,
  Printer,
  Eye,
  RefreshCw
} from 'lucide-react';

export const AdminPanel = () => {
  const {
    settings,
    updateSettings,
    updateGlobalMaxMeterLimit,
    fabrics,
    updateFabric,
    addFabric,
    deleteFabric,
    brands,
    addBrand,
    deleteBrand,
    orders,
    updateOrderStatus,
    setActiveSlipOrder,
    setCurrentView
  } = useTailor();

  // Active Admin Tab: 'settings' | 'fabrics' | 'brands' | 'orders'
  const [adminTab, setAdminTab] = useState('settings');

  // New Brand input
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandOrigin, setNewBrandOrigin] = useState('imported');

  // Global Max Meter Limit input state
  const [globalLimitInput, setGlobalLimitInput] = useState(
    settings.globalMaxMeterLimit || 18.00
  );

  // New Fabric Modal / Form State
  const [isAddingFabric, setIsAddingFabric] = useState(false);
  const [newFabric, setNewFabric] = useState({
    id: '',
    name: '',
    brand: brands.imported[0] || 'Scabal Select',
    origin: 'imported',
    pricePerMeter: 4500,
    usageCategory: 'two-piece-pant-coat',
    image: '/images/fabrics/imported/super-wool.jpg',
    description: 'Fine bespoke imported suiting cloth.',
    tags: ['Imported', 'Luxury'],
    minMeters: 3.00,
    maxMeters: settings.globalMaxMeterLimit || 18.00,
    inStock: true
  });

  // Editing Fabric State
  const [editingFabricId, setEditingFabricId] = useState(null);
  const [editFields, setEditFields] = useState({});

  // Success toast
  const [toast, setToast] = useState(null);
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Save Global Max Meter Limit
  const handleSaveGlobalLimit = (e) => {
    e.preventDefault();
    const limit = parseFloat(globalLimitInput) || 18.00;
    updateGlobalMaxMeterLimit(limit);
    showToast(`Global Max Meter Limit updated to ${limit}m! Immediately active on store.`);
  };

  // Add Brand
  const handleAddBrand = (e) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    addBrand(newBrandOrigin, newBrandName.trim());
    setNewBrandName('');
    showToast(`Brand "${newBrandName.trim()}" added to ${newBrandOrigin} catalog!`);
  };

  // Save New Fabric
  const handleCreateFabric = (e) => {
    e.preventDefault();
    if (!newFabric.name.trim()) return;
    const slug = newFabric.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    addFabric({
      ...newFabric,
      id: slug + '-' + Date.now().toString(36),
      pricePerMeter: parseFloat(newFabric.pricePerMeter) || 3000,
      minMeters: parseFloat(newFabric.minMeters) || 3.00,
      maxMeters: parseFloat(newFabric.maxMeters) || settings.globalMaxMeterLimit || 18.00
    });
    setIsAddingFabric(false);
    showToast(`Fabric "${newFabric.name}" successfully created!`);
  };

  // Start Edit
  const startEditing = (fabric) => {
    setEditingFabricId(fabric.id);
    setEditFields({
      name: fabric.name,
      pricePerMeter: fabric.pricePerMeter,
      minMeters: fabric.minMeters,
      maxMeters: fabric.maxMeters,
      inStock: fabric.inStock
    });
  };

  const saveEdit = (fabricId) => {
    updateFabric(fabricId, {
      name: editFields.name,
      pricePerMeter: parseFloat(editFields.pricePerMeter),
      minMeters: parseFloat(editFields.minMeters),
      maxMeters: parseFloat(editFields.maxMeters),
      inStock: editFields.inStock
    });
    setEditingFabricId(null);
    showToast('Fabric updated successfully!');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Admin Header */}
      <div className="bg-obsidian-900 border border-obsidian-750 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-champagne-400 font-mono">
              Atelier Management System
            </span>
            <h1 className="font-serif text-2xl font-bold text-white">
              Abdullah Melody Tailor — Admin Dashboard
            </h1>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-obsidian-950 p-1.5 rounded-xl border border-obsidian-800">
          {[
            { id: 'settings', label: 'Settings & Limits', icon: Settings },
            { id: 'fabrics', label: `Fabrics (${fabrics.length})`, icon: Package },
            { id: 'brands', label: 'Brand Catalog', icon: Layers },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag }
          ].map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setAdminTab(t.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  adminTab === t.id
                    ? 'bg-champagne-500 text-obsidian-950 shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-champagne-500 text-obsidian-950 font-bold text-xs px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-champagne-300">
          <Check className="w-4 h-4 stroke-[3]" />
          {toast}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: SETTINGS & GLOBAL MAX METER LIMIT                 */}
      {/* ======================================================== */}
      {adminTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card: Global Max Meter Limit */}
          <div className="bg-obsidian-900 border border-obsidian-750 p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="border-b border-obsidian-800 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-champagne-400 font-mono">
                Storefront Rule Calibration
              </span>
              <h3 className="font-serif text-lg font-bold text-white">
                Global Max Meter Limit
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Enforces the maximum continuous cut length customers can select on any fabric in the storefront.
              </p>
            </div>

            <form onSubmit={handleSaveGlobalLimit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Global Maximum Meters (Default: 18.00m)
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    step="0.25"
                    min="1.00"
                    max="100.00"
                    value={globalLimitInput}
                    onChange={(e) => setGlobalLimitInput(e.target.value)}
                    className="flex-1 bg-obsidian-950 border border-obsidian-750 focus:border-champagne-500 rounded-xl px-4 py-2.5 text-base font-mono font-bold text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md"
                  >
                    Update Limit
                  </button>
                </div>
              </div>

              <div className="bg-obsidian-950 p-3.5 rounded-xl border border-obsidian-800 text-xs text-gray-400 space-y-1 font-mono">
                <p>• Active System Limit: <strong className="text-champagne-400">{settings.globalMaxMeterLimit || 18.00}m</strong></p>
                <p>• Updating immediately cascades to all fabric cards & steppers.</p>
              </div>
            </form>
          </div>

          {/* Card: Studio Branding & Currency */}
          <div className="bg-obsidian-900 border border-obsidian-750 p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="border-b border-obsidian-800 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-champagne-400 font-mono">
                Storefront Identity
              </span>
              <h3 className="font-serif text-lg font-bold text-white">
                Currency & Contact Settings
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1">Currency Symbol</label>
                  <input
                    type="text"
                    value={settings.currency}
                    onChange={(e) => updateSettings({ currency: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-750 rounded-xl px-3 py-2 text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Currency Code</label>
                  <input
                    type="text"
                    value={settings.currencyCode}
                    onChange={(e) => updateSettings({ currencyCode: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-750 rounded-xl px-3 py-2 text-white font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">WhatsApp Order Number (with Country Code)</label>
                <input
                  type="text"
                  value={settings.whatsappPhone}
                  onChange={(e) => updateSettings({ whatsappPhone: e.target.value })}
                  placeholder="923005123456"
                  className="w-full bg-obsidian-950 border border-obsidian-750 rounded-xl px-3 py-2 text-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Studio Address</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => updateSettings({ address: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-750 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: FABRICS CATALOG MANAGER                           */}
      {/* ======================================================== */}
      {adminTab === 'fabrics' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Fabric Catalog ({fabrics.length} Items)</h3>
              <p className="text-xs text-gray-400">Manage rates, minimum meters, and stock status.</p>
            </div>
            <button
              onClick={() => setIsAddingFabric(true)}
              className="bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New Fabric</span>
            </button>
          </div>

          {/* Add Fabric Modal Form */}
          {isAddingFabric && (
            <div className="bg-obsidian-900 border border-champagne-500/50 p-6 rounded-2xl space-y-4">
              <h4 className="font-serif text-base font-bold text-champagne-400">Add New Fabric Bolt</h4>
              <form onSubmit={handleCreateFabric} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-gray-400 block mb-1">Fabric Name *</label>
                  <input
                    type="text"
                    required
                    value={newFabric.name}
                    onChange={(e) => setNewFabric({ ...newFabric, name: e.target.value })}
                    placeholder="e.g., Loro Piana Tasmanian 150s"
                    className="w-full bg-obsidian-950 border border-obsidian-750 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Origin *</label>
                  <select
                    value={newFabric.origin}
                    onChange={(e) => setNewFabric({ ...newFabric, origin: e.target.value, brand: brands[e.target.value][0] || '' })}
                    className="w-full bg-obsidian-950 border border-obsidian-750 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="imported">Imported Fabric</option>
                    <option value="local">Local & Heritage</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Brand *</label>
                  <select
                    value={newFabric.brand}
                    onChange={(e) => setNewFabric({ ...newFabric, brand: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-750 rounded-lg px-3 py-2 text-white"
                  >
                    {(brands[newFabric.origin] || []).map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Price per Meter ({settings.currency}) *</label>
                  <input
                    type="number"
                    step="50"
                    value={newFabric.pricePerMeter}
                    onChange={(e) => setNewFabric({ ...newFabric, pricePerMeter: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-750 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Usage Category *</label>
                  <select
                    value={newFabric.usageCategory}
                    onChange={(e) => setNewFabric({ ...newFabric, usageCategory: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-750 rounded-lg px-3 py-2 text-white"
                  >
                    {Object.entries(USAGE_CATEGORIES).map(([k, cat]) => (
                      <option key={k} value={k}>{cat.label} (Min {cat.minMeters}m)</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Min Length (Meters)</label>
                  <input
                    type="number"
                    step="0.25"
                    value={newFabric.minMeters}
                    onChange={(e) => setNewFabric({ ...newFabric, minMeters: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-750 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>

                <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingFabric(false)}
                    className="px-4 py-2 bg-obsidian-800 text-gray-400 rounded-lg hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-champagne-500 text-obsidian-950 font-bold rounded-lg hover:bg-champagne-400"
                  >
                    Save to Catalog
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Table */}
          <div className="bg-obsidian-900 border border-obsidian-750 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-obsidian-950 text-gray-400 uppercase tracking-wider font-mono border-b border-obsidian-800">
                  <tr>
                    <th className="py-3 px-4">Fabric</th>
                    <th className="py-3 px-4">Brand / Origin</th>
                    <th className="py-3 px-4">Usage Category</th>
                    <th className="py-3 px-4">Price / m</th>
                    <th className="py-3 px-4">Min / Max</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-obsidian-800 font-medium">
                  {fabrics.map(fabric => {
                    const isEditing = editingFabricId === fabric.id;

                    return (
                      <tr key={fabric.id} className="hover:bg-obsidian-850/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img src={fabric.image} alt={fabric.name} className="w-10 h-10 rounded-lg object-cover bg-obsidian-950" />
                            <div>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editFields.name}
                                  onChange={(e) => setEditFields({ ...editFields, name: e.target.value })}
                                  className="bg-obsidian-950 border border-obsidian-700 px-2 py-1 rounded text-white text-xs"
                                />
                              ) : (
                                <div className="font-bold text-white">{fabric.name}</div>
                              )}
                              <div className="text-[10px] text-gray-500 font-mono">{fabric.id}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="text-gray-200">{fabric.brand}</span>
                          <span className="block text-[10px] text-gray-500 capitalize">{fabric.origin}</span>
                        </td>

                        <td className="py-3.5 px-4 text-gray-300">
                          {USAGE_CATEGORIES[fabric.usageCategory]?.label || fabric.usageCategory}
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-champagne-400">
                          {isEditing ? (
                            <input
                              type="number"
                              step="50"
                              value={editFields.pricePerMeter}
                              onChange={(e) => setEditFields({ ...editFields, pricePerMeter: e.target.value })}
                              className="w-20 bg-obsidian-950 border border-obsidian-700 px-2 py-1 rounded text-white text-xs"
                            />
                          ) : (
                            `${settings.currency} ${fabric.pricePerMeter.toLocaleString()}`
                          )}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-gray-400">
                          {isEditing ? (
                            <div className="flex gap-1 items-center">
                              <input
                                type="number"
                                step="0.25"
                                value={editFields.minMeters}
                                onChange={(e) => setEditFields({ ...editFields, minMeters: e.target.value })}
                                className="w-14 bg-obsidian-950 border border-obsidian-700 px-1 py-0.5 rounded text-white text-xs"
                              />
                              <span>-</span>
                              <input
                                type="number"
                                step="0.25"
                                value={editFields.maxMeters}
                                onChange={(e) => setEditFields({ ...editFields, maxMeters: e.target.value })}
                                className="w-14 bg-obsidian-950 border border-obsidian-700 px-1 py-0.5 rounded text-white text-xs"
                              />
                            </div>
                          ) : (
                            `${fabric.minMeters || 3.0}m - ${fabric.maxMeters || settings.globalMaxMeterLimit || 18.0}m`
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {isEditing ? (
                              <button
                                onClick={() => saveEdit(fabric.id)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded text-xs font-bold"
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                onClick={() => startEditing(fabric)}
                                className="text-gray-400 hover:text-champagne-400 p-1"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteFabric(fabric.id)}
                              className="text-gray-400 hover:text-red-400 p-1"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: BRAND SUBCATEGORIES                               */}
      {/* ======================================================== */}
      {adminTab === 'brands' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Imported Brands */}
          <div className="bg-obsidian-900 border border-obsidian-750 p-6 rounded-2xl space-y-4">
            <h3 className="font-serif text-base font-bold text-white flex items-center justify-between">
              <span>Imported Fabric Brands</span>
              <span className="text-xs font-mono text-champagne-400 font-bold">{brands.imported.length}</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {brands.imported.map(b => (
                <div key={b} className="flex items-center gap-2 bg-obsidian-950 px-3 py-1.5 rounded-lg border border-obsidian-800 text-xs text-gray-200">
                  <span>{b}</span>
                  <button onClick={() => deleteBrand('imported', b)} className="text-gray-500 hover:text-red-400">
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Local Brands */}
          <div className="bg-obsidian-900 border border-obsidian-750 p-6 rounded-2xl space-y-4">
            <h3 className="font-serif text-base font-bold text-white flex items-center justify-between">
              <span>Local & Pakistani Brands</span>
              <span className="text-xs font-mono text-champagne-400 font-bold">{brands.local.length}</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {brands.local.map(b => (
                <div key={b} className="flex items-center gap-2 bg-obsidian-950 px-3 py-1.5 rounded-lg border border-obsidian-800 text-xs text-gray-200">
                  <span>{b}</span>
                  <button onClick={() => deleteBrand('local', b)} className="text-gray-500 hover:text-red-400">
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Brand Form */}
          <div className="md:col-span-2 bg-obsidian-900 border border-obsidian-750 p-6 rounded-2xl">
            <h4 className="font-serif text-sm font-bold text-white mb-3">Add New Fabric Brand</h4>
            <form onSubmit={handleAddBrand} className="flex flex-col sm:flex-row gap-3">
              <select
                value={newBrandOrigin}
                onChange={(e) => setNewBrandOrigin(e.target.value)}
                className="bg-obsidian-950 border border-obsidian-750 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="imported">Imported Category</option>
                <option value="local">Local Category</option>
              </select>
              <input
                type="text"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="e.g., Ermenegildo Zegna / Al-Karam"
                className="flex-1 bg-obsidian-950 border border-obsidian-750 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-champagne-500"
              />
              <button
                type="submit"
                className="bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-bold px-6 py-2 rounded-xl text-xs transition-all"
              >
                Add Brand
              </button>
            </form>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: ORDERS & MASTER CUTTING TICKETS                   */}
      {/* ======================================================== */}
      {adminTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Client Orders & Cutting Tickets ({orders.length})</h3>
              <p className="text-xs text-gray-400">View complete measurement breakdown and print master slips.</p>
            </div>
          </div>

          <div className="bg-obsidian-900 border border-obsidian-750 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-obsidian-950 text-gray-400 uppercase tracking-wider font-mono border-b border-obsidian-800">
                  <tr>
                    <th className="py-3 px-4">Ticket #</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Cutting Slip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-obsidian-800 font-medium">
                  {orders.map(o => (
                    <tr key={o.id} className="hover:bg-obsidian-850/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-champagne-400">
                        {o.id}
                      </td>
                      <td className="py-3.5 px-4 text-gray-400">
                        {new Date(o.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{o.customer.name}</div>
                        <div className="text-[10px] text-gray-500 font-mono">{o.customer.phone} • {o.customer.city}</div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-300">
                        {o.items.length} {o.items.length === 1 ? 'item' : 'items'}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-white">
                        {settings.currency} {o.totalAmount.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={o.status || 'Confirmed'}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          className="bg-obsidian-950 border border-obsidian-750 text-champagne-400 font-bold px-2 py-1 rounded text-xs focus:outline-none"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Cutting">In Cutting</option>
                          <option value="In Sewing">In Sewing</option>
                          <option value="Trial Ready">Trial Ready</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setActiveSlipOrder(o);
                            setCurrentView('slip');
                          }}
                          className="bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-bold px-3 py-1.5 rounded-lg text-xs inline-flex items-center gap-1 shadow"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>View Slip</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
