"use client";

import { Lock, Plus, Target, X } from "@/ui/icons/lucide";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ENROLMENT_POLICIES, type EnrolmentPolicy } from "@/entities/learning/learning.constants";
import { STUDIO_COURSE_DETAILS } from "@/entities/learning/studio.fixtures";
import { Button } from "@astryxdesign/core/Button";
import { Icon } from "@astryxdesign/core/Icon";
import { Selector } from "@astryxdesign/core/Selector";
import { TextArea } from "@astryxdesign/core/TextArea";

/**
 * M12 — the Details tab. Once a version is published its fields are locked: the published snapshot
 * is what learners are already on (BR-03), so a change belongs on a new version, not on this one.
 */
export function StudioDetailsTab() {
  const t = useTranslations("learning.studio.detailsTab");
  const tPolicies = useTranslations("learning.enrolmentPolicies");
  const details = STUDIO_COURSE_DETAILS;
  const isLocked = details.hasPublishedVersion;
  const [summary, setSummary] = useState(details.summary);
  const [policy, setPolicy] = useState<string>(details.enrolmentPolicy);

  return (
    <section className="flex flex-col gap-5 rounded-card border border-border bg-surface p-5">
      <h2 className="text-base font-semibold text-fg">{t("title")}</h2>

      {isLocked ? (
        <div className="flex items-start gap-2 rounded-card border border-warning bg-warning-subtle p-3">
          <Icon icon={Lock} size="sm" className="mt-0.5 text-warning" />
          <div>
            <p className="text-sm font-medium text-warning">{t("lockedTitle")}</p>
            <p className="mt-0.5 text-xs text-fg-muted">{t("lockedNote")}</p>
          </div>
        </div>
      ) : null}

      <TextArea
        label={t("summaryLabel")}
        rows={3}
        value={summary}
        onChange={setSummary}
        isDisabled={isLocked}
      />

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
          isDisabled={isLocked}
          icon={<Icon icon={Plus} size="sm" />}
          label={t("addOutcome")}
        />
      </div>

      <Selector
        label={t("enrolmentLabel")}
        value={policy}
        onChange={setPolicy}
        isDisabled={isLocked}
        options={Object.values(ENROLMENT_POLICIES).map((value: EnrolmentPolicy) => ({
          value,
          label: tPolicies(value),
        }))}
      />

      <Button variant="primary" className="self-start" isDisabled={isLocked} label={t("save")} />
    </section>
  );
}
