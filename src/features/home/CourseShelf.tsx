"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { CATALOG_COURSES } from "@/entities/marketing/marketing.fixtures";
import type { CatalogTopic } from "@/entities/marketing/marketing.types";
import { CourseCard } from "@/features/marketing/CourseCard";
import { cn } from "@/ui/cn";
import { Icon } from "@/ui/Icon";

const TOPICS: readonly CatalogTopic[] = ["language", "business", "academic", "data"];
/** How far one arrow press moves: most of the visible row, so the last card stays in view. */
const SCROLL_FRACTION = 0.85;

/**
 * Courses as a horizontal shelf: topic tabs above, cards that snap into place, and a quick view on
 * hover. `null` is the "All" tab.
 *
 * It scrolls natively (swipe, trackpad, keyboard), so the arrows only add a mouse-friendly step.
 */
export function CourseShelf() {
  const t = useTranslations("marketing.catalog");
  const tShelf = useTranslations("home.shelf");
  const [topic, setTopic] = useState<CatalogTopic | null>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const courses = CATALOG_COURSES.filter((course) => !topic || course.topic === topic);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * SCROLL_FRACTION, behavior: "smooth" });
  };

  const selectTopic = (next: CatalogTopic | null) => {
    setTopic(next);
    trackRef.current?.scrollTo({ left: 0 });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={tShelf("label")} className="flex flex-wrap gap-2">
          <Tab isActive={!topic} onClick={() => selectTopic(null)}>
            {t("all")}
          </Tab>
          {TOPICS.map((value) => (
            <Tab key={value} isActive={topic === value} onClick={() => selectTopic(value)}>
              {t(`topics.${value}`)}
            </Tab>
          ))}
        </div>
        <div className="hidden gap-2 md:flex">
          <Arrow label={tShelf("prev")} icon={ChevronLeft} onClick={() => scrollBy(-1)} />
          <Arrow label={tShelf("next")} icon={ChevronRight} onClick={() => scrollBy(1)} />
        </div>
      </div>

      <ul
        ref={trackRef}
        className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8"
      >
        {courses.map((course) => (
          <li key={course.slug} className="w-72 shrink-0 snap-start">
            <CourseCard course={course} hasQuickView />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tab({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "rounded-control border px-3.5 py-1.5 text-sm font-medium transition-colors duration-fast ease-standard",
        isActive
          ? "border-brand bg-brand text-on-brand"
          : "border-border bg-surface text-fg-muted hover:border-border-strong hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function Arrow({ label, icon, onClick }: { label: string; icon: typeof ChevronLeft; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-control border border-border bg-surface text-fg-muted transition-colors duration-fast ease-standard hover:border-border-strong hover:text-fg"
    >
      <Icon icon={icon} size="lg" />
    </button>
  );
}
