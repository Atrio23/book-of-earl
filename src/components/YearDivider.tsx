interface YearDividerProps {
  readonly year: number;
}

export default function YearDivider({ year }: YearDividerProps) {
  return (
    <div className="sticky top-0 z-10 bg-gradient-to-b from-[#e8e8e8] to-[#dedede] border-t border-t-[#f0f0f0] border-b border-b-[#c8c8c8] px-4 py-1">
      <span className="text-[12px] font-bold text-[#555] font-[family-name:var(--font-system)] tracking-wide tabular-nums">
        {year}
      </span>
    </div>
  );
}
