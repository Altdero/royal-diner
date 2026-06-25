import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export const proxy = createMiddleware(routing);

export const config = {
  // Exclude static file extensions so requests to public/ assets (e.g. /categories/*.svg,
  // /products/*.jpg) are never intercepted and locale-prefixed by the middleware.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)",
  ],
};
