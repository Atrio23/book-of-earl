import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Earl Roberts on plays, films, books, music, food, and more -- opinions from a man who paid attention.",
};

interface Review {
  readonly title: string;
  readonly verdict: string;
  readonly quote: string;
  readonly emailId: string;
  readonly emailSubject: string;
  readonly date: string;
}

interface ReviewSection {
  readonly category: string;
  readonly icon: string;
  readonly description: string;
  readonly reviews: readonly Review[];
}

function verdictColor(verdict: string): string {
  const positive = [
    "Shaw Fan",
    "Recommended",
    "Lovely",
    "See It",
    "Very Good",
    "Amusing",
    "Essential",
    "Delightful",
    "Enjoy It",
    "Fascinating",
    "Timely",
    "The Great Debate",
    "Comforting",
    "Kid-Approved",
  ];
  const mixed = [
    "Mixed",
    "Admired, Not Loved",
    "Disappointing",
    "Intellectually Engaging",
  ];

  if (positive.includes(verdict)) {
    return "bg-[#d5e8f6] text-[#1a5a8a] border-[#b0cfe6]";
  }
  if (mixed.includes(verdict)) {
    return "bg-[#fef3cd] text-[#856404] border-[#e8d48a]";
  }
  return "bg-[#e8e8e8] text-[#555] border-[#ccc]";
}

const REVIEW_SECTIONS: readonly ReviewSection[] = [
  {
    category: "Theatre & Plays",
    icon: "\uD83C\uDFAD",
    description:
      "Earl and Phyllis were devoted theatergoers, attending readings at TACT, productions at the Mint Theater, and making annual pilgrimages to the Shaw Festival in Niagara-on-the-Lake.",
    reviews: [
      {
        title: "On the Rocks by George Bernard Shaw",
        verdict: "Shaw Fan",
        quote:
          "Phyllis and I are great fans of George Bernard Shaw's plays, all of them comedies -- of a sort. The best of them, like Major Barbara, Mrs. Warren's Profession, Arms and The Man, Candida, and, of course, Pygmalion, are usually filled with not only his idealistic social criticism, but also with great wit.",
        emailId: "698282a0-6c70-4d33-8f59-f0093fe45cdc",
        emailSubject: "On the Rocks??",
        date: "September 29, 2016",
      },
      {
        title: "The Price of Thomas Scott by Elizabeth Baker",
        verdict: "Recommended",
        quote:
          "Yesterday evening, some friends of mine and I saw an unknown play, The Price of Thomas Scott, by a long-forgotten playwright, Elizabeth Baker. The play, a realistic drama, was written in about 1912 and takes place in a London millinery shop. As usual with the Mint Theater, the play was well-constructed and very well produced.",
        emailId: "316dbdb6-b5fd-47ab-b2a1-bb37bf43e3f2",
        emailSubject:
          "An unknown play, The Price of Thomas Scott, by a long-forgotten playwright, Elizabeth Baker",
        date: "January 26, 2019",
      },
      {
        title: "Indecent by Paula Vogel",
        verdict: "Mixed",
        quote:
          "Phyllis and I recently watched Public Television's Great Performances production of Paula Vogel's 2015 prize-winning play, Indecent. I discussed it briefly with Phyllis who liked it more than I did. Phyllis thinks I am a bit of a theatrical curmudgeon.",
        emailId: "760894a8-2f32-4211-a651-a54297e8ba55",
        emailSubject:
          "Paula Vogel's 2015 prize-winning play, Indecent.",
        date: "November 20, 2017",
      },
      {
        title: "Pacific Overtures by Stephen Sondheim",
        verdict: "Admired, Not Loved",
        quote:
          "Recently Phyllis and I saw a very imaginative staging of Stephen Sondheim's 1976 musical Pacific Overtures. I did not care for the show even though I admired its imaginative production.",
        emailId: "c670b6ce-054a-40af-b400-379265ff3e70",
        emailSubject:
          "Ancient Japan discovers the West according to Stephen Sondheim",
        date: "June 29, 2017",
      },
      {
        title: "London Wall by John Van Druten",
        verdict: "Lovely",
        quote:
          "Phyllis and I just saw a lovely production of a very touching, bittersweet play called London Wall by John Van Druten who also wrote I am a Camera which became as a musical, Cabaret.",
        emailId: "a2427a2f-9437-4f2e-af76-7d526d128704",
        emailSubject: "Play recommendation: London Wall",
        date: "February 23, 2014",
      },
      {
        title: "Outside Mullingar by John Patrick Shanley",
        verdict: "See It",
        quote:
          "Phyllis and I just returned from seeing this play by John Patrick Shanley who wrote Doubt and some other very good plays and movies. Watch for the reviews; they will be excellent.",
        emailId: "ecc1cafc-53ce-4013-9c04-5b6859060c92",
        emailSubject: "Play recommendation: Outside Mullingar",
        date: "January 18, 2014",
      },
    ],
  },
  {
    category: "Film & Television",
    icon: "\uD83C\uDFAC",
    description:
      "Earl appreciated film as storytelling, from documentaries to historical dramas, and was an enthusiastic Netflix recommender.",
    reviews: [
      {
        title: "Caravaggio: The Soul and the Blood",
        verdict: "Disappointing",
        quote:
          "The documentary offered no new insights and furnished almost no context to illustrate the world in which Caravaggio moved. It's just a retelling of one of the dominant narratives of western art.",
        emailId: "36daedf7-2510-49f5-82a8-6a834c809726",
        emailSubject: "Caravaggio, movie review",
        date: "March 22, 2019",
      },
      {
        title: "Fall of Eagles (BBC, 1974)",
        verdict: "Very Good",
        quote:
          "Phyllis and I have been watching on Netflix a very good historical series called Fall of Eagles. It portrays historical events from 1848 to 1918, dealing with the ruling dynasties of Austria-Hungary, Germany, and Russia. We wanted to recommend it to you.",
        emailId: "2aafbd89-4dac-4ee4-9cea-b1de9f911871",
        emailSubject:
          "Historical drama available on Netflix and DVD",
        date: "March 22, 2017",
      },
      {
        title: "The Emperor's New Clothes (2001)",
        verdict: "Amusing",
        quote:
          "The Emperor's New Clothes, a 2001 film with Ian Holm as Napoleon, is an amusing comedy that you will enjoy. It is available on Netflix.",
        emailId: "6cdda8bc-9113-49d8-9805-14bafb9dbc0f",
        emailSubject: "Old Movie Netflix recommendation",
        date: "October 7, 2014",
      },
    ],
  },
  {
    category: "Music",
    icon: "\uD83C\uDFB5",
    description:
      "Earl's musical world ranged from Beethoven to jazz, from Chopin to flamenco -- always listened to with full attention and strong opinions.",
    reviews: [
      {
        title: "Farruquito -- Flamenco at Town Hall",
        verdict: "Intellectually Engaging",
        quote:
          "I am not a great fan of dance; I find it too abstract. I long for a plot, interesting characters and dramatic conflict, but on an intellectual level I enjoyed the concert. What I mean is that I found myself analyzing what makes flamenco dancing work.",
        emailId: "9c779ff0-a322-400e-8493-36d950e8d668",
        emailSubject: "Flamenco Dancing",
        date: "February 23, 2019",
      },
      {
        title: "Classical Music on a Snowy Day",
        verdict: "Essential",
        quote:
          "The music I most enjoy is classical music. The music I want to hear, however, depends on the time of day and my mood.",
        emailId: "cb2540be-19b0-4868-8b9c-06054e49d8de",
        emailSubject: "Music on my mind in snowy New York",
        date: "January 25, 2016",
      },
      {
        title: "An Afternoon of YouTube Discovery",
        verdict: "Delightful",
        quote:
          "The other afternoon I sat down at the computer to listen on YouTube to two pieces of music. I did not plan a journey surfing the internet; I just followed where my curiosity led me.",
        emailId: "bee6d278-dfc2-496a-aa47-2bb498dd606f",
        emailSubject:
          "How To Profitably Spend a Muggy, New York Afternoon!",
        date: "August 15, 2016",
      },
    ],
  },
  {
    category: "Books & Reading",
    icon: "\uD83D\uDCDA",
    description:
      "Earl was a voracious reader with a particular love of history, biography, and cultural criticism.",
    reviews: [
      {
        title: "The Bully Pulpit by Doris Kearns Goodwin",
        verdict: "Enjoy It",
        quote:
          "Two lovely but different books I am reading that you will enjoy. Both are beautifully written and both were recent gifts from Jonathan and Lisa. You will thank them as I do.",
        emailId: "76bf5ad6-68a3-40a3-a2b8-741720e3b44e",
        emailSubject:
          "Book recommendations including THE MAN IN THE WHITE SHARKSKIN SUIT",
        date: "December 30, 2014",
      },
      {
        title: "And the Show Went On by Alan Riding",
        verdict: "Fascinating",
        quote:
          "My interest in the book derived from my own particular interest in cultural history generally and how cultural life went on during the Nazi occupation of France.",
        emailId: "8606d7a0-e3f1-4464-96b6-9f5b16474993",
        emailSubject:
          "Alan Riding's book about France's cultural life during the Nazi occupation in WW II",
        date: "August 15, 2014",
      },
      {
        title: "TYRANT: Shakespeare on Politics",
        verdict: "Timely",
        quote:
          "Just in case you missed it, this past Sunday's NY Times book review section had several especially interesting reviews. The principal one was about Shakespeare and politics.",
        emailId: "ae2c2ab2-69b9-4ecc-9fc4-b9ac3440164c",
        emailSubject: "TYRANT Shakespeare on Politics",
        date: "June 27, 2018",
      },
    ],
  },
  {
    category: "Food & Drink",
    icon: "\uD83E\uDD6F",
    description:
      "From the great Montreal bagel debate to Viennese pastries, Earl brought the same analytical mind to food that he brought to everything else.",
    reviews: [
      {
        title: "Montreal Bagels: St. Viateur vs. Fairmount",
        verdict: "The Great Debate",
        quote:
          "Purpose: To evaluate the various merits of St. Viateur bagels and Fairmount bagels. This evaluation has the support and sponsorship of the International Investigative Bagel Society, otherwise known as IIBS. Scientists: Phyllis (Ph.D) and Earl Roberts (J.D. Juris Doctor). Our scientists have vast international experience, having tested bagels up and down Broadway.",
        emailId: "5696b99e-bd55-47b3-91d7-303037de3531",
        emailSubject:
          "International Investigative Bagel Society - Final Report",
        date: "September 12, 2016",
      },
      {
        title: "Claire's Minestrone",
        verdict: "Comforting",
        quote:
          "Today, Monday, I am alone. The hubbub in the house while we were sitting shiva for Phyllis has passed and although I was comforted and overwhelmed by the outpouring of love and support from family and friends...",
        emailId: "e990de91-cd55-4101-ae38-d552f66720d9",
        emailSubject:
          "Claire's ministrone and Elizabeth Thayer",
        date: "January 22, 2018",
      },
      {
        title: "Vichyssoise for Aidan",
        verdict: "Kid-Approved",
        quote:
          "Aidan spent the day with us and Lisa and Jonathan joined us for Chinese supper. It included my cold vichyssoise soup. Aidan surprisingly liked it. Kids can be picky eaters.",
        emailId: "972fd76d-ab38-47a4-b853-e32fabb8ca01",
        emailSubject:
          "Re: Aidan and his grandparents and their soup recipes",
        date: "August 27, 2016",
      },
    ],
  },
] as const;

export default function ReviewsPage() {
  return (
    <div
      className="page-enter"
      style={{
        fontFamily:
          '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif',
      }}
    >
      {/* Mac toolbar header */}
      <div className="border-b border-[#c8c8c8] bg-gradient-to-b from-[#f6f6f6] to-[#e8e8e8] px-6 py-2.5">
        <div className="mx-auto max-w-[680px]">
          <h1 className="text-[13px] font-bold text-[#333]">
            Earl&#39;s Reviews
          </h1>
          <p className="text-[11px] text-[#888] mt-0.5">
            Opinions on plays, films, books, music, food, and more
          </p>
        </div>
      </div>

      {/* Review Sections */}
      <div className="bg-white">
        <div className="mx-auto max-w-[680px] px-6 py-10 space-y-14">
          {REVIEW_SECTIONS.map((section, sectionIndex) => (
            <section key={section.category}>
              {/* Section heading */}
              <div className="mb-6">
                <h2 className="text-[18px] font-bold text-[#222] flex items-center gap-2">
                  <span aria-hidden="true">{section.icon}</span>
                  {section.category}
                </h2>
                <p
                  className="text-[13px] text-[#777] mt-1.5 leading-[1.6]"
                  style={{
                    fontFamily:
                      'Georgia, "Times New Roman", serif',
                  }}
                >
                  {section.description}
                </p>
                <hr className="mt-3 border-[#d0d0d0]" />
              </div>

              {/* Review cards */}
              <div className="stagger-fade-in space-y-4">
                {section.reviews.map((review) => (
                  <div
                    key={review.emailId}
                    className="border border-[#d8d8d8] rounded bg-[#fcfcfc] p-4 hover:bg-[#f8f9fb] transition-colors duration-150"
                  >
                    {/* Title + verdict row */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-[14px] font-bold text-[#222] leading-snug">
                        {review.title}
                      </h3>
                      <span
                        className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${verdictColor(review.verdict)}`}
                      >
                        {review.verdict}
                      </span>
                    </div>

                    {/* Quote */}
                    <p
                      className="text-[14px] text-[#555] leading-[1.65] italic"
                      style={{
                        fontFamily:
                          'Georgia, "Times New Roman", serif',
                      }}
                    >
                      &ldquo;{review.quote}&rdquo;
                    </p>

                    {/* Footer */}
                    <div className="mt-3 flex items-center text-[12px]">
                      <Link
                        href={`/email/${review.emailId}`}
                        className="text-[#3d80df] hover:underline truncate max-w-[70%]"
                      >
                        {review.emailSubject}
                      </Link>
                      <span
                        className="text-[#ccc] mx-1.5"
                        aria-hidden="true"
                      >
                        &middot;
                      </span>
                      <time className="text-[#aaa] shrink-0">
                        {review.date}
                      </time>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider between sections (not after last) */}
              {sectionIndex < REVIEW_SECTIONS.length - 1 && (
                <hr className="mt-10 border-[#e0e0e0]" />
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-[#d0d0d0] bg-[#f5f5f5] py-8">
        <div className="mx-auto max-w-[520px] px-6 text-center">
          <p
            className="text-[14px] text-[#666] italic leading-[1.7]"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            Earl paid attention to everything -- and shared what he found
            with the people he loved. These reviews are just a glimpse.
          </p>
          <div className="mt-6">
            <Link
              href="/archive"
              className="inline-flex items-center gap-1 text-[13px] text-[#555] hover:text-[#111] rounded px-4 py-1.5 border border-[#b0b0b0] bg-gradient-to-b from-white to-[#e0e0e0] shadow-sm active:from-[#d0d0d0] active:to-[#c0c0c0]"
            >
              Browse All Letters
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom memorial bar */}
      <div className="border-t border-[#d0d0d0] bg-[#f5f5f5] py-6">
        <div className="mx-auto max-w-[520px] px-6 text-center">
          <p
            className="text-[12px] text-[#999] italic"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            In memory of Earl Roberts -- letter writer, storyteller, and the
            man who believed that sharing our stories is one of the most
            important things we can do.
          </p>
        </div>
      </div>
    </div>
  );
}
