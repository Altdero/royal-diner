export default function OrdersLoading() {
  return (
    <div className="flex flex-1 gap-4 overflow-hidden p-4 lg:gap-6 lg:p-6">
      {["pending", "ready"].map((panel) => (
        <div
          key={panel}
          className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
        >
          <div className="flex items-center gap-3 border-b border-stone-100 bg-slate-50 px-5 py-4">
            <div className="size-5 rounded-full bg-slate-200" />
            <div className="h-3 w-24 rounded bg-slate-200" />
            <div className="ml-auto h-6 w-6 rounded-full bg-slate-200" />
          </div>
          <div className="flex-1 space-y-3 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                aria-hidden="true"
                className="animate-pulse rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="h-3 w-12 rounded bg-slate-200" />
                  <div className="h-4 w-20 rounded bg-slate-200" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 w-28 rounded bg-slate-200" />
                    <div className="h-3 w-6 rounded bg-slate-200" />
                  </div>
                  <div className="flex justify-between">
                    <div className="h-3 w-20 rounded bg-slate-200" />
                    <div className="h-3 w-6 rounded bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
