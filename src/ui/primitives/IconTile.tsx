import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "@astryxdesign/core/Icon";

export type IconTileProps = {
  icon: LucideIcon;
  className?: string;
};

/** The square that holds an icon beside a heading. One size everywhere, so rows of them line up. */
export function IconTile({ icon, className }: IconTileProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-control bg-info-subtle text-fg-brand",
        className,
      )}
    >
      <Icon icon={icon} size="sm" />
    </span>
  );
}
