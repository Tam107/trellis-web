import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StudyPlanPage } from "@/features/learning/learner/StudyPlanPage";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "learning.studyPlanPage" });
  return { title: t("title") };
}

export default async function StudyPlanRoute({ params }: PageProps) {
  setRequestLocale((await params).locale);
  return <StudyPlanPage />;
}
