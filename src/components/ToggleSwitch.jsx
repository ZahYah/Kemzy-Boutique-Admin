// Generic on/off switch, reusable anywhere a boolean setting needs a
// toggle control (featured flags, active/inactive states, preferences).
export default function ToggleSwitch({ checked, onChange, label, description, id }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start justify-between gap-4">
      <span>
        {label && <span className="block text-sm font-medium text-ink-700">{label}</span>}
        {description && <span className="block text-xs text-ink-400">{description}</span>}
      </span>
      <span className="relative inline-flex shrink-0 items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={`h-6 w-11 rounded-full transition-colors ${
            checked ? 'bg-ink-800' : 'bg-ink-100'
          }`}
        />
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
    </label>
  );
}
