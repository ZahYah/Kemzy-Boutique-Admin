import { Link } from 'react-router-dom';
import { Eye, Pencil, Star, Trash2 } from 'lucide-react';
import ProductThumb from '../ProductThumb';
import ProductStatusBadge from './ProductStatusBadge';

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function ProductsTable({ products, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[880px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink-100 bg-bone-200 text-xs text-ink-400">
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Stock</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Date Added</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-bone-200">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <ProductThumb category={product.category} imageUrl={product.image} />
                  <div className="flex max-w-[220px] items-center gap-1.5">
                    <p className="truncate text-sm font-medium text-ink-800">{product.name}</p>
                    {product.featured && (
                      <Star size={13} className="shrink-0 fill-brass-500 text-brass-500" />
                    )}
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-600">{product.category}</td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-800">
                ₦{product.price.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-600">{product.stock}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <ProductStatusBadge status={product.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-400">
                {formatDate(product.dateAdded)}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <div className="flex items-center justify-end gap-1.5">
                  <Link
                    to={`/admin/products/${product.id}`}
                    aria-label={`View ${product.name}`}
                    className="flex h-8 w-8 items-center justify-center border border-ink-100 text-ink-500 hover:border-brass-500 hover:text-brass-600"
                  >
                    <Eye size={15} />
                  </Link>
                  <Link
                    to={`/admin/products/${product.id}/edit`}
                    aria-label={`Edit ${product.name}`}
                    className="flex h-8 w-8 items-center justify-center border border-ink-100 text-ink-500 hover:border-brass-500 hover:text-brass-600"
                  >
                    <Pencil size={15} />
                  </Link>
                  <button
                    onClick={() => onDelete(product)}
                    aria-label={`Delete ${product.name}`}
                    className="flex h-8 w-8 items-center justify-center border border-ink-100 text-ink-500 hover:border-wine-500 hover:text-wine-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
