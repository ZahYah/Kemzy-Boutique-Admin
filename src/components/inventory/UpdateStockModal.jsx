import { useEffect, useState } from 'react';
import { Loader2, Minus, Plus } from 'lucide-react';
import Modal from '../Modal';

// Quick stock-quantity editor opened from the Inventory table's "Update
// Stock" action. Calls onSave(newStock) — the caller (Inventory page) is
// responsible for persisting it via ProductsContext.
export default function UpdateStockModal({ product, onClose, onSave }) {
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setStock(String(product.stock));
      setError('');
    }
  }, [product]);

  if (!product) return null;

  function adjust(delta) {
    setStock((prev) => String(Math.max(0, Number(prev || 0) + delta)));
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextStock = Number(stock);

    if (stock === '' || Number.isNaN(nextStock) || nextStock < 0) {
      setError('Enter a valid stock quantity.');
      return;
    }

    setSaving(true);
    await onSave(nextStock);
    setSaving(false);
  }

  return (
    <Modal open={Boolean(product)} onClose={onClose} title="Update Stock" maxWidth="max-w-sm">
      <p className="text-sm text-ink-800">{product.name}</p>
      <p className="text-xs text-ink-400">SKU {product.sku || '—'}</p>

      <form onSubmit={handleSubmit} noValidate className="mt-5">
        <label className="mb-1.5 block text-sm font-medium text-ink-700">Stock quantity</label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => adjust(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink-100 text-ink-500 hover:border-brass-500 hover:text-brass-600"
            aria-label="Decrease stock"
          >
            <Minus size={15} />
          </button>
          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => {
              setStock(e.target.value);
              setError('');
            }}
            className={`w-full border bg-white px-3.5 py-2.5 text-center text-sm text-ink-800 focus:outline-none ${
              error ? 'border-wine-500' : 'border-ink-100 focus:border-brass-500'
            }`}
          />
          <button
            type="button"
            onClick={() => adjust(1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink-100 text-ink-500 hover:border-brass-500 hover:text-brass-600"
            aria-label="Increase stock"
          >
            <Plus size={15} />
          </button>
        </div>
        {error && <p className="mt-1.5 text-xs text-wine-600">{error}</p>}
        <p className="mt-1.5 text-xs text-ink-400">Currently {product.stock} units in stock.</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="border border-ink-200 px-4 py-2 text-sm text-ink-700 hover:bg-bone-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-ink-800 px-4 py-2 text-sm font-medium text-bone-100 hover:bg-ink-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving && <Loader2 size={15} className="animate-spin" />}
            Update Stock
          </button>
        </div>
      </form>
    </Modal>
  );
}
