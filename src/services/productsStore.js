// Mock products "repository".
//
// Function names and shapes intentionally mirror what a Supabase-backed
// version would look like (fetch / insert / update / delete against a
// `products` table), so swapping this module's internals for real
// supabase-js calls later shouldn't require touching any component that
// imports it.

import { initialProducts } from './productsData';

const LATENCY_MS = 500;

// Module-level "table" — persists for the lifetime of the app session.
let products = [...initialProducts];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId() {
  return `P-${String(Date.now()).slice(-6)}${Math.floor(Math.random() * 10)}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

// Mirrors: supabase.from('products').select('*')
export async function fetchProducts() {
  await delay(LATENCY_MS);
  return [...products];
}

// Mirrors: supabase.from('products').insert(payload).select().single()
export async function createProduct(payload) {
  await delay(LATENCY_MS);
  const createdDate = today();
  const newProduct = {
    id: generateId(),
    dateAdded: createdDate,
    updatedAt: createdDate,
    ...payload,
  };
  products = [newProduct, ...products];
  return newProduct;
}

// Mirrors: supabase.from('products').update(payload).eq('id', id).select().single()
// Every update — including a quick stock change from the Inventory page —
// stamps updatedAt, which is what the Inventory table's "Last Updated"
// column reads from.
export async function updateProductById(id, payload) {
  await delay(LATENCY_MS);
  products = products.map((p) =>
    p.id === id ? { ...p, ...payload, updatedAt: today() } : p
  );
  return products.find((p) => p.id === id) ?? null;
}

// Mirrors: supabase.from('products').delete().eq('id', id)
export async function deleteProductById(id) {
  await delay(LATENCY_MS);
  products = products.filter((p) => p.id !== id);
}

// --- Future order → inventory sync ---------------------------------------
//
// Not wired to anything yet (this admin app doesn't place live orders), but
// structured for when it is: once a checkout writes an order to Supabase,
// a database trigger or edge function on that insert (or on the order's
// status flipping to "Confirmed"/"Paid") would call the equivalent of this
// function — e.g. a Postgres RPC that runs
//   update products set stock = stock - qty where id = product_id
// inside a transaction per line item, so concurrent orders can't oversell
// the same item. `items` is the same { productId, quantity } shape an
// order's line items already carry.
export async function reduceStockForOrder(items) {
  await delay(LATENCY_MS);
  products = products.map((p) => {
    const match = items.find((item) => item.productId === p.id);
    if (!match) return p;
    const nextStock = Math.max(0, p.stock - match.quantity);
    return {
      ...p,
      stock: nextStock,
      status: nextStock === 0 ? 'Out of Stock' : p.status,
      updatedAt: today(),
    };
  });
  return [...products];
}
