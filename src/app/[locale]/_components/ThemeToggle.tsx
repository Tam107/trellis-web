"use client";

import { Moon, Sun } from "@/ui/icons/lucide";
import { useTranslations } from "next-intl";
import { applyTheme, currentTheme, THEMES } from "@/shared/lib/theme";
import { Button } from "@astryxdesign/core/Button";
import { Icon } from "@astryxdesign/core/Icon";

/** Both icons render; CSS shows the right one, so server and client output match. */
export function ThemeToggle() {
  const t = useTranslations("common.theme");
  return (
    <Button
      variant="ghost"
      size="sm"
      isIconOnly
      label={t("toggle")}
      onClick={() => applyTheme(currentTheme() === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK)}
      icon={
        <>
          <Icon icon={Moon} size="sm" className="dark:hidden" />
          <Icon icon={Sun} size="sm" className="hidden dark:block" />
        </>
      }
    />
  );
}
