export default function PageHeader({ title, description, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-ink-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-display text-2xl text-ink-800">{title}</h2>
        {description && <p className="mt-1 max-w-xl text-sm text-ink-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}
