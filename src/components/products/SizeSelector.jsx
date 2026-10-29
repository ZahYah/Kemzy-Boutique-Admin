export const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const SHOE_SIZES = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

// Sizes offered depend on the product's category: standard clothing sizes
// for Clothes, Nigerian/European shoe sizes for Shoes.
export default function SizeSelector({ category, selected, onChange, error }) {
  const sizes = category === 'Shoes' ? SHOE_SIZES : CLOTHING_SIZES;

  function toggle(sizeValue) {
    onChange(
      selected.includes(sizeValue)
        ? selected.filter((s) => s !== sizeValue)
        : [...selected, sizeValue]
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((sizeValue) => {
          const active = selected.includes(sizeValue);
          return (
            <button
              key={sizeValue}
              type="button"
              onClick={() => toggle(sizeValue)}
              aria-pressed={active}
              className={`h-10 min-w-[2.75rem] border px-3 text-sm font-medium transition-colors ${
                active
                  ? 'border-ink-800 bg-ink-800 text-bone-100'
                  : 'border-ink-100 text-ink-600 hover:border-ink-300'
              }`}
            >
              {sizeValue}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-xs text-wine-600">{error}</p>}
    </div>
  );
}
