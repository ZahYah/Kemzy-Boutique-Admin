// Centralized place for future API calls.
// No backend is connected yet — these are stubs to wire up once one exists.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(path) {
  throw new Error(
    `API not connected yet. Attempted request to ${BASE_URL}${path}. ` +
      'Wire this up once the backend is ready.'
  );
}

export const api = {
  get: (path) => request(path),
  post: (path) => request(path),
  put: (path) => request(path),
  delete: (path) => request(path),
};
