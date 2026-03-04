"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useShareDocument } from "@/data/document";
import { RefreshIcon } from "@/assets/svg/RefreshIcon";
import LogoLoading from "@/components/atoms/LogoLoading";

export default function SharePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log(id, "id");

  const { data, isLoading, error, isSuccess, refetch } = useShareDocument(id);

  useEffect(() => {
    if (isSuccess && data?.jobId) {
      router.replace(`/doc/${data.jobId}`);
    }
  }, [isSuccess, data?.jobId, router]);

  if (!id) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 font-jakarta">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center shadow-sm max-w-md">
          <h2 className="text-lg font-semibold text-amber-900">Missing share link</h2>
          <p className="mt-2 text-sm text-amber-800">
            This page requires a valid share ID. Use the link you received to open the document.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <LogoLoading className="w-screen h-screen">
        <p className="text-sm text-gray-600 mt-4">Opening shared document…</p>
      </LogoLoading>
      // <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 font-jakarta">
      //   <div className="flex flex-col items-center gap-4">
      //     <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-primary-blue-dark" />
      //     <p className="text-sm text-gray-600">Opening shared document…</p>
      //   </div>
      // </div>
    );
  }

  if (error) {
    const message =
      (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
      error.message ??
      "This link may be invalid or expired.";

    return (
      <div className="flex h-screen flex-col items-center justify-center px-4 font-jakarta">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-sm max-w-md">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <span className="text-xl font-bold text-red-600" aria-hidden>
              !
            </span>
          </div>
          <h2 className="text-lg font-semibold text-red-900">Could not open document</h2>
          <p className="mt-2 text-sm text-red-800">{message}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200 transition-colors"
          >
            <RefreshIcon size={16} color="#991b1b" />
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 font-jakarta">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-primary-blue-dark" />
        <p className="text-sm text-gray-600">Redirecting to document…</p>
      </div>
    </div>
  );
}
