import { RefreshCw } from 'lucide-react';
import ProductThumb from '../ProductThumb';
import InventoryStatusBadge from './InventoryStatusBadge';
import { getStockStatus } from '../../utils/stockStatus';

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const ROW_ACCENT = {
  wine: 'border-l-2 border-wine-500',
  brass: 'border-l-2 border-brass-500',
  sage: 'border-l-2 border-transparent',
};

export default function InventoryTable({ products, onUpdateStock }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink-100 bg-bone-200 text-xs text-ink-400">
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">SKU</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Current Stock</th>
            <th className="px-4 py-3 font-medium">Low Stock Threshold</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Last Updated</th>
            <th className="px-4 py-3 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {products.map((product) => {
            const stockStatus = getStockStatus(product.stock, product.lowStockThreshold);
            return (
              <tr
                key={product.id}
                className={`hover:bg-bone-200 ${ROW_ACCENT[stockStatus.tone]}`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <ProductThumb category={product.category} imageUrl={product.image} />
                    <p className="max-w-[200px] truncate text-sm font-medium text-ink-800">
                      {product.name}
                    </p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-600">
                  {product.sku || '—'}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-600">{product.category}</td>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-ink-800">
                  {product.stock}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-600">
                  {product.lowStockThreshold ?? '—'}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <InventoryStatusBadge status={stockStatus.label} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-400">
                  {formatDate(product.updatedAt || product.dateAdded)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <button
                    onClick={() => onUpdateStock(product)}
                    className="inline-flex items-center gap-1.5 border border-ink-100 px-3 py-1.5 text-xs font-medium text-ink-600 hover:border-brass-500 hover:text-brass-600"
                  >
                    <RefreshCw size={13} /> Update Stock
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
