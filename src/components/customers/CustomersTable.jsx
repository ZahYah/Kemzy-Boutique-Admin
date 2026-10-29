import { Link } from 'react-router-dom';
import CustomerStatusBadge from './CustomerStatusBadge';

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function initialsOf(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function CustomersTable({ customers }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink-100 bg-bone-200 text-xs text-ink-400">
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Phone</th>
            <th className="px-4 py-3 font-medium">Orders</th>
            <th className="px-4 py-3 font-medium">Total Spent</th>
            <th className="px-4 py-3 font-medium">Last Order</th>
            <th className="px-4 py-3 font-medium">Registered</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-bone-200">
              <td className="px-4 py-3">
                <Link
                  to={`/admin/customers/${customer.id}`}
                  className="flex items-center gap-3 hover:text-brass-600"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink-100 bg-white font-display text-xs text-ink-600">
                    {initialsOf(customer.name)}
                  </span>
                  <span className="font-medium text-ink-800 hover:text-brass-600">
                    {customer.name}
                  </span>
                </Link>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-600">{customer.email}</td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-600">{customer.phone}</td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-600">{customer.totalOrders}</td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-800">
                ₦{customer.totalSpent.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-400">
                {formatDate(customer.lastOrderDate)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-400">
                {formatDate(customer.registrationDate)}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <CustomerStatusBadge status={customer.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
