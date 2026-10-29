// Mock categories "repository".
// Shaped to mirror what a Supabase-backed version would look like (fetch /
// insert / update / delete against a `categories` table), so swapping this
// module's internals for real supabase-js calls later shouldn't require
// touching any component that imports it.

import { initialCategories } from './categoriesData';

const LATENCY_MS = 400;

let categories = [...initialCategories];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId() {
  return `CAT-${String(Date.now()).slice(-6)}`;
}

// Mirrors: supabase.from('categories').select('*')
export async function fetchCategories() {
  await delay(LATENCY_MS);
  return [...categories];
}

// Mirrors: supabase.from('categories').insert(payload).select().single()
export async function createCategory(payload) {
  await delay(LATENCY_MS);
  const newCategory = {
    id: generateId(),
    dateCreated: new Date().toISOString().slice(0, 10),
    isDefault: false,
    ...payload,
  };
  categories = [...categories, newCategory];
  return newCategory;
}

// Mirrors: supabase.from('categories').update(payload).eq('id', id).select().single()
export async function updateCategoryById(id, payload) {
  await delay(LATENCY_MS);
  categories = categories.map((c) => (c.id === id ? { ...c, ...payload } : c));
  return categories.find((c) => c.id === id) ?? null;
}

// Mirrors: supabase.from('categories').delete().eq('id', id)
export async function deleteCategoryById(id) {
  await delay(LATENCY_MS);
  categories = categories.filter((c) => c.id !== id);
}
