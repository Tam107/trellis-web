import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AssignmentsPage } from "@/features/learning/learner/AssignmentsPage";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "learning.assignmentsPage" });
  return { title: t("title") };
}

export default async function AssignmentsRoute({ params }: PageProps) {
  setRequestLocale((await params).locale);
  return <AssignmentsPage />;
}
