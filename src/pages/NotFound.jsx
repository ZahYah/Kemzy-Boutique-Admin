import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bone-200 px-6 text-center">
      <p className="font-display text-5xl text-ink-800">404</p>
      <p className="max-w-sm text-sm text-ink-400">
        This page doesn't exist. It may have been moved or the link is out of date.
      </p>
      <Link
        to="/admin"
        className="border border-ink-800 px-5 py-2 text-sm text-ink-800 transition-colors hover:bg-ink-800 hover:text-bone-100"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
