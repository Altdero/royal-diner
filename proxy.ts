import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export const proxy = createMiddleware(routing);

export const config = {
  // Exclude: API routes, Next.js internals, static file extensions (public/ assets),
  // and /docs (standalone dev tool outside the locale segment).
  matcher: [
    "/((?!api|docs|_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)",
  ],
};
