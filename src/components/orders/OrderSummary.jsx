export default function OrderSummary({ subtotal, deliveryFee, total }) {
  return (
    <div className="border border-ink-100 bg-white p-5 sm:p-6">
      <h3 className="mb-4 font-display text-lg text-ink-800">Order Summary</h3>
      <div className="space-y-2.5 text-sm">
        <div className="flex items-center justify-between">
          <p className="text-ink-400">Subtotal</p>
          <p className="text-ink-800">₦{subtotal.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-ink-400">Delivery fee</p>
          <p className="text-ink-800">₦{deliveryFee.toLocaleString()}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-3">
        <p className="font-medium text-ink-800">Total</p>
        <p className="font-display text-xl text-ink-800">₦{total.toLocaleString()}</p>
      </div>
    </div>
  );
}
