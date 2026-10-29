import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ToggleSwitch from '../ToggleSwitch';
import SizeSelector from './SizeSelector';
import ColorTagInput from './ColorTagInput';
import ImageUploader from './ImageUploader';

const CATEGORY_OPTIONS = ['Clothes', 'Shoes'];

function toCategoryOption(category) {
  return category === 'Shoes' || category === 'Footwear' ? 'Shoes' : 'Clothes';
}

function buildInitialFormState(product) {
  if (!product) {
    return {
      name: '',
      category: 'Clothes',
      description: '',
      price: '',
      discountPrice: '',
      sku: '',
      stock: '',
      lowStockThreshold: '10',
      sizes: [],
      colors: [],
      featured: false,
      isActive: true,
    };
  }

  return {
    name: product.name ?? '',
    category: toCategoryOption(product.category),
    description: product.description ?? '',
    price: product.price != null ? String(product.price) : '',
    discountPrice: product.discountPrice != null ? String(product.discountPrice) : '',
    sku: product.sku ?? '',
    stock: product.stock != null ? String(product.stock) : '',
    lowStockThreshold:
      product.lowStockThreshold != null ? String(product.lowStockThreshold) : '10',
    sizes: product.sizes ?? [],
    colors: product.colors ?? [],
    featured: Boolean(product.featured),
    isActive: product.status !== 'Draft',
  };
}

function buildInitialImages(product) {
  if (!product) return [];
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images.map((img) => ({ ...img }));
  }
  if (product.image) {
    return [{ id: 'existing-primary', url: product.image, isPrimary: true }];
  }
  return [];
}

function FieldLabel({ children, required }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-ink-700">
      {children}
      {required && <span className="text-wine-600"> *</span>}
    </label>
  );
}

function Section({ title, description, children }) {
  return (
    <div className="border border-ink-100 bg-white p-5 sm:p-6">
      <div className="mb-5">
        <h3 className="font-display text-lg text-ink-800">{title}</h3>
        {description && <p className="mt-1 text-sm text-ink-400">{description}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

// Shared by /admin/products/new and /admin/products/:id/edit. The only
// difference between "add" and "edit" is whether `initialProduct` is
// supplied to prefill the fields — everything else (layout, validation,
// design) stays identical between the two flows.
export default function ProductForm({
  initialProduct = null,
  onSubmit,
  cancelTo = '/admin/products',
  submitLabel = 'Save Product',
  savingLabel = 'Saving…',
}) {
  const [form, setForm] = useState(() => buildInitialFormState(initialProduct));
  const [images, setImages] = useState(() => buildInitialImages(initialProduct));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  function handleCategoryChange(nextCategory) {
    setForm((prev) => ({ ...prev, category: nextCategory, sizes: [] }));
    setErrors((prev) => ({ ...prev, category: undefined, sizes: undefined }));
  }

  function handleAddImages(files) {
    const newImages = files.map((file, index) => ({
      id: `${Date.now()}-${index}-${file.name}`,
      url: URL.createObjectURL(file),
      isPrimary: false,
    }));
    setImages((prev) => {
      const merged = [...prev, ...newImages];
      if (merged.length > 0 && !merged.some((img) => img.isPrimary)) {
        merged[0] = { ...merged[0], isPrimary: true };
      }
      return merged;
    });
    setErrors((prev) => (prev.images ? { ...prev, images: undefined } : prev));
  }

  function handleRemoveImage(id) {
    setImages((prev) => {
      const removedWasPrimary = prev.find((img) => img.id === id)?.isPrimary;
      const next = prev.filter((img) => img.id !== id);
      if (removedWasPrimary && next.length > 0) next[0] = { ...next[0], isPrimary: true };
      return next;
    });
  }

  function handleSetPrimaryImage(id) {
    setImages((prev) => prev.map((img) => ({ ...img, isPrimary: img.id === id })));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Product name is required.';
    if (!form.category) next.category = 'Choose a category.';
    if (!form.description.trim() || form.description.trim().length < 20) {
      next.description = 'Add a description of at least 20 characters.';
    }
    if (!form.price || Number(form.price) <= 0) {
      next.price = 'Enter a price greater than 0.';
    }
    if (form.discountPrice) {
      const discount = Number(form.discountPrice);
      if (discount <= 0) next.discountPrice = 'Discount price must be greater than 0.';
      else if (form.price && discount >= Number(form.price)) {
        next.discountPrice = 'Discount price must be lower than the regular price.';
      }
    }
    if (!form.sku.trim()) next.sku = 'SKU is required.';
    if (form.stock === '' || Number(form.stock) < 0) next.stock = 'Enter a valid stock quantity.';
    if (form.lowStockThreshold === '' || Number(form.lowStockThreshold) < 0) {
      next.lowStockThreshold = 'Enter a valid threshold.';
    }
    if (form.sizes.length === 0) next.sizes = 'Select at least one size.';
    if (form.colors.length === 0) next.colors = 'Add at least one color.';
    if (images.length === 0) next.images = 'Upload at least one product image.';
    return next;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);

    const stockValue = Number(form.stock);
    const status = stockValue === 0 ? 'Out of Stock' : form.isActive ? 'Active' : 'Draft';
    const primaryImage = images.find((img) => img.isPrimary) || images[0];

    try {
      await onSubmit({
        name: form.name.trim(),
        category: form.category,
        description: form.description.trim(),
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
        sku: form.sku.trim(),
        stock: stockValue,
        lowStockThreshold: Number(form.lowStockThreshold),
        sizes: form.sizes,
        colors: form.colors,
        featured: form.featured,
        status,
        image: primaryImage?.url ?? null,
        images: images.map(({ id, url, isPrimary }) => ({ id, url, isPrimary })),
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 pb-6">
      <Section title="Basic Information">
        <div>
          <FieldLabel required>Product name</FieldLabel>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            className={`w-full border bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none ${
              errors.name ? 'border-wine-500' : 'border-ink-100 focus:border-brass-500'
            }`}
            placeholder="e.g. Ankara Wrap Dress"
          />
          {errors.name && <p className="mt-1.5 text-xs text-wine-600">{errors.name}</p>}
        </div>

        <div>
          <FieldLabel required>Category</FieldLabel>
          <div className="flex gap-3">
            {CATEGORY_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleCategoryChange(option)}
                aria-pressed={form.category === option}
                className={`flex-1 border px-4 py-2.5 text-sm font-medium transition-colors sm:flex-none sm:px-8 ${
                  form.category === option
                    ? 'border-ink-800 bg-ink-800 text-bone-100'
                    : 'border-ink-100 text-ink-600 hover:border-ink-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {errors.category && <p className="mt-1.5 text-xs text-wine-600">{errors.category}</p>}
        </div>

        <div>
          <FieldLabel required>Description</FieldLabel>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            className={`w-full border bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none ${
              errors.description ? 'border-wine-500' : 'border-ink-100 focus:border-brass-500'
            }`}
            placeholder="Fabric, fit, styling notes — what makes this piece worth featuring."
          />
          {errors.description && (
            <p className="mt-1.5 text-xs text-wine-600">{errors.description}</p>
          )}
        </div>
      </Section>

      <Section title="Pricing">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel required>Price (₦)</FieldLabel>
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => updateField('price', e.target.value)}
              className={`w-full border bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none ${
                errors.price ? 'border-wine-500' : 'border-ink-100 focus:border-brass-500'
              }`}
              placeholder="45000"
            />
            {errors.price && <p className="mt-1.5 text-xs text-wine-600">{errors.price}</p>}
          </div>

          <div>
            <FieldLabel>Discount price (₦)</FieldLabel>
            <input
              type="number"
              min="0"
              value={form.discountPrice}
              onChange={(e) => updateField('discountPrice', e.target.value)}
              className={`w-full border bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none ${
                errors.discountPrice ? 'border-wine-500' : 'border-ink-100 focus:border-brass-500'
              }`}
              placeholder="Optional"
            />
            {errors.discountPrice && (
              <p className="mt-1.5 text-xs text-wine-600">{errors.discountPrice}</p>
            )}
          </div>
        </div>
      </Section>

      <Section title="Inventory">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <FieldLabel required>SKU</FieldLabel>
            <input
              type="text"
              value={form.sku}
              onChange={(e) => updateField('sku', e.target.value)}
              className={`w-full border bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none ${
                errors.sku ? 'border-wine-500' : 'border-ink-100 focus:border-brass-500'
              }`}
              placeholder="e.g. KB-DRS-014"
            />
            {errors.sku && <p className="mt-1.5 text-xs text-wine-600">{errors.sku}</p>}
          </div>

          <div>
            <FieldLabel required>Stock quantity</FieldLabel>
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => updateField('stock', e.target.value)}
              className={`w-full border bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none ${
                errors.stock ? 'border-wine-500' : 'border-ink-100 focus:border-brass-500'
              }`}
              placeholder="20"
            />
            {errors.stock && <p className="mt-1.5 text-xs text-wine-600">{errors.stock}</p>}
          </div>

          <div>
            <FieldLabel required>Low-stock threshold</FieldLabel>
            <input
              type="number"
              min="0"
              value={form.lowStockThreshold}
              onChange={(e) => updateField('lowStockThreshold', e.target.value)}
              className={`w-full border bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none ${
                errors.lowStockThreshold
                  ? 'border-wine-500'
                  : 'border-ink-100 focus:border-brass-500'
              }`}
              placeholder="10"
            />
            {errors.lowStockThreshold && (
              <p className="mt-1.5 text-xs text-wine-600">{errors.lowStockThreshold}</p>
            )}
          </div>
        </div>
      </Section>

      <Section
        title="Product Options"
        description={`Sizes shown depend on the selected category (${form.category}).`}
      >
        <div>
          <FieldLabel required>Sizes</FieldLabel>
          <SizeSelector
            category={form.category}
            selected={form.sizes}
            onChange={(sizes) => updateField('sizes', sizes)}
            error={errors.sizes}
          />
        </div>

        <div>
          <FieldLabel required>Colors</FieldLabel>
          <ColorTagInput
            colors={form.colors}
            onChange={(colors) => updateField('colors', colors)}
            error={errors.colors}
          />
        </div>
      </Section>

      <Section
        title="Images"
        description="The image marked primary is what shows in the catalogue."
      >
        <ImageUploader
          images={images}
          onAdd={handleAddImages}
          onRemove={handleRemoveImage}
          onSetPrimary={handleSetPrimaryImage}
          error={errors.images}
        />
      </Section>

      <Section title="Additional">
        <ToggleSwitch
          id="featured"
          checked={form.featured}
          onChange={(value) => updateField('featured', value)}
          label="Featured product"
          description="Highlight this item in featured collections and the storefront homepage."
        />
        <div className="border-t border-ink-100 pt-5">
          <ToggleSwitch
            id="isActive"
            checked={form.isActive}
            onChange={(value) => updateField('isActive', value)}
            label="Active"
            description="Inactive products are saved as drafts and hidden from the storefront."
          />
        </div>
      </Section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          to={cancelTo}
          className="border border-ink-200 px-5 py-2.5 text-center text-sm text-ink-700 hover:bg-bone-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 bg-ink-800 px-5 py-2.5 text-sm font-medium text-bone-100 hover:bg-ink-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {submitting ? savingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}
