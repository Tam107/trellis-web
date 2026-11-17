import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ResourceLibraryPage } from "@/features/learning/ResourceLibraryPage";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "learning.resourcesPage" });
  return { title: t("title") };
}

export default async function ResourcesRoute({ params }: PageProps) {
  setRequestLocale((await params).locale);
  return <ResourceLibraryPage />;
}
