interface OrnamentProps {
  readonly className?: string;
  readonly variant?: "default" | "wide" | "simple";
}

export default function Ornament({
  className = "",
}: OrnamentProps) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <div className="h-px w-16 bg-mac-border-light" />
    </div>
  );
}
