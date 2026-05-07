type ChartPlaceholderProps = {
  title: string;
  description: string;
};

export default function ChartPlaceholder({
  title,
  description,
}: ChartPlaceholderProps) {
  return (
    <div className="rounded-lg border border-civic-line bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-civic-ink">{title}</p>
        <p className="text-sm leading-6 text-civic-muted">{description}</p>
      </div>
      <div className="mt-5 h-48 rounded-md border border-dashed border-civic-line bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F6F8_100%)] p-4">
        <div className="flex h-full items-end gap-3">
          {[45, 68, 38, 76, 54, 62].map((height, index) => (
            <div
              aria-hidden="true"
              className="flex-1 rounded-t-md bg-civic-line"
              key={`${height}-${index}`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
