// Payment/transaction records for the Payments management page.
//
// Rather than maintaining a second, independent set of sample data, these
// transactions are derived from the same orders in ordersData.js — every
// order that has been paid for produced a payment. This keeps customer
// names, amounts, and references consistent across the Orders and Payments
// sections instead of drifting apart.

import { initialOrders, paymentStatuses } from './ordersData';

export { paymentStatuses };

export const paymentMethods = Array.from(new Set(initialOrders.map((o) => o.payment.method)));

export const initialPayments = initialOrders.map((order) => ({
  transactionId: order.payment.reference,
  orderId: order.id,
  customer: {
    name: order.customer.name,
    email: order.customer.email,
    phone: order.customer.phone,
  },
  amount: order.total,
  method: order.payment.method,
  status: order.payment.status,
  date: order.date,
  items: order.items,
}));
