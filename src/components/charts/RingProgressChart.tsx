interface RingProgressChartProps {
  percentage: number;
  label: string;
  subLabel?: string;
  size?: number;
  color?: string;
}

export default function RingProgressChart({
  percentage,
  label,
  subLabel,
  size = 120,
  color = "#2F756E", // default teal
}: RingProgressChartProps) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#EAE2D3"
            strokeWidth={strokeWidth}
          />
          {/* Foreground circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Centered label percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-extrabold text-civic-ink tabular-nums">{percentage}%</span>
          {subLabel && <span className="text-[8px] font-bold uppercase tracking-wider text-civic-muted mt-0.5">{subLabel}</span>}
        </div>
      </div>
      <span className="text-[11px] font-bold text-civic-ink text-center leading-tight">{label}</span>
    </div>
  );
}
