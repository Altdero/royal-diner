"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type { CreateOrderType, OrderStatusType, OrderType } from "@/src/types";

async function createOrder(data: CreateOrderType): Promise<OrderType> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

async function updateOrderStatus(
  orderId: string,
  status: OrderStatusType
): Promise<OrderType> {
  const res = await fetch(`/api/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update order status");
  return res.json();
}

export function useCreateOrder() {
  const t = useTranslations("order");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(t("toastPlaced"));
    },
    onError: () => toast.error(t("toastFailedPlace")),
  });
}

export function useUpdateOrderStatus() {
  const t = useTranslations("kitchen");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: OrderStatusType;
    }) => updateOrderStatus(orderId, status),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(t("toastMarkedReady"));
    },
    onError: () => toast.error(t("toastFailedUpdate")),
  });
}
