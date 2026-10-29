// Mock authentication service.
//
// This file is intentionally shaped to mirror the Supabase Auth JS API
// (supabase.auth.signInWithPassword / signOut, { data, error } responses)
// so that swapping the mock for a real Supabase client later only means
// replacing the bodies of these functions — nothing that calls them
// (AuthContext, Login) needs to change.

const MOCK_USER = {
  id: 'mock-admin-id',
  email: 'admin@kemzyboutique.com',
  name: 'Amaka Eze',
  role: 'Store Manager',
};

// Demo-only credential. Replace with real Supabase auth when ready.
const MOCK_PASSWORD = 'Kemzy@Admin123';
const MOCK_LATENCY_MS = 700;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildSession(user) {
  return {
    access_token: `mock-token.${user.id}.${Date.now()}`,
    user,
  };
}

/**
 * Signature matches supabase.auth.signInWithPassword({ email, password }).
 * Returns { data: { session, user }, error } — never throws.
 */
export async function signInWithPassword({ email, password }) {
  await delay(MOCK_LATENCY_MS);

  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail !== MOCK_USER.email || password !== MOCK_PASSWORD) {
    return {
      data: { session: null, user: null },
      error: { message: 'Incorrect email or password.' },
    };
  }

  return {
    data: { session: buildSession(MOCK_USER), user: MOCK_USER },
    error: null,
  };
}

/**
 * Signature matches supabase.auth.signOut(). Returns { error }.
 */
export async function signOut() {
  await delay(150);
  return { error: null };
}

// --- Session persistence -------------------------------------------------
// Later, this can be replaced with supabase.auth.getSession() and
// supabase.auth.onAuthStateChange() instead of manual storage.

const STORAGE_KEY = 'kemzy_admin_session';

export function getStoredSession() {
  const raw = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function storeSession(session, { remember } = {}) {
  const raw = JSON.stringify(session);
  if (remember) {
    localStorage.setItem(STORAGE_KEY, raw);
    sessionStorage.removeItem(STORAGE_KEY);
  } else {
    sessionStorage.setItem(STORAGE_KEY, raw);
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function clearStoredSession() {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
}

// Exposed only so the login page can show a demo hint. Remove once real
// auth is connected.
export const DEMO_CREDENTIALS = {
  email: MOCK_USER.email,
  password: MOCK_PASSWORD,
};
