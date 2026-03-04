# Qlarety — Product Specification Document

**Version:** 1.0
**Date:** February 4, 2026
**Status:** Living Document

---

## 1. Product Overview

### 1.1 Purpose

Qlarety is an AI-powered document intelligence platform that automates the review and analysis of legal documents. It identifies risks, advantages, and compliance issues within contracts, agreements, and regulatory documents, delivering actionable insights in seconds rather than hours.

### 1.2 Target Users

| Segment | Description |
|---|---|
| Legal professionals | Lawyers and paralegals reviewing contracts and agreements |
| Corporate legal teams | In-house counsel managing high volumes of contracts |
| Compliance teams | Officers ensuring adherence to regulatory requirements |
| Legal firms | Practices seeking to scale contract review capacity |
| Business stakeholders | Non-legal professionals who need to understand contract implications |

### 1.3 Value Proposition

- Analyze legal documents instantly with AI-powered insights
- Reduce manual contract review time by up to 65%
- Surface risks, advantages, and compliance issues automatically
- Enable collaboration through document sharing and permissions
- Support multiple input methods: file upload, OCR scanning, and text paste

---

## 2. User Roles and Access

### 2.1 Guest User

- Can upload and analyze documents without creating an account
- Documents are tied to a browser-generated guest identifier
- Limited to core analysis features
- No document sharing or collaboration capabilities

### 2.2 Registered User

- Full access to all platform features
- Persistent document library across sessions
- Document sharing and permission management
- Profile and account management

---

## 3. Authentication

### 3.1 Registration

- **Fields:** Username, email, password
- **Requirement:** User must accept terms of service before proceeding
- **Post-registration:** User is directed to check their inbox for a verification email
- **Email verification:** Required before full account activation; verification link opens the app and confirms the account automatically

### 3.2 Login

- **Email and password:** Standard credential-based login
- **Magic link:** Passwordless option — user enters their email, receives a one-time login link, and is authenticated upon clicking it

### 3.3 Social Login (Planned)

- Google
- Apple
- GitHub

---

## 4. Core Feature: Document Analysis

### 4.1 Document Input

Users can submit documents for analysis through three methods:

| Method | Description |
|---|---|
| **File Upload** | Drag-and-drop or file picker. Supported formats: PDF, DOCX, TXT. Maximum file size enforced. |
| **OCR Scan** | Capture an image of a physical document using the device camera. Text is extracted via optical character recognition. |
| **Text Paste** | Paste document text directly into a text field for immediate analysis. |

### 4.2 Processing Options

- **Analysis type:** Full (comprehensive) or Quick (summary-level)
- **AI Engine selection:** Users can select the AI model used for analysis. The default engine is available to all users. Premium engines (marked "Pro") are reserved for upgraded plans.
- **Language:** English is the default supported language. Additional languages (French, Spanish, German, Italian, Portuguese) are planned for future release.

### 4.3 Analysis Output

Once processing completes, the platform produces the following:

#### 4.3.1 Document Highlights

The original document text is displayed with inline highlights in three categories:

| Category | Color | Meaning |
|---|---|---|
| **Risk** | Red | Clauses or phrases that pose legal, financial, or operational risk |
| **Advantage** | Green | Favorable terms, protections, or beneficial clauses |
| **Compliance** | Yellow | Regulatory or compliance-related observations |

Each highlight is clickable and reveals a detailed description of the finding.

#### 4.3.2 Grading

A quantitative assessment is provided across four dimensions:

| Score | Range | Interpretation |
|---|---|---|
| **Risk** | 0–100 | Lower is better. Measures exposure to unfavorable terms. |
| **Advantages** | 0–100 | Higher is better. Measures presence of favorable terms. |
| **Compliance** | 0–100 | Higher is better. Measures regulatory alignment. |
| **Overall** | 0–100 | Composite score: `((100 − Risk) + Advantages + Compliance) / 3` |

#### 4.3.3 Key Points

A list of the most important findings extracted from the document, each with a short description.

#### 4.3.4 Legal Document Detection

The system assesses whether the submitted text is a legal document and provides a confidence score for that determination.

### 4.4 AI Chat (Planned)

An interactive Q&A interface where users can ask follow-up questions about the analyzed document. The AI responds with context-aware answers grounded in the document content.

---

## 5. Document Management

### 5.1 Document Library

- All analyzed documents are saved and accessible from the sidebar
- Documents display their name, last updated date, and processing status
- The most recent 10 documents are shown by default
- External documents (imported from integrations) are visually distinguished with a lock indicator

### 5.2 Document Naming

- Documents are automatically named upon creation (e.g., "Document abc123")
- Users can rename documents inline by clicking the document title in the content view
- The title switches to an editable input field with accept (checkmark) and cancel (X) controls
- Keyboard shortcuts: Enter to save, Escape to cancel

### 5.3 Document Deletion

- Documents can be deleted from the sidebar context menu
- Deletion removes the document from the user's library
- Deletion is immediate; no confirmation dialog currently implemented

### 5.4 Document Search

- A search bar is available in the dashboard top bar
- Keyboard shortcut hint (Cmd+F) is displayed

---

## 6. Sharing and Collaboration

### 6.1 Visibility Settings

Each document has a visibility level that controls who can access it:

| Level | Label | Behavior |
|---|---|---|
| 1 | **Public** | Anyone with the link can view the document |
| 2 | **Selected Users** | Only specific users granted access can view the document via its link |
| 3 | **Me Only** | Only the document owner can view the document |

The visibility selector is accessible from the document content header and changes take effect immediately.

### 6.2 Share Modal

When sharing a document, users are presented with:

- **Shareable link:** A URL that can be copied to clipboard with one click
- **QR code:** A scannable code for quick mobile access
- **User permissions:** A searchable user selector to grant access to specific individuals
- **Permission list:** Shows all users currently granted access, with the ability to remove individual users
- **Save:** Persists the updated permission list

### 6.3 Shared Document Access

- Recipients access shared documents via a dedicated share URL
- The system validates access permissions before displaying the document
- Invalid or expired links display an appropriate error state

---

## 7. Dashboard

### 7.1 Layout

The authenticated experience uses a three-panel layout:

- **Sidebar (left):** Navigation, recent documents, quick actions
- **Top bar:** Search, notifications, mail
- **Main content area:** Document input or document analysis view

### 7.2 Sidebar

| Section | Contents |
|---|---|
| **Branding** | Qlarety logo |
| **Recent Documents** | Scrollable list of the last 10 analyzed documents, each with name, date, active indicator, and context menu (Open, Delete) |
| **Create New** | Button to start a new document analysis |
| **General** | Settings and Logout links |

### 7.3 New Document View

When no document is selected (or "Create New" is clicked), the main area displays:

- The document input interface (upload, scan, or paste)
- AI engine selector
- Language selector
- "How it works" instructional guidance

### 7.4 Document Analysis View

When viewing an analyzed document, the main area splits into:

- **Document panel (70%):** The document text with inline highlights, the editable document name, visibility and share controls, and highlight category badges
- **Analysis panel (30%):** A tabbed interface with:
  - **Grading tab:** Score cards for Risk, Advantages, Compliance, and Overall. Collapsible sections for Key Points.
  - **AI Chat tab:** Conversational interface for document Q&A (planned feature)
  - **Details tab:** Expanded details for a selected highlight

---

## 8. Public Pages

### 8.1 Landing Page

The public home page communicates the product value through the following sections:

1. **Hero:** Headline ("Analyze legal documents instantly with AI-powered insights"), subheadline, and an embedded document input component so visitors can try the product immediately
2. **Trust bar:** Logos of representative organizations (Lexington, Guardian, Veritas, Future Law)
3. **Use Cases:** Six cards covering Contract Review, Compliance Checking, Legal Due Diligence, Policy Analysis, Agreement Review, and Regulatory Compliance
4. **Product showcase:** Visual demonstrations of the analysis interface, accuracy metrics (99.2%), and collaboration features
5. **Statistics:** 65% productivity increase, 12M+ customers, 50+ countries served
6. **Call to action:** "Start Your Free Analysis" and "Book a Demo" buttons

### 8.2 Contact Page

- **Contact form:** Name, email, company (optional), subject (dropdown), and message
- **Subject options:** Request Demo, Pricing Inquiry, Technical Support, Partnership, Other
- **Contact information:** Email, phone, and physical address displayed alongside the form
- **FAQ section:** Four common questions covering how the product works, supported file formats, data security, and free trial availability
- **Call to action:** "Start Your Free Trial" and "Schedule a Demo" buttons

### 8.3 Navigation Bar

The public-facing navigation includes dropdown menus:

| Menu | Items |
|---|---|
| **Product** | Document Analysis, Risk Assessment, Contract Review, AI Insights, Compliance Checking |
| **Solutions** | By Industry (Legal Firms, Corporate Legal, Compliance Teams), By Use Case (Contract Management, Due Diligence) |
| **Resources** | Blog, AI Features, Document Inspiration, Help Center, Tools |
| **Pricing** | Basic Plan, Pro Plan, Enterprise Plan |

Action buttons: **Login** and **Start Free Trial**

---

## 9. Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| **Desktop (lg+)** | Full sidebar visible, document and analysis panels side by side, all toolbar actions visible |
| **Tablet (md)** | Sidebar collapses to overlay, analysis panel stacks below document content |
| **Mobile (sm)** | Hamburger navigation, single-column layout, analysis panel tabs show icons only, mobile menu overlay for document toolbar actions |

---

## 10. Planned Features

The following features are referenced in the codebase but not yet fully implemented:

| Feature | Status |
|---|---|
| AI Chat (document Q&A) | UI scaffolded, responses simulated |
| Social login (Google, Apple, GitHub) | Hooks created, not wired to UI |
| Settings page | Link present in sidebar, page not implemented |
| Multi-language analysis | Language selector present, only English enabled |
| Premium AI engines | Engine selector present, "Pro" badge on premium options |
| Dashboard statistics/widgets | Dashboard route exists, content minimal |
| Notification system | Bell icon in top bar, no notification logic |
| Mail/inbox system | Mail icon in top bar, no inbox logic |

---

## 11. Pricing Tiers (As Presented)

| Plan | Description |
|---|---|
| **Basic** | Entry-level access (details not yet defined) |
| **Pro** | Access to premium AI engines and advanced features |
| **Enterprise** | Custom solutions for organizations |

*Note: Pricing page content and billing logic are not yet implemented.*

---

## 12. Glossary

| Term | Definition |
|---|---|
| **Highlight** | An annotated span of text within a document, categorized as Risk, Advantage, or Compliance |
| **Grading** | A numerical scoring system (0–100) assessing document risk, advantages, compliance, and overall quality |
| **Visibility** | The access control level of a document (Public, Selected Users, Me Only) |
| **OCR** | Optical Character Recognition — extracting text from images of physical documents |
| **Guest user** | An unauthenticated visitor who can analyze documents without creating an account |
| **External document** | A document imported from an external system, indicated by a lock icon |
| **Job** | A background processing task that tracks the progress of document analysis |
| **Engine** | The AI model used to perform document analysis |
