interface ServicesGridProps {
  children: React.ReactNode;
}

export function ServicesGrid({ children }: ServicesGridProps) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className="space-y-0">
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
