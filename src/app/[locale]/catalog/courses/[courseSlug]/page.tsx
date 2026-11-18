import { setRequestLocale } from "next-intl/server";
import { CourseLandingPage } from "@/features/learning/CourseLandingPage";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale; courseSlug: string }> };

/**
 * Public: no `LearningShell`, because a visitor has no learner sidebar. Whether the course may be
 * seen at all is the backend's call; this route renders the one sample course.
 */
export default async function CourseLandingRoute({ params }: PageProps) {
  setRequestLocale((await params).locale);
  return <CourseLandingPage />;
}
