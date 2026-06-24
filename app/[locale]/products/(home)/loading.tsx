export default function ProductsLoading() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden p-4 md:mx-auto md:w-fit md:min-w-212.5">
      <div className="mb-6">
        <div className="mx-auto h-8 w-32 animate-pulse rounded-lg bg-slate-200" />
        <div className="my-5 flex items-center gap-3">
          <div className="h-9 flex-1 animate-pulse rounded-lg bg-slate-200 md:max-w-100" />
          <div className="h-9 w-28 shrink-0 animate-pulse rounded-lg bg-slate-200" />
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold tracking-wide text-stone-500 uppercase">
            <tr>
              <th className="w-14 px-4 py-3" />
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Unit Price</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i}>
                <td className="px-4 py-3">
                  <div className="size-10 animate-pulse rounded-lg bg-slate-200" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-7 w-24 animate-pulse rounded-lg bg-slate-200" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
