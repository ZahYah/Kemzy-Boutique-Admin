import {
  Wallet,
  TrendingUp as SalesIcon,
  ShoppingCart,
  Clock,
  ShoppingBag,
  Users,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import QuickActions from '../components/QuickActions';
import SalesChart from '../components/SalesChart';
import RecentOrdersTable from '../components/RecentOrdersTable';
import TopSellingProducts from '../components/TopSellingProducts';
import LowStockProducts from '../components/LowStockProducts';
import {
  summaryStats,
  weeklySales,
  recentOrders,
  topSellingProducts,
  lowStockProducts,
} from '../services/dashboardData';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h2 className="font-display text-2xl text-ink-800">Good morning, Admin</h2>
        <p className="mt-1 text-sm text-ink-400">
          Here's what's happening with Kemzy Boutique today.
        </p>
      </div>

      <QuickActions />

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={Wallet} label="Total Sales" {...summaryStats.totalSales} />
        <StatCard icon={SalesIcon} label="Today's Sales" {...summaryStats.todaysSales} />
        <StatCard icon={ShoppingCart} label="Total Orders" {...summaryStats.totalOrders} />
        <StatCard icon={Clock} label="Pending Orders" {...summaryStats.pendingOrders} />
        <StatCard icon={ShoppingBag} label="Total Products" {...summaryStats.totalProducts} />
        <StatCard icon={Users} label="Total Customers" {...summaryStats.totalCustomers} />
      </div>

      {/* Sales overview */}
      <div className="border border-ink-100 bg-white p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg text-ink-800">Sales Overview</h3>
          <span className="text-xs text-ink-400">Last 7 days</span>
        </div>
        <SalesChart data={weeklySales} />
      </div>

      {/* Recent orders */}
      <div>
        <h3 className="mb-3 font-display text-lg text-ink-800">Recent Orders</h3>
        <RecentOrdersTable orders={recentOrders} />
      </div>

      {/* Top selling + low stock */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 font-display text-lg text-ink-800">Top Selling Products</h3>
          <TopSellingProducts products={topSellingProducts} />
        </div>
        <div>
          <h3 className="mb-3 font-display text-lg text-ink-800">Low Stock Products</h3>
          <LowStockProducts products={lowStockProducts} />
        </div>
      </div>
    </div>
  );
}
