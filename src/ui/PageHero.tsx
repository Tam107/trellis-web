import type { ReactNode } from "react";
import { cn } from "./cn";
import { Container } from "./Container";

export type PageHeroProps = {
  title: ReactNode;
  /** A short line above the title naming the page or its category. */
  eyebrow?: ReactNode;
  description?: ReactNode;
  /** Buttons under the text. */
  actions?: ReactNode;
  /** Extra content between the description and the actions, such as meta badges or stats. */
  children?: ReactNode;
  /** The right half on desktop (a picture, a summary card); stacks under the text on a phone. */
  aside?: ReactNode;
  titleId?: string;
  className?: string;
};

/**
 * The band every public page opens with: the tinted brand surface, so it never shares a colour
 * with the header above it. Its parts arrive one after another on load; that is the page's one
 * entrance, everything below reveals as it is scrolled to.
 */
export function PageHero({
  title,
  eyebrow,
  description,
  actions,
  children,
  aside,
  titleId,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("overflow-hidden bg-info-subtle", className)}>
      <Container
        className={cn(
          "grid items-center gap-12 py-14 lg:py-20",
          aside ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-16" : null,
        )}
      >
        <div className="min-w-0">
          {eyebrow ? (
            <p className="inline-flex animate-rise items-center gap-2 rounded-control border border-border bg-surface px-3 py-1 text-xs font-semibold text-fg-brand">
              <span aria-hidden className="size-1.5 rounded-full bg-brand" />
              {eyebrow}
            </p>
          ) : null}
          <h1
            id={titleId}
            className="mt-5 max-w-3xl animate-rise pb-1 text-4xl leading-[1.1] font-bold tracking-tighter text-balance text-fg stagger-1 md:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl animate-rise text-lg leading-relaxed text-fg-muted stagger-2">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-6 animate-rise stagger-3">{children}</div> : null}
          {actions ? <div className="mt-8 flex animate-rise flex-wrap gap-3 stagger-4">{actions}</div> : null}
        </div>
        {aside ? <div className="min-w-0 animate-rise stagger-3">{aside}</div> : null}
      </Container>
    </section>
  );
}
