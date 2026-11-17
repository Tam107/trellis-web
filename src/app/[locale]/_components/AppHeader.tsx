"use client";

import { ChevronDown, GraduationCap, Menu, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/ui/Button";
import { Icon } from "@/ui/Icon";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

type NavEntry = {
  key: "courses" | "educators" | "pricing" | "resources";
  href: string;
  hasMenu?: boolean;
};

const NAV: readonly NavEntry[] = [
  { key: "courses", href: ROUTES.catalog },
  { key: "educators", href: ROUTES.studio },
  { key: "pricing", href: ROUTES.catalog },
  { key: "resources", href: ROUTES.search, hasMenu: true },
];

export function AppHeader() {
  const t = useTranslations("home.nav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 md:px-6 lg:gap-4">
        {/* The logo always returns to the landing page, from every screen that shows this header. */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={isMenuOpen}
          className="grid size-9 shrink-0 place-items-center rounded-control text-fg-muted hover:bg-surface-hover hover:text-fg lg:hidden"
        >
          <Icon icon={isMenuOpen ? X : Menu} size="md" />
        </button>

        <Link href={ROUTES.home} className="flex shrink-0 items-center gap-2">
          <span className="grid size-8 place-items-center rounded-control bg-info-subtle text-fg-brand">
            <Icon icon={GraduationCap} size="lg" />
          </span>
          <span className="text-lg font-semibold text-fg">{t("brandName")}</span>
        </Link>

        <nav
          aria-label={t("label")}
          className="hidden items-center gap-1 border-l border-border pl-4 lg:flex"
        >
          {NAV.map((entry) => (
            <Link
              key={entry.key}
              href={entry.href}
              className="flex items-center gap-1 rounded-control px-3 py-2 text-sm whitespace-nowrap text-fg-muted hover:bg-surface-hover hover:text-fg"
            >
              {t(entry.key)}
              {entry.hasMenu ? <Icon icon={ChevronDown} size="sm" /> : null}
            </Link>
          ))}
        </nav>

        <label className="ml-auto hidden w-64 min-w-0 shrink items-center gap-2 rounded-control border border-border bg-surface-sunken px-3 py-2 xl:flex">
          <Icon icon={Search} size="sm" className="text-fg-subtle" />
          <span className="sr-only">{t("searchLabel")}</span>
          <input
            type="search"
            placeholder={t("searchPlaceholder")}
            className="w-full min-w-0 bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
          />
          <kbd className="shrink-0 rounded-control bg-surface px-1.5 py-0.5 text-xs text-fg-subtle">
            {t("searchShortcut")}
          </kbd>
        </label>

        <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-3">
          <Link
            href={ROUTES.search}
            aria-label={t("searchLabel")}
            className="grid size-9 place-items-center rounded-control border border-border text-fg-muted hover:bg-surface-hover hover:text-fg xl:hidden"
          >
            <Icon icon={Search} size="md" />
          </Link>
          {/* Not in the design, but without them neither theme nor language is reachable here. */}
          <LocaleSwitcher />
          <ThemeToggle />
          <Button asChild variant="secondary" className="hidden sm:inline-flex">
            <Link href={ROUTES.login}>{t("signIn")}</Link>
          </Button>
          <Button asChild>
            <Link href={ROUTES.login}>{t("getStarted")}</Link>
          </Button>
        </div>
      </div>

      {/* Below `lg` the nav lives here instead of being unreachable. */}
      {isMenuOpen ? (
        <nav
          aria-label={t("label")}
          className="flex flex-col gap-1 border-t border-border px-4 py-3 md:px-6 lg:hidden"
        >
          {NAV.map((entry) => (
            <Link
              key={entry.key}
              href={entry.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-control px-3 py-2 text-sm text-fg-muted hover:bg-surface-hover hover:text-fg"
            >
              {t(entry.key)}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
