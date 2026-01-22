"use client";

import React, { useState, useCallback, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import {
  FiFileText,
  FiSettings,
  FiDownload,
  FiShare2,
  FiChevronRight,
  FiClock,
  FiPlus,
  FiMoreVertical,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";
import { MdOutlineHistory } from "react-icons/md";
import { useRouter } from "next/navigation";
import Dialog from "@/components/atoms/Dialog";
import { Button } from "../ui/button";

interface Document {
  id: string;
  name: string;
  date: string;
}

interface DocumentSidebarProps {
  currentDocumentName?: string;
  recentDocuments?: Document[];
  onDocumentSelect?: (docId: string) => void;
  onDocumentDelete?: (docId: string) => void;
  showCreateNew?: boolean;
  currentDocumentId?: string | null;
}

const DocumentSidebar: React.FC<DocumentSidebarProps> = React.memo(
  ({
    currentDocumentName = "Untitled Document",
    recentDocuments = [],
    onDocumentSelect,
    onDocumentDelete,
    showCreateNew = true,
    currentDocumentId = null,
  }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; docId: string | null }>({
      isOpen: false,
      docId: null,
    });

    const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);
    const toggleMobileSidebar = useCallback(() => setIsMobileOpen((prev) => !prev), []);

    const handleCreateNew = useCallback(() => {
      router.push("/doc/new");
    }, [router]);

    const handleDocumentClick = useCallback(
      (docId: string) => {
        onDocumentSelect?.(docId);
      },
      [onDocumentSelect]
    );

    const handleDeleteClick = useCallback((docId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setOpenDropdownId(null);
      setDeleteDialog({ isOpen: true, docId });
    }, []);

    const handleDeleteConfirm = useCallback(() => {
      if (deleteDialog.docId) {
        onDocumentDelete?.(deleteDialog.docId);
        setDeleteDialog({ isOpen: false, docId: null });
      }
    }, [deleteDialog.docId, onDocumentDelete]);

    const handleSelectClick = useCallback(
      (docId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenDropdownId(null);
        handleDocumentClick(docId);
      },
      [handleDocumentClick]
    );

    const toggleDropdown = useCallback((docId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setOpenDropdownId((prev) => (prev === docId ? null : docId));
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = () => {
        setOpenDropdownId(null);
      };
      if (openDropdownId) {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
      }
    }, [openDropdownId]);

    const sidebarContent = (
      <div className="h-full bg-gradient-to-br  from-[#11161f] via-90% via-primary-green/50 to-[#11161f]">
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
          className="h-full flex flex-col bg-[#11161fcd] backdrop-blur-3xl "
        >
          {/* Current Document Section */}
          {/* <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <FiFileText className="text-blue-400" size={20} />
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
              Current Document
            </h3>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
            <p className="text-white font-medium text-sm truncate" title={currentDocumentName}>
              {currentDocumentName}
            </p>
          </div>
        </div> */}

          {/* Recent Documents Section */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* <div className="flex items-center gap-2 mb-3">
            <MdOutlineHistory className="text-purple-400" size={20} />
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
              Recent Documents
            </h3>
          </div> */}
            {recentDocuments.length > 0 ? (
              <div className="space-y-2">
                {recentDocuments.map((doc) => {
                  const isActive = doc.id === currentDocumentId;
                  const isDropdownOpen = openDropdownId === doc.id;
                  return (
                    <div
                      key={doc.id}
                      className={`relative rounded-xl border transition-all duration-200 group ${
                        isActive
                          ? "bg-primary-green/20 border-primary-green/50 hover:bg-primary-green/30"
                          : "bg-gray-800/40 border-gray-700/40 hover:bg-gray-800/60 hover:border-gray-600/50"
                      }`}
                    >
                      <button
                        onClick={() => handleDocumentClick(doc.id)}
                        className="w-full text-left p-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              {isActive && (
                                <div className="w-2 h-2 bg-primary-green rounded-full flex-shrink-0" />
                              )}
                              <p
                                className={`text-sm font-medium truncate transition-colors ${
                                  isActive
                                    ? "text-primary-green group-hover:text-primary-green"
                                    : "text-white group-hover:text-primary-green"
                                }`}
                              >
                                {doc.name}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <FiClock
                                className={isActive ? "text-primary-green/70" : "text-gray-500"}
                                size={12}
                              />
                              <span
                                className={
                                  isActive
                                    ? "text-primary-green/70 text-xs"
                                    : "text-gray-500 text-xs"
                                }
                              >
                                {doc.date}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiChevronRight
                              className={`flex-shrink-0 mt-0.5 transition-colors ${
                                isActive
                                  ? "text-primary-green group-hover:primary-green"
                                  : "text-gray-500 group-hover:text-primary-green"
                              }`}
                              size={16}
                            />
                            <button
                              onClick={(e) => toggleDropdown(doc.id, e)}
                              className={`p-1 rounded hover:bg-gray-700/50 transition-colors ${
                                isDropdownOpen ? "bg-gray-700/50" : ""
                              }`}
                            >
                              <FiMoreVertical
                                className={isActive ? "text-primary-green" : "text-gray-400"}
                                size={16}
                              />
                            </button>
                          </div>
                        </div>
                      </button>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-1 z-50 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden min-w-[140px]">
                          <button
                            onClick={(e) => handleSelectClick(doc.id, e)}
                            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700/50 transition-colors flex items-center gap-2"
                          >
                            <FiCheck size={14} />
                            <span>Select</span>
                          </button>
                          <button
                            onClick={(e) => handleDeleteClick(doc.id, e)}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors flex items-center gap-2"
                          >
                            <FiTrash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiFileText className="text-gray-600 mx-auto mb-2" size={32} />
                <p className="text-gray-500 text-sm">No recent documents</p>
              </div>
            )}
          </div>

          {/* Utils Section */}
          <div className="p-4 border-t border-gray-700">
            {showCreateNew && (
              <Button
                onClick={handleCreateNew}
                variant="primary-green"
                className="w-full"
                size="default"
                // className="w-full flex items-center justify-center gap-2 bg-primary-green sbg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg p-3 mb-3 transition-all duration-200 shadow-lg group"
              >
                <FiPlus className="text-black" size={18} />
                <span className="text-black text-sm font-semibold group-hover:scale-105 transition-transform">
                  Create New
                </span>
              </Button>
            )}
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-3 mt-4">
              Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 bg-gray-800/30 hover:bg-gray-800/60 rounded-lg p-3 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-200 group">
                <FiDownload className="text-gray-400 group-hover:text-blue-400" size={18} />
                <span className="text-gray-300 text-sm group-hover:text-white">Export</span>
              </button>
              <button className="w-full flex items-center gap-3 bg-gray-800/30 hover:bg-gray-800/60 rounded-lg p-3 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-200 group">
                <FiShare2 className="text-gray-400 group-hover:text-blue-400" size={18} />
                <span className="text-gray-300 text-sm group-hover:text-white">Share</span>
              </button>
              <button className="w-full flex items-center gap-3 bg-gray-800/30 hover:bg-gray-800/60 rounded-lg p-3 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-200 group">
                <FiSettings className="text-gray-400 group-hover:text-blue-400" size={18} />
                <span className="text-gray-300 text-sm group-hover:text-white">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <>
        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden fixed top-4 left-4 z-50 bg-[#1e2939] text-white p-2 rounded-lg shadow-lg border border-gray-700"
        >
          {isMobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        {/* Mobile Sidebar Overlay */}
        {/* <AnimatePresence> */}
        {isMobileOpen && (
          <>
            {/* <div
              onClick={toggleMobileSidebar}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            /> */}
            <div className="lg:hidden fixed left-0 top-0 h-full w-72 bg-[#1e2939] z-40 shasdow-2xl">
              {sidebarContent}
            </div>
          </>
        )}
        {/* </AnimatePresence> */}

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block relative h-screen bg-[#1e2939] border-r border-gray-700 overflow-hidden">
          {isOpen && <div className="w-72 h-full ">{sidebarContent}</div>}
          {/* <button
            onClick={toggleSidebar}
            className="absolute top-4 -right-3 bg-[#1e2939] text-white p-1.5 rounded-full shadow-lg border border-gray-700 hover:bg-gray-800 transition-colors z-10"
          >
            {isOpen ? <HiX size={16} /> : <HiMenu size={16} />}
          </button> */}
        </aside>

        {/* Delete Confirmation Dialog */}
        <Dialog
          isOpen={deleteDialog.isOpen}
          onClose={() => setDeleteDialog({ isOpen: false, docId: null })}
          title="Delete Document"
          message={`Are you sure you want to delete "${
            recentDocuments.find((d) => d.id === deleteDialog.docId)?.name || "this document"
          }"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteConfirm}
          variant="danger"
        />
      </>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function to prevent unnecessary re-renders
    if (prevProps.currentDocumentName !== nextProps.currentDocumentName) return false;
    if (prevProps.currentDocumentId !== nextProps.currentDocumentId) return false;
    if (prevProps.showCreateNew !== nextProps.showCreateNew) return false;
    if (prevProps.recentDocuments?.length !== nextProps.recentDocuments?.length) return false;
    if (prevProps.onDocumentSelect !== nextProps.onDocumentSelect) return false;

    const documentsEqual = prevProps.recentDocuments?.every((doc, index) => {
      const nextDoc = nextProps.recentDocuments?.[index];
      return (
        nextDoc && doc.id === nextDoc.id && doc.name === nextDoc.name && doc.date === nextDoc.date
      );
    });

    return documentsEqual ?? true;
  }
);

DocumentSidebar.displayName = "DocumentSidebar";

export default DocumentSidebar;
