import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchOrders, updateOrderStatusById } from '../services/ordersStore';

const OrdersContext = createContext(null);

// Shared order data for the admin area, backed by the mock repository in
// services/ordersStore.js — swap that file for Supabase later and nothing
// here needs to change.
export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchOrders();
    setOrders(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateOrderStatus = useCallback(async (id, orderStatus) => {
    const updated = await updateOrderStatusById(id, orderStatus);
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    return updated;
  }, []);

  const value = { orders, loading, updateOrderStatus, reload: load };

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within an OrdersProvider');
  return ctx;
}
