import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  fetchProducts,
  createProduct,
  updateProductById,
  deleteProductById,
} from '../services/productsStore';

const ProductsContext = createContext(null);

// Shared product data for the whole admin area, so a product created on
// /admin/products/new is visible immediately on /admin/products without a
// refresh. Backed by the mock repository in services/productsStore.js —
// swap that file for Supabase later and nothing here needs to change.
export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addProduct = useCallback(async (payload) => {
    const created = await createProduct(payload);
    setProducts((prev) => [created, ...prev]);
    return created;
  }, []);

  const editProduct = useCallback(async (id, payload) => {
    const updated = await updateProductById(id, payload);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  }, []);

  const removeProduct = useCallback(async (id) => {
    await deleteProductById(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const value = { products, loading, addProduct, editProduct, removeProduct, reload: load };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within a ProductsProvider');
  return ctx;
}
