interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`mb-12 ${alignment}`}>
      {badge ? (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-xs font-semibold uppercase tracking-[0.08em] rounded-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {badge}
        </div>
      ) : null}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">{description}</p>
      ) : null}
    </div>
  );
}
