"use client";

import { useState } from "react";
import type { Recipient } from "@/lib/types";

interface RecipientsListProps {
  readonly recipients: readonly Recipient[];
  readonly ccRecipients?: readonly Recipient[];
}

function isEarlSelfSend(recipient: Recipient): boolean {
  return recipient.email.toLowerCase().includes("eandproberts@");
}

function isContactGroupPlaceholder(recipient: Recipient): boolean {
  return recipient.email.endsWith(":;") || recipient.email.endsWith(":;>");
}

function filterDisplayRecipients(
  recipients: readonly Recipient[],
): readonly Recipient[] {
  return recipients.filter(
    (r) => !isEarlSelfSend(r) && !isContactGroupPlaceholder(r),
  );
}

function formatRecipient(recipient: Recipient): string {
  if (recipient.name && recipient.name.trim().length > 0) {
    return recipient.name;
  }
  return recipient.email;
}

function buildSummary(displayRecipients: readonly Recipient[]): string {
  const count = displayRecipients.length;
  if (count === 0) return "Friends & Family";
  if (count === 1) return formatRecipient(displayRecipients[0]);
  if (count <= 5) {
    return `${formatRecipient(displayRecipients[0])}, ${formatRecipient(displayRecipients[1])} & others`;
  }
  return `Friends & Family (${count})`;
}

export default function RecipientsList({
  recipients,
  ccRecipients = [],
}: RecipientsListProps) {
  const [expanded, setExpanded] = useState(false);
  const allRecipients = [...recipients, ...ccRecipients];
  const displayRecipients = filterDisplayRecipients(allRecipients);
  const count = displayRecipients.length;

  if (allRecipients.length === 0) {
    return null;
  }

  // Pure BCC email (no real recipients after filtering) -- static label, no expand
  if (count === 0) {
    return (
      <div className="text-[13px] leading-[1.6]">
        <span className="text-[#888] font-medium">To:</span>{" "}
        <span className="text-[#333]">Friends &amp; Family</span>
      </div>
    );
  }

  return (
    <div className="text-[13px] leading-[1.6]">
      {!expanded ? (
        <div>
          <span className="text-[#888] font-medium">To:</span>{" "}
          <button
            onClick={() => setExpanded(true)}
            className="text-[#333] hover:text-[#3d80df] inline-flex items-center gap-1"
          >
            {buildSummary(displayRecipients)}
            <span className="text-[#999] text-[10px]" aria-hidden="true">&#9654;</span>
          </button>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-x-1 items-baseline">
            <span className="text-[#888] font-medium shrink-0">To:</span>{" "}
            {displayRecipients.map((r, i) => (
              <span key={r.email + i} className="text-[#333]">
                {formatRecipient(r)}
                {i < count - 1 && ","}
              </span>
            ))}
          </div>
          <button
            onClick={() => setExpanded(false)}
            className="inline-flex items-center gap-1 text-[11px] text-[#3d80df] hover:text-[#2a6cc5] mt-0.5"
          >
            <span className="text-[10px]" aria-hidden="true">&#9660;</span>
            show less
          </button>
        </div>
      )}
    </div>
  );
}
