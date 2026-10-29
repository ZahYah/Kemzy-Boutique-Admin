import { Link } from 'react-router-dom';
import { Plus, ClipboardList, Package } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        to="/admin/products/new"
        className="flex items-center gap-2 bg-ink-800 px-4 py-2.5 text-sm font-medium text-bone-100 transition-colors hover:bg-ink-900"
      >
        <Plus size={16} /> Add Product
      </Link>
      <Link
        to="/admin/orders"
        className="flex items-center gap-2 border border-ink-800 px-4 py-2.5 text-sm font-medium text-ink-800 transition-colors hover:bg-ink-800 hover:text-bone-100"
      >
        <ClipboardList size={16} /> View Orders
      </Link>
      <Link
        to="/admin/inventory"
        className="flex items-center gap-2 border border-ink-800 px-4 py-2.5 text-sm font-medium text-ink-800 transition-colors hover:bg-ink-800 hover:text-bone-100"
      >
        <Package size={16} /> Manage Inventory
      </Link>
    </div>
  );
}
