import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader2, PackageSearch } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import ProductForm from '../components/products/ProductForm';
import { useProducts } from '../context/ProductsContext';

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, editProduct } = useProducts();

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
        <PageHeader title="Edit Product" description="This product could not be found." />
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

  async function handleSubmit(payload) {
    await editProduct(product.id, payload);
    navigate('/admin/products', { replace: true });
  }

  return (
    <div>
      <PageHeader title="Edit Product" description={`Update the listing for "${product.name}".`} />
      <ProductForm
        initialProduct={product}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        savingLabel="Saving…"
      />
    </div>
  );
}
