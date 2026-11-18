"use client";

import { ArrowRight, CircleCheck, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { type CourseEdition } from "@/entities/learning/course.types";
import { ENROLMENT_RESULTS, type EnrolmentResult } from "@/entities/learning/learning.constants";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/ui/Button";
import { cn } from "@/ui/cn";
import { Dialog } from "@/ui/Dialog";
import { Icon } from "@/ui/Icon";

export type EnrolDialogProps = {
  courseTitle: string;
  courseSlug: string;
  /** `null` closes the dialog; the edition is what the learner picked. */
  edition: CourseEdition | null;
  isAlreadyEnrolled: boolean;
  onOpenChange: (open: boolean) => void;
  onEnrolled: () => void;
};

/**
 * M2 — enrolment. Enrolling twice is the interesting case: BR-01 says the server returns the same
 * enrolment, so the second confirm reports `alreadyEnrolled` and creates nothing, rather than
 * looking like a second success.
 */
export function EnrolDialog({
  courseTitle,
  courseSlug,
  edition,
  isAlreadyEnrolled,
  onOpenChange,
  onEnrolled,
}: EnrolDialogProps) {
  const t = useTranslations("learning.enrol");
  const [result, setResult] = useState<EnrolmentResult | null>(null);

  function confirm() {
    if (!edition) return;
    if (!edition.isOpen) {
      setResult(ENROLMENT_RESULTS.EDITION_CLOSED);
      return;
    }
    if (edition.seatsTaken >= edition.seatsTotal) {
      setResult(ENROLMENT_RESULTS.EDITION_FULL);
      return;
    }
    setResult(isAlreadyEnrolled ? ENROLMENT_RESULTS.ALREADY_ENROLLED : ENROLMENT_RESULTS.CREATED);
    onEnrolled();
  }

  const isDone = result === ENROLMENT_RESULTS.CREATED || result === ENROLMENT_RESULTS.ALREADY_ENROLLED;

  return (
    <Dialog
      open={edition !== null}
      onOpenChange={(open) => {
        if (!open) setResult(null);
        onOpenChange(open);
      }}
      title={t("title", { course: courseTitle })}
      description={
        edition ? t("description", { edition: edition.label, version: edition.version }) : undefined
      }
      footer={
        isDone ? (
          <Button asChild>
            <Link href={ROUTES.learnCourse(courseSlug)}>
              {t("startLearning")}
              <Icon icon={ArrowRight} size="md" />
            </Link>
          </Button>
        ) : (
          <>
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={confirm}>{t("confirm")}</Button>
          </>
        )
      }
    >
      {result === null ? (
        <p className="flex items-start gap-2 text-sm text-fg-muted">
          <Icon icon={Info} size="md" className="mt-0.5 text-fg-subtle" />
          {t("policyNote")}
        </p>
      ) : (
        <ResultMessage result={result} />
      )}
    </Dialog>
  );
}

function ResultMessage({ result }: { result: EnrolmentResult }) {
  const t = useTranslations("learning.enrol");
  const isGood = result === ENROLMENT_RESULTS.CREATED || result === ENROLMENT_RESULTS.ALREADY_ENROLLED;
  return (
    <p className={cn("flex items-start gap-2 text-sm", isGood ? "text-success" : "text-danger")}>
      <Icon icon={CircleCheck} size="md" className="mt-0.5" />
      {t(result)}
    </p>
  );
}
