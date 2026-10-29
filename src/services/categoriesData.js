// Default categories for Kemzy Boutique's catalogue.
// Replace with real API calls once a backend exists — components consume
// plain category objects, so the swap is a data-source change only.

export const categoryStatuses = ['Active', 'Inactive'];

export const initialCategories = [
  { id: 'CAT-001', name: 'Clothes', status: 'Active', dateCreated: '2025-06-01', isDefault: true },
  { id: 'CAT-002', name: 'Shoes', status: 'Active', dateCreated: '2025-06-01', isDefault: true },
];
