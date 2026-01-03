"use client";

import { useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import DocumentSidebar from "@/components/doc/DocumentSidebar";
import { useDocumentNames } from "@/hooks/useDocumentNames";

export default function DocLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { getDocumentName, documents: allDocuments, deleteDocument } = useDocumentNames();

  // Extract docId from pathname
  const docId = useMemo(() => {
    const match = pathname?.match(/\/doc\/([^/]+)/);
    return match ? match[1] : null;
  }, [pathname]);

  // Get current document name
  const currentDocumentName = useMemo(() => {
    if (pathname === "/doc/new") return "New Document";
    if (docId) return getDocumentName(docId);
    return "Untitled Document";
  }, [pathname, docId, getDocumentName]);

  const handleDocumentSelect = useCallback(
    (docId: string) => {
      router.push(`/doc/${docId}`);
    },
    [router]
  );

  const handleDocumentDelete = useCallback(
    (deletedDocId: string) => {
      deleteDocument(deletedDocId);
      // If we're on the deleted document, redirect to new document page
      if (deletedDocId === docId) {
        router.push("/doc/new");
      }
    },
    [deleteDocument, docId, router]
  );

  const recentDocuments = allDocuments.slice(0, 10).map((doc) => ({
    id: doc.id,
    name: doc.name,
    date: new Date(doc.updatedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));

  // Determine if we should show create new button
  const showCreateNew = pathname !== "/doc/new";
  console.log("recentDocuments", recentDocuments);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 flex font-nunito">
      {/* Sidebar - Persists across navigation */}
      <DocumentSidebar
        currentDocumentName={currentDocumentName}
        recentDocuments={recentDocuments}
        onDocumentSelect={handleDocumentSelect}
        onDocumentDelete={handleDocumentDelete}
        showCreateNew={showCreateNew}
        currentDocumentId={docId}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-0">{children}</div>
    </div>
  );
}
