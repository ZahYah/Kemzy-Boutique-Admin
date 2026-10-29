import { useState } from 'react';
import { getCategoryIcon } from '../ProductThumb';

// Large hero image with a clickable thumbnail strip. Falls back to a
// category icon when the product has no uploaded images yet.
export default function ProductGallery({ images, category, productName }) {
  const primaryIndex = images.findIndex((img) => img.isPrimary);
  const [activeIndex, setActiveIndex] = useState(primaryIndex === -1 ? 0 : primaryIndex);

  const Icon = getCategoryIcon(category);
  const activeImage = images[activeIndex];

  return (
    <div>
      <div className="flex aspect-square w-full items-center justify-center border border-ink-100 bg-bone-200">
        {activeImage ? (
          <img src={activeImage.url} alt={productName} className="h-full w-full object-cover" />
        ) : (
          <Icon size={56} strokeWidth={1} className="text-ink-300" />
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={`h-16 w-16 shrink-0 border ${
                index === activeIndex ? 'border-brass-500' : 'border-ink-100'
              }`}
            >
              <img src={image.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
