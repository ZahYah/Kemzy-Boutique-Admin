import { Pencil, Power, Trash2 } from 'lucide-react';
import CategoryStatusBadge from './CategoryStatusBadge';

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function CategoriesTable({ categories, onEdit, onToggleStatus, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink-100 bg-bone-200 text-xs text-ink-400">
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Products</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Date Created</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-bone-200">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-ink-800">
                {category.name}
                {category.isDefault && (
                  <span className="ml-2 text-xs font-normal text-ink-300">Default</span>
                )}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-600">{category.productCount}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <CategoryStatusBadge status={category.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-400">
                {formatDate(category.dateCreated)}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => onEdit(category)}
                    aria-label={`Edit ${category.name}`}
                    className="flex h-8 w-8 items-center justify-center border border-ink-100 text-ink-500 hover:border-brass-500 hover:text-brass-600"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onToggleStatus(category)}
                    aria-label={
                      category.status === 'Active'
                        ? `Deactivate ${category.name}`
                        : `Activate ${category.name}`
                    }
                    title={category.status === 'Active' ? 'Deactivate' : 'Activate'}
                    className="flex h-8 w-8 items-center justify-center border border-ink-100 text-ink-500 hover:border-brass-500 hover:text-brass-600"
                  >
                    <Power size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(category)}
                    disabled={category.isDefault}
                    aria-label={`Delete ${category.name}`}
                    title={category.isDefault ? "Default categories can't be deleted" : 'Delete'}
                    className="flex h-8 w-8 items-center justify-center border border-ink-100 text-ink-500 hover:border-wine-500 hover:text-wine-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink-100 disabled:hover:text-ink-500"
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
