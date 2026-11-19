import { BarChart3, BookOpen, Check, Sparkles, Users, type LucideIcon } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import type { DateTimeFormatOptions } from "next-intl";
import { BENTO_CHART_MINUTES } from "@/entities/marketing/marketing.fixtures";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { cn } from "@/ui/cn";
import { Icon } from "@/ui/Icon";
import { IconTile } from "@/ui/IconTile";
import { IN_VIEW_GROW_Y, IN_VIEW_RISE, InView } from "@/ui/InView";
import { Section } from "@/ui/Section";
import { TypedText } from "@/ui/TypedText";

const WEEKDAY_NARROW: DateTimeFormatOptions = { weekday: "narrow" };
/** 2024-01-01 is a Monday, so index 0 is Monday in every locale's week row. */
const MONDAY = new Date(Date.UTC(2024, 0, 1));
const MS_PER_DAY = 86_400_000;
const PEAK_DAY_INDEX = BENTO_CHART_MINUTES.indexOf(Math.max(...BENTO_CHART_MINUTES));
const PERCENT = 100;

const STEP_MS = 90;
/** Delay for the nth sibling of an in-view sequence; mirrors `stagger-<n>` for computed indices. */
const staggerStyle = (index: number) => ({ animationDelay: `${index * STEP_MS}ms` });

type LessonState = "done" | "current";
const LESSONS: readonly { key: "lesson1" | "lesson2" | "lesson3"; state: LessonState }[] = [
  { key: "lesson1", state: "done" },
  { key: "lesson2", state: "done" },
  { key: "lesson3", state: "current" },
];
const MODULES = ["moduleOne", "moduleTwo"] as const;

/**
 * A bento cell: the claim on top, and under it a window onto the product, cropped by the cell's
 * edge so it reads as part of a larger screen. A soft brand light blooms behind it on hover.
 */
function Cell({
  icon,
  title,
  body,
  windowTitle,
  className,
  children,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  /** The caption in the product window's title bar. */
  windowTitle: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card isInteractive size="none" className={cn("group flex flex-col overflow-hidden", className)}>
      <div className="px-6 pt-6 md:px-8 md:pt-8">
        <IconTile
          icon={icon}
          className="transition-colors duration-normal ease-standard group-hover:bg-brand group-hover:text-on-brand"
        />
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-fg">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted">{body}</p>
      </div>
      <div className="mt-8 flex-1 pl-6 md:pl-8">
        <ProductWindow title={windowTitle}>{children}</ProductWindow>
      </div>
    </Card>
  );
}

/** A browser-style frame. It bleeds off the cell's right and bottom edges on purpose. */
function ProductWindow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="h-full rounded-tl-card border-t border-l border-border bg-canvas transition-transform duration-slow ease-emphasized group-hover:-translate-x-1 group-hover:-translate-y-1">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
        <span aria-hidden className="size-2 rounded-full bg-border-strong" />
        <span aria-hidden className="size-2 rounded-full bg-border-strong" />
        <span aria-hidden className="size-2 rounded-full bg-border-strong" />
        <span className="ml-3 truncate text-xs font-medium text-fg-subtle">{title}</span>
      </div>
      <div className="p-4 md:p-5">{children}</div>
    </div>
  );
}

/**
 * The features as a bento grid: unequal cells, each showing the thing it describes instead of an
 * icon and two lines. The pieces start when the grid scrolls into view (`InView`).
 */
export function Bento() {
  const t = useTranslations("home.features");
  const tBento = useTranslations("home.bento");
  const tHero = useTranslations("home.hero");
  return (
    <Section title={tBento("title")} description={t("subtitle")}>
      <InView threshold={0.2}>
        <ul className="grid gap-5 lg:grid-cols-3">
          <li className="reveal lg:col-span-1">
            <Cell
              icon={BookOpen}
              title={t("structuredTitle")}
              body={t("structuredBody")}
              windowTitle={tBento("lesson1")}
              className="h-full"
            >
              <LessonList />
            </Cell>
          </li>
          <li className="reveal lg:col-span-2">
            <Cell
              icon={Sparkles}
              title={t("aiPracticeTitle")}
              body={t("aiPracticeBody")}
              windowTitle={tHero("tutorTitle")}
              className="h-full"
            >
              <TutorChat />
            </Cell>
          </li>
          <li className="reveal lg:col-span-2">
            <Cell
              icon={BarChart3}
              title={t("progressTitle")}
              body={t("progressBody")}
              windowTitle={tBento("chartTitle")}
              className="h-full"
            >
              <WeekChart />
            </Cell>
          </li>
          <li className="reveal lg:col-span-1">
            <Cell
              icon={Users}
              title={t("teachTitle")}
              body={t("teachBody")}
              windowTitle={tBento("teachPublish")}
              className="h-full"
            >
              <PublishPanel />
            </Cell>
          </li>
        </ul>
      </InView>
    </Section>
  );
}

function LessonList() {
  const t = useTranslations("home.bento");
  return (
    <ol className="flex flex-col gap-2">
      {LESSONS.map(({ key, state }, index) => {
        const isDone = state === "done";
        return (
          <li
            key={key}
            style={staggerStyle(index + 1)}
            className={cn(
              "flex items-center gap-3 rounded-control border border-border bg-surface px-3 py-2.5",
              IN_VIEW_RISE,
            )}
          >
            <span
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-control text-xs font-bold",
                isDone ? "bg-success-subtle text-success" : "bg-info-subtle text-fg-brand",
              )}
            >
              {isDone ? <Icon icon={Check} size="sm" /> : index + 1}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-fg">{t(key)}</span>
            <span className="shrink-0 text-xs text-fg-subtle">{t(`lessonState.${state}`)}</span>
          </li>
        );
      })}
    </ol>
  );
}

function TutorChat() {
  const t = useTranslations("home.bento");
  const tHero = useTranslations("home.hero");
  return (
    <InView threshold={0.4} className="flex flex-col gap-3">
      <>
        <p
          className={cn(
            "max-w-[85%] self-end rounded-card bg-brand px-4 py-2.5 text-sm text-on-brand",
            IN_VIEW_RISE,
          )}
        >
          {t("tutorUser")}
        </p>
        <div className={cn("flex max-w-[92%] items-start gap-2.5", IN_VIEW_RISE)} style={staggerStyle(4)}>
          <IconTile icon={Sparkles} className="size-8" />
          <div className="min-w-0 rounded-card border border-border bg-surface px-4 py-2.5">
            <p className="text-xs font-semibold text-fg-brand">{tHero("tutorTitle")}</p>
            <TypedText
              text={t("tutorBot")}
              delayMs={TUTOR_REPLY_DELAY_MS}
              className="mt-1 text-sm leading-relaxed text-fg"
            />
          </div>
        </div>
      </>
    </InView>
  );
}

/** The learner's message lands first; the tutor starts typing a beat later. */
const TUTOR_REPLY_DELAY_MS = 700;

function WeekChart() {
  const t = useTranslations("home.bento");
  const format = useFormatter();
  const peak = Math.max(...BENTO_CHART_MINUTES);
  return (
    <div>
      <div className="relative">
        {/* Three faint guide lines behind the bars, so the heights read against a scale. */}
        <div aria-hidden className="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between">
          {[0, 1, 2].map((line) => (
            <span key={line} className="border-t border-dashed border-border" />
          ))}
        </div>
        <ul aria-label={t("chartAria")} className="relative flex h-44 items-end gap-2 sm:gap-4">
          {BENTO_CHART_MINUTES.map((minutes, index) => (
            <li key={index} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
              <span
                style={{ height: `${(minutes / peak) * PERCENT}%`, ...staggerStyle(index) }}
                className={cn(
                  "w-full rounded-control",
                  "rounded-b-none",
                  index === PEAK_DAY_INDEX ? "bg-brand" : "bg-brand/30",
                  IN_VIEW_GROW_Y,
                )}
              >
                <span className="sr-only">{minutes}</span>
              </span>
              <span aria-hidden className="text-xs text-fg-subtle">
                {format.dateTime(new Date(MONDAY.getTime() + index * MS_PER_DAY), WEEKDAY_NARROW)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PublishPanel() {
  const t = useTranslations("home.bento");
  return (
    <div className="flex flex-col gap-2">
      {MODULES.map((module, index) => (
        <div
          key={module}
          style={staggerStyle(index + 1)}
          className={cn(
            "flex items-center gap-2 rounded-control border border-border bg-surface px-3 py-2.5",
            IN_VIEW_RISE,
          )}
        >
          <span className="text-success">
            <Icon icon={Check} size="md" />
          </span>
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-fg">{t(module)}</span>
        </div>
      ))}
      <div
        className={cn("mt-1 flex items-center justify-between gap-3", IN_VIEW_RISE)}
        style={staggerStyle(3)}
      >
        <Badge tone={READY_TONE}>{t("teachReady")}</Badge>
        <Button size="sm" tabIndex={-1} aria-hidden>
          {t("teachPublish")}
        </Button>
      </div>
    </div>
  );
}

const READY_TONE = "success" as const;
