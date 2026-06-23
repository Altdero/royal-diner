import type { Metadata } from "next";
import { OrdersPage } from "@/components/orders/OrdersPage";

export const metadata: Metadata = {
  title: "Orders",
  description: "Track pending and ready orders for front-of-house staff.",
};

export default function OrdersRoute() {
  return <OrdersPage />;
}
