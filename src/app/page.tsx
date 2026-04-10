import Link from "next/link";
import {
  fetchLatestEmails,
  fetchTotalCount,
  fetchYearRange,
  fetchYearCounts,
  fetchCategories,
} from "@/lib/queries";
import { fetchRandomPhotos } from "@/lib/photo-queries";
import type { Photo } from "@/lib/photo-queries";
import { formatDateShort, truncateText } from "@/lib/format";
import MailSidebar from "@/components/MailSidebar";
import PhotoCarousel from "@/components/PhotoCarousel";
import type { EmailListItem } from "@/lib/types";

export const revalidate = 60;

export default async function HomePage() {
  let latestEmails: readonly EmailListItem[] = [];
  let totalCount = 0;
  let yearRange = { earliest: 0, latest: 0 };
  let yearCounts: readonly { year: number; count: number }[] = [];
  let categories: readonly { category: string; count: number }[] = [];
  let carouselPhotos: readonly Photo[] = [];
  let fetchError = false;

  try {
    [latestEmails, totalCount, yearRange, yearCounts, categories, carouselPhotos] = await Promise.all([
      fetchLatestEmails(5),
      fetchTotalCount(),
      fetchYearRange(),
      fetchYearCounts(),
      fetchCategories(),
      fetchRandomPhotos(20),
    ]);
  } catch {
    fetchError = true;
    latestEmails = [];
    totalCount = 0;
    yearCounts = [];
    categories = [];
    carouselPhotos = [];
  }

  const yearSpan =
    yearRange.earliest > 0 && yearRange.latest > 0
      ? `${yearRange.earliest}\u2013${yearRange.latest}`
      : "";

  return (
    <div className="page-enter flex flex-col" style={{ minHeight: "calc(100vh - 65px)" }}>
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <MailSidebar
          totalCount={totalCount}
          yearCounts={yearCounts}
          categories={categories}
        />

        {/* Main content - "no message selected" view */}
        <div className="flex-1 min-w-0 flex flex-col bg-white">
          {/* Toolbar-like bar */}
          <div className="px-3 py-1.5 bg-gradient-to-b from-[#e8e8e8] to-[#d8d8d8] border-b border-[#b8b8b8]" />

          {/* Welcome content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="text-center max-w-md">
              {/* Envelope icon */}
              <div className="text-[64px] mb-4 leading-none opacity-40">
                &#9993;
              </div>

              <h1 className="text-[24px] font-bold text-[#333] font-[family-name:var(--font-system)] tracking-tight mb-2">
                The Book of Earl
              </h1>

              <p className="text-[14px] text-[#666] font-[family-name:var(--font-system)] mb-1">
                {totalCount > 0 ? `${totalCount} letters` : "Letters"} from Apartment 10B
                {yearSpan ? `, ${yearSpan}` : ""}
              </p>

              <p className="text-[13px] text-[#999] font-[family-name:var(--font-system)] mb-8">
                Select a letter from the archive or browse by year
              </p>

              {/* Mac aqua-style buttons */}
              <div className="flex items-center justify-center gap-3">
                <Link
                  href="/archive"
                  className="inline-flex items-center px-5 py-1.5 bg-gradient-to-b from-[#6cb3fa] to-[#3d80df] text-white text-[13px] font-medium font-[family-name:var(--font-system)] rounded-[5px] border border-[#2d6bc4] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_1px_2px_rgba(0,0,0,0.15)] hover:from-[#7dc0ff] hover:to-[#4a8ae5] active:from-[#3572c4] active:to-[#2d5fa8] transition-all"
                >
                  Browse Archive
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center px-5 py-1.5 bg-gradient-to-b from-[#fafafa] to-[#e0e0e0] text-[#333] text-[13px] font-medium font-[family-name:var(--font-system)] rounded-[5px] border border-[#aaa] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.08)] hover:from-[#fff] hover:to-[#eaeaea] active:from-[#d8d8d8] active:to-[#ccc] transition-all"
                >
                  About Earl
                </Link>
              </div>
            </div>
          </div>

          {/* Photo gallery */}
          {carouselPhotos.length > 0 && (
            <div className="border-t border-[#b8b8b8]">
              <div className="px-4 py-1 bg-gradient-to-b from-[#e8e8e8] to-[#dedede] border-b border-[#c8c8c8]">
                <span className="text-[12px] font-bold text-[#555] font-[family-name:var(--font-system)] tracking-wide">
                  Family Photos
                </span>
              </div>
              <div className="px-3 py-3 bg-[#f0f0f0]">
                <PhotoCarousel photos={carouselPhotos} />
              </div>
            </div>
          )}

          {/* Latest letters as inbox rows */}
          {!fetchError && latestEmails.length > 0 && (
            <div className="border-t border-[#b8b8b8]">
              <div className="px-4 py-1 bg-gradient-to-b from-[#e8e8e8] to-[#dedede] border-b border-[#c8c8c8]">
                <span className="text-[12px] font-bold text-[#555] font-[family-name:var(--font-system)] tracking-wide">
                  Latest Letters
                </span>
              </div>
              <div className="stagger-fade-in">
                {latestEmails.map((email, idx) => (
                  <Link
                    key={email.id}
                    href={`/email/${email.id}`}
                    className={`block px-4 py-2 border-b border-[#ddd] transition-colors duration-100 ${
                      idx % 2 === 1 ? "bg-[#ecf1f8]" : "bg-white"
                    } hover:bg-[#d4e3f5]`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="shrink-0 mt-[7px] w-[8px] h-[8px] rounded-full bg-[#3d80df]" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="text-[13px] font-bold text-[#1a1a1a] truncate font-[family-name:var(--font-system)] leading-snug">
                            {email.subject}
                          </h3>
                          <time className="shrink-0 text-[11px] text-[#888] font-[family-name:var(--font-system)] tabular-nums whitespace-nowrap">
                            {formatDateShort(email.date_sent)}
                          </time>
                        </div>
                        {email.snippet && (
                          <p className="text-[12px] text-[#888] font-[family-name:var(--font-system)] leading-snug mt-0.5 truncate">
                            {truncateText(email.snippet, 120)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-center px-3 py-1.5 bg-gradient-to-b from-[#e8e8e8] to-[#d8d8d8] border-t border-[#b8b8b8]">
                <Link
                  href="/archive"
                  className="text-[11px] text-[#3d80df] hover:text-[#2d6bc4] font-[family-name:var(--font-system)] font-medium transition-colors"
                >
                  View all {totalCount} letters in archive
                </Link>
              </div>
            </div>
          )}

          {fetchError && (
            <div className="border-t border-[#b8b8b8]">
              <div className="px-4 py-8 text-center">
                <p className="text-[13px] text-[#888] font-[family-name:var(--font-system)] italic">
                  Unable to load letters at this time. Please check back soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
