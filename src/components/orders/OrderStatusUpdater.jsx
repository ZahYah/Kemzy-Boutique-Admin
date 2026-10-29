import { useState } from 'react';
import { Loader2 } from 'lucide-react';

// Lets the admin change an order's status inline. Saves immediately on
// change and shows a brief spinner while the (mock) update is in flight.
export default function OrderStatusUpdater({ status, statuses, onUpdate }) {
  const [saving, setSaving] = useState(false);

  async function handleChange(event) {
    const next = event.target.value;
    if (next === status) return;
    setSaving(true);
    await onUpdate(next);
    setSaving(false);
  }

  return (
    <div className="flex items-center gap-2.5">
      <select
        value={status}
        onChange={handleChange}
        disabled={saving}
        className="border border-ink-100 bg-white px-3 py-2 text-sm text-ink-700 focus:border-brass-500 focus:outline-none disabled:opacity-60"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      {saving && <Loader2 size={16} className="animate-spin text-ink-400" />}
    </div>
  );
}
