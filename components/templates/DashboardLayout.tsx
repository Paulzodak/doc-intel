"use client";

import { useMemo, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDocumentNames } from "@/hooks/useDocumentNames";
import { motion } from "framer-motion";
import DocumentInput from "@/components/documentInput/DocumentInput";
import { Input } from "@/components/ui/input";
import { MdKeyboardCommandKey } from "react-icons/md";
import { SearchIcon } from "@/assets/svg/SearchIcon";
import { MailIcon } from "@/assets/svg/MailIcon";
import { BellIcon } from "@/assets/svg/BellIcon";
import { MenuIcon } from "@/assets/svg/MenuIcon";
import {
  FiFileText,
  FiClock,
  FiChevronRight,
  FiMoreVertical,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";
import { SettingsIcon } from "@/assets/svg/SettingsIcon";
import { KeyIcon } from "@/assets/svg/KeyIcon";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/assets/svg/PlusIcon";
import Sidebar from "./Sidebar";
import { DotGridBackground } from "../atoms/DotGridBackground";
export default function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
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
    [router],
  );

  const handleDocumentDelete = useCallback(
    (deletedDocId: string) => {
      deleteDocument(deletedDocId);
      // If we're on the deleted document, redirect to new document page
      if (deletedDocId === docId) {
        router.push("/doc/new");
      }
    },
    [deleteDocument, docId, router],
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
    <div className="h-screen w-screen overflow-hidden flex font-nunito relative">
      <DotGridBackground
        dotColor="#d1d5dc"
        className="absolute w-screen h-screen inset-0 opacity-50 bg-gdray-300 "
      />
      <div className="w-screen h-screen max-h-screen  p-2 flex flex-row  sm:p-4 grsid grid-cols-1  sm:grid-cols-[18rem_auto] gap-4 min-[1500px]:p-8 min-[1500px]:gap-6 font-nunito">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-gray-50 rounded-2xl hidden sm:flex border border-gray-200/50 "
        >
          <Sidebar />
        </motion.div>
        <div className="flex  grow flex-col  gap-4 ">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-gray-50 rounded-2xl flex items-center justify-between px-4 py-4 border border-gray-200/50"
          >
            <div className="relative hidden sm:block">
              <Input
                placeholder="Search documents..."
                className="bg-white rounded-full border-none shadow-none px-10 py-3"
              />
              <SearchIcon
                //   color="black"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                size={18}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-200 p-1 rounded-sm flex gap-1 items-center justify-center text-gray-600 ">
                <MdKeyboardCommandKey size={14} />
                <span className="text-xs ">F</span>
              </div>
            </div>
            <div className="flex gap-4 sm:hidden">
              <MenuIcon size={20} color="#101828" />
              <div className="block sm:hidden text-black">LOGOO</div>
            </div>
            <div className="relative h-full flex gap-4 ">
              <div className="bg-white p-3 h-full rounded-full bsg-gray-900 aspect-square flex items-center justify-center">
                <MailIcon className="" color="#101828" size={20} />
              </div>
              <div className="bg-white p-3 h-full rounded-full bsg-gray-900 aspect-square flex items-center justify-center">
                <BellIcon className="" color="#101828" size={20} />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 rounded-2xl border border-gray-200/50 overflow-scroll h-full relative z-10 "
          >
            {children}
          </motion.div>
        </div>
      </div>
      {/* Sidebar - Persists across navigation */}
      {/* <DocumentSidebar */}
      {/* currentDocumentName={currentDocumentName}
        recentDocuments={recentDocuments}
        onDocumentSelect={handleDocumentSelect}
        onDocumentDelete={handleDocumentDelete}
        showCreateNew={showCreateNew}
        currentDocumentId={docId} */}
      {/* /> */}

      {/* <div
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        className="flex-1 flex flex-col lg:ml-0"
      >
        <DocumentHeader title={title} />
        {children}
      </div> */}
    </div>
  );
}
