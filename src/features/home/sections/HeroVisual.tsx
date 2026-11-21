import {
  BarChart3,
  BookOpen,
  Globe,
  GraduationCap,
  MessageSquare,
  Sparkles,
  Target,
  Trophy,
} from "@/ui/icons/lucide";
import { cn } from "@/ui/lib/cn";
import { Icon } from "@astryxdesign/core/Icon";

const HERO_ICONS = [
  { icon: BookOpen, tile: "bg-tint-amber", className: "-top-7 -left-7 -rotate-6" },
  { icon: Sparkles, tile: "bg-tint-mint", className: "-top-7 -right-7 rotate-6" },
  { icon: GraduationCap, tile: "bg-tint-rose", className: "-bottom-7 -left-7 rotate-6" },
  { icon: BarChart3, tile: "bg-info-subtle", className: "-right-7 -bottom-7 -rotate-6" },
] as const;

const HERO_STICKERS = [
  { icon: Globe, tile: "bg-tint-mint", className: "top-1/3 left-20 -rotate-6" },
  { icon: MessageSquare, tile: "bg-surface", className: "bottom-1/3 left-10 rotate-6" },
  { icon: Trophy, tile: "bg-tint-amber", className: "top-1/3 right-10 rotate-6" },
  { icon: Target, tile: "bg-tint-rose", className: "right-20 bottom-1/3 -rotate-6" },
] as const;

/** Learning symbols frame the headline without the visual weight of extra photos. */
export function HeroVisual() {
  return (
    <ul aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
      {HERO_ICONS.map(({ icon, tile, className }) => (
        <li
          key={className}
          className={cn(
            "absolute grid size-24 place-items-center rounded-dialog border border-border text-fg-brand",
            tile,
            className,
          )}
        >
          <Icon icon={icon} size="lg" />
        </li>
      ))}
      {HERO_STICKERS.map(({ icon, tile, className }) => (
        <li
          key={className}
          className={cn(
            "absolute grid size-14 place-items-center rounded-full border border-border text-fg-brand",
            tile,
            className,
          )}
        >
          <Icon icon={icon} size="md" />
        </li>
      ))}
    </ul>
  );
}
