const styles = {
  Paid: 'bg-sage-50 text-sage-600',
  Pending: 'bg-brass-50 text-brass-700',
  Failed: 'bg-wine-50 text-wine-600',
  Refunded: 'bg-ink-50 text-ink-500',
};

export default function PaymentStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] || 'bg-ink-50 text-ink-600'
      }`}
    >
      {status}
    </span>
  );
}
