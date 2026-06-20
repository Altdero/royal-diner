import type { Metadata } from "next";
import { OrderPage } from "@/components/order/OrderPage";

export const metadata: Metadata = {
  title: "New Order",
  description: "Build and submit a new customer order.",
};

export default function OrderRoute() {
  return <OrderPage />;
}
