import { Search } from 'lucide-react';

const DATE_FILTERS = [
  { value: 'all', label: 'All time' },
  { value: 'today', label: 'Today' },
  { value: 'last7', label: 'Last 7 days' },
  { value: 'last30', label: 'Last 30 days' },
];

export default function OrdersToolbar({
  search,
  onSearchChange,
  paymentStatus,
  onPaymentStatusChange,
  paymentStatuses,
  orderStatus,
  onOrderStatusChange,
  orderStatuses,
  dateRange,
  onDateRangeChange,
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
          placeholder="Search orders or customers…"
          className="w-full border border-ink-100 bg-white py-2.5 pl-9 pr-3 text-sm text-ink-700 placeholder:text-ink-300 focus:border-brass-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={paymentStatus}
          onChange={(e) => onPaymentStatusChange(e.target.value)}
          className="border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-700 focus:border-brass-500 focus:outline-none"
        >
          <option value="all">All payment statuses</option>
          {paymentStatuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={orderStatus}
          onChange={(e) => onOrderStatusChange(e.target.value)}
          className="border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-700 focus:border-brass-500 focus:outline-none"
        >
          <option value="all">All order statuses</option>
          {orderStatuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
          className="border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-700 focus:border-brass-500 focus:outline-none"
        >
          {DATE_FILTERS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
