import { NavLink } from 'react-router-dom';
import { X, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { navItems } from './navConfig';
import { useSidebar } from '../context/SidebarContext';

function SidebarContent({ collapsed, onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div
        className={`flex items-center gap-3 border-b border-white/10 px-6 py-7 ${
          collapsed ? 'justify-center px-0' : ''
        }`}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-brass-400 font-display text-lg text-brass-400">
          K
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <p className="font-display text-lg text-bone-100">Kemzy</p>
            <p className="text-[11px] uppercase tracking-widest2 text-ink-300">Boutique Admin</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
        {navItems.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              [
                'group relative flex items-center gap-3 border-l-2 px-3 py-2.5 text-sm transition-colors',
                isActive
                  ? 'border-brass-400 bg-white/5 text-bone-100'
                  : 'border-transparent text-ink-300 hover:bg-white/5 hover:text-bone-100',
                collapsed ? 'justify-center px-0' : '',
              ].join(' ')
            }
          >
            <Icon size={18} strokeWidth={1.75} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div
        className={`border-t border-white/10 px-4 py-5 text-[11px] text-ink-400 ${
          collapsed ? 'text-center' : ''
        }`}
      >
        {collapsed ? <p>KB</p> : <p>&copy; {new Date().getFullYear()} Kemzy Boutique</p>}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { collapsed, toggleCollapsed, mobileOpen, closeMobile } = useSidebar();

  return (
    <>
      {/* Desktop sidebar — collapses to an icon rail */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden flex-col bg-ink-800 transition-[width] duration-200 ease-out lg:flex ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <SidebarContent collapsed={collapsed} />
        <button
          onClick={toggleCollapsed}
          className="absolute -right-3 top-9 flex h-6 w-6 items-center justify-center border border-ink-500 bg-ink-800 text-ink-300 hover:text-brass-400"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronsRight size={14} /> : <ChevronsLeft size={14} />}
        </button>
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-ink-900/60 transition-opacity duration-200 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMobile}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-72 max-w-[80%] bg-ink-800 shadow-xl transition-transform duration-200 ease-out ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button
            onClick={closeMobile}
            className="absolute right-3 top-4 text-ink-300 hover:text-bone-100"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
          <SidebarContent collapsed={false} onNavigate={closeMobile} />
        </aside>
      </div>
    </>
  );
}
