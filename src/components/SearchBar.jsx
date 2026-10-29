import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Inline search for tablet and desktop */}
      <div className="relative hidden items-center sm:flex">
        <Search size={16} className="pointer-events-none absolute left-3 text-ink-300" />
        <input
          type="text"
          placeholder="Search products, orders, customers…"
          className="w-56 border border-ink-100 bg-white py-2 pl-9 pr-3 text-sm text-ink-700 placeholder:text-ink-300 focus:border-brass-500 focus:outline-none md:w-72"
        />
      </div>

      {/* Icon-only trigger on mobile, opens a full-width overlay */}
      <button
        onClick={() => setMobileOpen(true)}
        className="text-ink-600 hover:text-ink-900 sm:hidden"
        aria-label="Search"
      >
        <Search size={20} />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-bone-200 p-4 sm:hidden">
          <div className="relative flex items-center">
            <Search size={16} className="pointer-events-none absolute left-3 text-ink-300" />
            <input
              autoFocus
              type="text"
              placeholder="Search…"
              className="w-full border border-ink-100 bg-white py-2.5 pl-9 pr-10 text-sm focus:border-brass-500 focus:outline-none"
            />
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 text-ink-400"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
