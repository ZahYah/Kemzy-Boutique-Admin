import { Footprints, Shirt } from 'lucide-react';

const SHOE_CATEGORIES = new Set(['Footwear', 'Shoes']);

export function isShoeCategory(category) {
  return SHOE_CATEGORIES.has(category);
}

export function getCategoryIcon(category) {
  return isShoeCategory(category) ? Footprints : Shirt;
}

// Placeholder product thumbnail — renders a real image once one is
// uploaded (imageUrl), otherwise falls back to a category icon.
export default function ProductThumb({ category, imageUrl, size = 'md' }) {
  const Icon = getCategoryIcon(category);
  const dimension = size === 'lg' ? 'h-16 w-16' : 'h-12 w-12';

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt=""
        className={`${dimension} shrink-0 border border-ink-100 object-cover`}
      />
    );
  }

  return (
    <span
      className={`flex ${dimension} shrink-0 items-center justify-center border border-ink-100 bg-bone-200 text-ink-400`}
    >
      <Icon size={size === 'lg' ? 26 : 20} strokeWidth={1.5} />
    </span>
  );
}
