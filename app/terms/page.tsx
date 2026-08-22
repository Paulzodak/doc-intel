"use client";

import { LegalList, LegalPageShell } from "@/components/legal/LegalPageShell";

const LAST_UPDATED = "August 7, 2026";

export default function TermsOfServicePage() {
  return (
    <LegalPageShell
      eyebrow="Terms of Service"
      title="The rules for using Qlarety"
      description="These Terms govern your access to Qlarety’s AI-powered legal document analysis. They are designed to be readable while protecting both you and us — please review them before uploading documents."
      lastUpdated={LAST_UPDATED}
      alternate={{ label: "View Privacy Policy →", href: "/privacy" }}
      sections={[
        {
          id: "agreement",
          title: "Agreement to these Terms",
          content: (
            <>
              <p>
                These Terms of Service (&quot;Terms&quot;) form a binding agreement between you and
                Qlarety regarding the websites, applications, and services we provide (the
                &quot;Service&quot;). By creating an account, accessing, or using the Service, you
                agree to these Terms and our{" "}
                <a
                  href="/privacy"
                  className="font-semibold text-[#11161f] underline decoration-primary-green/40 underline-offset-4 dark:text-white"
                >
                  Privacy Policy
                </a>
                .
              </p>
              <p>
                If you use Qlarety on behalf of an organization, you represent that you have
                authority to bind that organization, and &quot;you&quot; includes that entity.
              </p>
            </>
          ),
        },
        {
          id: "the-service",
          title: "What Qlarety is (and is not)",
          content: (
            <>
              <p>
                Qlarety helps professionals analyze legal documents using AI — including risk and
                compliance grading, clause highlighting, summaries, and conversational Q&amp;A about
                uploaded content.
              </p>
              <p>
                <strong className="font-semibold text-[#11161f] dark:text-white">
                  Qlarety is not a law firm and does not provide legal advice.
                </strong>{" "}
                Outputs are informational decision-support tools. You must independently evaluate
                results and consult qualified counsel for legal decisions. You remain solely
                responsible for how you use analysis results.
              </p>
            </>
          ),
        },
        {
          id: "accounts",
          title: "Accounts & eligibility",
          content: (
            <>
              <LegalList
                items={[
                  "You must be at least 16 (or the age of digital consent in your region) and able to form a binding contract.",
                  "Provide accurate registration information and keep it updated.",
                  "You are responsible for activity under your account and for safeguarding credentials, sessions, and magic-link emails.",
                  "Notify us immediately of any unauthorized use of your account.",
                  "We may suspend or terminate accounts that violate these Terms or pose security risk.",
                ]}
              />
            </>
          ),
        },
        {
          id: "your-content",
          title: "Your documents & content",
          content: (
            <>
              <p>
                You retain ownership of documents and other content you submit (&quot;Customer
                Content&quot;). By uploading or pasting content, you grant Qlarety a limited
                worldwide license to host, process, transmit, display, and create derived outputs
                solely as needed to operate and improve the Service for you.
              </p>
              <p>You represent and warrant that:</p>
              <LegalList
                items={[
                  "You have all rights and permissions needed to submit Customer Content and to allow processing as described.",
                  "Customer Content does not violate law, confidentiality duties, or third-party rights.",
                  "You will not upload malware or attempt to disrupt the Service.",
                ]}
              />
            </>
          ),
        },
        {
          id: "acceptable-use",
          title: "Acceptable use",
          content: (
            <>
              <p>You agree not to:</p>
              <LegalList
                items={[
                  "Use the Service for unlawful, fraudulent, or harmful purposes.",
                  "Reverse engineer, scrape, or overload the Service except as allowed by law.",
                  "Bypass access controls, rate limits, or security features.",
                  "Misrepresent AI outputs as human-authored legal advice or as Qlarety’s formal opinion.",
                  "Use the Service to build a competing product by systematically extracting models, prompts, or non-public features.",
                  "Share accounts in a way that circumvents plan limits or security.",
                ]}
              />
            </>
          ),
        },
        {
          id: "ai-outputs",
          title: "AI outputs & disclaimers",
          content: (
            <>
              <p>
                AI systems can be incomplete, incorrect, or biased. Grades, highlights, chat
                answers, and exports may miss issues or invent details. Always verify critical
                findings against the source document.
              </p>
              <p>
                To the fullest extent permitted by law, Qlarety disclaims warranties that outputs
                are accurate, complete, non-infringing, or fit for a particular legal purpose.
              </p>
            </>
          ),
        },
        {
          id: "intellectual-property",
          title: "Our intellectual property",
          content: (
            <p>
              The Service — including software, branding, UI, documentation, and original content
              (excluding Customer Content) — is owned by Qlarety or its licensors and protected by
              intellectual property laws. Except for the limited rights to use the Service under
              these Terms, no license is granted. You may not copy, modify, or distribute our
              materials without prior written permission.
            </p>
          ),
        },
        {
          id: "plans-billing",
          title: "Plans, trials & billing",
          content: (
            <>
              <p>
                Some features may require a paid subscription. Pricing, plan limits (including
                engines marked &quot;Pro&quot;), and billing terms will be shown at purchase. Fees
                are generally non-refundable except where required by law or expressly stated.
              </p>
              <p>
                We may change prices or plans with reasonable notice for renewals. Failure to pay
                may result in suspension of paid features.
              </p>
            </>
          ),
        },
        {
          id: "third-parties",
          title: "Third-party services",
          content: (
            <p>
              The Service may integrate third-party authentication, hosting, payments, and AI model
              providers. Their terms and privacy practices apply to their services. Qlarety is not
              responsible for third-party sites or services beyond our control.
            </p>
          ),
        },
        {
          id: "confidentiality",
          title: "Confidentiality",
          content: (
            <p>
              We treat Customer Content as confidential and process it under our Privacy Policy and
              applicable agreements. You agree to keep non-public aspects of the Service
              confidential. Sharing features you enable may disclose content to recipients you
              choose — use them carefully.
            </p>
          ),
        },
        {
          id: "availability",
          title: "Availability & changes",
          content: (
            <p>
              We aim for reliable uptime but do not guarantee uninterrupted Service. We may modify,
              suspend, or discontinue features with or without notice. We are not liable for
              downtime, data loss beyond our reasonable backup practices, or changes that affect how
              you use Qlarety.
            </p>
          ),
        },
        {
          id: "termination",
          title: "Termination",
          content: (
            <>
              <p>
                You may stop using the Service at any time and may request account closure by
                contacting us. We may suspend or terminate access if you breach these Terms, create
                risk, or for prolonged inactivity on free tiers.
              </p>
              <p>
                Upon termination, your right to use the Service ends. Provisions that by nature
                should survive (including ownership, disclaimers, limitations of liability, and
                dispute terms) will survive.
              </p>
            </>
          ),
        },
        {
          id: "liability",
          title: "Limitation of liability",
          content: (
            <>
              <p>
                To the maximum extent permitted by law, Qlarety and its affiliates, officers, and
                suppliers will not be liable for indirect, incidental, special, consequential,
                exemplary, or punitive damages, or for lost profits, revenue, data, or business
                opportunities, arising from your use of the Service or reliance on AI outputs.
              </p>
              <p>
                Our aggregate liability for claims relating to the Service will not exceed the
                greater of (a) amounts you paid us for the Service in the twelve (12) months before
                the claim or (b) USD $100, if you have not paid us.
              </p>
              <p>
                Some jurisdictions do not allow certain limitations; in those cases, our liability
                is limited to the fullest extent allowed.
              </p>
            </>
          ),
        },
        {
          id: "indemnity",
          title: "Indemnification",
          content: (
            <p>
              You will defend and indemnify Qlarety against claims, damages, and expenses (including
              reasonable legal fees) arising from your Customer Content, your use of the Service, or
              your violation of these Terms or applicable law.
            </p>
          ),
        },
        {
          id: "governing-law",
          title: "Governing law",
          content: (
            <p>
              These Terms are governed by the laws of Nigeria, without regard to conflict-of-law
              principles, unless mandatory consumer protections in your country require otherwise.
              Courts in Lagos, Nigeria shall have exclusive jurisdiction, except where prohibited.
            </p>
          ),
        },
        {
          id: "changes-terms",
          title: "Changes to these Terms",
          content: (
            <p>
              We may update these Terms periodically. We will update the &quot;Last updated&quot;
              date and may provide additional notice for material changes. Continued use after
              changes become effective means you accept the revised Terms. If you do not agree, stop
              using the Service.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          content: (
            <>
              <p>Questions about these Terms:</p>
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
