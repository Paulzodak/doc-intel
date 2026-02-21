"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { ShareIcon } from "@/assets/svg/ShareIcon";
import { MenuIcon2 } from "@/assets/svg/MenuIcon2";
import { CloseIcon } from "@/assets/svg/CloseIcon";
import EditableDocumentName from "@/components/doc/EditableDocumentName";
import { VisibilityButton } from "@/components/doc/VisibilityButton";
import { ShareModal } from "@/components/doc/ShareModal";
import { Document } from "@/types/document";
import { LockIcon } from "@/assets/svg/LockIcon";

interface DocumentContentUtilityTabProps {
  docId: string;
  documentName: string;
  docData: Document;
}

const DocumentContentUtilityTab: React.FC<DocumentContentUtilityTabProps> = ({
  docId,
  documentName,
  docData,
}) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  return (
    <div className="border-b py-4 font-jakarta px-4 sm:px-8">
      <div className="flex items-center justify-between font-jakarta">
        <EditableDocumentName docData={docData} />
        <div className="flex gap-2">
          <div className="flex gap-2 text-[10px] sm:text-xs leading-5 hidden sm:flex">
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full">Risks</span>
            <span className="px-2 py-1 bg-green-100 text-primary-blue-dark rounded-full">
              Advantages
            </span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Compliance</span>
            <div className="border-l border-gray-200 my-1" />
            <div className="gap-2 hidden md:flex">
              <div className="flex border text-sm border-gray-200 gap-2 text-gray-500 items-center px-2 py-1 rounded-full">
                <Copy color="black" size={14} />
                <span>Copy</span>
              </div>
              {/* <div className="flex border text-sm border-gray-200 gap-2 text-gray-500 items-center px-2 py-1 rounded-full">
                <ShareIcon size={15} color="#6a7282" />
                <span>Share</span>
              </div> */}
            </div>
          </div>
          <MobileMenu />
        </div>
      </div>
      {!docData.externalDocId && (
        <div className="flex gap-2 mt-2">
          <div className="flex gap-2 text-[10px] sm:text-xs leading-5 hidden sm:flex">
            <div className="gap-2 hidden md:flex">
              <VisibilityButton documentId={docId} />
              <button
                type="button"
                onClick={() => setShareModalOpen(true)}
                className="flex border text-sm border-gray-200 gap-2 text-gray-500 items-center px-2 py-1 rounded-full hover:bg-gray-50 transition-colors"
              >
                <ShareIcon size={15} />
                <span>Share</span>
              </button>
              <ShareModal
                isOpen={shareModalOpen}
                onClose={() => setShareModalOpen(false)}
                docId={docId}
                documentName={documentName}
                docData={docData}
              />
            </div>
          </div>
        </div>
      )}

      {docData.externalDocId && (
        <div className="flex gap-2 mt-2">
          <div className="flex gap-2 text-[10px] sm:text-xs leading-5 hidden sm:flex">
            <div className="gap-2 hidden md:flex">
              <button
                type="button"
                className="flex border text-sm border-gray-200 gap-2 text-gray-500 items-center px-2 py-1 rounded-full hover:bg-gray-50 transition-colors"
              >
                <LockIcon size={15} />
                <span>External Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentContentUtilityTab;

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center justify-center">
      <MenuIcon2 onClick={toggleMobileMenu} className="my-auto" color="#6a7282" />
      {isOpen && (
        <motion.div className="absolute left-0 top-14 w-full h-40 bg-white shadow-2xl border rounded-2xl z-10 md:hidden">
          <CloseIcon
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 cursor-pointer"
            color="#6a7282"
            size={15}
          />
        </motion.div>
      )}
    </div>
  );
};
