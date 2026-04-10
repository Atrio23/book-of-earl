import { supabase } from "./supabase";
import type { Email, EmailListItem } from "./types";

const EMAIL_LIST_FIELDS = "id, subject, date_sent, snippet, primary_category" as const;
const EMAIL_DETAIL_FIELDS = "*" as const;
const DEFAULT_PAGE_SIZE = 20;

interface FetchEmailsParams {
  readonly page?: number;
  readonly pageSize?: number;
  readonly search?: string;
  readonly year?: number;
  readonly category?: string;
}

interface PaginatedResult<T> {
  readonly data: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

export async function fetchEmails(
  params: FetchEmailsParams = {}
): Promise<PaginatedResult<EmailListItem>> {
  const {
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    search,
    year,
    category,
  } = params;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("emails")
    .select(EMAIL_LIST_FIELDS, { count: "exact" })
    .eq("is_group_email", true)
    .order("date_sent", { ascending: false });

  if (search && search.trim().length > 0) {
    const searchTerm = `%${search.trim()}%`;
    query = query.or(
      `subject.ilike.${searchTerm},body_text.ilike.${searchTerm},snippet.ilike.${searchTerm}`
    );
  }

  if (year) {
    const startDate = `${year}-01-01T00:00:00.000Z`;
    const endDate = `${year + 1}-01-01T00:00:00.000Z`;
    query = query.gte("date_sent", startDate).lt("date_sent", endDate);
  }

  if (category) {
    query = query.eq("primary_category", category);
  }

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to fetch emails: ${error.message}`);
  }

  const total = count ?? 0;

  return {
    data: (data ?? []) as readonly EmailListItem[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function fetchEmailById(id: string): Promise<Email | null> {
  const { data, error } = await supabase
    .from("emails")
    .select(EMAIL_DETAIL_FIELDS)
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(`Failed to fetch email: ${error.message}`);
  }

  return data as Email | null;
}

export async function fetchLatestEmails(
  limit: number = 5
): Promise<readonly EmailListItem[]> {
  const { data, error } = await supabase
    .from("emails")
    .select(EMAIL_LIST_FIELDS)
    .eq("is_group_email", true)
    .order("date_sent", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch latest emails: ${error.message}`);
  }

  return (data ?? []) as readonly EmailListItem[];
}

export async function fetchAdjacentEmails(
  dateSent: string
): Promise<{
  readonly previous: EmailListItem | null;
  readonly next: EmailListItem | null;
}> {
  const [prevResult, nextResult] = await Promise.all([
    supabase
      .from("emails")
      .select(EMAIL_LIST_FIELDS)
      .eq("is_group_email", true)
      .lt("date_sent", dateSent)
      .order("date_sent", { ascending: false })
      .limit(1),
    supabase
      .from("emails")
      .select(EMAIL_LIST_FIELDS)
      .eq("is_group_email", true)
      .gt("date_sent", dateSent)
      .order("date_sent", { ascending: true })
      .limit(1),
  ]);

  if (prevResult.error) {
    throw new Error(
      `Failed to fetch previous email: ${prevResult.error.message}`
    );
  }
  if (nextResult.error) {
    throw new Error(`Failed to fetch next email: ${nextResult.error.message}`);
  }

  return {
    previous:
      prevResult.data && prevResult.data.length > 0
        ? (prevResult.data[0] as EmailListItem)
        : null,
    next:
      nextResult.data && nextResult.data.length > 0
        ? (nextResult.data[0] as EmailListItem)
        : null,
  };
}

export async function fetchAvailableYears(): Promise<readonly number[]> {
  const { data, error } = await supabase
    .from("emails")
    .select("date_sent")
    .eq("is_group_email", true)
    .order("date_sent", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch years: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  const years = new Set(
    data.map((email: { date_sent: string }) =>
      new Date(email.date_sent).getFullYear()
    )
  );

  return Array.from(years).sort((a, b) => b - a);
}

export async function fetchTotalCount(): Promise<number> {
  const { count, error } = await supabase
    .from("emails")
    .select("id", { count: "exact", head: true })
    .eq("is_group_email", true);

  if (error) {
    throw new Error(`Failed to fetch count: ${error.message}`);
  }

  return count ?? 0;
}

export async function fetchCategories(): Promise<readonly { category: string; count: number }[]> {
  const { data, error } = await supabase
    .from("emails")
    .select("primary_category")
    .eq("is_group_email", true)
    .not("primary_category", "is", null);

  if (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    const cat = (row as { primary_category: string }).primary_category;
    counts[cat] = (counts[cat] ?? 0) + 1;
  }

  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export async function fetchYearCounts(): Promise<
  readonly { year: number; count: number }[]
> {
  const { data, error } = await supabase
    .from("emails")
    .select("date_sent")
    .eq("is_group_email", true)
    .order("date_sent", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch year counts: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  const counts: Record<number, number> = {};
  for (const row of data) {
    const y = new Date((row as { date_sent: string }).date_sent).getFullYear();
    counts[y] = (counts[y] ?? 0) + 1;
  }

  return Object.entries(counts)
    .map(([y, count]) => ({ year: Number(y), count }))
    .sort((a, b) => b.year - a.year);
}

export async function fetchYearRange(): Promise<{
  readonly earliest: number;
  readonly latest: number;
}> {
  const [earliestResult, latestResult] = await Promise.all([
    supabase
      .from("emails")
      .select("date_sent")
      .eq("is_group_email", true)
      .order("date_sent", { ascending: true })
      .limit(1),
    supabase
      .from("emails")
      .select("date_sent")
      .eq("is_group_email", true)
      .order("date_sent", { ascending: false })
      .limit(1),
  ]);

  if (earliestResult.error) {
    throw new Error(
      `Failed to fetch earliest year: ${earliestResult.error.message}`
    );
  }
  if (latestResult.error) {
    throw new Error(
      `Failed to fetch latest year: ${latestResult.error.message}`
    );
  }

  const earliestData = earliestResult.data as
    | readonly { date_sent: string }[]
    | null;
  const latestData = latestResult.data as
    | readonly { date_sent: string }[]
    | null;

  const earliest =
    earliestData && earliestData.length > 0
      ? new Date(earliestData[0].date_sent).getFullYear()
      : 0;
  const latest =
    latestData && latestData.length > 0
      ? new Date(latestData[0].date_sent).getFullYear()
      : 0;

  return { earliest, latest };
}
