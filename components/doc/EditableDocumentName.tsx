"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Pencil } from "lucide-react";
import { DocumentTextIcon } from "@/assets/svg/DocumentTextIcon";
import { useUpdateDocument } from "@/data/document";
import { CheckIcon } from "@/assets/svg/CheckIcon";
import { CloseIcon } from "@/assets/svg/CloseIcon";
import { Document } from "@/types/document";

interface EditableDocumentNameProps {
  docData: Document;
}

const EditableDocumentName: React.FC<EditableDocumentNameProps> = ({ docData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(docData.documentName);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateDocument, isPending: isUpdating } = useUpdateDocument();

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleAccept = () => {
    const trimmed = editedName.trim();
    if (!trimmed || trimmed === docData.documentName) {
      setEditedName(docData.documentName);
      setIsEditing(false);
      return;
    }
    updateDocument(
      { documentId: docData.id, data: { documentName: trimmed } },
      {
        onSuccess: () => setIsEditing(false),
        onError: () => setEditedName(docData.documentName),
      },
    );
  };

  const handleCancel = () => {
    setEditedName(docData.documentName);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAccept();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <div className="flex gap-2 items-center min-w-0">
      <DocumentTextIcon size={20} className="shrink-0" color="#6a7282" />
      {isEditing && !docData.externalDocId ? (
        <div className="flex items-center gap-1.5 min-w-0">
          <input
            ref={inputRef}
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isUpdating}
            className="text-lg sm:text-xl font-bold text-gray-900 font-jakarta bg-gray-50 border border-gray-300 rounded-lg px-2 py-0.5 outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 min-w-0 w-full max-w-xs transition-colors"
          />
          <button
            type="button"
            onClick={handleAccept}
            disabled={isUpdating}
            className="p-1.5 rounded-lg bsg-primary-green/10 text-gray-400 hover:bg-gray-300/20 transition-colors disabled:opacity-50"
          >
            <CheckIcon color="#99a1af" size={16} />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isUpdating}
            className="p-1.5 rounded-lg bsg-red-50 text-gray-400 hover:bg-gray-300/20 transition-colors disabled:opacity-50"
          >
            <CloseIcon color="#99a1af" size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="group flex items-center gap-1.5 min-w-0  cursor-pointer"
        >
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 font-jakarta truncate min-w-0 flex-1 max-w-[15ch] sm:max-w-none">
            {docData.documentName}
          </h2>
          {!docData.externalDocId && (
            <Pencil
              size={14}
              className="shrink-0 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          )}
        </button>
      )}
    </div>
  );
};

export default EditableDocumentName;
