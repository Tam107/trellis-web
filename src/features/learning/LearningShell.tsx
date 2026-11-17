"use client";

import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Bookmark,
  Calendar,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Folder,
  GraduationCap,
  Home,
  LayoutGrid,
  Library,
  MessageSquare,
  NotebookPen,
  Pencil,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/app/[locale]/_components/LocaleSwitcher";
import { ThemeToggle } from "@/app/[locale]/_components/ThemeToggle";
import { SHELL_ROLES, type ShellRole } from "@/entities/learning/learning.constants";
import { SAMPLE_LEARNER } from "@/entities/learning/progress.fixtures";
import { ASSESSMENT_DRAFT, STUDIO_COURSE } from "@/entities/learning/studio.fixtures";
import { Link, usePathname } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/ui/Button";
import { cn } from "@/ui/cn";
import { Icon } from "@/ui/Icon";

type NavKey = Parameters<ReturnType<typeof useTranslations<"learning.nav">>>[0];

type NavItem = {
  key: NavKey;
  icon: LucideIcon;
  /** Omitted while the screen does not exist: the row renders but does not navigate. */
  href?: string;
  hasDot?: boolean;
};

type NavGroup = {
  /** `null` for the first group, which carries no heading. */
  titleKey: "toolsLabel" | "instructorToolsLabel" | null;
  items: readonly NavItem[];
};

const LEARNER_NAV: readonly NavGroup[] = [
  {
    titleKey: null,
    items: [
      { key: "dashboard", icon: Home, href: ROUTES.learn },
      { key: "myCourses", icon: BookOpen, href: ROUTES.myCourses },
      { key: "catalog", icon: LayoutGrid, href: ROUTES.catalog },
      { key: "progress", icon: BarChart3 },
      { key: "achievements", icon: Award },
      { key: "messages", icon: MessageSquare, hasDot: true },
    ],
  },
  {
    titleKey: "toolsLabel",
    items: [
      { key: "notes", icon: FileText },
      { key: "bookmarks", icon: Bookmark },
      { key: "studyPlan", icon: Calendar },
    ],
  },
];

const INSTRUCTOR_NAV: readonly NavGroup[] = [
  {
    titleKey: null,
    items: [
      { key: "dashboard", icon: Home, href: ROUTES.learn },
      { key: "myCourses", icon: BookOpen, href: ROUTES.studio },
      { key: "catalog", icon: LayoutGrid, href: ROUTES.catalog },
      { key: "students", icon: Users },
      { key: "grading", icon: ClipboardCheck },
      { key: "analytics", icon: BarChart3 },
      { key: "messages", icon: MessageSquare, hasDot: true },
    ],
  },
  {
    titleKey: "instructorToolsLabel",
    items: [
      { key: "courseStudio", icon: Pencil, href: ROUTES.studioCourse(STUDIO_COURSE.slug) },
      { key: "assessments", icon: ClipboardCheck, href: ROUTES.studioAssessment(ASSESSMENT_DRAFT.id) },
      { key: "assignments", icon: NotebookPen },
      { key: "questionBank", icon: Library, href: ROUTES.studioQuestionBank },
      { key: "certificates", icon: Award },
      { key: "resources", icon: Folder },
    ],
  },
];

/** Shared by the linked and the inert rows, so they keep the same metrics. */
const NAV_ITEM_CLASSES =
  "flex shrink-0 items-center gap-3 rounded-control px-3 py-2.5 text-sm whitespace-nowrap";

export type LearningShellProps = {
  role?: ShellRole;
  children: ReactNode;
};

/**
 * The LMS frame: the sidebar sits directly on the app canvas, and everything else — header
 * included — is one rounded white panel. The header is a row inside that panel, not a bar of its
 * own, so the page starts at the same left edge as its own content.
 */
export function LearningShell({ role = SHELL_ROLES.LEARNER, children }: LearningShellProps) {
  const groups = role === SHELL_ROLES.INSTRUCTOR ? INSTRUCTOR_NAV : LEARNER_NAV;

  return (
    <div className="flex flex-1 gap-3 bg-canvas p-3">
      <Sidebar groups={groups} role={role} />
      <div className="flex min-w-0 flex-1 flex-col rounded-card bg-surface">
        <TopBar role={role} />
        <MobileNav groups={groups} />
        <main className="min-w-0 px-4 pb-8 md:px-6">{children}</main>
      </div>
    </div>
  );
}

function Sidebar({ groups, role }: { groups: readonly NavGroup[]; role: ShellRole }) {
  const t = useTranslations("learning.shell");
  return (
    <aside className="sticky top-3 hidden h-[calc(100dvh-1.5rem)] w-64 shrink-0 flex-col gap-5 px-2 py-2 lg:flex">
      <Link href={ROUTES.learn} className="flex items-center gap-2.5 px-1 py-1">
        <span className="grid size-9 place-items-center rounded-control bg-info-subtle text-fg-brand">
          <Icon icon={GraduationCap} size="lg" />
        </span>
        <span className="text-lg font-semibold text-fg">{t("brand")}</span>
      </Link>

      <label className="flex items-center gap-2 rounded-control border border-border bg-surface px-3 py-2.5 text-sm text-fg-subtle">
        <Icon icon={Search} size="sm" />
        <span className="sr-only">
          {role === SHELL_ROLES.INSTRUCTOR ? t("searchTools") : t("searchCourses")}
        </span>
        <input
          type="search"
          placeholder={role === SHELL_ROLES.INSTRUCTOR ? t("searchTools") : t("searchCourses")}
          className="w-full min-w-0 bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
        />
        <kbd className="shrink-0 rounded-control bg-surface-sunken px-1.5 py-0.5 text-xs text-fg-subtle">
          {t("searchShortcut")}
        </kbd>
      </label>

      <nav aria-label={t("navLabel")} className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto">
        {groups.map((group, index) => (
          <NavGroupList key={group.titleKey ?? index} group={group} />
        ))}
      </nav>

      <PromoCard role={role} />
    </aside>
  );
}

/** Below `lg` the sidebar is gone, so the nav becomes a scroller above the page content. */
function MobileNav({ groups }: { groups: readonly NavGroup[] }) {
  const t = useTranslations("learning.shell");
  const tNav = useTranslations("learning.nav");
  const pathname = usePathname();
  const items = groups.flatMap((group) => group.items);
  return (
    <nav
      aria-label={t("navLabel")}
      className="flex gap-1 overflow-x-auto border-b border-border px-4 pb-3 lg:hidden"
    >
      {items.map((item) =>
        item.href === undefined ? (
          <span
            key={item.key}
            aria-disabled
            title={t("upcoming")}
            className={cn(NAV_ITEM_CLASSES, "text-fg-muted")}
          >
            <Icon icon={item.icon} size="md" />
            {tNav(item.key)}
          </span>
        ) : (
          <Link
            key={item.key}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            className={cn(
              NAV_ITEM_CLASSES,
              "text-fg-muted hover:bg-surface-hover hover:text-fg",
              pathname === item.href && "bg-info-subtle font-medium text-fg-brand",
            )}
          >
            <Icon icon={item.icon} size="md" />
            {tNav(item.key)}
          </Link>
        ),
      )}
    </nav>
  );
}

function NavGroupList({ group }: { group: NavGroup }) {
  const t = useTranslations("learning.shell");
  const tNav = useTranslations("learning.nav");
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      {group.titleKey ? (
        <h2 className="border-t border-border px-3 pt-4 pb-1 text-xs text-fg-subtle">{t(group.titleKey)}</h2>
      ) : null}
      <ul className="flex flex-col gap-1">
        {group.items.map((item) => {
          const isCurrent = item.href !== undefined && pathname === item.href;
          const content = (
            <>
              <Icon icon={item.icon} size="lg" />
              <span className="truncate">{tNav(item.key)}</span>
              {item.hasDot ? <span className="ml-auto size-1.5 rounded-full bg-brand" /> : null}
            </>
          );
          return (
            <li key={item.key}>
              {item.href === undefined ? (
                // Inert rather than dimmed: the design shows every row alike, and a dead link
                // would be worse than a row that visibly does nothing.
                <span
                  aria-disabled
                  title={t("upcoming")}
                  className={cn(NAV_ITEM_CLASSES, "w-full cursor-default text-fg-muted")}
                >
                  {content}
                </span>
              ) : (
                <Link
                  href={item.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    NAV_ITEM_CLASSES,
                    "w-full text-fg-muted transition-colors duration-fast ease-standard hover:bg-surface-hover hover:text-fg",
                    isCurrent &&
                      "bg-info-subtle font-medium text-fg-brand hover:bg-info-subtle hover:text-fg-brand",
                  )}
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PromoCard({ role }: { role: ShellRole }) {
  const t = useTranslations("learning.shell");
  const isInstructor = role === SHELL_ROLES.INSTRUCTOR;
  return (
    <div className="flex flex-col items-center gap-2 rounded-card bg-info-subtle p-4 text-center">
      <span className="grid size-12 place-items-center rounded-card bg-surface text-fg-brand">
        <Icon icon={isInstructor ? Pencil : BookOpen} size="xl" />
      </span>
      <h3 className="text-sm font-semibold text-fg">
        {isInstructor ? t("studioPromoTitle") : t("promoTitle")}
      </h3>
      <p className="text-xs text-fg-muted">
        {isInstructor ? t("studioPromoDescription") : t("promoDescription")}
      </p>
      {/* The design's call to action is near-black, which is `fg` on `canvas`, not the brand. */}
      <Button asChild size="sm" className="mt-1 w-full bg-fg text-canvas hover:bg-fg-muted">
        <Link href={ROUTES.catalog}>{isInstructor ? t("studioPromoAction") : t("promoAction")}</Link>
      </Button>
    </div>
  );
}

function TopBar({ role }: { role: ShellRole }) {
  const t = useTranslations("learning.shell");
  return (
    <div className="flex items-center justify-end gap-2 px-4 py-4 md:px-6">
      <AreaSwitcher role={role} />
      <LocaleSwitcher />
      <ThemeToggle />
      <button
        type="button"
        aria-label={t("notifications")}
        className="grid size-10 place-items-center rounded-control border border-border text-fg-muted hover:bg-surface-hover hover:text-fg"
      >
        <Icon icon={Bell} size="md" />
      </button>
      <button type="button" aria-label={t("accountMenu")} className="flex items-center gap-2 text-left">
        <span className="grid size-10 place-items-center rounded-full bg-surface-sunken text-sm font-medium text-fg">
          {SAMPLE_LEARNER.initials}
        </span>
        <span className="hidden flex-col leading-tight sm:flex">
          <span className="text-sm font-semibold text-fg">{SAMPLE_LEARNER.name}</span>
          <span className="text-xs text-fg-subtle">
            {role === SHELL_ROLES.INSTRUCTOR ? t("roleInstructor") : t("roleLearner")}
          </span>
        </span>
        <Icon icon={ChevronDown} size="sm" className="text-fg-subtle" />
      </button>
    </div>
  );
}

/**
 * One account holds both hats (decision Q3), so the areas are a switch rather than two logins.
 * It is a pair of links, not a toggle: each area is a URL someone can share.
 */
function AreaSwitcher({ role }: { role: ShellRole }) {
  const t = useTranslations("learning.roleSwitch");
  const isStudio = role === SHELL_ROLES.INSTRUCTOR;
  return (
    <div aria-label={t("label")} className="mr-1 hidden rounded-control border border-border p-0.5 sm:flex">
      <AreaLink href={ROUTES.learn} isActive={!isStudio} label={t("learn")} />
      <AreaLink href={ROUTES.studio} isActive={isStudio} label={t("studio")} />
    </div>
  );
}

function AreaLink({ href, isActive, label }: { href: string; isActive: boolean; label: string }) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "rounded-control px-2.5 py-1 text-xs",
        isActive ? "bg-info-subtle font-medium text-fg-brand" : "text-fg-muted hover:text-fg",
      )}
    >
      {label}
    </Link>
  );
}
