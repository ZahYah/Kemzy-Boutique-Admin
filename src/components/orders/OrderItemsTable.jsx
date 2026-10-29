import ProductThumb from '../ProductThumb';

export default function OrderItemsTable({ items }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink-100 text-xs text-ink-400">
            <th className="py-2.5 font-medium">Product</th>
            <th className="py-2.5 font-medium">Quantity</th>
            <th className="py-2.5 font-medium">Price</th>
            <th className="py-2.5 text-right font-medium">Subtotal</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {items.map((item, index) => (
            <tr key={`${item.name}-${index}`}>
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <ProductThumb category={item.category} />
                  <p className="text-sm text-ink-800">{item.name}</p>
                </div>
              </td>
              <td className="py-3 text-ink-600">{item.quantity}</td>
              <td className="py-3 text-ink-600">₦{item.price.toLocaleString()}</td>
              <td className="py-3 text-right text-ink-800">
                ₦{(item.price * item.quantity).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
