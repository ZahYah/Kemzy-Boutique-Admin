import { Link } from 'react-router-dom';
import Modal from '../Modal';
import PaymentStatusBadge from '../PaymentStatusBadge';

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PaymentDetailModal({ payment, onClose }) {
  if (!payment) return null;

  const rows = [
    ['Transaction ID', payment.transactionId],
    ['Order ID', `#${payment.orderId}`],
    ['Customer', payment.customer.name],
    ['Email', payment.customer.email],
    ['Phone', payment.customer.phone],
    ['Payment method', payment.method],
    ['Date', formatDate(payment.date)],
  ];

  return (
    <Modal open={Boolean(payment)} onClose={onClose} title="Payment details" maxWidth="max-w-md">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-ink-800">₦{payment.amount.toLocaleString()}</p>
        <PaymentStatusBadge status={payment.status} />
      </div>

      <dl className="mt-5 divide-y divide-ink-100 border-t border-ink-100">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 py-2.5 text-sm">
            <dt className="shrink-0 text-ink-400">{label}</dt>
            <dd className="text-right text-ink-800">{value}</dd>
          </div>
        ))}
      </dl>

      <Link
        to={`/admin/orders/${payment.orderId}`}
        onClick={onClose}
        className="mt-5 block w-full border border-ink-800 px-4 py-2 text-center text-sm text-ink-800 hover:bg-ink-800 hover:text-bone-100"
      >
        View full order
      </Link>
    </Modal>
  );
}
