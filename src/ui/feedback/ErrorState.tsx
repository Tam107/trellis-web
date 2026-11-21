import { Button } from "@astryxdesign/core/Button";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { Icon } from "@astryxdesign/core/Icon";
import { CircleAlert } from "@/ui/icons/lucide";

export type ErrorStateProps = {
  title: string;
  /** Already mapped from the error code; never a raw server message. */
  description?: string;
  /** Shown with `onRetry`; already translated. */
  retryLabel?: string;
  onRetry?: () => void;
  /** Support reference (correlation id) for server faults. */
  reference?: string;
  className?: string;
};

/** A failed screen: Astryx's `EmptyState` with an error glyph, the support reference and a retry. */
export function ErrorState({
  title,
  description,
  retryLabel,
  onRetry,
  reference,
  className,
}: ErrorStateProps) {
  return (
    <div role="alert" className={className}>
      <EmptyState
        icon={<Icon icon={CircleAlert} size="lg" color="error" />}
        title={title}
        description={description}
        actions={
          onRetry && retryLabel ? (
            <Button variant="secondary" size="sm" onClick={onRetry} label={retryLabel} />
          ) : undefined
        }
      />
      {reference ? <p className="text-center font-mono text-xs text-fg-subtle">{reference}</p> : null}
    </div>
  );
}
