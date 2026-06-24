"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const t = useTranslations("common");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <ExclamationTriangleIcon
        aria-hidden="true"
        className="size-12 text-red-400"
      />
      <div>
        <h1 className="text-lg font-semibold text-stone-800">
          {t("somethingWentWrong")}
        </h1>
        <p className="mt-1 text-sm text-stone-500">{t("unexpectedError")}</p>
      </div>
      <button
        onClick={reset}
        className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
      >
        {t("tryAgain")}
      </button>
    </main>
  );
}
