import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CatalogPage } from "@/features/marketing/pages/CatalogPage";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "marketing.catalog.meta" });
  return { title: t("title") };
}

export default async function CoursesRoute({ params }: PageProps) {
  setRequestLocale((await params).locale);
  return <CatalogPage />;
}
