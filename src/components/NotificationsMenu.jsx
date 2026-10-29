import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';

const notifications = [
  { id: 1, title: 'New order received', detail: 'Order #KB-1042 · 2 items', time: '5m ago' },
  { id: 2, title: 'Low stock alert', detail: 'Ankara Wrap Dress — 3 left', time: '1h ago' },
  { id: 3, title: 'Payment confirmed', detail: 'Order #KB-1039', time: '3h ago' },
];

export default function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative text-ink-600 hover:text-ink-900"
        aria-label="Notifications"
      >
        <Bell size={20} />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-wine-500" />
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-3 w-80 border border-ink-100 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
            <p className="text-sm font-medium text-ink-800">Notifications</p>
            <span className="text-xs text-ink-300">{notifications.length} new</span>
          </div>
          <ul className="max-h-72 overflow-y-auto">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="border-b border-ink-50 px-4 py-3 last:border-b-0 hover:bg-bone-200"
              >
                <p className="text-sm text-ink-800">{n.title}</p>
                <p className="text-xs text-ink-400">{n.detail}</p>
                <p className="mt-1 text-[11px] text-ink-300">{n.time}</p>
              </li>
            ))}
          </ul>
          <button className="w-full border-t border-ink-100 py-2.5 text-xs font-medium text-brass-600 hover:bg-bone-200">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
}
