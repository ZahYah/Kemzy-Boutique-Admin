// Shared by the Product Detail and Inventory pages — the inventory status
// (In Stock / Low Stock / Out of Stock) is always derived from current
// stock vs. the product's low-stock threshold, never stored directly.
export function getStockStatus(stock, lowStockThreshold) {
  if (stock === 0) {
    return { label: 'Out of Stock', tone: 'wine' };
  }
  if (lowStockThreshold != null && stock <= lowStockThreshold) {
    return { label: 'Low Stock', tone: 'brass' };
  }
  return { label: 'In Stock', tone: 'sage' };
}
