// Mock customers "repository".
// Shaped to mirror what a real backend call would look like (fetch against
// a `customers` table), so swapping this module's internals for a real API
// or Supabase call later shouldn't require touching any component that
// imports it.

import { initialCustomers } from './customersData';

const LATENCY_MS = 500;

let customers = [...initialCustomers];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mirrors: supabase.from('customers').select('*')
export async function fetchCustomers() {
  await delay(LATENCY_MS);
  return [...customers];
}
