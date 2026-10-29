import { CheckCircle2, Circle, XCircle } from 'lucide-react';

const STATUS_TIMELINE = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];
const STEP_LABELS = ['Order placed', 'Payment confirmed', 'Processing', 'Shipped', 'Delivered'];

export default function OrderTimeline({ orderStatus }) {
  const isCancelled = orderStatus === 'Cancelled';
  const activeIndex = STATUS_TIMELINE.indexOf(orderStatus);

  return (
    <ol>
      {STEP_LABELS.map((label, index) => {
        const completed = isCancelled ? index === 0 : index <= activeIndex;
        const lineCompleted = isCancelled ? false : index < activeIndex;
        const isLast = index === STEP_LABELS.length - 1;

        return (
          <li key={label} className="relative flex gap-3 pb-6 last:pb-0">
            {!isLast && (
              <span
                className={`absolute left-[9px] top-5 h-full w-px ${
                  lineCompleted ? 'bg-brass-500' : 'bg-ink-100'
                }`}
              />
            )}
            <span
              className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                completed
                  ? 'bg-brass-500 text-white'
                  : 'border border-ink-200 bg-white text-ink-200'
              }`}
            >
              {completed ? (
                <CheckCircle2 size={14} />
              ) : (
                <Circle size={7} className="fill-current" />
              )}
            </span>
            <p className={`text-sm ${completed ? 'font-medium text-ink-800' : 'text-ink-400'}`}>
              {label}
            </p>
          </li>
        );
      })}

      {isCancelled && (
        <li className="relative flex gap-3">
          <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-wine-600 text-white">
            <XCircle size={14} />
          </span>
          <p className="text-sm font-medium text-wine-600">Order cancelled</p>
        </li>
      )}
    </ol>
  );
}
