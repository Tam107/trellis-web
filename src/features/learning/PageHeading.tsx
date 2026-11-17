import type { ReactNode } from "react";

export type PageHeadingProps = {
  title: string;
  description: string;
  /** Buttons or a filter, right-aligned beside the title. */
  actions?: ReactNode;
};

/** The heading every secondary learning screen opens with. */
export function PageHeading({ title, description, actions }: PageHeadingProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-fg">{title}</h1>
        <p className="mt-1 text-sm text-fg-muted">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}
