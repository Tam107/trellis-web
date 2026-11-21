import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Container } from "./Container";

export type CallToActionProps = {
  title: ReactNode;
  description?: ReactNode;
  /** One or two buttons. On the brand fill, use `variant="secondary"` so they stay readable. */
  actions: ReactNode;
  className?: string;
};

/**
 * The banner a public page closes with, just above the footer: one rounded brand panel inside the
 * page column, a light grid for texture, a large centred headline and the page's one action.
 * It is the only place the solid brand colour fills a block, so it reads as the page's last word.
 *
 * Buttons inside it are pills (`rounded-full`); everywhere else they keep the control radius.
 */
export function CallToAction({ title, description, actions, className }: CallToActionProps) {
  return (
    <section className={cn("bg-canvas", className)}>
      <Container className="py-14 lg:py-20">
        <div className="relative reveal overflow-hidden rounded-dialog bg-brand px-6 py-16 text-center text-on-brand md:py-24">
          <span aria-hidden className="absolute inset-0 bg-grid-inverse" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance md:text-5xl">
              {title}
            </h2>
            {description ? <p className="mt-4 text-lg leading-relaxed opacity-90">{description}</p> : null}
            <div className="mt-8 flex flex-wrap justify-center gap-3 [&_a]:rounded-full [&_button]:rounded-full">
              {actions}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
