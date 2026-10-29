import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchPayments } from '../services/paymentsStore';

const PaymentsContext = createContext(null);

// Shared payment/transaction data for the admin area, backed by the mock
// repository in services/paymentsStore.js — swap that file for a real
// Paystack-backed source later and nothing here needs to change.
export function PaymentsProvider({ children }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchPayments();
    setPayments(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = { payments, loading, reload: load };

  return <PaymentsContext.Provider value={value}>{children}</PaymentsContext.Provider>;
}

export function usePayments() {
  const ctx = useContext(PaymentsContext);
  if (!ctx) throw new Error('usePayments must be used within a PaymentsProvider');
  return ctx;
}
