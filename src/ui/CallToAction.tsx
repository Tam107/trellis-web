import type { ReactNode } from "react";
import { cn } from "./cn";
import { Container } from "./Container";

export type CallToActionProps = {
  title: ReactNode;
  description?: ReactNode;
  /** One or two buttons. On the brand fill, use `variant="secondary"` so they stay readable. */
  actions: ReactNode;
  className?: string;
};

/**
 * The band a public page closes with, just above the footer. It is the only place the solid brand
 * colour fills a whole band, so it reads as the page's last word and not as another section.
 */
export function CallToAction({ title, description, actions, className }: CallToActionProps) {
  return (
    <section className={cn("bg-brand text-on-brand", className)}>
      <Container className="flex reveal flex-col items-start gap-8 py-14 md:flex-row md:items-center md:justify-between lg:py-16">
        <div className="max-w-2xl min-w-0">
          <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">{title}</h2>
          {description ? <p className="mt-3 text-base leading-relaxed opacity-90">{description}</p> : null}
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
      </Container>
    </section>
  );
}
