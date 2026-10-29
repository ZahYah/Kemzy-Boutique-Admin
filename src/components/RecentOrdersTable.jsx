import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

const paymentStyles = {
  Paid: 'bg-sage-50 text-sage-600',
  Pending: 'bg-brass-50 text-brass-700',
  Failed: 'bg-wine-50 text-wine-600',
};

const orderStyles = {
  Processing: 'bg-ink-50 text-ink-600',
  Shipped: 'bg-brass-50 text-brass-700',
  Delivered: 'bg-sage-50 text-sage-600',
  Cancelled: 'bg-wine-50 text-wine-600',
};

function Badge({ label, styles }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[label] || 'bg-ink-50 text-ink-600'
      }`}
    >
      {label}
    </span>
  );
}

export default function RecentOrdersTable({ orders }) {
  return (
    <div className="overflow-x-auto border border-ink-100 bg-white">
      <table className="w-full min-w-[880px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink-100 bg-bone-200 text-xs text-ink-400">
            <th className="px-4 py-3 font-medium">Order ID</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Payment</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-bone-200">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-ink-800">#{order.id}</td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-700">{order.customer}</td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-700">{order.product}</td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-800">{order.amount}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <Badge label={order.paymentStatus} styles={paymentStyles} />
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <Badge label={order.orderStatus} styles={orderStyles} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-400">{order.date}</td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                <Link
                  to="/admin/orders"
                  aria-label={`View order ${order.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center border border-ink-100 text-ink-500 hover:border-brass-500 hover:text-brass-600"
                >
                  <Eye size={15} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
