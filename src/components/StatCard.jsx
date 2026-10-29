import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ icon: Icon, label, value, comparison, trend = 'up', description }) {
  const trendClass = trend === 'up' ? 'text-sage-600' : 'text-wine-600';
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <div className="border border-ink-100 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center border border-ink-100 text-brass-600">
          <Icon size={18} strokeWidth={1.5} />
        </span>
        {comparison && (
          <span className={`flex items-center gap-1 text-xs font-medium ${trendClass}`}>
            <TrendIcon size={13} />
            {comparison}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl text-ink-800">{value}</p>
      <p className="mt-1 text-sm text-ink-600">{label}</p>
      {description && <p className="mt-1 text-xs text-ink-400">{description}</p>}
    </div>
  );
}
