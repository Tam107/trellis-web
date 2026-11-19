import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getCourseLanding } from "@/entities/marketing/courseDetail.fixtures";
import { CourseLandingPage } from "@/features/learning/CourseLandingPage";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale; courseSlug: string }> };

/**
 * Public: no `LearningShell`, because a visitor has no learner sidebar. Whether the course may be
 * seen at all is the backend's call; until it exists, the catalogue fixtures answer, and a slug
 * the catalogue does not list is a 404.
 */
export default async function CourseLandingRoute({ params }: PageProps) {
  const { locale, courseSlug } = await params;
  setRequestLocale(locale);
  const course = getCourseLanding(courseSlug);
  if (!course) notFound();
  return <CourseLandingPage course={course} />;
}
