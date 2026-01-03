import type { DocumentAnalysis } from "@/types/analysis";

export const testDocumentText = `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into on January 15, 2024, between TechCorp Inc. ("Service Provider") and Client Solutions LLC ("Client").

1. SERVICES
The Service Provider agrees to provide software development services including but not limited to web application development, API integration, and technical support. The services will be delivered according to the specifications outlined in Exhibit A.

2. PAYMENT TERMS
Client agrees to pay Service Provider $50,000 upon signing this agreement, with an additional $25,000 due upon completion of Phase 1. All payments are non-refundable. Late payments will incur a 5% monthly penalty fee.

3. INTELLECTUAL PROPERTY
All intellectual property rights, including but not limited to source code, designs, and documentation, shall remain the exclusive property of the Service Provider unless otherwise specified in writing. Client is granted a non-exclusive license to use the deliverables for their internal business operations.

4. CONFIDENTIALITY
Both parties agree to maintain strict confidentiality regarding all proprietary information shared during the term of this agreement. This obligation shall survive termination of the agreement for a period of three years.

5. TERMINATION
Either party may terminate this agreement with 30 days written notice. Upon termination, Client shall pay all outstanding invoices. Service Provider may terminate immediately if Client breaches payment terms.

6. LIABILITY AND WARRANTIES
Service Provider makes no warranties, express or implied, regarding the services. Client acknowledges that the services are provided "as-is". Service Provider's total liability shall not exceed the total fees paid by Client under this agreement.

7. GOVERNING LAW
This agreement shall be governed by the laws of the State of California, without regard to conflict of law principles.

8. DISPUTE RESOLUTION
Any disputes arising from this agreement shall be resolved through binding arbitration in San Francisco, California. The prevailing party shall be entitled to recover reasonable attorney's fees and costs.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.`;

export const testAnalysis: DocumentAnalysis = {
  keyPoints: [
    {
      text: "Payment Structure",
      description:
        "Two-phase payment: $50,000 upfront, $25,000 after Phase 1 completion. All payments are non-refundable.",
    },
    {
      text: "Intellectual Property",
      description:
        "Service Provider retains all IP rights. Client receives non-exclusive license for internal use only.",
    },
    {
      text: "Termination Rights",
      description:
        "Either party can terminate with 30 days notice. Immediate termination possible for payment breaches.",
    },
    {
      text: "Liability Limitations",
      description:
        "Service Provider's liability capped at total fees paid. Services provided 'as-is' with no warranties.",
    },
  ],
  risks: [
    {
      text: "Non-refundable payments",
      severity: "high",
      description:
        "All payments are non-refundable, which creates significant financial risk for the Client if services are unsatisfactory.",
      start: 591,
      end: 622,
    },
    {
      text: "5% monthly penalty fee",
      severity: "medium",
      description: "Late payment penalty of 5% monthly is quite high and could accumulate quickly.",
      start: 651,
      end: 673,
    },
    {
      text: "IP rights remain with Service Provider",
      severity: "high",
      description:
        "Client does not own the intellectual property, only receives a non-exclusive license. This limits future flexibility.",
      start: 805,
      end: 864,
    },
    {
      text: "No warranties, services 'as-is'",
      severity: "high",
      description:
        "Service Provider makes no warranties and provides services 'as-is', leaving Client with limited recourse for quality issues.",
      start: 1506,
      end: 1586,
    },
    {
      text: "Liability capped at fees paid",
      severity: "medium",
      description:
        "Service Provider's liability is limited to fees paid, which may not cover potential damages or losses.",
      start: 1648,
      end: 1728,
    },
  ],
  advantages: [
    {
      text: "Clear service scope",
      description:
        "Services are clearly defined with reference to specifications in Exhibit A, providing clarity on deliverables.",
      start: 225,
      end: 351,
    },
    {
      text: "Non-exclusive license for internal use",
      description:
        "Client receives license to use deliverables for internal business operations, which is reasonable for most use cases.",
      start: 904,
      end: 1008,
    },
    {
      text: "Confidentiality protection",
      description:
        "Strong confidentiality clause that survives termination for three years, protecting both parties.",
      start: 1030,
      end: 1121,
    },
    {
      text: "30-day termination notice",
      description:
        "Reasonable termination clause with 30 days notice, providing flexibility for both parties.",
      start: 1143,
      end: 1173,
    },
    {
      text: "Binding arbitration clause",
      description:
        "Dispute resolution through arbitration can be faster and less expensive than litigation.",
      start: 1912,
      end: 1998,
    },
  ],
  highlights: [
    {
      start: 591,
      end: 622,
      type: "risk",
      text: "All payments are non-refundable",
      description: "High risk: Client cannot recover payments if services are unsatisfactory",
    },
    {
      start: 651,
      end: 673,
      type: "risk",
      text: "5% monthly penalty fee",
      description: "Medium risk: High penalty rate for late payments",
    },
    {
      start: 805,
      end: 864,
      type: "risk",
      text: "shall remain the exclusive property of the Service Provider",
      description: "High risk: Client does not own IP, limiting future control",
    },
    {
      start: 225,
      end: 351,
      type: "advantage",
      text: "software development services including but not limited to web application development, API integration, and technical support",
      description: "Clear definition of services to be provided",
    },
    {
      start: 904,
      end: 1008,
      type: "advantage",
      text: "Client is granted a non-exclusive license to use the deliverables for their internal business operations",
      description: "Reasonable licensing terms for client's business needs",
    },
    {
      start: 1030,
      end: 1121,
      type: "advantage",
      text: "Both parties agree to maintain strict confidentiality regarding all proprietary information",
      description: "Strong confidentiality protection for both parties",
    },
    {
      start: 1506,
      end: 1586,
      type: "risk",
      text: "Service Provider makes no warranties, express or implied, regarding the services",
      description: "High risk: No warranty protection for client",
    },
    {
      start: 1912,
      end: 1998,
      type: "advantage",
      text: "Any disputes arising from this agreement shall be resolved through binding arbitration",
      description: "Arbitration can be faster and more cost-effective than litigation",
    },
  ],
  grading: {
    risk: 65,
    advantages: 72,
    compliance: 68,
    overall: 68,
  },
  summary:
    "This service agreement presents a balanced but risk-leaning contract. While it provides clear service definitions and reasonable confidentiality terms, the non-refundable payment structure, IP retention by the service provider, lack of warranties, and limited liability create significant risks for the client. The agreement favors the service provider in most key areas.",
};
