interface BarDataPoint {
  label: string;
  value: number;
  isHighlighted?: boolean;
}

interface BarComparisonChartProps {
  data: BarDataPoint[];
  color?: "primary" | "brick" | "gold" | "moss";
  valueSuffix?: string;
  maxValue?: number;
}

export default function BarComparisonChart({
  data,
  color = "primary",
  valueSuffix = "",
  maxValue,
}: BarComparisonChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-civic-line text-xs text-civic-muted">
        Tidak ada data perbandingan
      </div>
    );
  }

  // Color mapping
  const colorMap = {
    primary: { fill: "#2F756E", bg: "#EAE2D3" },
    brick: { fill: "#A33A2C", bg: "#F5ECEB" },
    gold: { fill: "#B58A27", bg: "#F6efe9" },
    moss: { fill: "#3F7D5D", bg: "#eaf3ef" },
  };

  const selectedColor = colorMap[color];

  // SVG parameters
  const barHeight = 22;
  const barGap = 12;
  const paddingTop = 15;
  const paddingBottom = 15;
  const paddingLeft = 120;
  const paddingRight = 45;
  const svgWidth = 500;
  const svgHeight = paddingTop + paddingBottom + data.length * (barHeight + barGap) - barGap;

  // Max value calculation
  const values = data.map((d) => d.value);
  const maxLimit = maxValue !== undefined ? maxValue : Math.max(...values, 100);

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="overflow-visible"
        width="100%"
        height={svgHeight}
      >
        {/* Draw each bar */}
        {data.map((d, i) => {
          const y = paddingTop + i * (barHeight + barGap);
          const barWidth =
            ((svgWidth - paddingLeft - paddingRight) * Math.max(0, d.value)) / maxLimit;

          return (
            <g key={i} className="group">
              {/* Region Label */}
              <text
                x={paddingLeft - 10}
                y={y + barHeight / 2 + 4}
                textAnchor="end"
                className={`text-[11px] font-semibold transition-colors ${
                  d.isHighlighted
                    ? "fill-civic-ink font-bold"
                    : "fill-civic-muted group-hover:fill-civic-ink"
                }`}
              >
                {d.label}
              </text>

              {/* Bar background track */}
              <rect
                x={paddingLeft}
                y={y}
                width={svgWidth - paddingLeft - paddingRight}
                height={barHeight}
                rx={4}
                fill="#F4EFE6"
                stroke="#D8CCBA"
                strokeWidth={0.5}
              />

              {/* Colored filled bar */}
              <rect
                x={paddingLeft}
                y={y}
                width={Math.max(4, barWidth)}
                height={barHeight}
                rx={4}
                fill={d.isHighlighted ? "#B58A27" : selectedColor.fill} // Highlight with gold if specified
                className="transition-all duration-500"
              />

              {/* Value Label */}
              <text
                x={paddingLeft + Math.max(4, barWidth) + 8}
                y={y + barHeight / 2 + 4}
                textAnchor="start"
                className={`text-[10px] font-bold ${
                  d.isHighlighted ? "fill-civic-gold" : "fill-civic-ink"
                }`}
              >
                {d.value}
                {valueSuffix}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
