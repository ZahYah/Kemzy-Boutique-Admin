import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchCustomers } from '../services/customersStore';

const CustomersContext = createContext(null);

// Shared customer data for the admin area, backed by the mock repository
// in services/customersStore.js — swap that file for a real API or
// Supabase call later and nothing here needs to change.
export function CustomersProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchCustomers();
    setCustomers(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = { customers, loading, reload: load };

  return <CustomersContext.Provider value={value}>{children}</CustomersContext.Provider>;
}

export function useCustomers() {
  const ctx = useContext(CustomersContext);
  if (!ctx) throw new Error('useCustomers must be used within a CustomersProvider');
  return ctx;
}
