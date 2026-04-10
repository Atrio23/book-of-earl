import Link from "next/link";
import { formatDateShort, truncateText } from "@/lib/format";
import type { EmailListItem } from "@/lib/types";

interface EmailCardProps {
  readonly email: EmailListItem;
  readonly featured?: boolean;
  readonly even?: boolean;
}

export default function EmailCard({
  email,
  even = false,
}: EmailCardProps) {
  return (
    <Link
      href={`/email/${email.id}`}
      className={`group block px-4 py-2 border-b border-[#ddd] transition-colors duration-100 ${
        even ? "bg-[#ecf1f8]" : "bg-white"
      } hover:!bg-[#d4e3f5]`}
    >
      <div className="flex items-start gap-2.5">
        {/* Unread dot (decorative) */}
        <span className="shrink-0 mt-[7px] w-[8px] h-[8px] rounded-full bg-[#3d80df]" />

        {/* Content */}
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
  );
}
