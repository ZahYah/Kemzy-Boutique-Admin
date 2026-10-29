import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Modal from '../Modal';

const emptyForm = { name: '', status: 'Active' };

// Shared by both "Add Category" and "Edit Category" — the only difference
// is whether `category` is supplied to prefill the form.
export default function CategoryFormModal({
  open,
  mode = 'add',
  category,
  existingNames,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(category ? { name: category.name, status: category.status } : emptyForm);
      setError('');
    }
  }, [open, category]);

  function validate() {
    const trimmed = form.name.trim();
    if (!trimmed) return 'Category name is required.';
    const isDuplicate = existingNames.some(
      (n) =>
        n.toLowerCase() === trimmed.toLowerCase() &&
        n.toLowerCase() !== (category?.name || '').toLowerCase()
    );
    if (isDuplicate) return 'A category with this name already exists.';
    return '';
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    Promise.resolve(onSubmit({ name: form.name.trim(), status: form.status })).finally(() =>
      setSubmitting(false)
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === 'edit' ? 'Edit category' : 'Add category'}
      maxWidth="max-w-sm"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Category name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, name: e.target.value }));
              setError('');
            }}
            className={`w-full border bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none ${
              error ? 'border-wine-500' : 'border-ink-100 focus:border-brass-500'
            }`}
            placeholder="e.g. Accessories"
          />
          {error && <p className="mt-1.5 text-xs text-wine-600">{error}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
            className="w-full border border-ink-100 bg-white px-3.5 py-2.5 text-sm text-ink-800 focus:border-brass-500 focus:outline-none"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="border border-ink-200 px-4 py-2 text-sm text-ink-700 hover:bg-bone-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 bg-ink-800 px-4 py-2 text-sm font-medium text-bone-100 hover:bg-ink-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting && <Loader2 size={15} className="animate-spin" />}
            {mode === 'edit' ? 'Save changes' : 'Add category'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
