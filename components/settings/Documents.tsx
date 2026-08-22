import { User } from "@/types/user";
import { Button } from "../ui/button";
import { useArchivedDocuments } from "@/data/document";
import ArchivedDocsModal from "./Documents/ArchivedDocsModal";
import { useState } from "react";

export default function Documents({ user }: { user: User }) {
  const { data: archivedDocuments } = useArchivedDocuments();
  const [showArchivedDocsModal, setShowArchivedDocsModal] = useState(false);

  return (
    <div className="bg-white h-full overflow-scroll rounded-lg border p-4">
      <div className="grid text-sm text-black gap-4">
        <h2 className="text-lg font-bold">Documents</h2>
        <hr className="border-gray-100" />
        <div className="grid grid-cols-[5fr_8fr] gap-2">
          <label htmlFor="archived-documents" className="font-semibold my-auto">
            Archived Documents
          </label>
          <div className="flex justify-end items-center gap-2">
            <Button
              id="archived-documents"
              onClick={() => setShowArchivedDocsModal(true)}
              variant="primary-green"
              className="ws-full rounded-full px-6 py-2 h-10 shadow-none"
            >
              <span className="text-sm">Manage</span>
            </Button>
          </div>
        </div>
        <hr className="border-gray-100" />
        {showArchivedDocsModal && archivedDocuments?.data && (
          <ArchivedDocsModal
            onClose={() => setShowArchivedDocsModal(false)}
            archivedDocuments={archivedDocuments.data}
          />
        )}
      </div>
    </div>
  );
}
