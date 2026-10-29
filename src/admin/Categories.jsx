import { useMemo, useState } from 'react';
import { Loader2, Plus, Tags } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import CategoriesTable from '../components/categories/CategoriesTable';
import CategoryFormModal from '../components/categories/CategoryFormModal';
import { useCategories } from '../context/CategoriesContext';
import { useProducts } from '../context/ProductsContext';
import { isShoeCategory } from '../components/ProductThumb';

function countProductsForCategory(categoryName, products) {
  if (categoryName === 'Clothes') {
    return products.filter((p) => !isShoeCategory(p.category)).length;
  }
  if (categoryName === 'Shoes') {
    return products.filter((p) => isShoeCategory(p.category)).length;
  }
  return products.filter((p) => p.category === categoryName).length;
}

export default function Categories() {
  const { categories, loading, addCategory, editCategory, removeCategory } = useCategories();
  const { products } = useProducts();

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const categoriesWithCounts = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        productCount: countProductsForCategory(category.name, products),
      })),
    [categories, products]
  );

  function openAddForm() {
    setFormMode('add');
    setEditingCategory(null);
    setFormOpen(true);
  }

  function openEditForm(category) {
    setFormMode('edit');
    setEditingCategory(category);
    setFormOpen(true);
  }

  async function handleFormSubmit(values) {
    if (formMode === 'edit' && editingCategory) {
      await editCategory(editingCategory.id, values);
    } else {
      await addCategory(values);
    }
    setFormOpen(false);
    setEditingCategory(null);
  }

  async function handleToggleStatus(category) {
    await editCategory(category.id, {
      status: category.status === 'Active' ? 'Inactive' : 'Active',
    });
  }

  async function handleConfirmDelete() {
    setIsDeleting(true);
    await removeCategory(deletingCategory.id);
    setIsDeleting(false);
    setDeletingCategory(null);
  }

  const deleteDescription = (() => {
    if (!deletingCategory) return '';
    const count = countProductsForCategory(deletingCategory.name, products);
    if (count > 0) {
      return `"${deletingCategory.name}" has ${count} product${count === 1 ? '' : 's'} assigned to it. Deleting this category won't delete those products, but they'll no longer have a matching category. This can't be undone.`;
    }
    return `Are you sure you want to delete "${deletingCategory.name}"? This can't be undone.`;
  })();

  return (
    <div>
      <PageHeader
        title="Categories"
        description="Organise the catalogue into clothing and footwear collections."
        action={
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 bg-ink-800 px-4 py-2.5 text-sm font-medium text-bone-100 transition-colors hover:bg-ink-900"
          >
            <Plus size={16} /> Add Category
          </button>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center border border-ink-100 bg-white py-24">
          <div className="flex items-center gap-2.5 text-sm text-ink-400">
            <Loader2 size={18} className="animate-spin" />
            Loading categories…
          </div>
        </div>
      ) : categoriesWithCounts.length === 0 ? (
        <EmptyState
          icon={Tags}
          title="No categories yet"
          description="Group products into categories like dresses, footwear and accessories."
        />
      ) : (
        <div className="border border-ink-100 bg-white">
          <CategoriesTable
            categories={categoriesWithCounts}
            onEdit={openEditForm}
            onToggleStatus={handleToggleStatus}
            onDelete={setDeletingCategory}
          />
        </div>
      )}

      <CategoryFormModal
        open={formOpen}
        mode={formMode}
        category={editingCategory}
        existingNames={categories.map((c) => c.name)}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        open={Boolean(deletingCategory)}
        title="Delete category"
        description={deleteDescription}
        confirmLabel={isDeleting ? 'Deleting…' : 'Delete'}
        danger
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingCategory(null)}
      />
    </div>
  );
}
