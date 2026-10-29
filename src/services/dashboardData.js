// Realistic sample data for the dashboard foundation.
// Replace each export with a real API call (see services/api.js) once the
// backend exists — component props are already shaped to make that a
// like-for-like swap.

export const summaryStats = {
  totalSales: {
    value: '₦4,820,500',
    comparison: '+12.4%',
    trend: 'up',
    description: 'vs last month',
  },
  todaysSales: {
    value: '₦186,200',
    comparison: '+8.1%',
    trend: 'up',
    description: 'vs yesterday',
  },
  totalOrders: {
    value: '1,284',
    comparison: '+5.6%',
    trend: 'up',
    description: 'vs last month',
  },
  pendingOrders: {
    value: '23',
    comparison: '-3.2%',
    trend: 'down',
    description: 'awaiting confirmation',
  },
  totalProducts: {
    value: '156',
    comparison: '+4',
    trend: 'up',
    description: 'added this month',
  },
  totalCustomers: {
    value: '892',
    comparison: '+19',
    trend: 'up',
    description: 'new this week',
  },
};

// Last 7 days of sales, ending today.
export const weeklySales = [
  { day: 'Wed', sales: 142000 },
  { day: 'Thu', sales: 168500 },
  { day: 'Fri', sales: 205300 },
  { day: 'Sat', sales: 261900 },
  { day: 'Sun', sales: 198700 },
  { day: 'Mon', sales: 176400 },
  { day: 'Today', sales: 186200 },
];

export const recentOrders = [
  {
    id: 'KB-1042',
    customer: 'Adaeze Chukwu',
    product: 'Ankara Wrap Dress',
    amount: '₦45,000',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    date: 'Sep 15, 2026',
  },
  {
    id: 'KB-1041',
    customer: 'Tunde Bakare',
    product: 'Leather Loafers',
    amount: '₦32,500',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    date: 'Sep 14, 2026',
  },
  {
    id: 'KB-1040',
    customer: 'Ngozi Obi',
    product: 'Silk Blouse',
    amount: '₦28,000',
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
    date: 'Sep 14, 2026',
  },
  {
    id: 'KB-1039',
    customer: 'Kelechi Nwosu',
    product: 'Denim Jacket',
    amount: '₦39,900',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    date: 'Sep 13, 2026',
  },
  {
    id: 'KB-1038',
    customer: 'Bisi Adigun',
    product: 'Suede Ankle Boots',
    amount: '₦52,000',
    paymentStatus: 'Failed',
    orderStatus: 'Cancelled',
    date: 'Sep 13, 2026',
  },
  {
    id: 'KB-1037',
    customer: 'Ifeoma Eze',
    product: 'Sequin Evening Gown',
    amount: '₦68,500',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    date: 'Sep 12, 2026',
  },
];

export const topSellingProducts = [
  { id: 1, name: 'Ankara Wrap Dress', category: 'Dresses', price: '₦45,000', unitsSold: 128 },
  { id: 2, name: 'Leather Loafers', category: 'Footwear', price: '₦32,500', unitsSold: 97 },
  { id: 3, name: 'Silk Blouse', category: 'Tops', price: '₦28,000', unitsSold: 84 },
  { id: 4, name: 'Denim Jacket', category: 'Outerwear', price: '₦39,900', unitsSold: 76 },
  { id: 5, name: 'Suede Ankle Boots', category: 'Footwear', price: '₦52,000', unitsSold: 61 },
];

export const lowStockProducts = [
  { id: 1, name: 'Sequin Evening Gown', category: 'Dresses', unitsLeft: 3, restockLevel: 20 },
  { id: 2, name: 'Classic White Sneakers', category: 'Footwear', unitsLeft: 5, restockLevel: 25 },
  { id: 3, name: 'Tailored Blazer', category: 'Outerwear', unitsLeft: 6, restockLevel: 20 },
  { id: 4, name: 'Kaftan Maxi Dress', category: 'Dresses', unitsLeft: 8, restockLevel: 20 },
];
