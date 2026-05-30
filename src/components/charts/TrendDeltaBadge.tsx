import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface TrendDeltaBadgeProps {
  delta: number;
  indicatorType: "positive" | "risk" | "accountability";
  showValue?: boolean;
  unit?: string;
}

export default function TrendDeltaBadge({
  delta,
  indicatorType,
  showValue = true,
  unit = "",
}: TrendDeltaBadgeProps) {
  const isZero = Math.abs(delta) < 0.1;
  const isIncrease = delta > 0;

  // Determine status (good, bad, or neutral)
  let status: "good" | "bad" | "neutral" = "neutral";
  let label = "Stabil";

  if (!isZero) {
    if (indicatorType === "positive" || indicatorType === "accountability") {
      status = isIncrease ? "good" : "bad";
      label = isIncrease ? "Membaik" : "Menurun";
    } else if (indicatorType === "risk") {
      status = isIncrease ? "bad" : "good";
      label = isIncrease ? "Perlu Perhatian" : "Membaik";
    }
  }

  const colorClasses = {
    good: "bg-emerald-50 text-emerald-700 border-emerald-200",
    bad: "bg-red-50 text-red-700 border-red-200",
    neutral: "bg-civic-soft/40 text-civic-muted border-civic-line/60",
  };

  const Icon = isZero ? Minus : isIncrease ? ArrowUp : ArrowDown;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-semibold ${colorClasses[status]}`}
    >
      <Icon size={11} className="shrink-0" />
      <span>{label}</span>
      {showValue && !isZero && (
        <span className="font-bold ml-0.5">
          {isIncrease ? "+" : ""}
          {delta}
          {unit}
        </span>
      )}
    </span>
  );
}
