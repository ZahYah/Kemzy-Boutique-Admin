export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-ink-200 bg-white/60 px-6 py-20 text-center">
      {Icon && (
        <span className="flex h-12 w-12 items-center justify-center border border-ink-100 text-brass-600">
          <Icon size={20} strokeWidth={1.5} />
        </span>
      )}
      <p className="font-display text-lg text-ink-700">{title}</p>
      <p className="max-w-sm text-sm text-ink-400">{description}</p>
      {action}
    </div>
  );
}
