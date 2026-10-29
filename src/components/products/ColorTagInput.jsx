import { useState } from 'react';
import { X } from 'lucide-react';

// Free-text "tag" input for product colors — type a color name and press
// Enter or comma to add it as a chip.
export default function ColorTagInput({ colors, onChange, error }) {
  const [draft, setDraft] = useState('');

  function addColor(value) {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (colors.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      setDraft('');
      return;
    }
    onChange([...colors, trimmed]);
    setDraft('');
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addColor(draft);
    } else if (event.key === 'Backspace' && !draft && colors.length > 0) {
      onChange(colors.slice(0, -1));
    }
  }

  function removeColor(color) {
    onChange(colors.filter((c) => c !== color));
  }

  return (
    <div>
      <div
        className={`flex flex-wrap items-center gap-2 border bg-white p-2.5 ${
          error ? 'border-wine-500' : 'border-ink-100 focus-within:border-brass-500'
        }`}
      >
        {colors.map((color) => (
          <span
            key={color}
            className="flex items-center gap-1.5 bg-bone-200 px-2.5 py-1 text-xs font-medium text-ink-700"
          >
            {color}
            <button
              type="button"
              onClick={() => removeColor(color)}
              aria-label={`Remove ${color}`}
              className="text-ink-400 hover:text-wine-600"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addColor(draft)}
          placeholder={colors.length === 0 ? 'e.g. Burgundy, press Enter to add' : 'Add another…'}
          className="min-w-[140px] flex-1 border-none bg-transparent px-1 py-1 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none"
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-wine-600">{error}</p>}
    </div>
  );
}
