type SectionTitleProps = {
  title: string;
  description?: string;
};

export default function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-civic-ink">{title}</h3>
      {description ? (
        <p className="mt-1 text-sm leading-6 text-civic-muted">{description}</p>
      ) : null}
    </div>
  );
}
