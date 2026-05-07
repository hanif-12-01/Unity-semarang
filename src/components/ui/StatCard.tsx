type StatCardProps = {
  label: string;
  value: string;
  description: string;
};

export default function StatCard({ label, value, description }: StatCardProps) {
  return (
    <article className="rounded-lg border border-civic-line bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-civic-muted">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-civic-ink">{value}</p>
      <p className="mt-2 text-sm leading-6 text-civic-muted">{description}</p>
    </article>
  );
}
