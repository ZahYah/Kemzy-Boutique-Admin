import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Mail, Phone, ShoppingBag, Wallet, TrendingUp, UserX } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import StatCard from '../components/StatCard';
import CustomerStatusBadge from '../components/customers/CustomerStatusBadge';
import CustomerOrderHistoryTable from '../components/customers/CustomerOrderHistoryTable';
import { useCustomers } from '../context/CustomersContext';

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function initialsOf(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function CustomerDetail() {
  const { id } = useParams();
  const { customers, loading } = useCustomers();

  if (loading) {
    return (
      <div className="flex items-center justify-center border border-ink-100 bg-white py-24">
        <div className="flex items-center gap-2.5 text-sm text-ink-400">
          <Loader2 size={18} className="animate-spin" />
          Loading customer…
        </div>
      </div>
    );
  }

  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return (
      <div>
        <PageHeader title="Customer Details" description="This customer could not be found." />
        <EmptyState
          icon={UserX}
          title="Customer not found"
          description="It may have been removed, or the link is out of date."
          action={
            <Link
              to="/admin/customers"
              className="mt-2 border border-ink-800 px-4 py-2 text-sm text-ink-800 hover:bg-ink-800 hover:text-bone-100"
            >
              Back to Customers
            </Link>
          }
        />
      </div>
    );
  }

  const ordersByDateDesc = [...customer.orders].sort((a, b) => new Date(b.date) - new Date(a.date));
  const recentOrders = ordersByDateDesc.slice(0, 3);
  const averageOrderValue = customer.totalOrders > 0 ? customer.totalSpent / customer.totalOrders : 0;

  return (
    <div>
      <Link
        to="/admin/customers"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-700"
      >
        <ArrowLeft size={15} /> Back to Customers
      </Link>

      {/* Profile */}
      <div className="border border-ink-100 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-ink-100 bg-bone-200 font-display text-lg text-ink-700">
            {initialsOf(customer.name)}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="font-display text-xl text-ink-800">{customer.name}</p>
              <CustomerStatusBadge status={customer.status} />
            </div>
            <p className="mt-1 text-xs text-ink-400">
              Customer since {formatDate(customer.registrationDate)}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 border-t border-ink-100 pt-5 sm:grid-cols-2">
          <div className="flex items-center gap-2.5 text-sm text-ink-700">
            <Mail size={15} className="text-ink-300" /> {customer.email}
          </div>
          <div className="flex items-center gap-2.5 text-sm text-ink-700">
            <Phone size={15} className="text-ink-300" /> {customer.phone}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={ShoppingBag} label="Total Orders" value={customer.totalOrders} />
        <StatCard
          icon={Wallet}
          label="Total Spent"
          value={`₦${customer.totalSpent.toLocaleString()}`}
        />
        <StatCard
          icon={TrendingUp}
          label="Avg. Order Value"
          value={`₦${Math.round(averageOrderValue).toLocaleString()}`}
        />
      </div>

      {/* Recent orders */}
      <div className="mt-6 border border-ink-100 bg-white p-5 sm:p-6">
        <h3 className="mb-4 font-display text-lg text-ink-800">Recent Orders</h3>
        {recentOrders.length > 0 ? (
          <CustomerOrderHistoryTable orders={recentOrders} />
        ) : (
          <p className="text-sm text-ink-400">This customer hasn't placed an order yet.</p>
        )}
      </div>

      {/* Complete order history */}
      <div className="mt-6 border border-ink-100 bg-white p-5 sm:p-6">
        <h3 className="mb-4 font-display text-lg text-ink-800">Order History</h3>
        {ordersByDateDesc.length > 0 ? (
          <CustomerOrderHistoryTable orders={ordersByDateDesc} />
        ) : (
          <p className="text-sm text-ink-400">No orders on record yet.</p>
        )}
      </div>
    </div>
  );
}
