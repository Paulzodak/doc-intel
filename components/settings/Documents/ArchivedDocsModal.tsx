"use client";

import { motion } from "framer-motion";
import { CloseIcon } from "@/assets/svg/CloseIcon";
import { BagIcon } from "@/assets/svg/BagIcon";
import { TrashIcon } from "@/assets/svg/TrashIcon";
import { Button } from "@/components/ui/button";
import { SpinnerLoader } from "@/components/ui/SpinnerLoader";
import Dialog from "@/components/atoms/Dialog";
import { staticFunctions } from "@/lib/staticFunctions";
import { Document } from "@/types/document";
import { useDeleteDocument, useUnarchiveDocument } from "@/data/document";
import { ToastLogger } from "@/utils/toastUtils";
import { useState } from "react";

export default function ArchivedDocsModal({
  onClose,
  archivedDocuments,
}: {
  onClose: () => void;
  archivedDocuments: Document[];
}) {
  const [deleteTargetJobId, setDeleteTargetJobId] = useState<string | null>(null);
  const { mutate: unarchive, isPending: isUnarchiving, variables: unarchiveJobId } =
    useUnarchiveDocument();
  const { mutate: deleteDocument, isPending: isDeleting, variables: deleteJobId } =
    useDeleteDocument();

  const handleUnarchive = (jobId: string) => {
    unarchive(jobId, {
      onSuccess: () => ToastLogger.success("documents", "Document restored"),
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteTargetJobId) return;
    deleteDocument(deleteTargetJobId, {
      onSuccess: () => {
        ToastLogger.success("documents", "Document deleted");
        setDeleteTargetJobId(null);
      },
      onError: () => ToastLogger.error("documents", "Failed to delete document"),
    });
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center p-4 font-jakarta">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, height: 0 }}
        animate={{ scale: 1, opacity: 1, height: "auto" }}
        exit={{ scale: 0.95, opacity: 0, height: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[min(80rem,calc(100vw-2rem))] max-h-[min(35rem,calc(100vh-2rem))] flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <div className="shrink-0 border-b border-gray-100 p-4 sm:p-6">
          <div className="flex items-center gap-2 pr-10">
            <BagIcon color="#101828" className="text-gray-500" size={20} />
            <h3 className="text-lg font-bold text-gray-900">Archived Documents</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100"
            aria-label="Close"
          >
            <CloseIcon color="#6b7280" className="text-gray-500" size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
          {archivedDocuments.length === 0 ? (
            <p className="text-center text-sm text-gray-500">No archived documents.</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                      Date created
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                      Date archived
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {archivedDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {doc.documentName || "Untitled"}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {staticFunctions.formatDate(doc.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {staticFunctions.formatDate(doc.updatedAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-md text-xs shadow-none"
                            disabled={
                              (isUnarchiving && unarchiveJobId === doc.jobId) ||
                              (isDeleting && deleteJobId === doc.jobId)
                            }
                            onClick={() => handleUnarchive(doc.jobId)}
                          >
                            {isUnarchiving && unarchiveJobId === doc.jobId ? (
                              <SpinnerLoader size="sm" color="text-green-700" className="shrink-0" />
                            ) : (
                              "Unarchive"
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="h-8 rounded-md text-xs shadow-none"
                            disabled={
                              (isDeleting && deleteJobId === doc.jobId) ||
                              (isUnarchiving && unarchiveJobId === doc.jobId)
                            }
                            onClick={() => setDeleteTargetJobId(doc.jobId)}
                          >
                            {isDeleting && deleteJobId === doc.jobId ? (
                              <SpinnerLoader size="sm" color="text-red-700" className="shrink-0" />
                            ) : (
                              <TrashIcon color="white" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>

      <Dialog
        isOpen={deleteTargetJobId !== null}
        onClose={() => setDeleteTargetJobId(null)}
        variant="danger"
        title="Delete document"
        message="This will permanently delete the document. This cannot be undone."
        secondaryButton={{
          onClick: () => setDeleteTargetJobId(null),
          children: "Cancel",
          variant: "outline",
        }}
        primaryButton={{
          onClick: handleDeleteConfirm,
          children: isDeleting ? "Deleting..." : "Delete",
          variant: "destructive",
        }}
      />
    </div>
  );
}
