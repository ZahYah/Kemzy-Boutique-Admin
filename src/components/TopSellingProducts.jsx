import ProductThumb from './ProductThumb';

export default function TopSellingProducts({ products }) {
  return (
    <div className="divide-y divide-ink-100 border border-ink-100 bg-white">
      {products.map((product) => (
        <div key={product.id} className="flex items-center gap-4 px-5 py-4">
          <ProductThumb category={product.category} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink-800">{product.name}</p>
            <p className="text-xs text-ink-400">{product.category}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-ink-800">{product.price}</p>
            <p className="text-xs text-ink-400">{product.unitsSold} sold</p>
          </div>
        </div>
      ))}
    </div>
  );
}
