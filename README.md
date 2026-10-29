# Kemzy Boutique — Admin Dashboard (Foundation)

A responsive admin dashboard foundation for Kemzy Boutique, a fashion business
selling clothing and shoes. This is the frontend shell only — no backend is
connected yet.

## Stack

- React 18 + Vite
- Tailwind CSS
- React Router v6
- lucide-react icons

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to `/admin`, the dashboard).

## Structure

```
src/
├── admin/        Placeholder pages for each admin route
├── assets/       Static assets (images, etc.)
├── components/   Reusable UI pieces (Sidebar, Topbar, cards, nav config)
├── context/      SidebarContext (collapse/drawer state), AdminContext (profile)
├── layouts/      AdminLayout — sidebar + header + content shell
├── pages/        Non-admin pages (404, future auth pages)
├── services/     API client stub — not wired to a backend yet
└── App.jsx       Route definitions
```

## Routes

| Path                | Page       |
| ------------------- | ---------- |
| `/admin`             | Dashboard  |
| `/admin/products`    | Products   |
| `/admin/orders`      | Orders     |
| `/admin/payments`    | Payments   |
| `/admin/customers`   | Customers  |
| `/admin/inventory`   | Inventory  |
| `/admin/categories`  | Categories |
| `/admin/settings`    | Settings   |

## Design tokens

Defined in `tailwind.config.js`:

- **ink** — near-black warm charcoal, used for the sidebar and body text
- **bone** — warm off-white, used for page backgrounds
- **brass** — muted antique-gold accent for active states and highlights
- **wine** — deep accent for alerts/destructive actions
- **sage** — muted green for positive states

Typefaces: **Fraunces** (display/headings) paired with **Work Sans** (UI text),
loaded via Google Fonts in `index.html`.

## Notes for the next phase

- `src/services/api.js` is a stub that throws until a real backend is wired up.
- `AdminContext` returns a hardcoded admin profile — swap in real auth/session
  data when ready.
- Every admin page is currently an empty state; replace the `EmptyState`
  blocks with real tables/forms as each feature is built.

## Login 
Website: https://kemzy-boutique-admin.netlify.app/admin
Email: admin@kemzyboutique.com
Password: Kemzy@Admin123
