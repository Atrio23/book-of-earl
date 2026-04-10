"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/archive", label: "Archive" },
  { href: "/photos", label: "Photos" },
  { href: "/reviews", label: "Reviews" },
  { href: "/quotes", label: "Quotes" },
  { href: "/about", label: "About" },
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="mac-toolbar">
      <nav className="flex items-center px-4 py-2 gap-4">
        {/* Traffic Lights */}
        <div className="mac-traffic-lights flex-shrink-0">
          <span className="mac-traffic-light-red" />
          <span className="mac-traffic-light-yellow" />
          <span className="mac-traffic-light-green" />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Title - centered */}
        <h1
          className="text-sm font-bold text-mac-text tracking-tight select-none"
          style={{
            textShadow: "0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          The Book of Earl
        </h1>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Nav buttons */}
        <ul className="flex items-center gap-0.5 flex-shrink-0">
          {NAV_LINKS.map((link, index) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            const isFirst = index === 0;
            const isLast = index === NAV_LINKS.length - 1;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`mac-toolbar-btn ${
                    isActive ? "mac-toolbar-btn-active" : ""
                  }`}
                  style={{
                    borderRadius: isFirst
                      ? "4px 0 0 4px"
                      : isLast
                        ? "0 4px 4px 0"
                        : "0",
                    marginLeft: index > 0 ? "-1px" : "0",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
