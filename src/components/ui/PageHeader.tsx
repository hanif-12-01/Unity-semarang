type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <header className="max-w-4xl">
      <p className="text-sm font-semibold uppercase text-civic-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold text-civic-ink md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-civic-muted">{description}</p>
    </header>
  );
}



