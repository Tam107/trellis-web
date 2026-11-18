import { cn } from "./cn";

export type ProgressBarPropsDefaults = {
  /** 0-100. Values outside the range are clamped, so a bad number cannot break the layout. */
  value: number;
  size: "sm" | "md";
};

export const progressBarDefaults: ProgressBarPropsDefaults = { value: 0, size: "md" };

export type ProgressBarProps = Partial<ProgressBarPropsDefaults> & {
  /** Required: a bare bar tells a screen reader nothing about what is progressing. */
  label: string;
  className?: string;
};

const TRACK_HEIGHT: Record<ProgressBarPropsDefaults["size"], string> = {
  sm: "h-1",
  md: "h-2",
};

export function ProgressBar({
  value = progressBarDefaults.value,
  size = progressBarDefaults.size,
  label,
  className,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "w-full overflow-hidden rounded-control bg-surface-sunken",
        TRACK_HEIGHT[size],
        className,
      )}
    >
      <div
        className="h-full rounded-control bg-brand transition-[width] duration-normal ease-standard"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
