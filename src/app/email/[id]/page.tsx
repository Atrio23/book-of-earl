import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchEmailById, fetchAdjacentEmails } from "@/lib/queries";
import { formatDate, formatDateShort } from "@/lib/format";
import EmailBody from "@/components/EmailBody";
import RecipientsList from "@/components/RecipientsList";

export const revalidate = 300;

interface EmailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  props: EmailPageProps
): Promise<Metadata> {
  const { id } = await props.params;

  try {
    const email = await fetchEmailById(id);
    if (!email) {
      return { title: "Letter Not Found" };
    }
    return {
      title: email.subject,
      description: email.snippet || `A letter from Earl Roberts`,
    };
  } catch {
    return { title: "Letter" };
  }
}

export default async function EmailPage(props: EmailPageProps) {
  const { id } = await props.params;

  let email;
  try {
    email = await fetchEmailById(id);
  } catch {
    notFound();
  }

  if (!email) {
    notFound();
  }

  let adjacent;
  try {
    adjacent = await fetchAdjacentEmails(email.date_sent);
  } catch {
    adjacent = { previous: null, next: null };
  }

  return (
    <div className="page-enter" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
      {/* Mac toolbar-style back button */}
      <div className="border-b border-[#c8c8c8] bg-gradient-to-b from-[#f6f6f6] to-[#e8e8e8] px-4 py-1.5">
        <Link
          href="/archive"
          className="inline-flex items-center gap-1 text-xs text-[#555] hover:text-[#111] rounded px-2 py-0.5 border border-[#c0c0c0] bg-gradient-to-b from-white to-[#e8e8e8] shadow-sm active:from-[#ddd] active:to-[#ccc]"
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
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Archive
        </Link>
      </div>

      {/* Mac Mail header bar */}
      <header className="border-b border-[#c8c8c8] bg-gradient-to-b from-[#f0f0f0] to-[#dcdcdc] px-6 py-4">
        <div className="mx-auto max-w-[780px] flex items-start justify-between gap-4">
          {/* Email header fields */}
          <div className="min-w-0 flex-1 text-[13px] leading-[1.6]">
            <div>
              <span className="text-[#888] font-medium">From:</span>{" "}
              <span className="text-[#333] font-medium">
                {email.sender_name || "Earl Roberts"}{" "}
                <span className="text-[#666] font-normal">
                  &lt;{email.sender_email || "eandproberts@gmail.com"}&gt;
                </span>
              </span>
            </div>
            <div>
              <span className="text-[#888] font-medium">Subject:</span>{" "}
              <span className="text-[#111] font-bold">{email.subject}</span>
            </div>
            <div>
              <span className="text-[#888] font-medium">Date:</span>{" "}
              <span className="text-[#333]">{formatDate(email.date_sent)}</span>
            </div>
            <RecipientsList
              recipients={Array.isArray(email.recipients) ? email.recipients : []}
              ccRecipients={
                Array.isArray(email.cc_recipients) ? email.cc_recipients : []
              }
            />
          </div>

          {/* Prev/Next navigation arrows */}
          <div className="flex items-center gap-0.5 shrink-0 pt-1">
            {adjacent.previous ? (
              <Link
                href={`/email/${adjacent.previous.id}`}
                className="flex items-center justify-center w-7 h-7 rounded border border-[#b0b0b0] bg-gradient-to-b from-white to-[#e0e0e0] shadow-sm hover:from-[#f0f0f0] hover:to-[#d0d0d0] active:from-[#d0d0d0] active:to-[#c0c0c0] text-[#444]"
                title={`Previous: ${adjacent.previous.subject}`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </Link>
            ) : (
              <span className="flex items-center justify-center w-7 h-7 rounded border border-[#d0d0d0] bg-[#eee] text-[#bbb] cursor-default">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </span>
            )}
            {adjacent.next ? (
              <Link
                href={`/email/${adjacent.next.id}`}
                className="flex items-center justify-center w-7 h-7 rounded border border-[#b0b0b0] bg-gradient-to-b from-white to-[#e0e0e0] shadow-sm hover:from-[#f0f0f0] hover:to-[#d0d0d0] active:from-[#d0d0d0] active:to-[#c0c0c0] text-[#444]"
                title={`Next: ${adjacent.next.subject}`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            ) : (
              <span className="flex items-center justify-center w-7 h-7 rounded border border-[#d0d0d0] bg-[#eee] text-[#bbb] cursor-default">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Email body area */}
      <article className="bg-white min-h-[60vh]">
        <div className="mx-auto max-w-[680px] px-6 py-10" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
          <EmailBody
            bodyHtml={email.body_html || ""}
            bodyText={email.body_text || ""}
          />
        </div>
      </article>

      {/* Bottom nav bar with prev/next details */}
      <nav className="border-t border-[#d0d0d0] bg-[#f5f5f5]">
        <div className="mx-auto max-w-[780px] px-6 py-3">
          <div className="grid grid-cols-2 gap-4 text-[13px]">
            {adjacent.previous ? (
              <Link
                href={`/email/${adjacent.previous.id}`}
                className="group flex items-center gap-2 text-left text-[#555] hover:text-[#111]"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-[#999] group-hover:text-[#3d80df]"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                <div className="min-w-0">
                  <div className="text-[11px] text-[#999] uppercase tracking-wider">Older</div>
                  <div className="truncate text-[#444] group-hover:text-[#3d80df]">
                    {adjacent.previous.subject}
                  </div>
                  <div className="text-[11px] text-[#aaa]">
                    {formatDateShort(adjacent.previous.date_sent)}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {adjacent.next ? (
              <Link
                href={`/email/${adjacent.next.id}`}
                className="group flex items-center gap-2 text-right flex-row-reverse text-[#555] hover:text-[#111]"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-[#999] group-hover:text-[#3d80df]"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                <div className="min-w-0">
                  <div className="text-[11px] text-[#999] uppercase tracking-wider">Newer</div>
                  <div className="truncate text-[#444] group-hover:text-[#3d80df]">
                    {adjacent.next.subject}
                  </div>
                  <div className="text-[11px] text-[#aaa]">
                    {formatDateShort(adjacent.next.date_sent)}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
