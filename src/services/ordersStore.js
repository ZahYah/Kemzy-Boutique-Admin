// Mock orders "repository".
//
// Shaped to mirror what a Supabase-backed version would look like (fetch /
// update against an `orders` table), so swapping this module's internals
// for real supabase-js calls later shouldn't require touching any
// component that imports it.

import { initialOrders } from './ordersData';

const LATENCY_MS = 500;

// Module-level "table" — persists for the lifetime of the app session.
let orders = [...initialOrders];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mirrors: supabase.from('orders').select('*')
export async function fetchOrders() {
  await delay(LATENCY_MS);
  return [...orders];
}

// Mirrors: supabase.from('orders').update({ orderStatus }).eq('id', id).select().single()
export async function updateOrderStatusById(id, orderStatus) {
  await delay(LATENCY_MS);
  orders = orders.map((o) => (o.id === id ? { ...o, orderStatus } : o));
  return orders.find((o) => o.id === id) ?? null;
}
