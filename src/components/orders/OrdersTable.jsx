import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import PaymentStatusBadge from '../PaymentStatusBadge';
import OrderStatusBadge from './OrderStatusBadge';

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatItemsSummary(items) {
  const [first, ...rest] = items;
  const firstLabel = first.quantity > 1 ? `${first.name} ×${first.quantity}` : first.name;
  return rest.length > 0 ? `${firstLabel} +${rest.length} more` : firstLabel;
}

export default function OrdersTable({ orders }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink-100 bg-bone-200 text-xs text-ink-400">
            <th className="px-4 py-3 font-medium">Order ID</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Items</th>
            <th className="px-4 py-3 font-medium">Total</th>
            <th className="px-4 py-3 font-medium">Payment</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-bone-200">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-ink-800">
                #{order.id}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-700">{order.customer.name}</td>
              <td className="max-w-[220px] truncate px-4 py-3 text-ink-600">
                {formatItemsSummary(order.items)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-800">
                ₦{order.total.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <PaymentStatusBadge status={order.payment.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <OrderStatusBadge status={order.orderStatus} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-400">
                {formatDate(order.date)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                <Link
                  to={`/admin/orders/${order.id}`}
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
