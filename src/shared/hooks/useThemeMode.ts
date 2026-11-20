"use client";

import { useSyncExternalStore } from "react";
import { currentTheme, type Theme } from "@/shared/lib/theme";

/** What Astryx's `<Theme mode>` takes: the two themes, or `system` before the page has chosen. */
export type ThemeMode = Theme | "system";
/** The server cannot know the viewer's theme, so it renders `system` and the client corrects it. */
const SERVER_MODE: ThemeMode = "system";

/** Notifies when something toggles the `dark` class on <html> (the theme toggle, or the init script). */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

/**
 * The current colour theme as Astryx wants it. `shared/lib/theme.ts` stays the one place that
 * decides and stores the theme (a class on <html>, set before first paint); this hook only
 * reads it, so the Astryx components and the Tailwind tokens always switch together.
 */
export function useThemeMode(): ThemeMode {
  return useSyncExternalStore(subscribe, currentTheme, () => SERVER_MODE);
}
