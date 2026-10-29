import OrderStatusBadge from '../orders/OrderStatusBadge';

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Used for both the "Recent Orders" preview and the full "Order History"
// on the customer detail page — just pass a shorter or longer `orders`
// array.
export default function CustomerOrderHistoryTable({ orders }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink-100 text-xs text-ink-400">
            <th className="py-2.5 font-medium">Order ID</th>
            <th className="py-2.5 font-medium">Date</th>
            <th className="py-2.5 font-medium">Amount</th>
            <th className="py-2.5 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-3 font-medium text-ink-800">#{order.id}</td>
              <td className="py-3 text-ink-400">{formatDate(order.date)}</td>
              <td className="py-3 text-ink-800">₦{order.total.toLocaleString()}</td>
              <td className="py-3 text-right">
                <OrderStatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
