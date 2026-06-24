import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { DocsClient } from "@/components/docs/DocsClient";

export const metadata: Metadata = {
  title: "API Docs",
  description: "OpenAPI documentation for the Royal Diner API.",
};

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DocsClient />;
}
