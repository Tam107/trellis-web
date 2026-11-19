import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "./cn";

/**
 * The one card look. Cards are uniform and plain on purpose, so the content carries the page:
 * `default` is the bordered surface every grid item uses, `brand` is the tinted panel a page uses
 * at most once (a highlighted plan, a summary beside a hero).
 *
 * Exported so a card that is itself a link can take the same classes without nesting a `div`.
 * An interactive card lifts on hover; keep `reveal` on its wrapper, never on the card itself,
 * because both animate `translate`.
 */
export const cardVariants = cva("rounded-card", {
  variants: {
    variant: {
      default: "border border-border bg-surface",
      brand: "border border-transparent bg-info-subtle",
    },
    size: {
      none: "",
      md: "p-5",
      lg: "p-6 md:p-8",
    },
    isInteractive: {
      true: "transition-[translate,box-shadow,border-color] duration-normal ease-standard hover:-translate-y-1 hover:border-border-strong hover:shadow-raised",
      false: "",
    },
  },
});

type CardVariantProps = VariantProps<typeof cardVariants>;

export type CardPropsDefaults = {
  variant: NonNullable<CardVariantProps["variant"]>;
  /** Inner padding; `none` for a card whose picture runs to its edges. */
  size: NonNullable<CardVariantProps["size"]>;
  isInteractive: boolean;
};

export const cardDefaults: CardPropsDefaults = { variant: "default", size: "md", isInteractive: false };

export type CardProps = Partial<CardPropsDefaults> &
  HTMLAttributes<HTMLElement> & {
    /** The element to render; a list item or an article keeps the page's semantics. */
    as?: "div" | "article" | "li" | "section" | "aside" | "figure";
  };

export function Card({
  as: Tag = "div",
  variant = cardDefaults.variant,
  size = cardDefaults.size,
  isInteractive = cardDefaults.isInteractive,
  className,
  ...props
}: CardProps) {
  return <Tag className={cn(cardVariants({ variant, size, isInteractive }), className)} {...props} />;
}
