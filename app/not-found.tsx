import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you requested could not be found.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-zinc-500">Page not found</p>
      <Link href="/orders" className="text-sm underline">
        Go to orders
      </Link>
    </div>
  );
}
