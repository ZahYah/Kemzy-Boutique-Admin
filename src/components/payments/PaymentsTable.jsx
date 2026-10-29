import { Eye } from 'lucide-react';
import PaymentStatusBadge from '../PaymentStatusBadge';

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function PaymentsTable({ payments, onView }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink-100 bg-bone-200 text-xs text-ink-400">
            <th className="px-4 py-3 font-medium">Transaction ID</th>
            <th className="px-4 py-3 font-medium">Order ID</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Method</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {payments.map((payment) => (
            <tr key={payment.transactionId} className="hover:bg-bone-200">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-ink-800">
                {payment.transactionId}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-600">#{payment.orderId}</td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-700">{payment.customer.name}</td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-800">
                ₦{payment.amount.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-600">{payment.method}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <PaymentStatusBadge status={payment.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-400">
                {formatDate(payment.date)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                <button
                  onClick={() => onView(payment)}
                  aria-label={`View transaction ${payment.transactionId}`}
                  className="inline-flex h-8 w-8 items-center justify-center border border-ink-100 text-ink-500 hover:border-brass-500 hover:text-brass-600"
                >
                  <Eye size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
