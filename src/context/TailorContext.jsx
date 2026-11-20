import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_SETTINGS,
  INITIAL_FABRICS,
  INITIAL_BRANDS,
  USAGE_CATEGORIES
} from '../data/defaultData.js';

const TailorContext = createContext();

export const TailorProvider = ({ children }) => {
  // 1. Settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('amt_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // 2. Fabrics
  const [fabrics, setFabrics] = useState(() => {
    try {
      const saved = localStorage.getItem('amt_fabrics');
      return saved ? JSON.parse(saved) : INITIAL_FABRICS;
    } catch {
      return INITIAL_FABRICS;
    }
  });

  // 3. Brands
  const [brands, setBrands] = useState(() => {
    try {
      const saved = localStorage.getItem('amt_brands');
      return saved ? JSON.parse(saved) : INITIAL_BRANDS;
    } catch {
      return INITIAL_BRANDS;
    }
  });

  // 4. Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('amt_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 5. Orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('amt_orders');
      if (saved) return JSON.parse(saved);
      // Seed initial sample order for realistic atelier preview
      return [
        {
          id: 'AMT-8821',
          date: '2026-11-19T14:30:00Z',
          customer: {
            name: 'Muhammad Daniyal',
            phone: '0300-8541299',
            city: 'Islamabad',
            address: 'House #42, Street 18, F-7/2',
            notes: 'Urgent for weekend wedding reception.'
          },
          items: [
            {
              id: 'item-1',
              type: 'bespoke-garment',
              garmentId: 'shalwar-kameez',
              garmentTitle: 'Shalwar Kameez',
              stitchingPrice: 2800,
              fabricOption: 'client-provided',
              designOptions: {
                collar: { code: 'A2', title: 'Spread Collar (1.4" | 2.3" | 2.50")' },
                ban: { code: 'B1', title: 'Full Round Ban', size: '1.25"' },
                pocket: { code: '5', title: '5 Pockets (+ Shalwar Mobile Pocket)' },
                button: { code: 'B', title: 'Antique Brass Stud' },
                patti: { width: '1.25"', style: 'Ghum Patti' },
                daman: 'Gol / Round',
                sewing: 'Double Sewing',
                pancha: 'Net Jali Pancha'
              },
              measurements: {
                shirtLength: '42.5',
                chest: '40.0',
                gap: '4.0',
                belly: '38.0',
                hip: '42.0',
                shoulders: '18.5',
                sleeves: '24.25',
                collar: '15.5',
                shalwarLength: '39.0',
                bottom: '8.5',
                width: '21.0',
                inside: '28.0'
              },
              quantity: 1,
              itemTotal: 2800
            }
          ],
          totalAmount: 2800,
          status: 'In Cutting'
        }
      ];
    } catch {
      return [];
    }
  });

  // Navigation / Tab State
  const [currentView, setCurrentView] = useState('fabrics'); // 'fabrics' | 'studio' | 'cart' | 'admin' | 'slip'
  const [activeSlipOrder, setActiveSlipOrder] = useState(null);

  // Active Pre-selected Fabric for Custom Stitching
  const [preselectedFabric, setPreselectedFabric] = useState(null);

  // Persist State Changes
  useEffect(() => {
    localStorage.setItem('amt_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('amt_fabrics', JSON.stringify(fabrics));
  }, [fabrics]);

  useEffect(() => {
    localStorage.setItem('amt_brands', JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem('amt_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('amt_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart Actions
  const addToCart = (item) => {
    const newItem = {
      ...item,
      cartId: 'cart-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5)
    };
    setCart((prev) => [...prev, newItem]);
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const updateCartQuantity = (cartId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartId === cartId) {
          const unitPrice = item.itemTotal / item.quantity;
          return {
            ...item,
            quantity: newQty,
            itemTotal: Math.round(unitPrice * newQty)
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  // Place Order
  const placeOrder = (customerData) => {
    if (cart.length === 0) return null;

    const total = cart.reduce((acc, item) => acc + item.itemTotal, 0);
    const orderNumber = 'AMT-' + Math.floor(1000 + Math.random() * 9000);

    const newOrder = {
      id: orderNumber,
      date: new Date().toISOString(),
      customer: customerData,
      items: [...cart],
      totalAmount: total,
      status: 'Confirmed'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setActiveSlipOrder(newOrder);
    setCurrentView('slip');
    return newOrder;
  };

  // Launch Bespoke Studio with Preselected Fabric
  const buyFabricWithStitch = (fabric, meters) => {
    setPreselectedFabric({ fabric, meters });
    setCurrentView('studio');
  };

  // Admin Actions
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateGlobalMaxMeterLimit = (newLimit) => {
    const limit = parseFloat(newLimit) || 18.0;
    setSettings((prev) => ({ ...prev, globalMaxMeterLimit: limit }));
    setFabrics((prev) =>
      prev.map((f) => ({
        ...f,
        maxMeters: limit
      }))
    );
  };

  const updateFabric = (fabricId, updatedFields) => {
    setFabrics((prev) =>
      prev.map((f) => (f.id === fabricId ? { ...f, ...updatedFields } : f))
    );
  };

  const addFabric = (newFabric) => {
    setFabrics((prev) => [newFabric, ...prev]);
  };

  const deleteFabric = (fabricId) => {
    setFabrics((prev) => prev.filter((f) => f.id !== fabricId));
  };

  const addBrand = (origin, brandName) => {
    if (!brandName || !brands[origin]) return;
    setBrands((prev) => ({
      ...prev,
      [origin]: [...new Set([...prev[origin], brandName.trim()])]
    }));
  };

  const deleteBrand = (origin, brandName) => {
    setBrands((prev) => ({
      ...prev,
      [origin]: prev[origin].filter((b) => b !== brandName)
    }));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <TailorContext.Provider
      value={{
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
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        orders,
        placeOrder,
        updateOrderStatus,
        currentView,
        setCurrentView,
        activeSlipOrder,
        setActiveSlipOrder,
        preselectedFabric,
        setPreselectedFabric,
        buyFabricWithStitch
      }}
    >
      {children}
    </TailorContext.Provider>
  );
};

export const useTailor = () => useContext(TailorContext);
