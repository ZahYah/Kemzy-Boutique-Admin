import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Loader2,
  Pencil,
  Trash2,
  Star,
  PackageSearch,
  ShoppingBag,
  Wallet,
  TrendingUp,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import StatCard from '../components/StatCard';
import SalesChart from '../components/SalesChart';
import ConfirmDialog from '../components/ConfirmDialog';
import ProductStatusBadge from '../components/products/ProductStatusBadge';
import ProductGallery from '../components/products/ProductGallery';
import { useProducts } from '../context/ProductsContext';
import { getProductPerformance } from '../services/productPerformanceData';
import { getStockStatus } from '../utils/stockStatus';

const STOCK_TONE_TEXT_CLASS = {
  wine: 'text-wine-600',
  brass: 'text-brass-700',
  sage: 'text-sage-600',
};

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, removeProduct } = useProducts();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center border border-ink-100 bg-white py-24">
        <div className="flex items-center gap-2.5 text-sm text-ink-400">
          <Loader2 size={18} className="animate-spin" />
          Loading product…
        </div>
      </div>
    );
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div>
        <PageHeader title="Product Details" description="This product could not be found." />
        <EmptyState
          icon={PackageSearch}
          title="Product not found"
          description="It may have been deleted, or the link is out of date."
          action={
            <Link
              to="/admin/products"
              className="mt-2 border border-ink-800 px-4 py-2 text-sm text-ink-800 hover:bg-ink-800 hover:text-bone-100"
            >
              Back to Products
            </Link>
          }
        />
      </div>
    );
  }

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : product.image
        ? [{ id: 'primary', url: product.image, isPrimary: true }]
        : [];

  const stockStatus = getStockStatus(product.stock, product.lowStockThreshold);
  const stockState = {
    label: stockStatus.label,
    tone: STOCK_TONE_TEXT_CLASS[stockStatus.tone],
  };

  const performance = getProductPerformance(product);

  async function handleDelete() {
    setDeleting(true);
    await removeProduct(product.id);
    setDeleting(false);
    setConfirmingDelete(false);
    navigate('/admin/products', { replace: true });
  }

  return (
    <div>
      <Link
        to="/admin/products"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-700"
      >
        <ArrowLeft size={15} /> Back to Products
      </Link>

      <PageHeader
        title={product.name}
        description={`${product.category} · SKU ${product.sku || '—'}`}
        action={
          <div className="flex gap-3">
            <Link
              to={`/admin/products/${product.id}/edit`}
              className="flex items-center gap-2 border border-ink-800 px-4 py-2 text-sm font-medium text-ink-800 transition-colors hover:bg-ink-800 hover:text-bone-100"
            >
              <Pencil size={15} /> Edit Product
            </Link>
            <button
              onClick={() => setConfirmingDelete(true)}
              className="flex items-center gap-2 border border-wine-500 px-4 py-2 text-sm font-medium text-wine-600 transition-colors hover:bg-wine-600 hover:text-white"
            >
              <Trash2 size={15} /> Delete Product
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ProductGallery images={images} category={product.category} productName={product.name} />
        </div>

        <div className="lg:col-span-3">
          <div className="border border-ink-100 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-display text-3xl text-ink-800">
                ₦{(product.discountPrice || product.price).toLocaleString()}
              </p>
              {product.discountPrice ? (
                <p className="text-sm text-ink-300 line-through">
                  ₦{product.price.toLocaleString()}
                </p>
              ) : null}
              {product.featured && (
                <span className="flex items-center gap-1 text-xs font-medium text-brass-600">
                  <Star size={13} className="fill-brass-500 text-brass-500" /> Featured
                </span>
              )}
              <ProductStatusBadge status={product.status} />
            </div>

            {product.description && (
              <p className="mt-4 text-sm leading-relaxed text-ink-600">{product.description}</p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink-100 pt-6 sm:grid-cols-3">
              <div>
                <p className="text-xs text-ink-400">Stock</p>
                <p className="mt-1 text-sm text-ink-800">{product.stock} units</p>
              </div>
              <div>
                <p className="text-xs text-ink-400">Low-stock threshold</p>
                <p className="mt-1 text-sm text-ink-800">{product.lowStockThreshold ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-ink-400">Date added</p>
                <p className="mt-1 text-sm text-ink-800">{formatDate(product.dateAdded)}</p>
              </div>
              <div>
                <p className="text-xs text-ink-400">Available sizes</p>
                <p className="mt-1 text-sm text-ink-800">
                  {product.sizes?.length ? product.sizes.join(', ') : '—'}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-ink-400">Available colors</p>
                <p className="mt-1 text-sm text-ink-800">
                  {product.colors?.length ? product.colors.join(', ') : '—'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory */}
      <div className="mt-6 border border-ink-100 bg-white p-5 sm:p-6">
        <h3 className="font-display text-lg text-ink-800">Inventory</h3>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="border border-ink-100 p-4">
            <p className="text-xs text-ink-400">Stock quantity</p>
            <p className="mt-1 font-display text-xl text-ink-800">{product.stock}</p>
          </div>
          <div className="border border-ink-100 p-4">
            <p className="text-xs text-ink-400">Low-stock threshold</p>
            <p className="mt-1 font-display text-xl text-ink-800">
              {product.lowStockThreshold ?? '—'}
            </p>
          </div>
          <div className="border border-ink-100 p-4">
            <p className="text-xs text-ink-400">Stock status</p>
            <p className={`mt-1 font-display text-xl ${stockState.tone}`}>{stockState.label}</p>
          </div>
        </div>
      </div>

      {/* Sales performance */}
      <div className="mt-6">
        <h3 className="mb-3 font-display text-lg text-ink-800">Sales Performance</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard icon={ShoppingBag} label="Units Sold" value={performance.unitsSold} />
          <StatCard
            icon={Wallet}
            label="Revenue Generated"
            value={`₦${performance.revenue.toLocaleString()}`}
          />
          <StatCard
            icon={TrendingUp}
            label="Avg. Order Value"
            value={`₦${(product.discountPrice || product.price).toLocaleString()}`}
          />
        </div>
        <div className="mt-4 border border-ink-100 bg-white p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-ink-700">Sales trend</p>
            <span className="text-xs text-ink-400">Last 7 days</span>
          </div>
          <SalesChart data={performance.last7Days} />
        </div>
      </div>

      <ConfirmDialog
        open={confirmingDelete}
        title="Delete product"
        description={`Are you sure you want to delete "${product.name}"? This can't be undone.`}
        confirmLabel={deleting ? 'Deleting…' : 'Delete'}
        danger
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmingDelete(false)}
      />
    </div>
  );
}
