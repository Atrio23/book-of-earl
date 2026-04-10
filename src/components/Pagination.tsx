"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly totalItems?: number;
  readonly pageSize?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems = 0,
  pageSize = 20,
}: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1 && totalItems === 0) {
    return null;
  }

  const buildHref = (page: number): string => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const queryString = params.toString();
    return `/archive${queryString ? `?${queryString}` : ""}`;
  };

  const rangeStart = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const rangeEnd = totalItems > 0 ? Math.min(currentPage * pageSize, totalItems) : 0;

  const arrowButtonBase =
    "inline-flex items-center justify-center w-[22px] h-[18px] rounded-[3px] text-[#555] transition-colors";
  const arrowButtonEnabled =
    "bg-gradient-to-b from-[#fafafa] to-[#e8e8e8] border border-[#aaa] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_1px_rgba(0,0,0,0.06)] hover:from-[#fff] hover:to-[#eee] active:from-[#ddd] active:to-[#d0d0d0]";
  const arrowButtonDisabled = "opacity-30 cursor-default";

  return (
    <div className="flex items-center justify-between px-3 py-1.5 bg-gradient-to-b from-[#e8e8e8] to-[#d8d8d8] border-t border-[#b8b8b8]">
      {/* Left arrow */}
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className={`${arrowButtonBase} ${arrowButtonEnabled}`}
          aria-label="Previous page"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      ) : (
        <span
          className={`${arrowButtonBase} ${arrowButtonDisabled}`}
          aria-hidden="true"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </span>
      )}

      {/* Center status text */}
      <p className="text-[11px] text-[#666] font-[family-name:var(--font-system)] tabular-nums">
        {totalItems > 0
          ? `Showing ${rangeStart}\u2013${rangeEnd} of ${totalItems} letter${totalItems !== 1 ? "s" : ""}`
          : `Page ${currentPage} of ${totalPages}`}
      </p>

      {/* Right arrow */}
      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className={`${arrowButtonBase} ${arrowButtonEnabled}`}
          aria-label="Next page"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      ) : (
        <span
          className={`${arrowButtonBase} ${arrowButtonDisabled}`}
          aria-hidden="true"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
      )}
    </div>
  );
}
