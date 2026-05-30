interface MiniBarPoint {
  year: number;
  value: number;
}

interface MiniBarChartProps {
  data: MiniBarPoint[];
  color?: string;
  width?: number;
  height?: number;
}

export default function MiniBarChart({
  data,
  color = "#2F756E", // default teal
  width = 80,
  height = 30,
}: MiniBarChartProps) {
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const totalGaps = data.length - 1;
  const gap = 3;
  const barWidth = (width - totalGaps * gap) / data.length;

  return (
    <svg width={width} height={height} className="overflow-visible">
      {data.map((d, i) => {
        const barHeight = Math.max(2, (d.value / maxVal) * height);
        const x = i * (barWidth + gap);
        const y = height - barHeight;

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={1}
              fill={color}
            />
            {/* Tooltip on hover */}
            <title>{`${d.year}: ${d.value}`}</title>
          </g>
        );
      })}
    </svg>
  );
}
