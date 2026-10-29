import { Search, Plus } from 'lucide-react';

export default function ProductsToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  status,
  onStatusChange,
  statuses,
  sort,
  onSortChange,
  onAddProduct,
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-xs">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products…"
          className="w-full border border-ink-100 bg-white py-2.5 pl-9 pr-3 text-sm text-ink-700 placeholder:text-ink-300 focus:border-brass-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-700 focus:border-brass-500 focus:outline-none"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-700 focus:border-brass-500 focus:outline-none"
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-700 focus:border-brass-500 focus:outline-none"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="stock-asc">Stock: low to high</option>
          <option value="name-asc">Name: A–Z</option>
        </select>

        <button
          onClick={onAddProduct}
          className="flex items-center gap-2 bg-ink-800 px-4 py-2.5 text-sm font-medium text-bone-100 transition-colors hover:bg-ink-900"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>
    </div>
  );
}
