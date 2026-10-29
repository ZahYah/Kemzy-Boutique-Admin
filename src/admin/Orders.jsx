import { useEffect, useMemo, useState } from 'react';
import { ClipboardList, Loader2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import OrdersToolbar from '../components/orders/OrdersToolbar';
import OrdersTable from '../components/orders/OrdersTable';
import { paymentStatuses, orderStatuses } from '../services/ordersData';
import { useOrders } from '../context/OrdersContext';
import { isWithinDateRange } from '../utils/dateFilter';

const PAGE_SIZE = 8;

export default function Orders() {
  const { orders, loading } = useOrders();

  const [search, setSearch] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [orderStatus, setOrderStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, paymentStatus, orderStatus, dateRange]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = orders.filter((order) => {
      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query);
      const matchesPayment = paymentStatus === 'all' || order.payment.status === paymentStatus;
      const matchesOrderStatus = orderStatus === 'all' || order.orderStatus === orderStatus;
      const matchesDate = isWithinDateRange(order.date, dateRange);
      return matchesSearch && matchesPayment && matchesOrderStatus && matchesDate;
    });

    return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [orders, search, paymentStatus, orderStatus, dateRange]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const paginatedOrders = filteredOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetFilters() {
    setSearch('');
    setPaymentStatus('all');
    setOrderStatus('all');
    setDateRange('all');
  }

  const hasAnyOrders = orders.length > 0;
  const hasFilteredOrders = filteredOrders.length > 0;

  return (
    <div>
      <PageHeader
        title="Orders"
        description="Track and fulfil orders placed by Kemzy Boutique customers."
      />

      <div className="mb-5">
        <OrdersToolbar
          search={search}
          onSearchChange={setSearch}
          paymentStatus={paymentStatus}
          onPaymentStatusChange={setPaymentStatus}
          paymentStatuses={paymentStatuses}
          orderStatus={orderStatus}
          onOrderStatusChange={setOrderStatus}
          orderStatuses={orderStatuses}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center border border-ink-100 bg-white py-24">
          <div className="flex items-center gap-2.5 text-sm text-ink-400">
            <Loader2 size={18} className="animate-spin" />
            Loading orders…
          </div>
        </div>
      ) : !hasAnyOrders ? (
        <EmptyState
          icon={ClipboardList}
          title="No orders yet"
          description="Orders placed on the storefront will land here for you to review and process."
        />
      ) : !hasFilteredOrders ? (
        <div className="border border-dashed border-ink-200 bg-white/60 px-6 py-16 text-center">
          <p className="font-display text-lg text-ink-700">No orders match your filters</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-ink-400">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 border border-ink-800 px-4 py-2 text-sm text-ink-800 hover:bg-ink-800 hover:text-bone-100"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="border border-ink-100 bg-white">
          <OrdersTable orders={paginatedOrders} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalItems={filteredOrders.length}
            pageSize={PAGE_SIZE}
          />
        </div>
      )}
    </div>
  );
}
