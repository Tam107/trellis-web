import { setRequestLocale } from "next-intl/server";
import { SHELL_ROLES } from "@/entities/learning/learning.constants";
import { CourseStudioPage } from "@/features/learning/CourseStudioPage";
import { LearningShell } from "@/features/learning/LearningShell";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale; courseSlug: string }> };

export default async function CourseStudioRoute({ params }: PageProps) {
  setRequestLocale((await params).locale);
  return (
    <LearningShell role={SHELL_ROLES.INSTRUCTOR}>
      <CourseStudioPage />
    </LearningShell>
  );
}
