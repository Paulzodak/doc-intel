# Qlarety — Admin Console Specification

**Version:** 1.0  
**Date:** March 25, 2026  
**Status:** Draft  
**Related:** [Product Specification](./product-spec.md)

---

## 1. Purpose

This document defines capabilities for an **admin console** used by Qlarety operators (internal staff and, where applicable, customer organization administrators). It complements end-user features in the product specification: document analysis, libraries, sharing, and planned tiers (Basic, Pro, Enterprise).

Goals:

- Operate the platform safely (abuse response, incident handling).
- Support users and debug failed or stuck work.
- Configure product behavior (AI engines, feature flags) without code deploys where possible.
- Meet compliance and enterprise expectations (audit, retention, delegated admin).

---

## 2. Admin Personas and Roles

| Role | Typical use |
|------|-------------|
| **Super admin** | Full platform configuration, destructive actions, billing overrides. |
| **Support admin** | User lookup, read-only or limited write (e.g. resend verification), job/document visibility for troubleshooting. |
| **Security / compliance** | Audit exports, retention policies, data subject requests. |
| **Customer org admin (Enterprise)** | Users and seats within their organization, SSO/domain settings if offered. |

**Requirements**

- Role-based access control (RBAC): each capability is gated by role.
- Strong authentication for all admin accounts (MFA recommended).
- **Audit log** of privileged actions: who, what, target entity, timestamp, outcome.

---

## 3. User Administration

| Feature | Description |
|---------|-------------|
| User directory | Search and filter by email, username, verification status, plan, created date. |
| User detail | View account state, verification, plan, key timestamps; optional internal notes (support). |
| Account controls | Suspend, unsuspend, or ban user; revoke active sessions where the stack supports it. |
| Guest usage oversight | Metrics or lists keyed by guest identifier / IP (as available); configurable rate limits; optional disable of guest analysis during abuse. |

**Support-oriented (policy-dependent)**

- **Impersonation** or **read-only “view as user”** for reproducing issues, with mandatory audit entries and time limits.

---

## 4. Documents and Analysis Jobs

| Feature | Description |
|---------|-------------|
| Document index | List documents with owner, name, status, created/updated timestamps, visibility level. |
| Job / processing view | Background analysis jobs: status, errors, engine used, retries. |
| Operational actions | Retry failed jobs; cancel stuck jobs; mark jobs for investigation. |
| Incident response | Force document to **Me Only**; revoke or invalidate share links where the product supports link-based access. |
| Data lifecycle | Soft-delete, hard-delete, or purge aligned with published retention policy; admin-triggered purge for legal/compliance (with audit). |

---

## 5. Sharing and Visibility

| Feature | Description |
|---------|-------------|
| Visibility audit | Surfaces documents with **Public** visibility for review. |
| Share revocation | Remove specific grants or invalidate links without logging in as the user (within policy). |

---

## 6. AI and Product Configuration

| Feature | Description |
|---------|-------------|
| Engine catalog | Enable/disable analysis engines; set default engine; control which engines are **Pro** or enterprise-only. |
| Feature flags | Toggle planned or rolled-out features (e.g. AI Chat, OCR, additional languages) per environment or cohort. |
| Limits and quotas | Upload size, analyses per period, concurrent jobs—configurable where the backend supports it. |

---

## 7. Compliance, Privacy, and Audit

| Feature | Description |
|---------|-------------|
| Admin audit log | Query and export records of admin actions. |
| User data export | Export of a user’s documents and metadata where required for data portability or legal process (policy-governed). |
| User data deletion | End-to-end deletion or anonymization workflow (e.g. GDPR-style erasure), with confirmation and audit trail. |
| Retention policies | Configure automated deletion or archival windows consistent with customer-facing privacy commitments. |

---

## 8. Commercial and Billing (When Implemented)

| Feature | Description |
|---------|-------------|
| Plans and entitlements | Assign or override plan (Basic / Pro / Enterprise); trial and credit grants. |
| Organization billing | Seat counts, invoice hooks, or integration with payment provider (scope depends on billing implementation). |
| Usage reporting | Analyses, uploads, and approximate API/model usage by user, org, and period—for support and cost visibility. |

---

## 9. Content and Communications (Optional)

| Feature | Description |
|---------|-------------|
| System banners | Maintenance or incident messages shown in-app. |
| Configurable links | Central place for legal URLs (Terms, Privacy) if not only static in code. |
| Contact / lead queue | If contact or demo forms need an internal workflow, surface submissions to support or sales. |

---

## 10. Phased Rollout Suggestion

| Phase | Scope |
|-------|--------|
| **MVP** | RBAC, audit log for admin actions, user directory + suspend/ban, document/job list with retry/cancel, engine enable/default and basic feature flags, share revocation / visibility tools for incidents. |
| **Next** | Retention jobs, data export/delete workflows, impersonation or view-as with strict logging, guest abuse dashboards. |
| **Enterprise** | Org-level admin, SSO/domain controls, seat management, billing integration and usage dashboards. |

---

## 11. Open Questions

- Which actions require two-person approval or break-glass procedures?
- Jurisdictions and retention: minimum/maximum retention per region or customer contract?
- Whether customer org admins get a separate “tenant admin” product surface vs. a single internal admin app with tenant scoping.

---

## 12. Glossary

| Term | Definition |
|------|------------|
| **Admin console** | Privileged UI (and APIs) for operators, distinct from the end-user dashboard. |
| **RBAC** | Role-based access control for admin capabilities. |
| **Entitlement** | A boolean or numeric capability derived from plan (e.g. access to Pro engines). |
