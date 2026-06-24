export default function KitchenLoading() {
  return (
    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="animate-pulse rounded-xl border border-stone-200 bg-white shadow-sm"
        >
          <div className="border-b border-stone-100 p-5">
            <div className="mb-2 h-3 w-24 rounded bg-slate-200" />
            <div className="h-5 w-36 rounded bg-slate-200" />
          </div>
          <div className="space-y-3 p-5">
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 w-3/4 rounded bg-slate-200" />
            <div className="h-4 w-1/2 rounded bg-slate-200" />
          </div>
          <div className="border-t border-stone-100 p-5">
            <div className="h-10 rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
