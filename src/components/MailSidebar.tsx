import Link from "next/link";

interface MailSidebarProps {
  readonly totalCount: number;
  readonly yearCounts: readonly { year: number; count: number }[];
  readonly categories: readonly { category: string; count: number }[];
  readonly activeYear?: number;
  readonly activeCategory?: string;
}

export default function MailSidebar({
  totalCount,
  yearCounts,
  categories,
  activeYear,
  activeCategory,
}: MailSidebarProps) {
  const isAllActive = !activeYear && !activeCategory;

  return (
    <aside className="w-[210px] shrink-0 bg-[#e8e6e3] border-r border-[#b8b8b8] flex flex-col select-none overflow-y-auto overflow-x-hidden">
      {/* Mailboxes header */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#6d6d6d] font-[family-name:var(--font-system)]">
          Mailboxes
        </h2>
      </div>

      {/* All Letters */}
      <Link
        href="/archive"
        className={`flex items-center gap-2.5 px-4 py-1.5 text-[13px] font-[family-name:var(--font-system)] transition-colors ${
          isAllActive
            ? "bg-[#3d80df] text-white"
            : "text-[#333] hover:bg-[#d0cec9]"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-10 7L2 7" />
        </svg>
        <span className="font-medium flex-1">All Letters</span>
        <span
          className={`text-[11px] font-medium rounded-full px-1.5 py-0.5 min-w-[22px] text-center ${
            isAllActive
              ? "bg-white/25 text-white"
              : "bg-[#3d80df] text-white"
          }`}
        >
          {totalCount}
        </span>
      </Link>

      {/* Year folders */}
      {yearCounts.length > 0 && (
        <>
          <div className="px-4 pt-4 pb-1">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#8a8a8a] font-[family-name:var(--font-system)]">
              By Year
            </h3>
          </div>
          {yearCounts.map((yc) => {
            const isActive = activeYear === yc.year && !activeCategory;
            return (
              <Link
                key={yc.year}
                href={`/archive?year=${yc.year}`}
                className={`flex items-center gap-2.5 px-4 py-1 text-[13px] font-[family-name:var(--font-system)] transition-colors ${
                  isActive
                    ? "bg-[#3d80df] text-white"
                    : "text-[#333] hover:bg-[#d0cec9]"
                }`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 ml-0.5"
                >
                  <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                </svg>
                <span className="flex-1 truncate">{yc.year}</span>
                <span
                  className={`text-[11px] tabular-nums shrink-0 min-w-[20px] text-right ${
                    isActive ? "text-white/70" : "text-[#8a8a8a]"
                  }`}
                >
                  {yc.count}
                </span>
              </Link>
            );
          })}
        </>
      )}

      {/* Category folders */}
      {categories.length > 0 && (
        <>
          <div className="px-4 pt-4 pb-1">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#8a8a8a] font-[family-name:var(--font-system)]">
              Categories
            </h3>
          </div>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.category;
            return (
              <Link
                key={cat.category}
                href={`/archive?category=${cat.category}`}
                className={`flex items-center gap-2.5 px-4 py-1 text-[13px] font-[family-name:var(--font-system)] capitalize transition-colors ${
                  isActive
                    ? "bg-[#3d80df] text-white"
                    : "text-[#333] hover:bg-[#d0cec9]"
                }`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 ml-0.5"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                <span className="flex-1 truncate">{cat.category}</span>
                <span
                  className={`text-[11px] tabular-nums shrink-0 min-w-[20px] text-right ${
                    isActive ? "text-white/70" : "text-[#8a8a8a]"
                  }`}
                >
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </>
      )}

      <div className="flex-1" />
    </aside>
  );
}
