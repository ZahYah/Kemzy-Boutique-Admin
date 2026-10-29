import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Settings as SettingsIcon, User } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useAuth } from '../context/AuthContext';

export default function ProfileMenu() {
  const { admin } = useAdmin();
  const { logout } = useAuth();
  const navigate = useNavigate();
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
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center bg-ink-800 font-display text-sm text-bone-100">
          {admin.initials}
        </span>
        <span className="hidden text-left md:block">
          <span className="block text-sm font-medium text-ink-800">{admin.name}</span>
          <span className="block text-xs text-ink-400">{admin.role}</span>
        </span>
        <ChevronDown size={16} className="hidden text-ink-300 md:block" />
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-3 w-56 border border-ink-100 bg-white shadow-lg">
          <div className="border-b border-ink-100 px-4 py-3">
            <p className="text-sm font-medium text-ink-800">{admin.name}</p>
            <p className="text-xs text-ink-400">{admin.email}</p>
          </div>
          <Link
            to="/admin/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-600 hover:bg-bone-200"
          >
            <User size={16} /> My profile
          </Link>
          <Link
            to="/admin/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-600 hover:bg-bone-200"
          >
            <SettingsIcon size={16} /> Settings
          </Link>
          <button
            onClick={async () => {
              setOpen(false);
              await logout();
              navigate('/admin/login', { replace: true });
            }}
            className="flex w-full items-center gap-2.5 border-t border-ink-100 px-4 py-2.5 text-sm text-wine-500 hover:bg-bone-200"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
