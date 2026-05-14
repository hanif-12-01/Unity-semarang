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
  colorClass = "auto",
}: IndicatorBarProps) {
  // Gunakan effectiveValue untuk menentukan tingkat prioritas (warna)
  // Untuk indikator inverted, nilai asli tinggi = effectiveValue rendah (aman/hijau)
  const effectiveValue = inverted ? 100 - value : value;

  const autoColor =
    effectiveValue >= 75
      ? "bg-priority-high"
      : effectiveValue >= 50
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
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}



