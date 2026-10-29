const DAY_MS = 24 * 60 * 60 * 1000;

// Shared by any table with a "date filter" dropdown (Orders, Payments, …).
// `range` is one of: 'all' | 'today' | 'last7' | 'last30'.
export function isWithinDateRange(dateValue, range) {
  if (range === 'all') return true;

  const date = new Date(dateValue);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (range === 'today') return date >= startOfToday;
  if (range === 'last7') return date >= new Date(startOfToday.getTime() - 6 * DAY_MS);
  if (range === 'last30') return date >= new Date(startOfToday.getTime() - 29 * DAY_MS);

  return true;
}
