type InfoPanelProps = {
  title: string;
  description: string;
};

export default function InfoPanel({ title, description }: InfoPanelProps) {
  return (
    <aside className="rounded-lg border border-civic-line bg-civic-soft p-5">
      <p className="text-sm font-semibold text-civic-ink">{title}</p>
      <p className="mt-2 text-sm leading-6 text-civic-muted">{description}</p>
    </aside>
  );
}



