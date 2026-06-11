import { NavLinks } from "@/components/NavLinks";

export function Nav() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="flex h-14 items-center justify-between px-6">
        <span className="text-lg font-bold text-violet-700">Royal Diner</span>
        <NavLinks />
      </div>
    </nav>
  );
}
