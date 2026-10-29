import { AlertTriangle } from 'lucide-react';

export default function LowStockProducts({ products }) {
  return (
    <div className="divide-y divide-ink-100 border border-ink-100 bg-white">
      {products.map((product) => {
        const critical = product.unitsLeft <= 5;
        const percent = Math.min(100, Math.round((product.unitsLeft / product.restockLevel) * 100));

        return (
          <div key={product.id} className="px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink-800">{product.name}</p>
                <p className="text-xs text-ink-400">{product.category}</p>
              </div>
              <span
                className={`flex items-center gap-1.5 whitespace-nowrap text-xs font-medium ${
                  critical ? 'text-wine-600' : 'text-brass-700'
                }`}
              >
                <AlertTriangle size={14} />
                {product.unitsLeft} left
              </span>
            </div>
            <div className="mt-2.5 h-1.5 w-full bg-bone-300">
              <div
                className={`h-1.5 ${critical ? 'bg-wine-500' : 'bg-brass-500'}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
