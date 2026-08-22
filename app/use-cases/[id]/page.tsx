import GetStarted from "@/components/atoms/GetStarted";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingNav } from "@/components/landing/LandingNav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useCasesData from "@/data/useCases.json";
import Link from "next/link";
import { notFound } from "next/navigation";

type UseCaseDescription = {
  title: string;
  description: string;
};

type UseCaseItem = {
  id: string;
  header: string;
  title: string;
  description: UseCaseDescription[];
};

type UseCasePageProps = {
  params: Promise<{ id: string }>;
};

export default async function UseCaseDetailsPage({ params }: UseCasePageProps) {
  const { id } = await params;
  const useCases = useCasesData as UseCaseItem[];
  const useCase = useCases.find((item) => item.id === id);

  if (!useCase) {
    notFound();
  }

  return (
    <div className="font-nunito">
      <div className="relative mx-auto max-w-[110rem] px-4 py-6 sm:px-6 lg:px-14 lg:py-10">
        <LandingNav />
      </div>

      <main className="mx-auto max-w-[80rem] px-4 pb-20 sm:px-6 lg:px-14">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="font-semibold text-green-700 hover:text-green-800">
                <Link href="/use-cases">Use Cases</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-[#121714]">{useCase.header}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-xs font-bold uppercase tracking-wide text-green-700">
            {useCase.header}
          </p>
          <h1 className="mt-5 text-3xl font-smedium text-[#121714] sm:text-4xl">{useCase.title}</h1>
        </div>

        <section className="mt-10 space-y-8">
          {useCase.description.map((section) => (
            <article key={section.title}>
              <h2 className="text-xl font-semibold text-[#121714]">{section.title}</h2>
              <p className="mt-3 leading-8 text-gray-600">{section.description}</p>
            </article>
          ))}
        </section>

        <div className="mt-20">
          <GetStarted />
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
