import type { Metadata } from "next";
import { DocsClient } from "@/components/docs/DocsClient";

export const metadata: Metadata = {
  title: "API Docs | Royal Diner",
  description: "OpenAPI documentation for the Royal Diner API.",
};

export default function DocsPage() {
  return <DocsClient />;
}
