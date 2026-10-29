import { createContext, useContext, useState } from 'react';

const AdminContext = createContext(null);

// Placeholder admin profile. Replace with a real session once auth is wired up.
const defaultAdmin = {
  name: 'Amaka Eze',
  role: 'Store Manager',
  email: 'amaka@kemzyboutique.com',
  initials: 'AE',
};

export function AdminProvider({ children }) {
  const [admin] = useState(defaultAdmin);
  return <AdminContext.Provider value={{ admin }}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within an AdminProvider');
  return ctx;
}
