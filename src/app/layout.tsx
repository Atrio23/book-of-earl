import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import "./boot.css";
import BootWrapper from "@/components/BootWrapper";

export const metadata: Metadata = {
  title: {
    default: "The Book of Earl",
    template: "%s | The Book of Earl",
  },
  description:
    "A collection of letters from Earl Roberts -- memories, reflections, and stories shared with family and friends.",
  openGraph: {
    title: "The Book of Earl",
    description:
      "A collection of letters from Earl Roberts -- memories, reflections, and stories shared with family and friends.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen flex items-center justify-center p-0 sm:p-6 font-[family-name:var(--font-system)]">
        <BootWrapper>
          <div className="mac-window w-full max-w-6xl min-h-screen sm:min-h-[85vh] flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 page-enter bg-mac-content overflow-hidden">{children}</main>
            <Footer />
          </div>
        </BootWrapper>
      </body>
    </html>
  );
}
