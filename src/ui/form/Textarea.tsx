import type { Ref, TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  ref?: Ref<HTMLTextAreaElement>;
  /** Marks the control invalid for styling and assistive tech; `Field` sets it from its `error`. */
  isInvalid?: boolean;
};

/**
 * The multi-line sibling of `Input`. It exists because `Field` clones its child with `isInvalid`,
 * which a raw `<textarea>` would pass straight to the DOM.
 */
export function Textarea({ isInvalid = false, className, rows = 3, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      aria-invalid={isInvalid || undefined}
      className={cn(
        "w-full rounded-control border border-border-strong bg-surface px-3 py-2 text-sm text-fg placeholder:text-fg-subtle",
        "focus-visible:border-ring focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-60",
        isInvalid && "border-danger",
        className,
      )}
      {...props}
    />
  );
}
