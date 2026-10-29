import { ImagePlus, Star, X } from 'lucide-react';

// Client-side only for now: files are kept as object URLs in memory.
// Swap handleFiles/onRemove for real Supabase Storage uploads later —
// the shape (id, url, isPrimary) stays the same.
export default function ImageUploader({ images, onAdd, onRemove, onSetPrimary, error }) {
  function handleFileChange(event) {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) onAdd(files);
    event.target.value = '';
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {images.map((image) => (
          <div
            key={image.id}
            className={`group relative h-24 w-24 shrink-0 border ${
              image.isPrimary ? 'border-brass-500' : 'border-ink-100'
            }`}
          >
            <img src={image.url} alt="" className="h-full w-full object-cover" />

            <button
              type="button"
              onClick={() => onRemove(image.id)}
              aria-label="Remove image"
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center border border-ink-100 bg-white text-ink-500 hover:border-wine-500 hover:text-wine-600"
            >
              <X size={13} />
            </button>

            <button
              type="button"
              onClick={() => onSetPrimary(image.id)}
              className={`absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 py-1 text-[10px] font-medium transition-colors ${
                image.isPrimary
                  ? 'bg-brass-500 text-white'
                  : 'bg-ink-900/60 text-white opacity-0 group-hover:opacity-100'
              }`}
            >
              <Star size={10} className={image.isPrimary ? 'fill-white' : ''} />
              {image.isPrimary ? 'Primary' : 'Set primary'}
            </button>
          </div>
        ))}

        <label
          className={`flex h-24 w-24 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 border border-dashed text-ink-400 hover:border-brass-500 hover:text-brass-600 ${
            error ? 'border-wine-500' : 'border-ink-200'
          }`}
        >
          <ImagePlus size={20} strokeWidth={1.5} />
          <span className="text-[11px]">Upload</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      {error && <p className="mt-1.5 text-xs text-wine-600">{error}</p>}
    </div>
  );
}
