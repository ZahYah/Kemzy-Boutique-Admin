// Realistic sample catalogue (clothes + shoes) for the Products page.
// Replace with real API calls once a backend exists — components already
// consume plain product objects, so the swap is a data-source change only.

export const productCategories = [
  'Dresses',
  'Tops',
  'Bottoms',
  'Outerwear',
  'Footwear',
  'Accessories',
  'Clothes',
  'Shoes',
];
export const productStatuses = ['Active', 'Draft', 'Out of Stock', 'Inactive'];

// sku + lowStockThreshold power the Inventory page; updatedAt tracks the
// last time a product's record (including its stock) was changed and
// starts out equal to dateAdded.
export const initialProducts = [
  { id: 'P-001', name: 'Ankara Wrap Dress', category: 'Dresses', price: 45000, stock: 42, status: 'Active', dateAdded: '2026-08-02', updatedAt: '2026-08-02', sku: 'KB-DRS-001', lowStockThreshold: 10 },
  { id: 'P-002', name: 'Silk Blouse', category: 'Tops', price: 28000, stock: 65, status: 'Active', dateAdded: '2026-08-10', updatedAt: '2026-08-10', sku: 'KB-TOP-002', lowStockThreshold: 15 },
  { id: 'P-003', name: 'Denim Jacket', category: 'Outerwear', price: 39900, stock: 30, status: 'Active', dateAdded: '2026-07-15', updatedAt: '2026-07-15', sku: 'KB-OUT-003', lowStockThreshold: 10 },
  { id: 'P-004', name: 'Sequin Evening Gown', category: 'Dresses', price: 68500, stock: 3, status: 'Active', dateAdded: '2026-06-20', updatedAt: '2026-06-20', sku: 'KB-DRS-004', lowStockThreshold: 5 },
  { id: 'P-005', name: 'Kaftan Maxi Dress', category: 'Dresses', price: 52000, stock: 8, status: 'Active', dateAdded: '2026-05-30', updatedAt: '2026-05-30', sku: 'KB-DRS-005', lowStockThreshold: 10 },
  { id: 'P-006', name: 'Tailored Blazer', category: 'Outerwear', price: 47500, stock: 6, status: 'Draft', dateAdded: '2026-09-01', updatedAt: '2026-09-01', sku: 'KB-OUT-006', lowStockThreshold: 10 },
  { id: 'P-007', name: 'High-Waist Trousers', category: 'Bottoms', price: 25000, stock: 54, status: 'Active', dateAdded: '2026-04-18', updatedAt: '2026-04-18', sku: 'KB-BTM-007', lowStockThreshold: 15 },
  { id: 'P-008', name: 'Pleated Midi Skirt', category: 'Bottoms', price: 22500, stock: 40, status: 'Active', dateAdded: '2026-03-22', updatedAt: '2026-03-22', sku: 'KB-BTM-008', lowStockThreshold: 12 },
  { id: 'P-009', name: 'Cropped Cardigan', category: 'Tops', price: 19900, stock: 0, status: 'Out of Stock', dateAdded: '2026-02-14', updatedAt: '2026-02-14', sku: 'KB-TOP-009', lowStockThreshold: 10 },
  { id: 'P-010', name: 'Linen Jumpsuit', category: 'Dresses', price: 36000, stock: 27, status: 'Active', dateAdded: '2026-01-25', updatedAt: '2026-01-25', sku: 'KB-DRS-010', lowStockThreshold: 10 },
  { id: 'P-011', name: 'Statement Silk Scarf', category: 'Accessories', price: 12500, stock: 75, status: 'Active', dateAdded: '2025-12-10', updatedAt: '2025-12-10', sku: 'KB-ACC-011', lowStockThreshold: 20 },
  { id: 'P-012', name: 'Beaded Clutch Bag', category: 'Accessories', price: 33000, stock: 18, status: 'Draft', dateAdded: '2025-11-05', updatedAt: '2025-11-05', sku: 'KB-ACC-012', lowStockThreshold: 10 },
  { id: 'P-013', name: 'Leather Loafers', category: 'Footwear', price: 32500, stock: 22, status: 'Active', dateAdded: '2026-08-15', updatedAt: '2026-08-15', sku: 'KB-SHO-013', lowStockThreshold: 10 },
  { id: 'P-014', name: 'Suede Ankle Boots', category: 'Footwear', price: 52000, stock: 14, status: 'Active', dateAdded: '2026-07-28', updatedAt: '2026-07-28', sku: 'KB-SHO-014', lowStockThreshold: 15 },
  { id: 'P-015', name: 'Classic White Sneakers', category: 'Footwear', price: 29000, stock: 5, status: 'Active', dateAdded: '2026-06-12', updatedAt: '2026-06-12', sku: 'KB-SHO-015', lowStockThreshold: 10 },
  { id: 'P-016', name: 'Strappy Block Heels', category: 'Footwear', price: 37500, stock: 0, status: 'Out of Stock', dateAdded: '2026-05-08', updatedAt: '2026-05-08', sku: 'KB-SHO-016', lowStockThreshold: 10 },
  { id: 'P-017', name: 'Espadrille Wedges', category: 'Footwear', price: 26800, stock: 33, status: 'Active', dateAdded: '2026-04-02', updatedAt: '2026-04-02', sku: 'KB-SHO-017', lowStockThreshold: 10 },
  { id: 'P-018', name: 'Chelsea Rain Boots', category: 'Footwear', price: 41200, stock: 9, status: 'Draft', dateAdded: '2026-02-27', updatedAt: '2026-02-27', sku: 'KB-SHO-018', lowStockThreshold: 10 },
];
