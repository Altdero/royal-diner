import type { OrderStatusType } from "@/src/types";

const badgeClasses: Record<OrderStatusType, string> = {
  PENDING: "bg-amber-100 text-amber-600 border-amber-200",
  READY: "bg-green-100 text-green-700 border-green-200",
};

const badgeLabels: Record<OrderStatusType, string> = {
  PENDING: "Pending",
  READY: "Ready",
};

interface BadgeProps {
  status: OrderStatusType;
}

export function Badge({ status }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold uppercase ${badgeClasses[status]}`}
    >
      {badgeLabels[status]}
    </span>
  );
}
