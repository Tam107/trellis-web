"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";
import { CATALOG_COURSES } from "@/entities/marketing/marketing.fixtures";
import type { CatalogTopic } from "@/entities/marketing/marketing.types";
import { DetailedCourseCard } from "@/features/marketing/cards/DetailedCourseCard";
import { cn } from "@/ui/cn";
import { Icon } from "@/ui/Icon";

const TOPICS: readonly CatalogTopic[] = ["language", "business", "academic", "data"];
/** How far one arrow press moves: most of the visible row, so the last card stays in view. */
const SCROLL_FRACTION = 0.85;
/** Pixels of slack when deciding the row is at its end; fractional scroll positions never hit 0 exactly. */
const EDGE_SLACK_PX = 2;

type Edges = { isAtStart: boolean; isAtEnd: boolean };

function edgesOf(track: HTMLElement): Edges {
  return {
    isAtStart: track.scrollLeft <= EDGE_SLACK_PX,
    isAtEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - EDGE_SLACK_PX,
  };
}

/**
 * Courses as a horizontal shelf: topic tabs above, detailed cards that snap into place, and an
 * arrow on each side to step along it. `null` is the "All" tab.
 *
 * The row still swipes and scrolls with the keyboard, but draws no scrollbar: the arrows are the
 * visible control, and each one hides at its end of the row.
 */
export function CourseShelf() {
  const t = useTranslations("marketing.catalog");
  const tShelf = useTranslations("home.shelf");
  const [topic, setTopic] = useState<CatalogTopic | null>(null);
  const [edges, setEdges] = useState<Edges>({ isAtStart: true, isAtEnd: false });
  const trackRef = useRef<HTMLUListElement>(null);
  /** Keeps the previous object when nothing changed, so a scroll event does not re-render per pixel. */
  const syncEdges = useCallback((track: HTMLElement) => {
    const next = edgesOf(track);
    setEdges((prev) => (prev.isAtStart === next.isAtStart && prev.isAtEnd === next.isAtEnd ? prev : next));
  }, []);
  const setTrack = useCallback(
    (node: HTMLUListElement | null) => {
      trackRef.current = node;
      if (node) syncEdges(node);
    },
    [syncEdges],
  );
  const courses = CATALOG_COURSES.filter((course) => !topic || course.topic === topic);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * SCROLL_FRACTION, behavior: "smooth" });
  };

  return (
    <div>
      <div role="group" aria-label={tShelf("label")} className="flex flex-wrap gap-2">
        <Tab isActive={!topic} onClick={() => setTopic(null)}>
          {t("all")}
        </Tab>
        {TOPICS.map((value) => (
          <Tab key={value} isActive={topic === value} onClick={() => setTopic(value)}>
            {t(`topics.${value}`)}
          </Tab>
        ))}
      </div>

      <div className="relative mt-6">
        {/* Keyed by topic: a new row mounts at the start, and the ref callback measures it. */}
        <ul
          key={topic ?? "all"}
          ref={setTrack}
          onScroll={(event) => syncEdges(event.currentTarget)}
          className="scrollbar-none flex snap-x snap-mandatory scroll-px-1 gap-6 overflow-x-auto px-1 pb-1"
        >
          {courses.map((course) => (
            <li key={course.slug} className="w-80 shrink-0 snap-start">
              <DetailedCourseCard course={course} />
            </li>
          ))}
        </ul>
        {edges.isAtStart ? null : (
          <Arrow
            label={tShelf("prev")}
            icon={ChevronLeft}
            onClick={() => scrollBy(-1)}
            className="left-1 sm:-left-5"
          />
        )}
        {edges.isAtEnd ? null : (
          <Arrow
            label={tShelf("next")}
            icon={ChevronRight}
            onClick={() => scrollBy(1)}
            className="right-1 sm:-right-5"
          />
        )}
      </div>
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

function Arrow({
  label,
  icon,
  onClick,
  className,
}: {
  label: string;
  icon: typeof ChevronLeft;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-dropdown grid size-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface text-fg transition-colors duration-fast ease-standard hover:border-border-strong hover:bg-surface-hover",
        className,
      )}
    >
      <Icon icon={icon} size="lg" />
    </button>
  );
}
