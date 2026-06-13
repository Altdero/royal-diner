export default function EditProductLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mx-auto w-full max-w-lg p-6">
        <div className="mb-6">
          <div className="mx-auto h-8 w-36 animate-pulse rounded-lg bg-slate-200" />
          <div className="my-5 h-4 w-20 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200" />
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <div className="h-4 w-12 animate-pulse rounded bg-slate-200" />
              <div className="flex justify-center overflow-hidden rounded-lg border border-slate-300">
                <div className="size-25 animate-pulse rounded-lg bg-slate-200" />
              </div>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <div className="h-10 w-20 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-10 w-20 animate-pulse rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
