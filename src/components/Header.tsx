"use client";

import { useState, useEffect, useRef } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="mac-toolbar">
      <nav
        className="flex items-center px-4 py-2 gap-4"
        style={{
          paddingLeft: `max(1rem, env(safe-area-inset-left))`,
          paddingRight: `max(1rem, env(safe-area-inset-right))`,
        }}
      >
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
          className="text-xs sm:text-sm font-bold text-mac-text tracking-tight select-none"
          style={{
            textShadow: "0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          The Book of Earl
        </h1>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop nav buttons - hidden on mobile */}
        <ul className="hidden sm:flex items-center gap-0.5 flex-shrink-0">
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

        {/* Mobile hamburger button - visible only on mobile */}
        <div ref={menuRef} className="relative sm:hidden flex-shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="mac-toolbar-btn"
            style={{ minWidth: 44, minHeight: 44, padding: "8px 10px" }}
          >
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              aria-hidden="true"
            >
              <rect y="0" width="18" height="2" rx="1" fill="currentColor" />
              <rect y="6" width="18" height="2" rx="1" fill="currentColor" />
              <rect y="12" width="18" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>

          {/* Mobile dropdown menu - classic Mac style */}
          {menuOpen && (
            <ul
              className="mac-mobile-menu"
              role="menu"
            >
              {NAV_LINKS.map((link, index) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href} role="none">
                    <Link
                      href={link.href}
                      role="menuitem"
                      className={`mac-mobile-menu-item ${
                        isActive ? "mac-mobile-menu-item-active" : ""
                      }`}
                      style={{
                        borderTop: index > 0 ? "1px solid #bbb" : "none",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
