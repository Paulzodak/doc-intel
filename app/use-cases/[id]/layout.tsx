import useCasesData from "@/data/useCases.json";
import type { Metadata } from "next";

type UseCaseLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

type UseCaseItem = {
  id: string;
  header: string;
  title: string;
  description: Array<{
    title: string;
    description: string;
  }>;
};

export async function generateMetadata({ params }: UseCaseLayoutProps): Promise<Metadata> {
  const { id } = await params;
  const useCases = useCasesData as UseCaseItem[];
  const useCase = useCases.find((item) => item.id === id);

  if (!useCase) {
    return {
      title: "Use case not found",
      description: "The requested Qlarety use case could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const description = useCase.description[0]?.description ?? useCase.title;
  const pageTitle = `${useCase.header} | Qlarety Use Case`;
  const pageUrl = `/use-cases/${useCase.id}`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: pageUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
  };
}

export default function UseCaseLayout({ children }: UseCaseLayoutProps) {
  return children;
}
