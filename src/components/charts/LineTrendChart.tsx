interface DataPoint {
  year: number;
  value: number;
}

interface LineTrendChartProps {
  data: DataPoint[];
  color?: "primary" | "brick" | "gold" | "moss";
  height?: number;
  valueSuffix?: string;
  minY?: number;
  maxY?: number;
}

export default function LineTrendChart({
  data,
  color = "primary",
  height = 180,
  valueSuffix = "",
  minY,
  maxY,
}: LineTrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-civic-line text-xs text-civic-muted">
        Tidak ada data tren
      </div>
    );
  }

  // Color mapping
  const colorMap = {
    primary: { stroke: "#2F756E", fill: "rgba(47, 117, 110, 0.1)", dot: "#2F756E" },
    brick: { stroke: "#A33A2C", fill: "rgba(163, 58, 44, 0.1)", dot: "#A33A2C" },
    gold: { stroke: "#B58A27", fill: "rgba(181, 138, 39, 0.1)", dot: "#B58A27" },
    moss: { stroke: "#3F7D5D", fill: "rgba(63, 125, 93, 0.1)", dot: "#3F7D5D" },
  };

  const selectedColor = colorMap[color];

  // SVG parameters
  const svgWidth = 500;
  const svgHeight = height;
  const paddingLeft = 40;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 30;

  // Range calculation
  const values = data.map((d) => d.value);
  const minVal = minY !== undefined ? minY : Math.min(...values, 0) === 0 ? 0 : Math.max(0, Math.min(...values) - 10);
  const maxVal = maxY !== undefined ? maxY : Math.max(...values, 100) === 100 ? 100 : Math.max(...values) + 10;
  const valRange = maxVal - minVal || 1;

  // Grid lines
  const gridTicks = [0, 0.25, 0.5, 0.75, 1];

  // Point projection
  const points = data.map((d, index) => {
    const x =
      paddingLeft +
      (index * (svgWidth - paddingLeft - paddingRight)) / (data.length - 1);
    const y =
      svgHeight -
      paddingBottom -
      ((d.value - minVal) * (svgHeight - paddingTop - paddingBottom)) / valRange;
    return { x, y, value: d.value, year: d.year };
  });

  // Generate SVG path string for line
  let pathD = "";
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ");
  }

  // Generate SVG path string for filled area under the line
  let areaD = "";
  if (points.length > 0) {
    areaD =
      `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingBottom} ` +
      `L ${points[0].x} ${svgHeight - paddingBottom} Z`;
  }

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="overflow-visible"
        width="100%"
        height={height}
      >
        {/* Horizontal Gridlines */}
        {gridTicks.map((tick, i) => {
          const yVal = minVal + tick * valRange;
          const y =
            svgHeight -
            paddingBottom -
            (tick * (svgHeight - paddingTop - paddingBottom));
          return (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={svgWidth - paddingRight}
                y2={y}
                stroke="#EAE2D3"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <text
                x={paddingLeft - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-civic-muted font-mono text-[10px]"
              >
                {Math.round(yVal)}
              </text>
            </g>
          );
        })}

        {/* Shaded Area Under Line */}
        {areaD && (
          <path d={areaD} fill={selectedColor.fill} stroke="none" />
        )}

        {/* Line Path */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke={selectedColor.stroke}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Data points & labels */}
        {points.map((p, i) => (
          <g key={i}>
            {/* Year Label */}
            <text
              x={p.x}
              y={svgHeight - 10}
              textAnchor="middle"
              className="fill-civic-muted text-[10px] font-semibold"
            >
              {p.year}
            </text>

            {/* Glowing outer circle */}
            <circle
              cx={p.x}
              cy={p.y}
              r={5}
              fill="white"
              stroke={selectedColor.stroke}
              strokeWidth={1.5}
            />

            {/* Solid dot */}
            <circle cx={p.x} cy={p.y} r={2.5} fill={selectedColor.dot} />

            {/* Value above point */}
            <text
              x={p.x}
              y={p.y - 10}
              textAnchor="middle"
              className="fill-civic-ink text-[10px] font-bold"
            >
              {p.value}
              {valueSuffix}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
