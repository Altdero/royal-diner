# Royal Diner

A diner order management system built with Next.js 16, React 19, and PostgreSQL.

> **For developers:** [`AGENTS.md`](./AGENTS.md) is the source of truth for architecture, conventions, data model, and design decisions. Read it before contributing.

## Modules

| Module   | Route                | Description                                    |
| -------- | -------------------- | ---------------------------------------------- |
| Order    | `/[locale]/order`    | Waiter builds and submits a new customer order |
| Orders   | `/[locale]/orders`   | Front-of-house tracks pending and ready orders |
| Kitchen  | `/[locale]/kitchen`  | Kitchen display — mark orders as ready         |
| Products | `/[locale]/products` | Manage the menu catalog                        |

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5 (strict)
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL via Prisma 7 (any managed provider — Neon, Supabase, etc.)
- **Data fetching:** TanStack Query v5
- **Forms:** react-hook-form + Zod v4
- **State:** Zustand v5
- **i18n:** next-intl v4 (en, es, pt, fr)
- **Images:** next-cloudinary + public assets
- **API docs:** swagger-jsdoc + swagger-ui-react
- **Testing:** Jest + ts-jest
- **Package manager:** yarn

## Setup

### 1. Install dependencies

```bash
yarn
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in `.env`:

```
DATABASE_URL=       # Pooled connection string
DIRECT_URL=         # Direct connection string (for migrations)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

### 3. Run database migrations

```bash
yarn prisma migrate dev
```

### 4. Seed the database

```bash
yarn seed
```

Also copy the product images into `public/products/` — see the image mapping in `prisma/seed.ts` for the expected filenames.

### 5. Start the dev server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to your browser's preferred language automatically.

## API Docs

Interactive Swagger UI available at [http://localhost:3000/docs](http://localhost:3000/docs).

## Scripts

```bash
yarn dev          # Start dev server
yarn build        # Build for production
yarn start        # Run production server
yarn seed         # Seed the database
yarn test         # Run tests
yarn lint         # ESLint
yarn format       # Prettier
yarn typecheck    # Type-check without building
yarn validate     # lint + typecheck + build
```
