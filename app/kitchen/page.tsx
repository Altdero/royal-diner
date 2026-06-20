import type { Metadata } from "next";
import { KitchenPage } from "@/components/kitchen/KitchenPage";

export const metadata: Metadata = {
  title: "Kitchen",
  description: "Kitchen display — view and mark pending orders as ready.",
};

export default function KitchenRoute() {
  return <KitchenPage />;
}
