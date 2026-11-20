import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MyCoursesPage } from "@/features/learning/learner/MyCoursesPage";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "learning.myCourses" });
  return { title: t("title") };
}

export default async function MyCoursesRoute({ params }: PageProps) {
  setRequestLocale((await params).locale);
  return <MyCoursesPage />;
}
