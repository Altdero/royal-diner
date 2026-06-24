"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/src/i18n/navigation";
import {
  ArchiveBoxIcon,
  FireIcon,
  ListBulletIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export function NavLinks() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const links = [
    { href: "/order" as const, label: t("newOrder"), icon: PencilSquareIcon },
    { href: "/orders" as const, label: t("orders"), icon: ArchiveBoxIcon },
    { href: "/kitchen" as const, label: t("kitchen"), icon: FireIcon },
    { href: "/products" as const, label: t("products"), icon: ListBulletIcon },
  ];

  return (
    <ul className="flex items-center gap-1">
      {links.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === "/products"
            ? pathname.startsWith("/products")
            : pathname === href;

        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition duration-200 ${
                isActive
                  ? "bg-violet-100 font-semibold text-violet-700"
                  : "text-stone-600 hover:bg-slate-100 hover:text-violet-700"
              }`}
            >
              <Icon aria-hidden="true" className="size-5" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
