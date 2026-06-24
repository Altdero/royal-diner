// Next.js requires app/layout.tsx to exist as the root layout.
// The real layout (<html>, <body>, providers) lives in app/[locale]/layout.tsx.
// This file is a passthrough so Next.js is satisfied without adding a second html/body wrapper.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
