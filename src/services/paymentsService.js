// Mock payments service.
//
// In a real integration this module would wrap the Paystack API
// (initialize/verify transactions, webhooks, refunds). For now it derives
// payment records from the same mock orders data so the whole admin area
// stays consistent, and it exposes function names and a record shape that
// mirror what a Paystack-backed version would look like — swap the bodies
// later without touching any component that imports this file.

import { fetchOrders } from './ordersStore';

const CARD_BRANDS = ['visa', 'mastercard', 'verve'];
const BANKS = ['Access Bank', 'Guaranty Trust Bank', 'Zenith Bank', 'First Bank', 'UBA'];

function hashString(value = '') {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 100000;
  }
  return hash;
}

// Simulates what Paystack's `authorization` object would carry per channel.
function buildChannelDetails(order, seed) {
  if (order.payment.method === 'Card') {
    return {
      channel: 'card',
      authorization: {
        cardType: CARD_BRANDS[seed % CARD_BRANDS.length],
        last4: String(1000 + (seed % 9000)).slice(-4),
        bank: BANKS[seed % BANKS.length],
      },
    };
  }
  if (order.payment.method === 'Bank Transfer') {
    return { channel: 'bank_transfer', authorization: { bank: BANKS[seed % BANKS.length] } };
  }
  return { channel: 'cash', authorization: null };
}

function buildGatewayResponse(status) {
  switch (status) {
    case 'Paid':
      return 'Approved';
    case 'Pending':
      return 'Awaiting confirmation';
    case 'Failed':
      return 'Declined by issuer';
    case 'Refunded':
      return 'Reversed';
    default:
      return '—';
  }
}

function toPaymentRecord(order) {
  const seed = hashString(order.payment.reference);
  const { channel, authorization } = buildChannelDetails(order, seed);
  const fee = order.payment.method === 'Cash on Delivery' ? 0 : Math.round(order.total * 0.015);

  return {
    id: order.payment.reference,
    orderId: order.id,
    customer: order.customer.name,
    amount: order.total,
    method: order.payment.method,
    status: order.payment.status,
    date: order.date,
    channel,
    authorization,
    fee,
    gatewayResponse: buildGatewayResponse(order.payment.status),
    paidAt: order.payment.status === 'Paid' ? order.date : null,
  };
}

const LATENCY_MS = 500;
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mirrors a future `paystack.transaction.list()` call.
export async function fetchPayments() {
  await delay(LATENCY_MS);
  const orders = await fetchOrders();
  return orders.map(toPaymentRecord);
}

// Placeholder for later: paystack.transaction.verify(reference)
export async function verifyPayment(reference) {
  throw new Error(`Paystack is not connected yet. Cannot verify ${reference}.`);
}

// Placeholder for later: paystack.refund.create({ transaction: reference })
export async function initiateRefund(reference) {
  throw new Error(`Paystack is not connected yet. Cannot refund ${reference}.`);
}
