import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ProductForm from '../components/products/ProductForm';
import { useProducts } from '../context/ProductsContext';

export default function ProductNew() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  async function handleSubmit(payload) {
    await addProduct(payload);
    navigate('/admin/products', { replace: true });
  }

  return (
    <div>
      <PageHeader
        title="Add Product"
        description="Create a new clothing or footwear listing for Kemzy Boutique."
      />
      <ProductForm onSubmit={handleSubmit} submitLabel="Save Product" savingLabel="Saving…" />
    </div>
  );
}
