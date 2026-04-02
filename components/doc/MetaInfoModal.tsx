"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiInfo } from "react-icons/fi";
import { CloseIcon } from "@/assets/svg/CloseIcon";
import { Document, ISidebarDoc } from "@/types/document";
import { useUsers } from "@/data/user";
import { useDoc } from "@/data/document";

interface MetaInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
}

const formatDateTime = (value?: string) => {
  if (!value) return "N/A";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "N/A";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const visibilityLabel = (permission: Document["permission"]) => {
  if (Array.isArray(permission) && permission.length > 0) return "Selected users";
  return "Private / owner-managed";
};

export const MetaInfoModal: React.FC<MetaInfoModalProps> = ({ isOpen, onClose, jobId }) => {
  const { data: doc, isPending: docIsPending } = useDoc(jobId);
  const { data: usersData } = useUsers();
  const users = useMemo(() => usersData?.data ?? [], [usersData?.data]);

  const accessUsers = useMemo(() => {
    if (!Array.isArray(doc?.permission)) return [];
    return doc?.permission.map((id) => {
      const user = users.find((u) => u.id === id);
      return user ? `${user.username} (${user.email})` : id;
    });
  }, [doc?.permission, users]);

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
          className="relative bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
        >
          {!docIsPending && (
            <div>
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiInfo size={18} className="text-gray-700" />
                  <h3 className="text-base font-semibold text-gray-900">File metadata</h3>
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

              <div className="p-4 space-y-3 text-sm">
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="text-gray-500">Name</span>
                  <span className="text-gray-800 break-all">{doc?.documentName || "Untitled"}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="text-gray-500">Created</span>
                  <span className="text-gray-800">{formatDateTime(doc?.createdAt)}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="text-gray-500">Last edited</span>
                  <span className="text-gray-800">{formatDateTime(doc?.updatedAt)}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="text-gray-500">Status</span>
                  <span className="text-gray-800 capitalize">{doc?.status || "N/A"}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="text-gray-500">Visibility</span>
                  {/* <span className="text-gray-800">{visibilityLabel(doc?.permission)}</span> */}
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="text-gray-500">Users with access</span>
                  <div className="text-gray-800">
                    {accessUsers.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {accessUsers.map((user) => (
                          <li key={user} className="break-all">
                            {user}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>None</span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="text-gray-500">External ID</span>
                  <span className="text-gray-800 break-all">{doc?.externalDocId || "N/A"}</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
