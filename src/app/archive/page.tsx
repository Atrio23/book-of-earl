import type { Metadata } from "next";
import { Suspense } from "react";
import { fetchEmails, fetchAvailableYears, fetchCategories, fetchYearCounts, fetchTotalCount } from "@/lib/queries";
import { formatYear } from "@/lib/format";
import EmailCard from "@/components/EmailCard";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import YearDivider from "@/components/YearDivider";
import MailSidebar from "@/components/MailSidebar";
import MobileSidebarDrawer from "@/components/MobileSidebarDrawer";
import type { EmailListItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Archive",
  description: "Browse the complete archive of letters from Earl Roberts.",
};

export const revalidate = 60;

interface ArchivePageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    year?: string;
    category?: string;
  }>;
}

function groupEmailsByYear(
  emails: readonly EmailListItem[]
): ReadonlyArray<{ readonly year: number; readonly emails: readonly EmailListItem[] }> {
  const groups: Array<{ year: number; emails: EmailListItem[] }> = [];
  let currentYear: number | null = null;
  let currentGroup: EmailListItem[] = [];

  for (const email of emails) {
    const emailYear = formatYear(email.date_sent);
    if (emailYear !== currentYear) {
      if (currentYear !== null) {
        groups.push({ year: currentYear, emails: currentGroup });
      }
      currentYear = emailYear;
      currentGroup = [email];
    } else {
      currentGroup.push(email);
    }
  }

  if (currentYear !== null) {
    groups.push({ year: currentYear, emails: currentGroup });
  }

  return groups;
}

async function ArchiveContent({
  searchParams,
}: {
  searchParams: {
    page?: string;
    search?: string;
    year?: string;
    category?: string;
  };
}) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const search = searchParams.search ?? "";
  const year = searchParams.year ? Number(searchParams.year) : undefined;
  const category = searchParams.category ?? undefined;

  let result;
  let years: readonly number[];
  let categories: readonly { category: string; count: number }[];
  let yearCounts: readonly { year: number; count: number }[];
  let totalCount: number;
  let fetchError = false;

  try {
    [result, years, categories, yearCounts, totalCount] = await Promise.all([
      fetchEmails({ page, search, year, category }),
      fetchAvailableYears(),
      fetchCategories(),
      fetchYearCounts(),
      fetchTotalCount(),
    ]);
  } catch {
    fetchError = true;
    result = { data: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };
    years = [];
    categories = [];
    yearCounts = [];
    totalCount = 0;
  }

  const hasFilters = search.length > 0 || year !== undefined || category !== undefined;
  const yearGroups = groupEmailsByYear(result.data);

  // Track index across all emails for alternating row colors
  let globalIndex = 0;

  return (
    <div className="flex flex-1 min-h-0">
      {/* Sidebar - desktop only */}
      <MailSidebar
        totalCount={totalCount}
        yearCounts={yearCounts}
        categories={categories}
        activeYear={year}
        activeCategory={category}
        className="hidden sm:flex"
      />

      {/* Sidebar - mobile drawer */}
      <MobileSidebarDrawer>
        <MailSidebar
          totalCount={totalCount}
          yearCounts={yearCounts}
          categories={categories}
          activeYear={year}
          activeCategory={category}
          className="w-full border-r-0"
        />
      </MobileSidebarDrawer>

      {/* Message list area */}
      <div className="flex-1 flex flex-col min-h-0 bg-white">
        {/* Toolbar / Search bar */}
        <Suspense fallback={null}>
          <SearchBar
            years={years as number[]}
            initialSearch={search}
            initialYear={year}
          />
        </Suspense>

        {fetchError && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[13px] text-[#888] font-[family-name:var(--font-system)] italic">
              Unable to load letters at this time. Please try again later.
            </p>
          </div>
        )}

        {!fetchError && (
          <>
            {/* Results count bar */}
            <div className="px-4 py-1 border-b border-[#ddd] bg-[#f5f5f5]">
              <p className="text-[11px] text-[#888] font-[family-name:var(--font-system)]">
                {result.total === 0
                  ? "No letters found"
                  : `${result.total} letter${result.total !== 1 ? "s" : ""}`}
                {hasFilters && (
                  <span> matching your search</span>
                )}
              </p>
            </div>

            {/* Empty state */}
            {result.data.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center py-16">
                <div className="text-[48px] mb-3 opacity-30">&#9993;</div>
                <p className="text-[14px] font-bold text-[#555] font-[family-name:var(--font-system)] mb-1">
                  No letters found
                </p>
                <p className="text-[15px] sm:text-[14px] text-[#888] font-[family-name:var(--font-system)]">
                  {hasFilters
                    ? "Try adjusting your search or clearing the filters."
                    : "Check back soon for new letters from Earl."}
                </p>
              </div>
            )}

            {/* Email list grouped by year */}
            {result.data.length > 0 && (
              <div className="flex-1 overflow-y-auto">
                {yearGroups.map((group) => (
                  <div key={group.year}>
                    <YearDivider year={group.year} />
                    <div className="stagger-fade-in">
                      {group.emails.map((email) => {
                        const idx = globalIndex;
                        globalIndex += 1;
                        return (
                          <EmailCard
                            key={email.id}
                            email={email}
                            even={idx % 2 === 1}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Status bar pagination */}
            <Suspense fallback={null}>
              <Pagination
                currentPage={result.page}
                totalPages={result.totalPages}
                totalItems={result.total}
                pageSize={result.pageSize}
              />
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
}

export default async function ArchivePage(props: ArchivePageProps) {
  const searchParams = await props.searchParams;

  return (
    <div className="page-enter flex flex-col" style={{ minHeight: "calc(100vh - 65px)" }}>
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[13px] text-[#888] font-[family-name:var(--font-system)] italic animate-pulse">
              Loading the archive...
            </p>
          </div>
        }
      >
        <ArchiveContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
