import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Earl Roberts and The Book of Earl -- a digital archive of personal essays, family stories, and reflections shared through group emails from 2010 to 2019.",
};

const TIMELINE_ENTRIES: readonly {
  readonly year: string;
  readonly description: string;
}[] = [
  {
    year: "~2010",
    description:
      "Earl begins sending group emails to friends and family -- thoughtful personal essays that arrive like letters in a digital age.",
  },
  {
    year: "2010s",
    description:
      "The letters flow steadily from Apartment 10B in New York City. Stories of growing up, of Montreal and cousin Sonny, of jazz and Beethoven, of books and the people he loves.",
  },
  {
    year: "Jan 2018",
    description:
      "Phyllis, Earl's beloved wife and lifelong companion, passes away. The letters carry a new weight -- grief woven with gratitude.",
  },
  {
    year: "~2019",
    description:
      "The final letters are sent. A decade of writing, a lifetime of memories -- all preserved in the inboxes of those fortunate enough to receive them.",
  },
  {
    year: "Today",
    description:
      'The Book of Earl gathers these letters into a single digital archive, so they may be read and cherished for generations to come.',
  },
];

export default function AboutPage() {
  return (
    <div className="page-enter" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
      {/* Mac toolbar */}
      <div className="border-b border-[#c8c8c8] bg-gradient-to-b from-[#f6f6f6] to-[#e8e8e8] px-4 sm:px-6 py-2.5">
        <div className="mx-auto max-w-[680px]">
          <h1 className="text-[13px] font-bold text-[#333]">About Earl &amp; His Letters</h1>
          <p className="text-[11px] text-[#888] mt-0.5">
            The story behind the man, the emails, and this archive.
          </p>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-white">
        <div className="mx-auto max-w-[680px] px-4 sm:px-6 py-6 sm:py-10" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>

          {/* About Earl */}
          <section className="text-[#444] text-[14px] sm:text-[15px] leading-[1.7]">
            <h2 className="text-[16px] sm:text-[18px] font-bold text-[#222] mb-4" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
              The Letter Writer
            </h2>
            <p>
              Earl Roberts lived in Apartment 10B in New York City with his wife
              Phyllis and, for much of his later life, carried on a quiet practice
              that meant the world to the people around him: he wrote letters. Not
              the hurried, abbreviated messages of the digital age, but real
              letters -- personal essays, carefully composed and warmly voiced,
              sent as group emails to the family and friends he loved.
            </p>
            <p className="mt-4">
              From roughly 2010 to 2019, Earl sent these dispatches to two
              overlapping circles -- one group of family, one of friends -- writing
              from <span className="text-[#666]">eandproberts@earthlink.net</span> and
              later <span className="text-[#666]">eandproberts@gmail.com</span>.
              Each email was a small essay in itself: memories of growing up, stories
              of his cousin Sonny in Montreal, reflections on jazz heard at places
              like Rockhead&#39;s Paradise, the music he loved (he was devoted to
              Beethoven&#39;s F&#252;r Elise), book recommendations, and meditations on
              what it means to live a full life.
            </p>
            <p className="mt-4">
              His son Jonathan was among the regular recipients. So were nieces,
              nephews, cousins, and old friends. Opening an email from Earl was
              like finding a handwritten letter in a mailbox full of junk --
              something to sit down with, to savor.
            </p>
          </section>

          {/* Divider */}
          <hr className="my-8 border-[#d0d0d0]" />

          {/* Featured Quote */}
          <section className="my-8">
            <blockquote className="border-l-[3px] border-[#999] pl-4 sm:pl-6 py-1">
              <p className="text-[#555] text-[14px] sm:text-[15px] leading-[1.7] italic">
                When I was a boy, I used to visit my cousin Sonny in Montreal.
                He would take me to Rockhead&#39;s Paradise, the great jazz club
                on the corner of Saint-Antoine. I was too young to be there,
                really, but Sonny knew everyone. The music would fill the room
                and I would sit very still, afraid that if I moved someone might
                notice I was just a kid and send me home. I never wanted to
                leave.
              </p>
              <footer className="mt-3 text-[#888] text-[12px]" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
                -- Earl Roberts, from one of his letters
              </footer>
            </blockquote>
          </section>

          {/* Divider */}
          <hr className="my-8 border-[#d0d0d0]" />

          {/* Two Circles */}
          <section className="text-[#444] text-[14px] sm:text-[15px] leading-[1.7]">
            <h2 className="text-[16px] sm:text-[18px] font-bold text-[#222] mb-4" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
              Two Circles, One Voice
            </h2>
            <p>
              Earl maintained two mailing lists -- one for family, one for friends --
              though the line between them was never sharp. To both groups he wrote
              with the same warmth, the same eye for detail, the same belief that
              a well-told story is a gift worth giving.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-0 border border-[#d0d0d0] rounded">
              <div className="p-5 sm:border-r sm:border-[#d0d0d0]">
                <h3 className="text-[14px] font-bold text-[#222] mb-2" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
                  Family Letters
                </h3>
                <p className="text-[13px] text-[#555] leading-[1.6]">
                  Sent to Jonathan, nieces, nephews, and the extended Roberts
                  family. Full of shared memories, family history, and the threads
                  that bind one generation to the next.
                </p>
              </div>
              <div className="p-5 border-t sm:border-t-0 border-[#d0d0d0]">
                <h3 className="text-[14px] font-bold text-[#222] mb-2" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
                  Friends Letters
                </h3>
                <p className="text-[13px] text-[#555] leading-[1.6]">
                  Sent to lifelong friends and companions. Reflections on books,
                  music, current events, and the quiet pleasures of a life spent
                  paying attention.
                </p>
              </div>
            </div>
          </section>

          {/* Divider */}
          <hr className="my-8 border-[#d0d0d0]" />

          {/* Timeline */}
          <section>
            <h2 className="text-[16px] sm:text-[18px] font-bold text-[#222] mb-6" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
              A Decade of Letters
            </h2>
            <ul className="space-y-4 text-[14px] sm:text-[15px] leading-[1.7]">
              {TIMELINE_ENTRIES.map((entry) => (
                <li key={entry.year} className="flex gap-3">
                  <span className="text-[#999] mt-[3px] shrink-0" aria-hidden="true">&bull;</span>
                  <div>
                    <span className="text-[12px] font-bold text-[#888] uppercase tracking-wide" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
                      {entry.year}
                    </span>
                    <p className="text-[#555] mt-0.5">
                      {entry.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Divider */}
          <hr className="my-8 border-[#d0d0d0]" />

          {/* Preserving the Letters */}
          <section className="text-[#444] text-[14px] sm:text-[15px] leading-[1.7]">
            <h2 className="text-[16px] sm:text-[18px] font-bold text-[#222] mb-4" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
              Preserving the Letters
            </h2>
            <p>
              <strong className="text-[#222]">The Book of Earl</strong> is a
              digital archive that gathers Earl&#39;s emails into one place --
              searchable, browsable, and preserved for the family and for the
              generations that follow. What lived in scattered inboxes now lives
              here, where it can be read and reread the way a favorite book is
              returned to, again and again.
            </p>
            <p className="mt-4">
              Every letter is presented as Earl wrote it. Nothing has been
              edited or abridged. The archive is organized by date so you can
              read forward through the years, or simply open a letter at random
              and let Earl&#39;s voice carry you somewhere unexpected.
            </p>
            <p className="mt-4">
              This is not a biography or a summary. It is Earl, in his own words.
            </p>
          </section>

          {/* Divider */}
          <hr className="my-8 border-[#d0d0d0]" />

          {/* Earl & Phyllis */}
          <section className="text-[#444] text-[14px] sm:text-[15px] leading-[1.7]">
            <h2 className="text-[16px] sm:text-[18px] font-bold text-[#222] mb-4" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
              Earl &amp; Phyllis
            </h2>
            <p>
              Behind every letter was Phyllis -- Earl&#39;s wife, his companion
              in Apartment 10B, and the steady presence at the center of the
              life he described so vividly to others. The &ldquo;E and P&rdquo;
              in his email addresses stood for the two of them. When Phyllis
              passed in January 2018, the letters changed, as letters do when
              the world shifts beneath you. But Earl kept writing -- because
              that is what writers do.
            </p>
          </section>

          {/* Divider */}
          <hr className="my-8 border-[#d0d0d0]" />

          {/* A Note to the Family */}
          <section className="text-center py-6">
            <h2 className="text-[16px] sm:text-[18px] font-bold text-[#222] mb-3" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
              A Note to the Family
            </h2>
            <p className="text-[#555] text-[14px] sm:text-[15px] italic leading-[1.7] max-w-lg mx-auto">
              This archive is a labor of love. We hope that browsing these pages
              brings the same warmth and joy that opening one of Earl&#39;s
              emails always did -- the feeling of hearing a voice you love,
              telling you a story you didn&#39;t know you needed.
            </p>
            <div className="mt-6">
              <Link
                href="/archive"
                className="inline-flex items-center gap-1 text-[13px] text-[#555] hover:text-[#111] rounded px-4 py-1.5 min-h-[44px] sm:min-h-0 border border-[#b0b0b0] bg-gradient-to-b from-white to-[#e0e0e0] shadow-sm active:from-[#d0d0d0] active:to-[#c0c0c0]"
                style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}
              >
                Read the Letters
              </Link>
            </div>
          </section>

        </div>
      </div>

      {/* Bottom memorial text */}
      <div className="border-t border-[#d0d0d0] bg-[#f5f5f5] py-6">
        <div className="mx-auto max-w-[520px] px-4 sm:px-6 text-center">
          <p className="text-[12px] text-[#999] italic" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            In memory of Earl Roberts -- letter writer, storyteller, and the
            man who believed that sharing our stories is one of the most
            important things we can do.
          </p>
        </div>
      </div>
    </div>
  );
}
