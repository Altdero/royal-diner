export default function OrderLoading() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
      {/* Sidebar skeleton */}
      <div className="w-full shrink-0 border-b border-slate-200 bg-slate-100 p-3 lg:w-56 lg:border-r lg:border-b-0">
        <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-x-visible">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="h-9 w-24 shrink-0 animate-pulse rounded-lg bg-slate-200 lg:w-full"
            />
          ))}
        </div>
      </div>

      {/* Product grid skeleton */}
      <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <div className="aspect-square bg-slate-200" />
              <div className="space-y-2 p-3">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Order summary skeleton */}
      <aside className="flex w-full shrink-0 flex-col border-t border-slate-200 bg-white lg:w-80 lg:border-t-0 lg:border-l">
        <div className="flex-1 p-4">
          <div className="mb-4 h-10 w-full animate-pulse rounded-lg bg-slate-200" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="size-12 shrink-0 animate-pulse rounded-lg bg-slate-200" />
                <div className="flex-1 space-y-1">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-200 p-4">
          <div className="mb-3 h-5 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200" />
        </div>
      </aside>
    </div>
  );
}
