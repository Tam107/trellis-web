"use client";

import { Globe, Info, Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Icon } from "@/ui/primitives/Icon";
import { cn } from "@/ui/lib/cn";

const VISIBILITIES = { PUBLIC: "visibilityPublic", UNLISTED: "visibilityUnlisted" } as const;
type Visibility = (typeof VISIBILITIES)[keyof typeof VISIBILITIES];

/** M12 — the Settings tab. Settings live on the draft and are copied into the next version. */
export function StudioSettingsTab() {
  const t = useTranslations("learning.studio.settingsTab");
  const [visibility, setVisibility] = useState<Visibility>(VISIBILITIES.PUBLIC);

  return (
    <section className="flex flex-col gap-5 rounded-card border border-border bg-surface p-5">
      <h2 className="text-base font-semibold text-fg">{t("title")}</h2>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-medium text-fg">{t("visibilityLabel")}</legend>
        {(
          [
            { value: VISIBILITIES.PUBLIC, icon: Globe },
            { value: VISIBILITIES.UNLISTED, icon: Link2 },
          ] as const
        ).map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-control border px-3 py-2.5 text-sm",
              visibility === option.value ? "border-brand bg-info-subtle" : "border-border",
            )}
          >
            <input
              type="radio"
              name="visibility"
              checked={visibility === option.value}
              onChange={() => setVisibility(option.value)}
              className="size-4 shrink-0"
            />
            <Icon icon={option.icon} size="md" className="text-fg-subtle" />
            <span className="text-fg">{t(option.value)}</span>
          </label>
        ))}
      </fieldset>

      <p className="flex items-start gap-2 rounded-control bg-info-subtle p-3 text-xs text-fg-muted">
        <Icon icon={Info} size="md" className="mt-0.5 text-fg-brand" />
        {t("note")}
      </p>
    </section>
  );
}
