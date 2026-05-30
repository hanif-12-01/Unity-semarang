interface StackedDataPoint {
  label: string;
  complaint: number; // Keluhan
  criticism: number; // Kritik
  suggestion: number; // Saran
  appreciation: number; // Apresiasi
}

interface StackedFeedbackChartProps {
  data: StackedDataPoint[];
}

export default function StackedFeedbackChart({ data }: StackedFeedbackChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-civic-line text-xs text-civic-muted">
        Tidak ada data feedback
      </div>
    );
  }

  // Category definitions and colors
  const categories = [
    { key: "complaint" as const, label: "Keluhan", color: "#A33A2C" },
    { key: "criticism" as const, label: "Kritik", color: "#B58A27" },
    { key: "suggestion" as const, label: "Saran", color: "#2F756E" },
    { key: "appreciation" as const, label: "Apresiasi", color: "#3F7D5D" },
  ];

  // SVG parameters
  const barHeight = 20;
  const barGap = 14;
  const paddingTop = 15;
  const paddingBottom = 45; // Space for legend at bottom
  const paddingLeft = 125;
  const paddingRight = 45;
  const svgWidth = 500;
  const svgHeight = paddingTop + paddingBottom + data.length * (barHeight + barGap) - barGap;

  // Max total for scaling
  const totals = data.map((d) => d.complaint + d.criticism + d.suggestion + d.appreciation);
  const maxTotal = Math.max(...totals, 1);

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="overflow-visible"
        width="100%"
        height={svgHeight}
      >
        {/* Draw stacked bars */}
        {data.map((d, i) => {
          const y = paddingTop + i * (barHeight + barGap);
          const total = d.complaint + d.criticism + d.suggestion + d.appreciation;
          const barWidthScale = (svgWidth - paddingLeft - paddingRight) / maxTotal;

          let currentX = paddingLeft;

          return (
            <g key={i} className="group">
              {/* Row Label */}
              <text
                x={paddingLeft - 10}
                y={y + barHeight / 2 + 4}
                textAnchor="end"
                className="text-[11px] font-semibold fill-civic-muted group-hover:fill-civic-ink transition-colors"
              >
                {d.label}
              </text>

              {/* Draw segments */}
              {categories.map((cat) => {
                const val = d[cat.key];
                if (val <= 0) return null;

                const segmentWidth = val * barWidthScale;
                const segmentX = currentX;
                currentX += segmentWidth;

                return (
                  <g key={cat.key}>
                    <rect
                      x={segmentX}
                      y={y}
                      width={segmentWidth}
                      height={barHeight}
                      fill={cat.color}
                      className="transition-all duration-500 first:rounded-l last:rounded-r"
                    />
                  </g>
                );
              })}

              {/* Draw total label at end of bar */}
              <text
                x={currentX + 8}
                y={y + barHeight / 2 + 4}
                textAnchor="start"
                className="text-[10px] font-bold fill-civic-ink"
              >
                {total}
              </text>
            </g>
          );
        })}

        {/* Draw Legend at bottom */}
        <g transform={`translate(${paddingLeft - 40}, ${svgHeight - 20})`}>
          {categories.map((cat, i) => {
            const x = i * 90;
            return (
              <g key={cat.key} transform={`translate(${x}, 0)`}>
                <rect width={12} height={12} rx={2} fill={cat.color} />
                <text
                  x={18}
                  y={10}
                  className="text-[10px] font-semibold fill-civic-muted"
                >
                  {cat.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
