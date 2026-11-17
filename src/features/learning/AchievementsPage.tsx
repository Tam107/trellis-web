"use client";

import { Award, Flame, Lock, Star, Trophy, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { ACHIEVEMENTS } from "@/entities/learning/progress.fixtures";
import type { Achievement } from "@/entities/learning/progress.types";
import { cn } from "@/ui/cn";
import { Icon } from "@/ui/Icon";
import { PageHeading } from "./PageHeading";

const ICONS: Record<Achievement["icon"], LucideIcon> = { trophy: Trophy, flame: Flame, star: Star };

/** Achievements still to earn, named rather than hidden: a blank grid teaches nothing. */
const LOCKED_KEYS = ["buildVocabulary", "holdConversation", "takeQuiz"] as const;

export function AchievementsPage() {
  const t = useTranslations("learning.achievementsPage");
  const tNames = useTranslations("learning.dashboard.achievements");
  const tGoals = useTranslations("learning.player.goals");

  return (
    <div className="flex flex-col gap-5">
      <PageHeading title={t("title")} description={t("description")} />

      <section>
        <h2 className="text-base font-semibold text-fg">{t("earnedTitle")}</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((achievement) => (
            <li
              key={achievement.key}
              className="flex items-center gap-3 rounded-card border border-border bg-surface p-4"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-card bg-warning-subtle text-warning">
                <Icon icon={ICONS[achievement.icon]} size="xl" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-fg">{tNames(achievement.key)}</p>
                <p className="text-xs text-fg-muted">{t("earnedOn", { date: EARNED_ON })}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-base font-semibold text-fg">{t("lockedTitle")}</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LOCKED_KEYS.map((key) => (
            <li
              key={key}
              className={cn("flex items-center gap-3 rounded-card border border-border p-4 opacity-80")}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-card bg-surface-sunken text-fg-subtle">
                <Icon icon={Lock} size="xl" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-fg">{tGoals(key)}</p>
                <p className="text-xs text-fg-subtle">{t("lockedHint")}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="flex items-center gap-2 text-xs text-fg-subtle">
        <Icon icon={Award} size="sm" />
        {t("locked")}
      </p>
    </div>
  );
}

/** The mock has no award timestamps; one shared date keeps the cards honest about that. */
const EARNED_ON = "Jan 26";
