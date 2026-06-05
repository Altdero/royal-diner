"use client";

import { useQuery } from "@tanstack/react-query";
import type { OrderStatusType, OrderType } from "@/src/types";

async function fetchOrders(status?: OrderStatusType): Promise<OrderType[]> {
  const params = status ? `?status=${status}` : "";
  const res = await fetch(`/api/orders${params}`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export function useOrders(status?: OrderStatusType) {
  return useQuery({
    queryKey: ["orders", status],
    queryFn: () => fetchOrders(status),
    refetchInterval: 10_000,
  });
}
