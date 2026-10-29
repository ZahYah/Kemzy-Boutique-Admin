import { useEffect, useMemo, useState } from 'react';
import {
  CreditCard,
  Loader2,
  Wallet,
  CalendarClock,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import StatCard from '../components/StatCard';
import PaymentsToolbar from '../components/payments/PaymentsToolbar';
import PaymentsTable from '../components/payments/PaymentsTable';
import PaymentDetailModal from '../components/payments/PaymentDetailModal';
import { paymentStatuses } from '../services/paymentsData';
import { usePayments } from '../context/PaymentsContext';
import { isWithinDateRange } from '../utils/dateFilter';
import { isWithinAmountRange } from '../utils/amountFilter';

const PAGE_SIZE = 8;

function isToday(dateValue) {
  const date = new Date(dateValue);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export default function Payments() {
  const { payments, loading } = usePayments();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [amountRange, setAmountRange] = useState('all');
  const [page, setPage] = useState(1);
  const [viewingPayment, setViewingPayment] = useState(null);

  useEffect(() => {
    setPage(1);
  }, [search, status, dateRange, amountRange]);

  const stats = useMemo(() => {
    const totalRevenue = payments
      .filter((p) => p.status === 'Paid')
      .reduce((sum, p) => sum + p.amount, 0);
    const todaysRevenue = payments
      .filter((p) => p.status === 'Paid' && isToday(p.date))
      .reduce((sum, p) => sum + p.amount, 0);

    const countByStatus = (status) => payments.filter((p) => p.status === status).length;

    return {
      totalRevenue,
      todaysRevenue,
      successful: countByStatus('Paid'),
      pending: countByStatus('Pending'),
      failed: countByStatus('Failed'),
      refunded: countByStatus('Refunded'),
    };
  }, [payments]);

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = payments.filter((payment) => {
      const matchesSearch =
        !query ||
        payment.transactionId.toLowerCase().includes(query) ||
        payment.orderId.toLowerCase().includes(query) ||
        payment.customer.name.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || payment.status === status;
      const matchesDate = isWithinDateRange(payment.date, dateRange);
      const matchesAmount = isWithinAmountRange(payment.amount, amountRange);
      return matchesSearch && matchesStatus && matchesDate && matchesAmount;
    });

    return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [payments, search, status, dateRange, amountRange]);

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / PAGE_SIZE));
  const paginatedPayments = filteredPayments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetFilters() {
    setSearch('');
    setStatus('all');
    setDateRange('all');
    setAmountRange('all');
  }

  const hasAnyPayments = payments.length > 0;
  const hasFilteredPayments = filteredPayments.length > 0;

  return (
    <div>
      <PageHeader
        title="Payments"
        description="Review transactions collected across Kemzy Boutique orders."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={Wallet} label="Total Revenue" value={`₦${stats.totalRevenue.toLocaleString()}`} />
        <StatCard
          icon={CalendarClock}
          label="Today's Revenue"
          value={`₦${stats.todaysRevenue.toLocaleString()}`}
        />
        <StatCard icon={CheckCircle2} label="Successful Payments" value={stats.successful} />
        <StatCard icon={Clock} label="Pending Payments" value={stats.pending} />
        <StatCard icon={XCircle} label="Failed Payments" value={stats.failed} />
        <StatCard icon={RotateCcw} label="Refunded Payments" value={stats.refunded} />
      </div>

      <div className="mb-5">
        <PaymentsToolbar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          statuses={paymentStatuses}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          amountRange={amountRange}
          onAmountRangeChange={setAmountRange}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center border border-ink-100 bg-white py-24">
          <div className="flex items-center gap-2.5 text-sm text-ink-400">
            <Loader2 size={18} className="animate-spin" />
            Loading payments…
          </div>
        </div>
      ) : !hasAnyPayments ? (
        <EmptyState
          icon={CreditCard}
          title="No transactions yet"
          description="Payments collected from orders will be listed here once sales start coming in."
        />
      ) : !hasFilteredPayments ? (
        <div className="border border-dashed border-ink-200 bg-white/60 px-6 py-16 text-center">
          <p className="font-display text-lg text-ink-700">No transactions match your filters</p>
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
          <PaymentsTable payments={paginatedPayments} onView={setViewingPayment} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalItems={filteredPayments.length}
            pageSize={PAGE_SIZE}
          />
        </div>
      )}

      <PaymentDetailModal payment={viewingPayment} onClose={() => setViewingPayment(null)} />
    </div>
  );
}
