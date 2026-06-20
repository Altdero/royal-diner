<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Project

Royal Diner is a diner order management system with four modules described below.

---

### Module 1 — Order (`/order`)

The waiter uses this page to build and submit a new customer order.

**Layout:**

- **Left sidebar** — category list; clicking a category filters the product grid in the central panel
- **Central panel** — search input at the top filters products by name; below it a product grid shows the available items the waiter can add to the order
- **Right panel / summary** — shows the current order being built: customer name field, itemized breakdown (each line: product image, product name, quantity, subtotal), and the order total at the bottom; a submit button sends the order

**Data written:** creates one `Order` + one `OrderItem` per product added.

---

### Module 2 — Orders Listing (`/orders`)

Displays two side-by-side panels for the front-of-house staff to track order progress.

**To Prepare panel** — orders with status `PENDING`
**Ready panel** — orders with status `READY`

Each order card shows:

- Client name
- Order number
- List of items in the order with the quantity of each

---

### Module 3 — Kitchen (`/kitchen`)

The kitchen display. Shows one card per order that has status `PENDING`. Each card gives the kitchen staff everything they need to prepare the order: the order number, client name, and the full item list with quantities. The kitchen can mark an order as ready from this view, which moves it to the Ready panel in the Orders Listing.

---

### Module 4 — Products (`/products`, `/products/new`, `/products/[productId]/edit`)

**Catalog page (`/products`):** table/list of all products with columns: name, unit price, category, and an edit link.

**Add product (`/products/new`) and Edit product (`/products/[productId]/edit`):** share the same form fields — name, unit price, category (select from existing categories), and image (uploaded via Cloudinary). Images in `public/products/` are default fallbacks only — there is no in-app asset picker.

---

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5 (strict)
- **Styling:** Tailwind CSS 4
- **Package manager:** yarn
- **Database:** PostgreSQL on Neon via Prisma 7
- **Data fetching:** TanStack Query v5
- **Forms:** react-hook-form + @hookform/resolvers + Zod v4
- **State:** Zustand v5
- **Images:** next-cloudinary (CldUploadWidget, preset hardcoded) + public assets (fallbacks)
- **UI feedback:** sonner
- **Icons:** react-icons
- **API docs:** swagger-jsdoc + swagger-ui-react (served at `/docs`)
- **Testing:** Jest + ts-jest
- **Linting:** ESLint 9 (flat config)
- **Formatting:** Prettier + prettier-plugin-tailwindcss
- **Git hooks:** Husky + lint-staged

Reference `package.json` for exact versions. Always consult `node_modules/next/dist/docs/` before implementing features.

## Project Structure

```
app/
├── layout.tsx                        # Root layout (QueryProvider + Toaster)
├── globals.css
├── page.tsx                          # Redirects to /orders
├── not-found.tsx
├── api/
│   ├── categories/route.ts           # GET /api/categories
│   ├── products/
│   │   ├── route.ts                  # GET, POST /api/products
│   │   └── [productId]/route.ts      # GET, PUT, DELETE /api/products/:id
│   ├── orders/
│   │   ├── route.ts                  # GET, POST /api/orders
│   │   └── [orderId]/route.ts        # PATCH /api/orders/:id
│   └── docs/route.ts                 # GET /api/docs — OpenAPI JSON spec
├── docs/
│   └── page.tsx                      # Swagger UI at /docs
├── order/
│   └── page.tsx                      # New order — category sidebar + search + item list
├── orders/
│   └── page.tsx                      # Orders listing — to-prepare panel + ready panel
├── kitchen/
│   └── page.tsx                      # Kitchen view — one card per pending order
└── products/
    ├── page.tsx                      # Product catalog
    ├── new/
    │   └── page.tsx                  # Add product form
    └── [productId]/
        └── edit/
            └── page.tsx              # Edit product form

components/
├── ui/                               # Shared UI primitives
├── order/                            # Order module components
├── orders/                           # Orders listing components
├── kitchen/                          # Kitchen components
└── products/                         # Product catalog and form components

prisma/
├── schema.prisma
├── seed.ts                           # Seed script — run with yarn seed
└── migrations/

src/
├── constants/                        # App-wide constants
├── hooks/                            # Custom React hooks
│   ├── useCategories.ts
│   ├── useProducts.ts
│   ├── useOrders.ts
│   ├── useProductMutations.ts
│   └── useOrderMutations.ts
├── lib/
│   ├── prisma.ts                     # Prisma client singleton
│   ├── swagger.ts                    # OpenAPI spec definition
│   ├── schemas/                      # Zod schemas (one file per domain)
│   │   ├── categorySchema.ts
│   │   ├── productSchema.ts
│   │   └── orderSchema.ts
│   └── utils/
│       ├── formatCurrency.ts
│       └── getImagePath.ts
├── providers/
│   └── query.provider.tsx            # TanStack Query client provider
├── store/
│   └── orderStore.ts                 # Zustand cart store
└── types/
    └── index.ts                      # Zod-inferred + API response types

public/
└── products/                         # Static product images

.env
.env.example
```

## Naming Conventions

| Thing      | Convention                    | Example              |
| ---------- | ----------------------------- | -------------------- |
| Components | PascalCase                    | `ProductCard.tsx`    |
| Hooks      | camelCase prefixed `use`      | `useProducts.ts`     |
| Providers  | camelCase + `Provider` suffix | `query.provider.tsx` |
| Schemas    | camelCase + `Schema` suffix   | `productSchema.ts`   |
| Stores     | camelCase + `Store` suffix    | `orderStore.ts`      |
| Types      | PascalCase + `Type` suffix    | `OrderStatusType`    |
| Constants  | SCREAMING_SNAKE_CASE          | `ORDER_STATUSES`     |
| Util files | camelCase                     | `formatCurrency.ts`  |

## Data Model

Four Prisma models: `Category`, `Product`, `Order`, `OrderItem`. `OrderStatus` enum: `PENDING` | `READY`. See `prisma/schema.prisma` for the full schema.

## Architectural Decisions

**Full-stack Next.js — API routes + Prisma**
Server Component pages fetch data directly from Prisma (`@/src/lib/prisma`) using `select` to return only the fields needed — no HTTP round-trip to your own API. Never import `lib/prisma.ts` inside a Client Component. API Route Handlers remain the data layer for client-side mutations (TanStack Query hooks call them via `fetch`). After a mutation that stays on the same page (e.g. delete), call `router.refresh()` to re-run the Server Component and get fresh data.

**TanStack Query for all client-side data fetching**
Mutations and queries use TanStack Query. Keys are domain strings (e.g. `["products"]`, `["orders", "pending"]`). Provide the `QueryClient` via a single provider in `app/layout.tsx`.

**Zustand for ephemeral UI state**
Use Zustand only for client-side state that doesn't belong in the server (e.g. current order items while building an order). Server state lives in TanStack Query.

**Zod schemas drive types**
Define schemas in `src/lib/schemas/`, infer types with `z.infer<>`, re-export from `src/types/index.ts`. No manual type duplication.

**Client-side filtering for bounded datasets**
When a Server Component already loads a complete, bounded dataset (e.g. the product catalog), prefer in-memory `.filter()` over URL `searchParams` + Prisma re-query or a TanStack Query re-fetch. For this app the product count is small and staff-only, so filtering is instant and adds no server load. Use URL-based or TanStack search only when the dataset requires pagination or is too large to load upfront.

**Cloudinary for uploaded images, public/ for fallbacks**
Product images are uploaded by the user via next-cloudinary (CldUploadWidget). Images in `public/products/` are default fallbacks rendered by `getImagePath` when a product has no Cloudinary URL — they are not selectable from the UI. Category icons or decoration images are static files in `public/`.

The upload preset is hardcoded in `ImagePicker.tsx`. `ImagePicker` is imported directly (no dynamic import needed).

## Environment Variables

```
DATABASE_URL=                         # Neon pooled connection string — used by the app at runtime
DIRECT_URL=                           # Neon direct (non-pooled) connection string — used by Prisma CLI for migrations
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=    # Safe to expose — embedded in every Cloudinary URL
```

`DATABASE_URL` points to the Neon **pooler** endpoint (e.g. `*-pooler.*.neon.tech`).
`DIRECT_URL` points to the Neon **direct** endpoint (no `-pooler`). Required by `prisma migrate`.
Never add `NEXT_PUBLIC_` to Cloudinary API key or secret.

## Development Workflow

```bash
yarn dev          # Start dev server at http://localhost:3000
yarn build        # Build for production
yarn start        # Run production server
yarn seed         # Seed the database with categories and products
yarn test         # Run Jest test suite
yarn lint         # ESLint (reports only)
yarn format       # Prettier + Tailwind class sorting
yarn typecheck    # Type-check without building
yarn validate     # lint + typecheck + build
yarn prepare      # Set up Husky git hooks
```

**Pre-commit:** Husky runs lint-staged — catches ESLint violations and formatting issues.
**Pre-push:** Husky runs `yarn validate` — ensures lint, typecheck, and build all pass.

## Coding Conventions

**TypeScript**

- Strict mode enabled
- Path alias `@/*` maps to the project root. Files inside `src/` are imported with the `@/src/` prefix (e.g. `@/src/lib/prisma`, `@/src/hooks/useProducts`). Files inside `app/` use `@/app/` as usual.
- `.tsx` for files with JSX, `.ts` for logic-only files
- Import types with `import type` when the import is type-only
- Derive union types from constant objects with `keyof typeof`

**Styling**

- Tailwind CSS utility-first; avoid custom CSS
- Dynamic colors must use `style={{ ... }}` — never interpolate values into Tailwind class strings
- Mobile-first: style for small screens first, add `sm:` / `md:` / `lg:` breakpoints to scale up. The app is primarily desktop but must look and function correctly on mobile.

**React Patterns**

- Server Components by default; add `"use client"` only when necessary
- Push `"use client"` to the leaves — pages and layouts stay as Server Components; extract only interactive parts into Client Components under `components/`
- Never call `setState` synchronously inside a `useEffect` body
- Never call `router.push/replace` during render — use event handlers or `useEffect`

**Forms**

- react-hook-form for all form state
- Zod schemas for validation via `@hookform/resolvers/zod`
- Schemas colocated in `src/lib/schemas/`

**Toast Notifications**

- Sonner for all user-facing feedback
- `toast.error()` for API failures
- Call inside event handlers or `useEffect` — never during render

**Accessibility (a11y)**

Every page and component must meet WCAG 2.1 AA. Apply these standards without being asked:

- All interactive elements must have an accessible name: use `aria-label` for icon-only buttons/links; include the item name for repeated actions (e.g. "Delete Espresso", not just "Delete")
- All `<input>` and `<select>` elements must have an associated `<label>` or `aria-label`; never rely on `placeholder` alone
- Use semantic HTML landmarks: `<main>`, `<nav aria-label="…">`, `<aside aria-label="…">`; do not use bare `<div>` for landmark regions
- Communicate state programmatically: `aria-current="page"` on active nav links; `aria-pressed` or `aria-current` on toggle/filter buttons; `aria-expanded` on collapsible controls; `aria-invalid` + `aria-describedby` on form fields with errors; `aria-busy` on buttons during async operations
- Modal dialogs require `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`, a focus trap, and Escape key dismissal
- Dynamic content changes must be announced: use `role="status"` or `aria-live="polite"` for loading states and empty-state messages
- Decorative SVG icons must have `aria-hidden="true"`
- CSS-only visibility tricks (`opacity-0`, `max-w-0`) do not remove content from the accessibility tree — use `aria-hidden` or `hidden` when content must be invisible to assistive technology

**ESLint / Prettier**

- Flat config (ESLint v9+)
- `yarn lint` to check, `yarn format` to auto-fix
- Husky runs lint-staged on `git commit`, `yarn validate` on `git push`

## Rules for Agents

1. **Read `AGENTS.md` first.** Do not assume conventions from training data.
2. **Read the relevant files before editing them.** Never modify based only on prompt context.
3. **Never create files outside the established structure.** Ask first if a new directory seems necessary.
4. **Follow naming conventions exactly.**
5. **Do not add `"use client"` without justification.** Server Components are the default.
6. **Do not introduce new dependencies without asking.**
7. **Always run `yarn validate` before considering a task done.**
8. **Fix any errors introduced before responding.** Do not hand back broken code.
9. **Never import `src/lib/prisma.ts` in a Client Component.** Database access is server-only via Route Handlers.
10. **Add Swagger JSDoc comments to every new Route Handler.** Follow the existing pattern in `app/api/`.
11. **Tests go in `__tests__/` and match the pattern `*.test.ts`.** Write tests for utils and API handlers when truly necessary.
12. **Apply a11y standards to every page and component you create or modify.** Follow the Accessibility section in Coding Conventions. Do not ship interactive elements without accessible names, form fields without labels, or modals without the full dialog pattern.
