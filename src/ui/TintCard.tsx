import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "./cn";

/**
 * A showcase card: a picture or a header on top, a solid pastel body under it, a large title and
 * plain text. The colour does the grouping, so a row of these needs no borders or shadows.
 */
export const tintCardVariants = cva(
  "group flex h-full flex-col overflow-hidden rounded-dialog text-fg transition-transform duration-normal ease-standard",
  {
    variants: {
      variant: {
        amber: "bg-tint-amber",
        mint: "bg-tint-mint",
        rose: "bg-tint-rose",
        sky: "bg-info-subtle",
      },
      isInteractive: {
        true: "hover:-translate-y-1",
        false: "",
      },
    },
  },
);

type TintCardVariantProps = VariantProps<typeof tintCardVariants>;

export type TintCardPropsDefaults = {
  variant: NonNullable<TintCardVariantProps["variant"]>;
};

export const tintCardDefaults: TintCardPropsDefaults = { variant: "amber" };

export type TintCardProps = Partial<TintCardPropsDefaults> & {
  /** The top part: a `TintCardMedia` photo, or a small header row. */
  media?: ReactNode;
  title: ReactNode;
  body: ReactNode;
  /** The line at the bottom, e.g. a "Learn more" with an arrow. */
  action?: ReactNode;
  /** Extra content between the body and the action, such as a badge row. */
  children?: ReactNode;
  className?: string;
};

/** Body of the card; wrap it in a `Link` (with `tintCardVariants`) when the whole card navigates. */
export function TintCardContent({
  media,
  title,
  body,
  action,
  children,
}: Omit<TintCardProps, "variant" | "className">) {
  return (
    <>
      {media}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="text-2xl leading-tight font-semibold tracking-tight text-balance">{title}</h3>
        <p className="mt-3 text-base leading-relaxed">{body}</p>
        {children}
        {action ? <div className="mt-auto pt-6 text-sm font-semibold">{action}</div> : null}
      </div>
    </>
  );
}

/** A card that is not a link. For one that is, use `tintCardVariants` on a `Link`. */
export function TintCard({ variant = tintCardDefaults.variant, className, ...content }: TintCardProps) {
  return (
    <div className={cn(tintCardVariants({ variant, isInteractive: false }), className)}>
      <TintCardContent {...content} />
    </div>
  );
}
