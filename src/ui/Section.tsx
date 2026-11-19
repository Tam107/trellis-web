import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "./cn";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";

/**
 * A full-width band of a page. After the tinted `PageHero`, pages alternate the two tones, so
 * neighbouring sections are told apart by colour and not by decoration. A `surface` band draws a
 * hairline top and bottom, because white on near-white needs the edge to read.
 */
const sectionVariants = cva("", {
  variants: {
    variant: {
      canvas: "bg-canvas",
      surface: "border-y border-border bg-surface",
    },
  },
});

type SectionVariantProps = VariantProps<typeof sectionVariants>;

export type SectionPropsDefaults = {
  variant: NonNullable<SectionVariantProps["variant"]>;
};

export const sectionDefaults: SectionPropsDefaults = { variant: "canvas" };

export type SectionProps = Partial<SectionPropsDefaults> &
  Omit<ComponentPropsWithoutRef<"section">, "title"> & {
    /** Renders a `SectionHeader` above the content. */
    title?: ReactNode;
    eyebrow?: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
    containerClassName?: string;
  };

export function Section({
  variant = sectionDefaults.variant,
  title,
  eyebrow,
  description,
  action,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants({ variant }), className)} {...props}>
      <Container className={cn("py-14 lg:py-20", containerClassName)}>
        {title ? (
          <SectionHeader
            title={title}
            eyebrow={eyebrow}
            description={description}
            action={action}
            className="mb-10"
          />
        ) : null}
        {children}
      </Container>
    </section>
  );
}
