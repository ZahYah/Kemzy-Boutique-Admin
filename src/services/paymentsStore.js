// Mock payments "repository".
//
// Shaped so that swapping in a real Paystack-backed implementation later
// is a matter of rewriting this one function: Paystack's List Transactions
// endpoint (GET /transaction) returns records with a `reference`, `amount`,
// `channel`, `status`, and `paid_at`/`created_at` — normalize that response
// into the same { transactionId, orderId, customer, amount, method,
// status, date } shape used here (e.g. by matching Paystack's `reference`
// back to the order it was created for) and no component needs to change.
// In production this table would typically be kept in sync via a Paystack
// webhook (charge.success, etc.) rather than fetched fresh each time.

import { initialPayments } from './paymentsData';

const LATENCY_MS = 500;

let payments = [...initialPayments];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mirrors: GET https://api.paystack.co/transaction
export async function fetchPayments() {
  await delay(LATENCY_MS);
  return [...payments];
}
