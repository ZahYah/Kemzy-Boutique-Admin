const styles = {
  Active: 'bg-sage-50 text-sage-600',
  Draft: 'bg-ink-50 text-ink-500',
  'Out of Stock': 'bg-wine-50 text-wine-600',
};

export default function ProductStatusBadge({ status }) {
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
