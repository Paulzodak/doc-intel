"use client";

import { LegalList, LegalPageShell } from "@/components/legal/LegalPageShell";

const LAST_UPDATED = "August 7, 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      eyebrow="Privacy Policy"
      title="How we protect what you trust us with"
      description="Qlarety analyzes legal documents with AI. This policy explains what we collect, how document content is handled, and the choices you have — written for clarity, not legalese theater."
      lastUpdated={LAST_UPDATED}
      alternate={{ label: "View Terms of Service →", href: "/terms" }}
      sections={[
        {
          id: "overview",
          title: "Overview",
          content: (
            <>
              <p>
                Qlarety (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides AI-assisted
                legal document analysis — including risk and compliance grading, clause
                highlighting, and related insights. We process personal data and document content to
                operate that service.
              </p>
              <p>
                This Privacy Policy applies to qlarety.com, our web application, and related
                services (collectively, the &quot;Service&quot;). By using the Service, you agree to
                this policy. If you do not agree, please do not use Qlarety.
              </p>
            </>
          ),
        },
        {
          id: "data-we-collect",
          title: "Information we collect",
          content: (
            <>
              <p>
                <strong className="font-semibold text-[#11161f] dark:text-white">
                  Account &amp; identity.
                </strong>{" "}
                Name, email address, authentication identifiers, and profile details you provide —
                including when you sign in with Google, GitHub, Microsoft, or email / magic link.
              </p>
              <p>
                <strong className="font-semibold text-[#11161f] dark:text-white">
                  Document content.
                </strong>{" "}
                Files, scans, and text you upload or paste for analysis (for example PDF or DOCX
                contracts), plus derived outputs such as grades, highlights, chat responses, and
                exports.
              </p>
              <p>
                <strong className="font-semibold text-[#11161f] dark:text-white">
                  Usage &amp; device.
                </strong>{" "}
                Log data, approximate location from IP, browser/device type, pages viewed, feature
                usage, and diagnostic events that help us keep the Service reliable and secure.
              </p>
              <p>
                <strong className="font-semibold text-[#11161f] dark:text-white">
                  Communications.
                </strong>{" "}
                Messages you send via contact forms, support email, or in-product feedback.
              </p>
              <LegalList
                items={[
                  "Billing and subscription details when you purchase a paid plan (processed by our payment providers).",
                  "Preferences such as language and model / engine selections in the product.",
                  "Cookies and similar technologies needed for sessions, security, and product analytics.",
                ]}
              />
            </>
          ),
        },
        {
          id: "documents",
          title: "How we handle your documents",
          content: (
            <>
              <p>
                Your documents are the core of the product. We process them solely to provide
                analysis features you request — extraction, risk/compliance grading, highlights,
                summaries, and conversational assistance about the document.
              </p>
              <LegalList
                items={[
                  "Document content is transmitted over encrypted connections (HTTPS/TLS).",
                  "Access to stored documents is limited to your account (and people you explicitly share with, if sharing is enabled).",
                  "We may use subprocessors (cloud hosting and AI model providers) under contractual confidentiality and data-processing terms to run analysis.",
                  "We do not sell your document content.",
                  "We do not use your uploaded documents to publicly train general-purpose AI models for unrelated products. Where a model provider’s terms allow limited operational improvement of the Service under your settings or agreement, we will describe that transparently in-product or in an update to this policy.",
                ]}
              />
              <p>
                You remain responsible for ensuring you have the right to upload and process any
                document (including personal data of third parties contained in contracts).
              </p>
            </>
          ),
        },
        {
          id: "how-we-use",
          title: "How we use information",
          content: (
            <>
              <p>We use personal data and content to:</p>
              <LegalList
                items={[
                  "Provide, maintain, and improve the Service and its AI analysis features.",
                  "Authenticate users, secure accounts, and prevent abuse or fraud.",
                  "Personalize settings (language, engine preferences) and remember your workspace state.",
                  "Communicate about the Service — transactional email, security notices, and (with consent where required) product updates.",
                  "Comply with law, enforce our Terms, and protect rights, safety, and integrity of users and Qlarety.",
                  "Analyze aggregated or de-identified usage trends to improve reliability and UX.",
                ]}
              />
            </>
          ),
        },
        {
          id: "sharing",
          title: "When we share information",
          content: (
            <>
              <p>We share information only as needed to run Qlarety:</p>
              <LegalList
                items={[
                  "Service providers / subprocessors — hosting, authentication, email delivery, analytics, payments, and AI inference — bound by contracts that limit use of your data.",
                  "Sharing features — if you share a document or link, recipients see what you authorize.",
                  "Legal requirements — when required by law, regulation, legal process, or to protect vital interests.",
                  "Business transfers — in connection with a merger, acquisition, or asset sale, with notice where appropriate.",
                ]}
              />
              <p>We do not sell personal information as that term is commonly understood.</p>
            </>
          ),
        },
        {
          id: "retention",
          title: "Retention & deletion",
          content: (
            <>
              <p>
                We retain account data and documents for as long as your account is active and as
                needed to provide the Service. You may delete documents from your workspace when
                that capability is available; residual copies may remain briefly in backups.
              </p>
              <p>
                If you close your account, we delete or anonymize personal data within a reasonable
                period, unless we must retain it for legal, security, or dispute-resolution reasons.
                Contact us if you need help with a deletion request.
              </p>
            </>
          ),
        },
        {
          id: "security",
          title: "Security",
          content: (
            <>
              <p>
                We use administrative, technical, and organizational measures designed to protect
                data — including encryption in transit, access controls, and monitoring. No method
                of transmission or storage is perfectly secure; we cannot guarantee absolute
                security.
              </p>
              <p>
                Please use a strong unique password (where applicable), protect magic-link emails,
                and notify us promptly of any suspected unauthorized access.
              </p>
            </>
          ),
        },
        {
          id: "rights",
          title: "Your choices & rights",
          content: (
            <>
              <p>
                Depending on where you live, you may have rights to access, correct, delete, or
                export personal data, object to or restrict certain processing, and withdraw
                consent. You may also have the right to lodge a complaint with a supervisory
                authority.
              </p>
              <p>
                To exercise these rights, email{" "}
                <a
                  href="mailto:contact@qlarety.com"
                  className="font-semibold text-[#11161f] underline decoration-primary-green/40 underline-offset-4 dark:text-white"
                >
                  contact@qlarety.com
                </a>
                . We may need to verify your identity before fulfilling a request.
              </p>
            </>
          ),
        },
        {
          id: "international",
          title: "International transfers",
          content: (
            <p>
              Qlarety may process data in countries other than where you live, including where our
              infrastructure or AI providers operate. Where required, we use appropriate safeguards
              (such as standard contractual clauses) for cross-border transfers.
            </p>
          ),
        },
        {
          id: "children",
          title: "Children",
          content: (
            <p>
              The Service is built for professional and business use and is not directed to children
              under 16 (or the equivalent minimum age in your jurisdiction). We do not knowingly
              collect personal data from children. If you believe a child has provided data, contact
              us and we will take appropriate steps.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          content: (
            <p>
              We may update this Privacy Policy from time to time. We will revise the &quot;Last
              updated&quot; date and, for material changes, provide additional notice (for example
              in-product or by email). Continued use of the Service after changes take effect
              constitutes acceptance of the updated policy.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          content: (
            <>
              <p>For privacy questions or requests:</p>
              <LegalList
                items={[
                  "Email: contact@qlarety.com",
                  "Web: qlarety.com/contact-us",
                  "Location: Lagos, Nigeria",
                ]}
              />
            </>
          ),
        },
      ]}
    />
  );
}
