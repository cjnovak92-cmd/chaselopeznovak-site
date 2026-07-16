type WordmarkProps = {
  name: string;
  variant: "vertical" | "horizontal";
  as?: "h1" | "span";
  decorative?: boolean;
  className?: string;
  id?: string;
};

const wordColors = [
  "text-brand-blue",
  "text-brand-green",
  "text-brand-red",
] as const;

export function Wordmark({
  name,
  variant,
  as: Component = "span",
  decorative = false,
  className = "",
  id,
}: WordmarkProps) {
  const nameParts = name.trim().split(/\s+/);

  return (
    <Component
      id={id}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : name}
      className={`wordmark wordmark--${variant} ${className}`}
    >
      <span aria-hidden="true" className="wordmark__visual">
        {nameParts.map((part, index) => (
          <span
            key={`${part}-${index}`}
            className={`wordmark__part ${wordColors[index] ?? "text-foreground"}`}
          >
            {part}
          </span>
        ))}
      </span>
    </Component>
  );
}
