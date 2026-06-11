"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArchiveBoxIcon,
  FireIcon,
  ListBulletIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const links = [
  {
    href: "/order",
    label: "New Order",
    icon: <PencilSquareIcon className="size-5" />,
  },
  {
    href: "/orders",
    label: "Orders",
    icon: <ArchiveBoxIcon className="size-5" />,
  },
  { href: "/kitchen", label: "Kitchen", icon: <FireIcon className="size-5" /> },
  {
    href: "/products",
    label: "Products",
    icon: <ListBulletIcon className="size-5" />,
  },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1">
      {links.map(({ href, label, icon }) => {
        const isActive =
          href === "/products"
            ? pathname.startsWith("/products")
            : pathname === href;

        return (
          <li key={href}>
            <Link
              href={href}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition duration-200 ${
                isActive
                  ? "bg-violet-100 font-semibold text-violet-700"
                  : "text-stone-600 hover:bg-slate-100 hover:text-violet-700"
              }`}
            >
              {icon}
              <span className="hidden sm:inline">{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
