import { defineTheme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";

/**
 * The Astryx `neutral` theme with this project's tokens on top, so an Astryx component and a
 * Tailwind-styled block read as one surface: the same colours, type and radii, and the same
 * light/dark switch.
 *
 * Every value is a `var()` of a token in `tokens.css` / `globals.css`, never a raw colour, so the
 * `.dark` class on <html> (see `shared/lib/theme.ts`) moves both systems together and
 * `local/no-hardcoded-colors` stays satisfied. The derived `on-accent` is set with the accent on
 * purpose: setting only the accent leaves the text on it at Astryx's default, with no contrast guarantee.
 */
export const trellisTheme = defineTheme({
  extends: neutralTheme,
  name: "trellis",
  tokens: {
    "--font-family-body": "var(--font-inter, ui-sans-serif), ui-sans-serif, system-ui, sans-serif",
    "--font-family-heading": "var(--font-inter, ui-sans-serif), ui-sans-serif, system-ui, sans-serif",
    "--color-accent": "var(--brand)",
    "--color-on-accent": "var(--on-brand)",
    "--color-background-body": "var(--canvas)",
    "--color-background-surface": "var(--surface)",
    "--color-text-primary": "var(--fg)",
    "--radius-element": "0.5rem",
    "--radius-container": "1rem",
    "--radius-page": "1.5rem",
  },
});
