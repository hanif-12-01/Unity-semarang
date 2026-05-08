import { classNames } from "../../utils/classNames";

type PriorityLevel = "high" | "medium" | "low";

type PriorityBadgeProps = {
  level: PriorityLevel;
};

const badgeConfig: Record<PriorityLevel, { label: string; className: string }> = {
  high: {
    label: "Prioritas Tinggi",
    className: "border-red-200 bg-red-50 text-red-700",
  },
  medium: {
    label: "Prioritas Sedang",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  low: {
    label: "Prioritas Rendah",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
};

export default function PriorityBadge({ level }: PriorityBadgeProps) {
  const config = badgeConfig[level];

  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}



