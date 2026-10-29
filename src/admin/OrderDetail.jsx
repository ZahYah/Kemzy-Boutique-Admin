import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Mail, Phone, User, MapPin, CreditCard, PackageSearch } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import OrderInfoCard from '../components/orders/OrderInfoCard';
import OrderItemsTable from '../components/orders/OrderItemsTable';
import OrderSummary from '../components/orders/OrderSummary';
import OrderTimeline from '../components/orders/OrderTimeline';
import OrderStatusUpdater from '../components/orders/OrderStatusUpdater';
import PaymentStatusBadge from '../components/PaymentStatusBadge';
import { orderStatuses } from '../services/ordersData';
import { useOrders } from '../context/OrdersContext';

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function OrderDetail() {
  const { id } = useParams();
  const { orders, loading, updateOrderStatus } = useOrders();

  if (loading) {
    return (
      <div className="flex items-center justify-center border border-ink-100 bg-white py-24">
        <div className="flex items-center gap-2.5 text-sm text-ink-400">
          <Loader2 size={18} className="animate-spin" />
          Loading order…
        </div>
      </div>
    );
  }

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div>
        <PageHeader title="Order Details" description="This order could not be found." />
        <EmptyState
          icon={PackageSearch}
          title="Order not found"
          description="It may have been removed, or the link is out of date."
          action={
            <Link
              to="/admin/orders"
              className="mt-2 border border-ink-800 px-4 py-2 text-sm text-ink-800 hover:bg-ink-800 hover:text-bone-100"
            >
              Back to Orders
            </Link>
          }
        />
      </div>
    );
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + order.deliveryFee;

  return (
    <div>
      <Link
        to="/admin/orders"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-700"
      >
        <ArrowLeft size={15} /> Back to Orders
      </Link>

      <PageHeader
        title={`Order #${order.id}`}
        description={`Placed on ${formatDate(order.date)} by ${order.customer.name}`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h3 className="mb-3 font-display text-lg text-ink-800">Order Items</h3>
            <OrderItemsTable items={order.items} />
          </div>

          <OrderSummary subtotal={subtotal} deliveryFee={order.deliveryFee} total={total} />

          <div className="border border-ink-100 bg-white p-5 sm:p-6">
            <h3 className="mb-4 font-display text-lg text-ink-800">Order Timeline</h3>
            <div className="mb-6 border-b border-ink-100 pb-5">
              <OrderStatusUpdater
                status={order.orderStatus}
                statuses={orderStatuses}
                onUpdate={(next) => updateOrderStatus(order.id, next)}
              />
            </div>
            <OrderTimeline orderStatus={order.orderStatus} />
          </div>
        </div>

        <div className="space-y-6">
          <OrderInfoCard
            icon={User}
            title="Customer"
            rows={[
              ['Name', order.customer.name],
              [
                'Phone',
                <span key="phone" className="inline-flex items-center gap-1.5">
                  <Phone size={13} className="text-ink-300" /> {order.customer.phone}
                </span>,
              ],
              [
                'Email',
                <span key="email" className="inline-flex items-center gap-1.5">
                  <Mail size={13} className="text-ink-300" /> {order.customer.email}
                </span>,
              ],
            ]}
          />

          <OrderInfoCard
            icon={MapPin}
            title="Delivery"
            rows={[
              ['Address', order.delivery.address],
              ['City', order.delivery.city],
              ['State', order.delivery.state],
            ]}
          />

          <OrderInfoCard
            icon={CreditCard}
            title="Payment"
            rows={[
              ['Reference', order.payment.reference],
              ['Method', order.payment.method],
              ['Amount', `₦${total.toLocaleString()}`],
              ['Status', <PaymentStatusBadge key="status" status={order.payment.status} />],
            ]}
          />
        </div>
      </div>
    </div>
  );
}
