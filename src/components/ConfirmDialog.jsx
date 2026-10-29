import { AlertTriangle, Loader2 } from 'lucide-react';
import Modal from './Modal';

// Generic confirmation dialog — used for destructive actions like deleting
// a product, and reusable anywhere else a yes/no confirmation is needed.
export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal open={open} onClose={onCancel} title={title} maxWidth="max-w-sm">
      <div className="flex gap-3">
        {danger && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-wine-500/40 text-wine-600">
            <AlertTriangle size={18} />
          </span>
        )}
        <p className="text-sm text-ink-600">{description}</p>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onCancel}
          disabled={loading}
          className="border border-ink-200 px-4 py-2 text-sm text-ink-700 hover:bg-bone-200 disabled:opacity-50"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-bone-100 disabled:cursor-not-allowed disabled:opacity-70 ${
            danger ? 'bg-wine-600 hover:bg-wine-700' : 'bg-ink-800 hover:bg-ink-900'
          }`}
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
