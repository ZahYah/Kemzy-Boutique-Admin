import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ShoppingBag } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import ConfirmDialog from '../components/ConfirmDialog';
import ProductsToolbar from '../components/products/ProductsToolbar';
import ProductsTable from '../components/products/ProductsTable';
import { productCategories, productStatuses } from '../services/productsData';
import { useProducts } from '../context/ProductsContext';

const PAGE_SIZE = 8;

export default function Products() {
  const navigate = useNavigate();
  const { products, loading, removeProduct } = useProducts();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const [deletingProduct, setDeletingProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [search, category, status, sort]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesCategory = category === 'all' || p.category === category;
      const matchesStatus = status === 'all' || p.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return new Date(a.dateAdded) - new Date(b.dateAdded);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'stock-asc':
          return a.stock - b.stock;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
    });
  }, [products, search, category, status, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const paginatedProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function handleConfirmDelete() {
    setIsDeleting(true);
    await removeProduct(deletingProduct.id);
    setIsDeleting(false);
    setDeletingProduct(null);
  }

  function resetFilters() {
    setSearch('');
    setCategory('all');
    setStatus('all');
  }

  const hasAnyProducts = products.length > 0;
  const hasFilteredProducts = filteredProducts.length > 0;

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage the clothing and footwear catalogue for Kemzy Boutique."
      />

      <div className="mb-5">
        <ProductsToolbar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          categories={productCategories}
          status={status}
          onStatusChange={setStatus}
          statuses={productStatuses}
          sort={sort}
          onSortChange={setSort}
          onAddProduct={() => navigate('/admin/products/new')}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center border border-ink-100 bg-white py-24">
          <div className="flex items-center gap-2.5 text-sm text-ink-400">
            <Loader2 size={18} className="animate-spin" />
            Loading products…
          </div>
        </div>
      ) : !hasAnyProducts ? (
        <EmptyState
          icon={ShoppingBag}
          title="No products yet"
          description="Add your first clothing or footwear item to start building the catalogue."
        />
      ) : !hasFilteredProducts ? (
        <div className="border border-dashed border-ink-200 bg-white/60 px-6 py-16 text-center">
          <p className="font-display text-lg text-ink-700">No products match your filters</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-ink-400">
            Try adjusting your search or filters to find what you're looking for.
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
          <ProductsTable
            products={paginatedProducts}
            onDelete={setDeletingProduct}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalItems={filteredProducts.length}
            pageSize={PAGE_SIZE}
          />
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deletingProduct)}
        title="Delete product"
        description={
          deletingProduct
            ? `Are you sure you want to delete "${deletingProduct.name}"? This can't be undone.`
            : ''
        }
        confirmLabel={isDeleting ? 'Deleting…' : 'Delete'}
        danger
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingProduct(null)}
      />
    </div>
  );
}
