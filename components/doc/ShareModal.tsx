"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { ShareIcon } from "@/assets/svg/ShareIcon";
import { CloseIcon } from "@/assets/svg/CloseIcon";
import { Copy } from "lucide-react";
import { Document } from "@/types/document";
import { useUpdateDocument } from "@/data/document";
import { useUserSearch } from "@/data/user";
import { Button } from "@/components/ui/button";
import { SpinnerLoader } from "../ui/SpinnerLoader";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  docId: string;
  documentName?: string;
  docData: Document;
}

interface ShareUser {
  id: string;
  username?: string;
  email?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  docId,
  documentName,
  docData,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<ShareUser[]>(() => {
    const permissionIds = Array.isArray(docData.permission) ? docData.permission : [];
    return permissionIds.map((id: string) => ({ id }));
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);

  const updateDocument = useUpdateDocument();
  const {
    data: searchedUser,
    refetch: searchUser,
    isFetching: isSearching,
  } = useUserSearch(searchQuery.trim());

  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}/share?id=${docData.id}` : "";

  const handleCopyLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const handleSelectUser = useCallback((user: ShareUser) => {
    setSelectedUsers((prev) => (prev.some((u) => u.id === user.id) ? prev : [...prev, user]));
    setSearchQuery("");
    setSearchError(null);
  }, []);

  const handleRemoveUser = useCallback((userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId));
  }, []);

  const handleSearchUser = useCallback(async () => {
    const query = searchQuery.trim();
    if (!query) return;

    setSearchError(null);

    try {
      const { data } = await searchUser();
      if (!data?.id) {
        setSearchError("No user found");
      }
    } catch {
      setSearchError("Could not find user");
    }
  }, [searchQuery, searchUser]);

  const handleSaveAllowedUsers = useCallback(() => {
    updateDocument.mutate(
      {
        documentId: docId,
        data: { permission: selectedUsers.map((user) => user.id) },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  }, [selectedUsers, updateDocument, onClose, docId]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-jakarta">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShareIcon size={20} color="#374151" />
              <h3 className="text-base font-semibold text-gray-900">Share document</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <CloseIcon size={18} color="#6b7280" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {documentName && (
              <p className="text-sm text-gray-500 truncate" title={documentName}>
                {documentName}
              </p>
            )}

            {/* Copy link */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 min-w-0 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 shrink-0 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Copy size={14} />
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* QR code */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Scan to open</label>
              <div className="flex justify-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                <QRCodeSVG
                  value={shareUrl}
                  size={160}
                  level="M"
                  bgColor="#f9fafb"
                  fgColor="#111827"
                  marginSize={1}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5 text-center">
                Others can scan this QR code to open the document
              </p>
            </div>

            {/* Allowed users */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                People with access
              </label>
              {selectedUsers.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedUsers.map((user) => {
                    return (
                      <span
                        key={user.id}
                        className="inline-flex items-center gap-1.5 rounded-full border border-input bg-muted/50 px-2.5 py-1 text-xs text-gray-500"
                      >
                        <span className="truncate max-w-[120px]">
                          {user.username ?? user.email ?? user.id}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveUser(user.id)}
                          className="shrink-0 p-0.5 hover:bg-muted rounded-full transition-colors"
                          aria-label={`Remove ${user.username ?? user.id}`}
                        >
                          <CloseIcon size={12} color="#374151" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search user by email or username"
                  className="flex-4 min-w-0 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSearchUser}
                  disabled={isSearching || !searchQuery.trim()}
                  className="h-10 flex-1 text-sm text-gray-500"
                >
                  {isSearching ? <SpinnerLoader /> : "Search"}
                </Button>
              </div>
              {searchedUser && (
                <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-2.5">
                  <div className="text-xs text-gray-700">
                    <p className="font-medium">{searchedUser.username ?? "Unknown user"}</p>
                    <p className="text-gray-500">{searchedUser.email ?? searchedUser.id}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectUser(searchedUser)}
                    className="mt-2 text-xs font-medium text-green-700 hover:text-green-800"
                  >
                    Add user
                  </button>
                </div>
              )}
              {searchError && <p className="text-xs text-red-500 mt-1">{searchError}</p>}
              <p className="text-xs text-muted-foreground mt-1">
                Search users to grant access to this document
              </p>
            </div>

            <Button
              type="button"
              variant="default"
              // className="bg-primary-green font-nunito border-none w-full msx-auto !px-12 !h-10 !text-black text-legal-navy px-4 py-2 rounded-xl text-sm font-extrabold shadow-lg shadow-primary-green/30 hover:scale-105 transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
              // className="bg-green-600  text-sm w-full  text-white  shsadow-2xl shadsow-black/50 shadow-none rounded-full py-3 border-0 hover:opacity-90"
              onClick={handleSaveAllowedUsers}
              disabled={updateDocument.isPending}
            >
              {updateDocument.isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
