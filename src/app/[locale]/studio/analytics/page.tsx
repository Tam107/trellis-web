import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StudioAnalyticsPage } from "@/features/learning/StudioAnalyticsPage";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "learning.analyticsPage" });
  return { title: t("title") };
}

export default async function AnalyticsRoute({ params }: PageProps) {
  setRequestLocale((await params).locale);
  return <StudioAnalyticsPage />;
}
