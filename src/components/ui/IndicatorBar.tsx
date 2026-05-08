import { classNames } from "../../utils/classNames";

type IndicatorBarProps = {
  label: string;
  value: number;
  /** Jika true, bar diisi dari kanan (nilai rendah = panjang bar lebih panjang) */
  inverted?: boolean;
  colorClass?: string;
};

export default function IndicatorBar({
  label,
  value,
  inverted = false,
  colorClass = "bg-civic-primary",
}: IndicatorBarProps) {
  const fill = inverted ? 100 - value : value;

  const autoColor =
    fill >= 75
      ? "bg-priority-high"
      : fill >= 50
      ? "bg-priority-medium"
      : "bg-priority-low";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-civic-muted">
        <span>{label}</span>
        <span className="font-semibold tabular-nums text-civic-ink">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-civic-soft">
        <div
          className={classNames(
            "h-full rounded-full transition-all duration-500",
            colorClass === "auto" ? autoColor : colorClass
          )}
          style={{ width: `${fill}%` }}
        />
      </div>
    </div>
  );
}



