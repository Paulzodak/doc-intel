import type { ElementType } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookMarked,
  FileDown,
  FileText,
  Image as ImageIcon,
  Link2,
  MessagesSquare,
  QrCode,
  Sparkles,
  Users,
} from "lucide-react";
import { FiAlertTriangle, FiAlignLeft, FiCheckCircle, FiInfo } from "react-icons/fi";

/** Hero carousel autoplay interval (ms). */
export const LANDING_HERO_SLIDE_INTERVAL_MS = 5500;

/** Demo grading-style percentages shown on the analysis slide. */
export const landingAnalysisScores = {
  risk: 28,
  advantages: 44,
  compliance: 52,
  overall: 78,
} as const;

export type AnalysisFocus = "summary" | "risk" | "advantage" | "compliance";

export const landingAnalysisFocusCopy: Record<
  AnalysisFocus,
  { headline: string; body: string; panelHint: string }
> = {
  summary: {
    headline: "Document summary",
    body: "Collapsible summary lives in the analysis panel next to grading scores—exactly like the live Grading view.",
    panelHint: "Grading → Summary",
  },
  risk: {
    headline: "Risk score & highlights",
    body: "Risk items from analysis drive the risk meter and appear as marked passages in the document reader.",
    panelHint: "Grading → Scores · Key points",
  },
  advantage: {
    headline: "Advantages",
    body: "Positive clauses are classified separately so benefits do not get lost inside generic “issues” lists.",
    panelHint: "Grading → Advantages",
  },
  compliance: {
    headline: "Compliance signals",
    body: "Compliance-tagged highlights feed the compliance score and detail rows in the Details tab.",
    panelHint: "Details · Compliance",
  },
};

export const landingAnalysisFindings: {
  id: AnalysisFocus;
  label: string;
  snippet: string;
  Icon: ElementType;
  barClass: string;
  iconClass: string;
}[] = [
  {
    id: "summary",
    label: "Summary",
    snippet: "Executive overview of scope, term, and renewal—same block as the Grading tab.",
    Icon: FiAlignLeft,
    barClass: "bg-primary-green",
    iconClass: "text-primary-green",
  },
  {
    id: "risk",
    label: "Risk",
    snippet: "Unlimited liability clause flagged—matches in-text risk highlights.",
    Icon: FiAlertTriangle,
    barClass: "bg-amber-500",
    iconClass: "text-amber-600",
  },
  {
    id: "advantage",
    label: "Advantages",
    snippet: "Favorable termination notice and IP carve-outs surfaced as positives.",
    Icon: FiCheckCircle,
    barClass: "bg-emerald-600",
    iconClass: "text-emerald-600",
  },
  {
    id: "compliance",
    label: "Compliance",
    snippet: "Data processing and audit rights aligned with checklist-style review.",
    Icon: FiInfo,
    barClass: "bg-sky-600",
    iconClass: "text-sky-600",
  },
];

export const landingAiChatFeatures: {
  id: string;
  title: string;
  detail: string;
  Icon: LucideIcon;
}[] = [
  {
    id: "grounded",
    title: "Clause-grounded answers",
    detail:
      "Responses tie back to real sections in your file—so you can verify every claim in context.",
    Icon: BookMarked,
  },
  {
    id: "thread",
    title: "Threaded follow-ups",
    detail:
      "Ask narrower questions, compare clauses, or stress-test obligations without starting over.",
    Icon: MessagesSquare,
  },
  {
    id: "pace",
    title: "Review at your pace",
    detail: "Skim highlights, dig into risk, or export phrasing when you are ready to share or file.",
    Icon: Sparkles,
  },
];

export const landingChatDemo = {
  title: "Ask your document",
  documentName: "MSA — Acme × Northwind.pdf",
  userMessage: "What are the termination conditions in this MSA?",
  assistantLeadIn: "Either party may terminate with ",
  assistantEmphasis: "60 days' written notice",
  assistantRest:
    ". Immediate termination applies for uncured material breach after 30 days, or for insolvency events.",
  composerPlaceholder: "Ask a follow-up…",
  sendLabel: "Send",
} as const;

export const landingAiChatPanelCopy = {
  title: "Turn documents into dialogue",
  subtitle:
    "One panel for questions, citations, and next steps—built for contract and policy review.",
} as const;

export const landingAnalysisPanelCopy = {
  workspaceTitle: "Detailed Summary and Analysis",
  findingsHeading: "Key findings",
  findingsSubheading: "Linked to highlights in your document",
} as const;

export const landingShareDemo = {
  modalTitle: "Share document",
  documentName: "MSA — Acme × Northwind.pdf",
  linkLabel: "Link",
  linkDisplay: "https://app.example.com/share?id=acme-msa-7f2a",
  copyLabel: "Copy",
  copiedLabel: "Copied",
  qrLabel: "Scan to open",
  qrHint: "Others can scan this QR code to open the document",
  peopleLabel: "People with access",
  peopleHint: "Select users to grant access to this document",
  saveLabel: "Save",
} as const;

export type ShareDemoFocus = "link" | "access" | "invite";

export const landingShareAccessPeople = ["Avery Kim", "Jordan Lee"] as const;

export const landingShareFeatureTabs: {
  id: ShareDemoFocus;
  title: string;
  detail: string;
  Icon: LucideIcon;
}[] = [
  {
    id: "link",
    title: "Link & QR",
    detail:
      "Copy a share URL or show a QR code—same flow as the Share modal on every document.",
    Icon: Link2,
  },
  {
    id: "access",
    title: "People with access",
    detail:
      "Grant teammates access by user; permissions sync with your workspace list, then Save.",
    Icon: Users,
  },
  {
    id: "invite",
    title: "Controlled sharing",
    detail:
      "Shared links respect who you add—recipients open the document in the dedicated share view.",
    Icon: QrCode,
  },
];

export const landingSharePanelCopy = {
  title: "Share without leaving review",
  subtitle:
    "From the document toolbar: Share opens the modal with link, QR, and allowed users—just like production.",
} as const;

export const landingExportDemo = {
  documentName: "Vendor Agreement — Draft 4.pdf",
  previewBefore: "Payment terms: Net ",
  previewHighlight: "45",
  previewAfter: " days from invoice. ",
  previewRisk: "Late fees",
  previewAfterRisk: " apply per Exhibit B.",
  exportTriggerLabel: "Export content",
  downloadLabel: "Download",
  formatPdf: "PDF",
  formatPng: "PNG",
} as const;

export type ExportDemoFocus = "preview" | "formats" | "download";

export const landingExportFeatureTabs: {
  id: ExportDemoFocus;
  title: string;
  detail: string;
  Icon: LucideIcon;
}[] = [
  {
    id: "preview",
    title: "Highlighted preview",
    detail:
      "The export dialog shows rendered HTML with analysis highlights—what you see is what ships.",
    Icon: FileText,
  },
  {
    id: "formats",
    title: "PDF or PNG",
    detail:
      "Pick PDF or PNG from the format toggle; the app posts highlighted HTML to the render API.",
    Icon: ImageIcon,
  },
  {
    id: "download",
    title: "One-tap download",
    detail:
      "Download uses the blob from the server response and the filename from Content-Disposition.",
    Icon: FileDown,
  },
];

export const landingExportPanelCopy = {
  title: "Export with highlights intact",
  subtitle:
    "Export content opens a preview modal, then Download runs the same pipeline as the document workspace.",
} as const;
