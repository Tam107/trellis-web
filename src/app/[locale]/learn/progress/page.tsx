import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LearnerProgressPage } from "@/features/learning/learner/LearnerProgressPage";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "learning.progressPage" });
  return { title: t("title") };
}

export default async function ProgressRoute({ params }: PageProps) {
  setRequestLocale((await params).locale);
  return <LearnerProgressPage />;
}
