"use client";

import { useState, useEffect, useCallback } from "react";

interface DocumentInfo {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "lexoptia-documents";

export function useDocumentNames() {
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);

  // Load documents from localStorage on mount (only once)
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    if (isInitialized) return;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setDocuments(parsed);
      }
      setIsInitialized(true);
    } catch (error) {
      console.error("Failed to load documents from localStorage:", error);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Save documents to localStorage whenever it changes (but only after initialization)
  useEffect(() => {
    if (!isInitialized) return; // Don't save until we've loaded initial data
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    } catch (error) {
      console.error("Failed to save documents to localStorage:", error);
    }
  }, [documents, isInitialized]);

  const getDocumentName = useCallback(
    (docId: string): string => {
      const doc = documents.find((d) => d.id === docId);
      return doc?.name || `Document ${docId.slice(0, 8)}`;
    },
    [documents]
  );

  const setDocumentName = useCallback(
    (docId: string, name: string) => {
      setDocuments((prev) => {
        const existing = prev.find((d) => d.id === docId);
        const now = new Date().toISOString();

        // If document exists with the same name, don't update (prevent unnecessary re-renders)
        if (existing && existing.name === name) {
          return prev;
        }

        if (existing) {
          // Update existing document
          return prev.map((d) =>
            d.id === docId ? { ...d, name, updatedAt: now } : d
          );
        } else {
          // Add new document
          return [
            ...prev,
            {
              id: docId,
              name,
              createdAt: now,
              updatedAt: now,
            },
          ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        }
      });
    },
    []
  );

  const generateUniqueName = useCallback((): string => {
    const now = new Date();
    const timestamp = now.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return `Document ${timestamp}`;
  }, []);

  const getAllDocuments = useCallback((): DocumentInfo[] => {
    return documents;
  }, [documents]);

  const deleteDocument = useCallback((docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  }, []);

  return {
    getDocumentName,
    setDocumentName,
    generateUniqueName,
    getAllDocuments,
    deleteDocument,
    documents, // Expose documents directly for useMemo dependencies
  };
}

