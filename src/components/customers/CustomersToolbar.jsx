import { Search } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'recent', label: 'Last order: most recent' },
  { value: 'orders-desc', label: 'Most orders' },
  { value: 'spent-desc', label: 'Highest spent' },
  { value: 'name-asc', label: 'Name: A–Z' },
  { value: 'newest', label: 'Newest registered' },
  { value: 'oldest', label: 'Oldest registered' },
];

export default function CustomersToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  statuses,
  sort,
  onSortChange,
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
          placeholder="Search name, email or phone…"
          className="w-full border border-ink-100 bg-white py-2.5 pl-9 pr-3 text-sm text-ink-700 placeholder:text-ink-300 focus:border-brass-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
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
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
