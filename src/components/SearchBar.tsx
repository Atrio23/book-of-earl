"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

interface SearchBarProps {
  readonly years: readonly number[];
  readonly initialSearch?: string;
  readonly initialYear?: number;
}

export default function SearchBar({
  years,
  initialSearch = "",
  initialYear,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(initialSearch);

  const updateParams = useCallback(
    (newSearch: string, newYear: number | undefined) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newSearch.trim()) {
        params.set("search", newSearch.trim());
      } else {
        params.delete("search");
      }

      if (newYear) {
        params.set("year", String(newYear));
      } else {
        params.delete("year");
      }

      params.delete("page");

      startTransition(() => {
        router.push(`/archive?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams(searchValue, initialYear);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value ? Number(e.target.value) : undefined;
    updateParams(searchValue, year);
  };

  const handleClear = () => {
    setSearchValue("");
    updateParams("", undefined);
  };

  const hasText = searchValue.trim().length > 0;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-b from-[#e8e8e8] to-[#d8d8d8] border-b border-[#b8b8b8]">
      {/* Year dropdown - Mac popup button style */}
      <div className="relative">
        <select
          value={initialYear ?? ""}
          onChange={handleYearChange}
          className="appearance-none bg-gradient-to-b from-[#fafafa] to-[#e8e8e8] border border-[#aaa] rounded-[4px] pl-2 pr-6 py-[3px] text-[12px] text-[#333] font-[family-name:var(--font-system)] cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_1px_rgba(0,0,0,0.08)] focus:outline-none focus:border-[#6dacec] focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_0_3px_rgba(61,128,223,0.4)]"
        >
          <option value="">All years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[#666]"
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>

      <div className="flex-1" />

      {/* Search field - Mac rounded search */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <svg
          className="absolute left-2 top-1/2 -translate-y-1/2 text-[#999]"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
          className="w-[200px] pl-7 pr-7 py-[3px] bg-white border border-[#aaa] rounded-full text-[12px] text-[#333] placeholder:text-[#aaa] font-[family-name:var(--font-system)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] focus:outline-none focus:border-[#6dacec] focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1),0_0_3px_rgba(61,128,223,0.4)]"
        />
        {hasText && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-[#999] hover:bg-[#777] flex items-center justify-center transition-colors"
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </form>

      {isPending && (
        <span className="text-[11px] text-[#888] font-[family-name:var(--font-system)] animate-pulse">
          ...
        </span>
      )}
    </div>
  );
}
