const styles = {
  'In Stock': 'bg-sage-50 text-sage-600',
  'Low Stock': 'bg-brass-50 text-brass-700',
  'Out of Stock': 'bg-wine-50 text-wine-600',
};

export default function InventoryStatusBadge({ status }) {
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
