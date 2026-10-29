// Small labeled-rows card used for the Customer, Delivery and Payment
// panels on the order detail page. `rows` is an array of [label, value]
// pairs — value can be plain text or a small JSX node (e.g. an icon + text,
// or a status badge).
export default function OrderInfoCard({ icon: Icon, title, rows }) {
  return (
    <div className="border border-ink-100 bg-white p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2.5">
        {Icon && (
          <span className="flex h-8 w-8 items-center justify-center border border-ink-100 text-brass-600">
            <Icon size={15} strokeWidth={1.5} />
          </span>
        )}
        <h3 className="font-display text-base text-ink-800">{title}</h3>
      </div>
      <dl className="divide-y divide-ink-100 border-t border-ink-100">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-4 py-2.5 text-sm">
            <dt className="shrink-0 text-ink-400">{label}</dt>
            <dd className="text-right text-ink-800">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
