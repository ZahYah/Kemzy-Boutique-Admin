import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  fetchCategories,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} from '../services/categoriesStore';

const CategoriesContext = createContext(null);

// Shared category data for the admin area, backed by the mock repository
// in services/categoriesStore.js — swap that file for Supabase later and
// nothing here needs to change.
export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchCategories();
    setCategories(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addCategory = useCallback(async (payload) => {
    const created = await createCategory(payload);
    setCategories((prev) => [...prev, created]);
    return created;
  }, []);

  const editCategory = useCallback(async (id, payload) => {
    const updated = await updateCategoryById(id, payload);
    setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  }, []);

  const removeCategory = useCallback(async (id) => {
    await deleteCategoryById(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const value = { categories, loading, addCategory, editCategory, removeCategory, reload: load };

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}

export function useCategories() {
  const ctx = useContext(CategoriesContext);
  if (!ctx) throw new Error('useCategories must be used within a CategoriesProvider');
  return ctx;
}
