const styles = {
  Pending: 'bg-ink-50 text-ink-500',
  Confirmed: 'bg-brass-50 text-brass-700',
  Processing: 'bg-brass-50 text-brass-700',
  Shipped: 'bg-sage-50 text-sage-600',
  Delivered: 'bg-sage-50 text-sage-600',
  Cancelled: 'bg-wine-50 text-wine-600',
};

export default function OrderStatusBadge({ status }) {
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
