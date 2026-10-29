import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  CreditCard,
  Users,
  Package,
  Tags,
  Settings,
} from 'lucide-react';

export const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Products', path: '/admin/products', icon: ShoppingBag },
  { label: 'Orders', path: '/admin/orders', icon: ClipboardList },
  { label: 'Payments', path: '/admin/payments', icon: CreditCard },
  { label: 'Customers', path: '/admin/customers', icon: Users },
  { label: 'Inventory', path: '/admin/inventory', icon: Package },
  { label: 'Categories', path: '/admin/categories', icon: Tags },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];
