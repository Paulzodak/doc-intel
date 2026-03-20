"use client";

import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/api/document/convert-to-pdf";

export default function ConvertToPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    setStatus("uploading");
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("document", file);
      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setStatus("done");
      setMessage("Upload successful.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Upload failed.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 shrink-0">
        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-1">File</span>
          <input
            type="file"
            onChange={(e) => {
              const f = e.target.files?.[0];
              setFile(f ?? null);
              setStatus("idle");
            }}
            className="block w-full text-sm text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
          />
        </label>
        <button
          type="submit"
          disabled={!file || status === "uploading"}
          className="w-full py-2 px-4 bg-gray-800 text-white text-sm font-medium rounded hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          {status === "uploading" ? "Uploading…" : "Submit"}
        </button>
        {message && (
          <p
            className={`text-sm ${status === "error" ? "text-red-600" : "text-gray-600"}`}
            role="status"
          >
            {message}
          </p>
        )}
      </form>

      {pdfUrl && (
        <div className="mt-6 flex-1 min-h-0 flex flex-col gap-2">
          <a
            href={pdfUrl}
            download="converted.pdf"
            className="inline-flex items-center gap-2 py-2 px-4 bg-gray-800 text-white text-sm font-medium rounded hover:bg-gray-700 w-fit"
          >
            Download PDF
          </a>
          <iframe
            src={pdfUrl}
            title="Converted PDF"
            className="flex-1 w-full min-h-[400px] border border-gray-200 rounded bg-white"
          />
        </div>
      )}
    </div>
  );
}
