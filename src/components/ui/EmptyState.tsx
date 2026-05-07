type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-civic-line bg-white px-5 py-8 text-center">
      <p className="text-base font-semibold text-civic-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-civic-muted">
        {description}
      </p>
    </div>
  );
}
