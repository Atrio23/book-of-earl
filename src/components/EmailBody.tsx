"use client";

import DOMPurify from "dompurify";

interface EmailBodyProps {
  readonly bodyHtml: string;
  readonly bodyText: string;
}

const URL_PATTERN =
  /(https?:\/\/[^\s<>"')\]]+)/g;

function linkifyPlainText(text: string): string {
  return text.replace(URL_PATTERN, (url) => {
    const display = url.length > 60 ? url.slice(0, 57) + "..." : url;
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${display}</a>`;
  });
}

const DATE_PATTERN =
  /^\s*(\d{1,2}\/\d{1,2}\/\d{2,4}|(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},?\s+\d{2,4})\s*$/i;

const GREETING_PATTERN = /^\s*(Dear |Hi |Hello |Greetings)/i;

const SIGNOFF_KEYWORDS = /\b(Earl|Best regards|Love|Regards|Sincerely|Warmly|Cheers)\b/i;

function classifyParagraph(
  content: string,
  index: number,
  total: number,
  dateFound: boolean,
): string {
  if (index === 0 && DATE_PATTERN.test(content)) {
    return "email-date";
  }

  const greetingIndex = dateFound ? 1 : 0;
  if (index === greetingIndex && GREETING_PATTERN.test(content)) {
    return "email-greeting";
  }

  if (
    index === total - 1 &&
    content.length < 50 &&
    SIGNOFF_KEYWORDS.test(content)
  ) {
    return "email-signoff";
  }

  return "";
}

function textToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const linked = linkifyPlainText(escaped);

  const paragraphs = linked
    .split(/\n\n+/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter((p) => p.length > 0);

  const dateFound =
    paragraphs.length > 0 && DATE_PATTERN.test(paragraphs[0]);

  return paragraphs
    .map((paragraph, index) => {
      const cls = classifyParagraph(
        paragraph,
        index,
        paragraphs.length,
        dateFound,
      );
      return cls
        ? `<p class="${cls}">${paragraph}</p>`
        : `<p>${paragraph}</p>`;
    })
    .join("");
}

function linkifyHtmlContent(html: string): string {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    textNodes.push(current as Text);
    current = walker.nextNode();
  }

  for (const textNode of textNodes) {
    if (textNode.parentElement?.tagName === "A") {
      continue;
    }
    const content = textNode.textContent ?? "";
    if (!URL_PATTERN.test(content)) {
      URL_PATTERN.lastIndex = 0;
      continue;
    }
    URL_PATTERN.lastIndex = 0;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = URL_PATTERN.exec(content)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(content.slice(lastIndex, match.index))
        );
      }
      const anchor = document.createElement("a");
      anchor.href = match[0];
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.textContent =
        match[0].length > 60 ? match[0].slice(0, 57) + "..." : match[0];
      fragment.appendChild(anchor);
      lastIndex = URL_PATTERN.lastIndex;
    }
    if (lastIndex < content.length) {
      fragment.appendChild(document.createTextNode(content.slice(lastIndex)));
    }
    textNode.parentNode?.replaceChild(fragment, textNode);
  }

  return tempDiv.innerHTML;
}

export default function EmailBody({ bodyHtml, bodyText }: EmailBodyProps) {
  const hasHtml = bodyHtml && bodyHtml.trim().length > 0;
  const rawContent = hasHtml ? linkifyHtmlContent(bodyHtml) : textToHtml(bodyText);
  const sanitizedContent = DOMPurify.sanitize(rawContent, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target"],
  });

  return (
    <div
      className="email-body"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
