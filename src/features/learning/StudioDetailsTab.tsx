"use client";

import { Lock, Plus, Target, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { ENROLMENT_POLICIES, type EnrolmentPolicy } from "@/entities/learning/learning.constants";
import { STUDIO_COURSE_DETAILS } from "@/entities/learning/studio.fixtures";
import { Button } from "@/ui/Button";
import { Field } from "@/ui/Field";
import { Icon } from "@/ui/Icon";
import { Select } from "@/ui/Select";
import { Textarea } from "@/ui/Textarea";

/**
 * M12 — the Details tab. Once a version is published its fields are locked: the published snapshot
 * is what learners are already on (BR-03), so a change belongs on a new version, not on this one.
 */
export function StudioDetailsTab() {
  const t = useTranslations("learning.studio.detailsTab");
  const tPolicies = useTranslations("learning.enrolmentPolicies");
  const details = STUDIO_COURSE_DETAILS;
  const isLocked = details.hasPublishedVersion;

  return (
    <section className="flex flex-col gap-5 rounded-card border border-border bg-surface p-5">
      <h2 className="text-base font-semibold text-fg">{t("title")}</h2>

      {isLocked ? (
        <div className="flex items-start gap-2 rounded-card border border-warning bg-warning-subtle p-3">
          <Icon icon={Lock} size="md" className="mt-0.5 text-warning" />
          <div>
            <p className="text-sm font-medium text-warning">{t("lockedTitle")}</p>
            <p className="mt-0.5 text-xs text-fg-muted">{t("lockedNote")}</p>
          </div>
        </div>
      ) : null}

      <Field label={t("summaryLabel")}>
        <Textarea rows={3} defaultValue={details.summary} disabled={isLocked} />
      </Field>

      <div className="flex flex-col gap-2">
        <h3 className="flex items-center gap-2 text-sm font-medium text-fg">
          <Icon icon={Target} size="sm" className="text-fg-brand" />
          {t("outcomesTitle")}
        </h3>
        <ul className="flex flex-col gap-2">
          {details.outcomes.map((outcome) => (
            <li
              key={outcome.id}
              className="flex items-center gap-2 rounded-control border border-border px-3 py-2"
            >
              <span className="min-w-0 flex-1 truncate text-sm text-fg">{outcome.label}</span>
              {/* The scale and its version travel with the outcome: descriptors get re-worded. */}
              <span className="shrink-0 text-xs text-fg-subtle">
                {t("outcomeScale", { scale: outcome.scale, version: outcome.scaleVersion })}
              </span>
              <button
                type="button"
                aria-label={t("removeOutcome")}
                disabled={isLocked}
                className="text-fg-subtle hover:text-danger disabled:opacity-50"
              >
                <Icon icon={X} size="sm" />
              </button>
            </li>
          ))}
        </ul>
        <Button
          variant="ghost"
          size="sm"
          className="self-start"
          disabled={isLocked}
          icon={<Icon icon={Plus} size="sm" />}
        >
          {t("addOutcome")}
        </Button>
      </div>

      <Field label={t("enrolmentLabel")}>
        <Select
          defaultValue={details.enrolmentPolicy}
          disabled={isLocked}
          options={Object.values(ENROLMENT_POLICIES).map((value: EnrolmentPolicy) => ({
            value,
            label: tPolicies(value),
          }))}
        />
      </Field>

      <Button className="self-start" disabled={isLocked}>
        {t("save")}
      </Button>
    </section>
  );
}
