import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quotes",
  description:
    "The most beautiful passages from Earl Roberts' decade of letters -- on love, family, culture, curiosity, life, and friendship.",
};

interface Quote {
  readonly text: string;
  readonly emailId: string;
  readonly subject: string;
  readonly date: string;
}

interface ThemeSection {
  readonly title: string;
  readonly quotes: readonly Quote[];
}

const THEME_SECTIONS: readonly ThemeSection[] = [
  {
    title: "On Love & Family",
    quotes: [
      {
        text: "This is the way I would characterize missing Phyllis. The rose still smells as sweet. The comedies are just as funny to me and the tragedies just as sad as they were before. So on one level I enjoy them just as much as I did before when I shared them with Phyllis and discussing them with her after. But, some of the zest is gone -- diminished. That little bit of zest -- of extra enjoyment -- came not from the event itself but sharing it with Phyllis. I am sure, knowing you both, that you too provide each other that extra bit of life\u2019s zest. It\u2019s called \u2018love\u2019 and it adds a dimension to everything.",
        emailId: "4886f077-7a4c-419d-9eee-bba053ceb0c0",
        subject: "Re: hello Earl",
        date: "April 26, 2018",
      },
      {
        text: "I share these photos with you, not in sadness, but in joy. That seems to me is the purpose of old photographs, to remind us with a smile of past good times. May they bring back such memories to you. Then, look back at your own old photos and smile. May they rekindle fond memories from your own lives. You were loved then as you are now.",
        emailId: "e56973e6-ea07-4e79-a0dc-8ac7ef2ad819",
        subject: "Memories from about 1967",
        date: "February 25, 2019",
      },
      {
        text: "As you might suspect, since Phyllis\u2019 passing in mid January, my life has changed completely yet, in terms of my daily routine, hardly at all. I miss her so much -- especially our sharing of our day-to-day activities.",
        emailId: "553bb39e-d90f-4af2-9fda-0c641f2da5ac",
        subject: "Update on Earl and an art exhibit",
        date: "April 13, 2018",
      },
      {
        text: "My cousin, Sonny, who is eight years older than I am, was a big jazz fan and devotee of Rockhead\u2019s Paradise, the major Black nightclub in Montreal. Sonny took me to Rockhead\u2019s only once. My main memory about that evening was that Sonny taught me how to nurse a drink over a long stretch of time.",
        emailId: "8bac60c4-7680-4e6c-b785-404e523cb86a",
        subject: "Jazz in Montreal",
        date: "April 16, 2019",
      },
    ],
  },
  {
    title: "On Culture & Curiosity",
    quotes: [
      {
        text: "I was never very ambitious. Quite early on, I recognized that I was no great risk taker. I never dreamed of great wealth or fame or power. I was not a striver. My youthful goals were just to do a little bit better than I was doing. Financially I lived comfortably and had enough money to indulge my not too costly pleasures, like the theater and occasional travel. Instead, I gathered and enjoyed lots of lovely friends and a family that was always very warm and loving.",
        emailId: "a7ae57d6-e8e5-40ad-b1da-0ec0ef9cfecc",
        subject: "Thoughts on approaching age 80",
        date: "January 16, 2016",
      },
      {
        text: "It is inevitable that when we die our virtual \u2018inbox\u2019 of things to do will be filled with things we never got to because we diddled away our time on trifles, even as we enjoyed ourselves doing it. So, my friends, here is my advice. If we are enjoying ourselves by indulging our little pleasures, put aside any misgivings about time wasted. Go and, as the song says: \u2018Exsultate jubilate,\u2019 be jubilant and joyful and enjoy the fun.",
        emailId: "4e3cbd78-3d50-4683-87ec-5e4976a10a3a",
        subject: "Tempus fugit",
        date: "December 12, 2014",
      },
      {
        text: "Ideas can be very exciting. Victor Hugo once said: \u2018You can resist an invading army; you cannot resist an idea whose time has come.\u2019",
        emailId: "bf58fe70-1066-48aa-98fa-5112a8b1575c",
        subject: "A small dose (not harmful) of New York City history",
        date: "March 5, 2011",
      },
      {
        text: "Interest, I believe, is created not by grand generalities, but by illuminating details, interesting anecdotes and examples and specificity. For these attributes, I gladly sacrifice brevity and then leave how much to read up to the reader.",
        emailId: "0c10f07c-24c7-495a-a71a-5c68452210f0",
        subject: "Three of the plays we recently saw at the Shaw Festival",
        date: "August 18, 2015",
      },
    ],
  },
  {
    title: "On Life & Friendship",
    quotes: [
      {
        text: "I write only to friends although frequently I take advantage of the computer and e-mail to write to several at once. I write to people to maintain our friendships. That is a very high value for me.",
        emailId: "ba5299b3-80b0-4b03-98fc-cd171ce0ee6a",
        subject: "News from 10B",
        date: "February 16, 2011",
      },
      {
        text: "I send you these emails because you are important to us, even if we see each other or correspond only occasionally. I want to nurture our friendship and I think that keeping you informed and hearing from you will facilitate that end.",
        emailId: "53630ac8-426c-4943-ba2d-9c27414c5672",
        subject: "Our recent week in Canada",
        date: "August 11, 2015",
      },
      {
        text: "The purpose of this letter it is to update you on what I am up to, alone, here in apartment 10B. It has no particular focus and is a bit rambling. It just constitutes my part of upholding our friendship -- which is very important to me.",
        emailId: "deb5fe7c-a52d-4bce-a788-6e06866ba495",
        subject: "News from 10B",
        date: "March 12, 2019",
      },
      {
        text: "Making and keeping old friends is most important in maintaining a happy life.",
        emailId: "0f049454-533b-40cd-9453-80361c7fa5c2",
        subject: "News from New York as 2010 comes to an end",
        date: "December 24, 2010",
      },
    ],
  },
] as const;

export default function QuotesPage() {
  return (
    <div className="page-enter" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
      {/* Mac toolbar header */}
      <div className="border-b border-[#c8c8c8] bg-gradient-to-b from-[#f6f6f6] to-[#e8e8e8] px-4 sm:px-6 py-2.5">
        <div className="mx-auto max-w-[680px]">
          <h1 className="text-[13px] font-bold text-[#333]">Words from Earl</h1>
          <p className="text-[11px] text-[#888] mt-0.5">
            The most beautiful passages from a decade of letters
          </p>
        </div>
      </div>

      {/* Quote Sections */}
      <div className="bg-white">
        <div className="mx-auto max-w-[680px] px-4 sm:px-6 py-6 sm:py-10 space-y-10 sm:space-y-12">
          {THEME_SECTIONS.map((section, sectionIndex) => (
            <section key={section.title}>
              {/* Section heading */}
              <div className="mb-6">
                <h2 className="text-[16px] font-bold text-[#222]">
                  {section.title}
                </h2>
                <hr className="mt-2 border-[#d0d0d0]" />
              </div>

              {/* Quotes */}
              <div className="space-y-6">
                {section.quotes.map((quote) => (
                  <blockquote
                    key={quote.emailId}
                    className="border-l-[3px] border-[#999] pl-3 sm:pl-5 py-1 quote-slide-in"
                  >
                    <p className="text-[#444] text-[14px] sm:text-[15px] leading-[1.7] italic" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                      &ldquo;{quote.text}&rdquo;
                    </p>
                    <footer className="mt-2 text-[12px] text-[#888] flex flex-wrap items-baseline gap-x-1">
                      <Link
                        href={`/email/${quote.emailId}`}
                        className="text-[#3d80df] hover:underline"
                      >
                        {quote.subject}
                      </Link>
                      <span className="text-[#ccc] mx-0.5 sm:mx-1.5" aria-hidden="true">
                        &middot;
                      </span>
                      <time className="text-[#aaa]">
                        {quote.date}
                      </time>
                    </footer>
                  </blockquote>
                ))}
              </div>

              {/* Divider between sections (not after last) */}
              {sectionIndex < THEME_SECTIONS.length - 1 && (
                <hr className="mt-10 border-[#e0e0e0]" />
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Closing section */}
      <div className="border-t border-[#d0d0d0] bg-[#f5f5f5] py-6 sm:py-8">
        <div className="mx-auto max-w-[520px] px-4 sm:px-6 text-center">
          <p className="text-[14px] text-[#666] italic leading-[1.7]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Every letter Earl wrote was a gift -- a window into a life lived
            with warmth, curiosity, and an abiding love for the people around
            him.
          </p>
          <div className="mt-6">
            <Link
              href="/archive"
              className="inline-flex items-center gap-1 text-[13px] text-[#555] hover:text-[#111] rounded px-4 py-1.5 border border-[#b0b0b0] bg-gradient-to-b from-white to-[#e0e0e0] shadow-sm active:from-[#d0d0d0] active:to-[#c0c0c0]"
            >
              Read the Full Letters
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
