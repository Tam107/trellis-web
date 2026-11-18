import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SearchResultsPage } from "@/features/learning/SearchResultsPage";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "learning.searchPage" });
  return { title: t("title") };
}

export default async function SearchRoute({ params }: PageProps) {
  setRequestLocale((await params).locale);
  return <SearchResultsPage />;
}
