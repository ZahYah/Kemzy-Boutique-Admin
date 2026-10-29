import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function CurrencyTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border border-ink-100 bg-white px-3 py-2 shadow-sm">
      <p className="text-xs text-ink-400">{label}</p>
      <p className="font-display text-sm text-ink-800">
        ₦{payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export default function SalesChart({ data }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#AD8A4E" stopOpacity={0.32} />
              <stop offset="100%" stopColor="#AD8A4E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#E8E3DE" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#7D6F60', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            width={52}
            tick={{ fill: '#7D6F60', fontSize: 12 }}
            tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CurrencyTooltip />} cursor={{ stroke: '#C9C0B6', strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#AD8A4E"
            strokeWidth={2}
            fill="url(#salesFill)"
            activeDot={{ r: 4, stroke: '#AD8A4E', strokeWidth: 2, fill: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
