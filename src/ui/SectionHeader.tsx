import type { ReactNode } from "react";
import { cn } from "./cn";

export type SectionHeaderProps = {
  title: ReactNode;
  /** A short label above the title naming the section's subject. */
  eyebrow?: ReactNode;
  description?: ReactNode;
  /** A link or button aligned with the title, such as "View all". */
  action?: ReactNode;
  /** Lets the section point `aria-labelledby` at its heading. */
  titleId?: string;
  className?: string;
};

/** The heading every page section opens with. No rule or ornament: the type does the work. */
export function SectionHeader({
  title,
  eyebrow,
  description,
  action,
  titleId,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex reveal flex-wrap items-end justify-between gap-4", className)}>
      <div className="max-w-2xl min-w-0">
        {eyebrow ? <p className="mb-2 text-sm font-semibold text-fg-brand">{eyebrow}</p> : null}
        <h2 id={titleId} className="text-2xl font-semibold tracking-tight text-balance text-fg md:text-3xl">
          {title}
        </h2>
        {description ? <p className="mt-3 text-base leading-relaxed text-fg-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
