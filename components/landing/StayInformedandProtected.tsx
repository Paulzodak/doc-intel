import { cn } from "@/lib/utils";

export const stayInformedFeatures = [
  {
    title: "Hidden Risk Detection",
    header: "Manual review misses high-impact legal clauses",
    description:
      "Find buried liabilities, one-sided obligations, and risky language early before they become expensive legal or operational issues.",
  },
  {
    title: "Compliance Gap Alerts",
    header: "Teams struggle to keep contracts policy-compliant",
    description:
      "Highlight missing safeguards and non-compliant terms against internal standards and regulatory expectations in seconds.",
  },
  {
    title: "Faster Contract Review",
    header: "Legal turnaround slows business execution",
    description:
      "Reduce review bottlenecks with AI-assisted analysis so teams can negotiate and approve documents with greater speed and confidence.",
  },
  {
    title: "Consistent Legal Insight",
    header: "Review quality varies across reviewers and teams",
    description:
      "Standardize issue spotting and risk scoring so every document gets the same depth of analysis regardless of reviewer.",
  },
  {
    title: "Deadline Risk Reduction",
    header: "Critical obligations get missed after signing",
    description:
      "Surface key dates, renewal triggers, and notice windows so teams avoid penalties, auto-renewals, and costly deadline misses.",
  },
  {
    title: "Negotiation Clarity Boost",
    header: "Teams lack clear leverage in clause negotiations",
    description:
      "Expose unfavorable terms and provide structured reasoning that helps legal and business teams negotiate from a stronger position.",
  },
  {
    title: "Cross-Team Alignment",
    header: "Legal findings are hard to share and act on",
    description:
      "Turn complex legal analysis into clear, shareable insights that product, finance, and operations teams can quickly understand.",
  },
];

const StayInformedandProtected = () => {
  return (
    <div className="text-black max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-14 my-8">
      <h1 className="text-[1.65rem] sm:text-[1.85rem] font-medium font-lora">
        Stay Informed and Protected
      </h1>
      <p className="text-sm mt-1.5 text-gray-600">
        Get protected from the latest legal risks and stay ahead of the curve.
      </p>

      <div className="grid grid-cols-24 grid-rows-2 sm:grid-rows-4 gap-3.5 mt-6">
        <StayInformedCard
          title="Hidden Risk Detection"
          header="Manual review misses high-impact legal clauses"
          description="Find buried liabilities, one-sided obligations, and risky language early before they become expensive legal or operational issues."
          className="col-span-24 sm:col-span-12  xl:col-span-8 row-span-1 sm:row-span-2"
        ></StayInformedCard>
        <StayInformedCard
          title="Compliance Gap Alerts"
          header="Teams struggle to keep contracts policy-compliant"
          description="Highlight missing safeguards and non-compliant terms against internal standards and regulatory expectations in seconds."
          className="col-span-24 sm:col-span-12 xl:col-span-16 row-span-1"
        ></StayInformedCard>
        <StayInformedCard
          title="Faster Contract Review"
          header="Legal turnaround slows business execution"
          description="Reduce review bottlenecks with AI-assisted analysis so teams can negotiate and approve documents with greater speed and confidence."
          className="col-span-24 sm:col-span-12 xl:col-span-8 row-span-1"
        ></StayInformedCard>
        <StayInformedCard
          title="Consistent Legal Insight"
          header="Review quality varies across reviewers and teams"
          description="Standardize issue spotting and risk scoring so every document gets the same depth of analysis regardless of reviewer."
          className="col-span-24 sm:col-span-8 row-span-2"
        ></StayInformedCard>
        <StayInformedCard
          title="Deadline Risk Reduction"
          header="Critical obligations get missed after signing"
          description="Surface key dates, renewal triggers, and notice windows so teams avoid penalties, auto-renewals, and costly deadline misses."
          className="col-span-24 sm:col-span-8 row-span-2"
        ></StayInformedCard>
        <StayInformedCard
          title="Negotiation Clarity Boost"
          header="Teams lack clear leverage in clause negotiations"
          description="Expose unfavorable terms and provide structured reasoning that helps legal and business teams negotiate from a stronger position."
          className="row-span-2 xl:row-span-1 col-span-24 sm:col-span-8 xl:col-span-8"
        ></StayInformedCard>
        <StayInformedCard
          title="Cross-Team Alignment"
          header="Legal findings are hard to share and act on"
          description="Turn complex legal analysis into clear, shareable insights that product, finance, and operations teams can quickly understand."
          className="col-span-24 xl:col-span-16 row-span-1"
        ></StayInformedCard>
      </div>
    </div>
  );
};

const StayInformedCard = ({
  children,
  className,
  title,
  header,
  description,
}: {
  children?: React.ReactNode;
  className: string;
  title: string;
  header: string;
  description: string;
}) => {
  return (
    <div className={cn("bg-white rounded-2xl p-8 border border-dashed border-gray-300", className)}>
      <h2 className="text-[10px] uppercase font-bold text-green-600">{title}</h2>
      <p className="text-xl font-slora font-bold text-gray-900 mt-4">{header}</p>
      <p className="text-sm text-gray-600 mt-4">{description}</p>
      {children}
    </div>
  );
};
export default StayInformedandProtected;
