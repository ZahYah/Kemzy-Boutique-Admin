import { useEffect, useMemo, useState } from 'react';
import { Loader2, Users } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import CustomersToolbar from '../components/customers/CustomersToolbar';
import CustomersTable from '../components/customers/CustomersTable';
import { customerStatuses } from '../services/customersData';
import { useCustomers } from '../context/CustomersContext';

const PAGE_SIZE = 8;

export default function Customers() {
  const { customers, loading } = useCustomers();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('recent');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, status, sort]);

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = customers.filter((customer) => {
      const matchesSearch =
        !query ||
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || customer.status === status;
      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'orders-desc':
          return b.totalOrders - a.totalOrders;
        case 'spent-desc':
          return b.totalSpent - a.totalSpent;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'newest':
          return new Date(b.registrationDate) - new Date(a.registrationDate);
        case 'oldest':
          return new Date(a.registrationDate) - new Date(b.registrationDate);
        case 'recent':
        default:
          return new Date(b.lastOrderDate || 0) - new Date(a.lastOrderDate || 0);
      }
    });
  }, [customers, search, status, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / PAGE_SIZE));
  const paginatedCustomers = filteredCustomers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetFilters() {
    setSearch('');
    setStatus('all');
  }

  const hasAnyCustomers = customers.length > 0;
  const hasFilteredCustomers = filteredCustomers.length > 0;

  return (
    <div>
      <PageHeader
        title="Customers"
        description="See who is shopping at Kemzy Boutique and their order history."
      />

      <div className="mb-5">
        <CustomersToolbar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          statuses={customerStatuses}
          sort={sort}
          onSortChange={setSort}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center border border-ink-100 bg-white py-24">
          <div className="flex items-center gap-2.5 text-sm text-ink-400">
            <Loader2 size={18} className="animate-spin" />
            Loading customers…
          </div>
        </div>
      ) : !hasAnyCustomers ? (
        <EmptyState
          icon={Users}
          title="No customers yet"
          description="Customer profiles will appear here as people create accounts and place orders."
        />
      ) : !hasFilteredCustomers ? (
        <div className="border border-dashed border-ink-200 bg-white/60 px-6 py-16 text-center">
          <p className="font-display text-lg text-ink-700">No customers match your filters</p>
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
          <CustomersTable customers={paginatedCustomers} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalItems={filteredCustomers.length}
            pageSize={PAGE_SIZE}
          />
        </div>
      )}
    </div>
  );
}
