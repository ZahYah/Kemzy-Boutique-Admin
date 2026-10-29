import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { navItems } from './navConfig';
import SearchBar from './SearchBar';
import NotificationsMenu from './NotificationsMenu';
import ProfileMenu from './ProfileMenu';
import { useSidebar } from '../context/SidebarContext';

function currentTitle(pathname) {
  const match = [...navItems]
    .sort((a, b) => b.path.length - a.path.length)
    .find((item) => pathname === item.path || pathname.startsWith(`${item.path}/`));
  return match ? match.label : 'Dashboard';
}

export default function Topbar() {
  const { openMobile } = useSidebar();
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-ink-100 bg-bone-100 px-4 sm:px-6">
      <button
        onClick={openMobile}
        className="text-ink-600 hover:text-ink-900 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <h1 className="hidden font-display text-xl text-ink-800 sm:block">
        {currentTitle(pathname)}
      </h1>

      <div className="ml-auto flex flex-1 items-center justify-end gap-3 sm:gap-5">
        <SearchBar />
        <NotificationsMenu />
        <div className="hidden h-8 w-px bg-ink-100 sm:block" />
        <ProfileMenu />
      </div>
    </header>
  );
}
