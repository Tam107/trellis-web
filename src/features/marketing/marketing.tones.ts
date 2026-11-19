import type { BadgePropsDefaults } from "@/ui/Badge";

/** Badge tones the marketing pages use. Extracted because a literal prop in JSX trips the i18n rule. */
export const PLAN_FEATURED_TONE: BadgePropsDefaults["tone"] = "brand";
export const RESOURCE_KIND_TONE: BadgePropsDefaults["tone"] = "brand";
export const BESTSELLER_TONE: BadgePropsDefaults["tone"] = "warning";
