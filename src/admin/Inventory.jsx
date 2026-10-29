import { useMemo, useState } from 'react';
import { Boxes, CheckCircle2, Clock, Loader2, XCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import StatCard from '../components/StatCard';
import InventoryToolbar from '../components/inventory/InventoryToolbar';
import InventoryTable from '../components/inventory/InventoryTable';
import UpdateStockModal from '../components/inventory/UpdateStockModal';
import { productCategories } from '../services/productsData';
import { useProducts } from '../context/ProductsContext';
import { getStockStatus } from '../utils/stockStatus';

// A restock from zero clears the auto "Out of Stock" state; any other
// status (Active/Draft) is left as the admin set it elsewhere.
function statusAfterStockChange(currentStatus, newStock) {
  if (newStock === 0) return 'Out of Stock';
  if (currentStatus === 'Out of Stock') return 'Active';
  return currentStatus;
}

export default function Inventory() {
  const { products, loading, editProduct } = useProducts();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [updatingProduct, setUpdatingProduct] = useState(null);

  const stats = useMemo(() => {
    const counts = { inStock: 0, lowStock: 0, outOfStock: 0 };
    products.forEach((p) => {
      const { label } = getStockStatus(p.stock, p.lowStockThreshold);
      if (label === 'Low Stock') counts.lowStock += 1;
      else if (label === 'Out of Stock') counts.outOfStock += 1;
      else counts.inStock += 1;
    });
    return { total: products.length, ...counts };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products
      .filter((p) => {
        const matchesSearch =
          !query ||
          p.name.toLowerCase().includes(query) ||
          (p.sku || '').toLowerCase().includes(query);
        const matchesCategory = category === 'all' || p.category === category;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a.stock - b.stock);
  }, [products, search, category]);

  async function handleSaveStock(newStock) {
    const status = statusAfterStockChange(updatingProduct.status, newStock);
    await editProduct(updatingProduct.id, { stock: newStock, status });
    setUpdatingProduct(null);
  }

  function resetFilters() {
    setSearch('');
    setCategory('all');
  }

  const hasAnyProducts = products.length > 0;
  const hasFilteredProducts = filteredProducts.length > 0;

  return (
    <div>
      <PageHeader
        title="Inventory"
        description="Track stock levels across sizes, colours and styles."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Boxes} label="Total Products" value={stats.total} />
        <StatCard icon={CheckCircle2} label="In Stock" value={stats.inStock} />
        <StatCard icon={Clock} label="Low Stock" value={stats.lowStock} />
        <StatCard icon={XCircle} label="Out of Stock" value={stats.outOfStock} />
      </div>

      <div className="mb-5">
        <InventoryToolbar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          categories={productCategories}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center border border-ink-100 bg-white py-24">
          <div className="flex items-center gap-2.5 text-sm text-ink-400">
            <Loader2 size={18} className="animate-spin" />
            Loading inventory…
          </div>
        </div>
      ) : !hasAnyProducts ? (
        <EmptyState
          icon={Boxes}
          title="No products yet"
          description="Stock counts for every clothing and shoe variant will be tracked here once products are added."
        />
      ) : !hasFilteredProducts ? (
        <div className="border border-dashed border-ink-200 bg-white/60 px-6 py-16 text-center">
          <p className="font-display text-lg text-ink-700">No products match your filters</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-ink-400">
            Try adjusting your search or category filter.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 border border-ink-800 px-4 py-2 text-sm text-ink-800 hover:bg-ink-800 hover:text-bone-100"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="border border-ink-100 bg-white">
          <InventoryTable products={filteredProducts} onUpdateStock={setUpdatingProduct} />
        </div>
      )}

      <UpdateStockModal
        product={updatingProduct}
        onClose={() => setUpdatingProduct(null)}
        onSave={handleSaveStock}
      />
    </div>
  );
}
