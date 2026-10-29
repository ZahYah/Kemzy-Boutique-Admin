// Deterministic mock sales performance for the product detail page.
// Derived from the product itself (not random per render) so the same
// product always shows the same numbers. Replace with a real analytics
// query once one exists — callers only depend on the shape returned here.

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];

function hashString(value = '') {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 100000;
  }
  return hash;
}

export function getProductPerformance(product) {
  const unitPrice = product.discountPrice || product.price || 1;
  const seed = hashString(`${product.id}-${product.name}`);
  const dailyBase = 2 + (seed % 6); // 2–7 units/day baseline

  const last7Days = DAY_LABELS.map((day, index) => {
    const variance = ((seed >> index) % 5) - 2; // roughly -2..2
    const units = Math.max(0, dailyBase + variance);
    return { day, sales: units * unitPrice };
  });

  const unitsSold =
    Math.round(last7Days.reduce((sum, d) => sum + d.sales / unitPrice, 0)) * 5 + dailyBase * 10;
  const revenue = unitsSold * unitPrice;

  return { unitsSold, revenue, last7Days };
}
