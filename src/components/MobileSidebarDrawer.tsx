"use client";

import { useState, useCallback, useEffect } from "react";

interface MobileSidebarDrawerProps {
  readonly children: React.ReactNode;
}

export default function MobileSidebarDrawer({
  children,
}: MobileSidebarDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Close drawer on navigation (when search params change)
  useEffect(() => {
    setIsOpen(false);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Toggle button - only visible on mobile (below sm) */}
      <button
        onClick={open}
        className="sm:hidden fixed bottom-4 left-4 z-40 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-b from-[#fafafa] to-[#d8d8d8] text-[12px] font-bold text-[#333] font-[family-name:var(--font-system)] rounded-[5px] border border-[#999] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_2px_4px_rgba(0,0,0,0.2)] active:from-[#d0d0d0] active:to-[#bbb] transition-all"
        aria-label="Open mailbox folders"
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
          <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
        </svg>
        Mailboxes
      </button>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 z-50 bg-black/40"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel - slides in from left */}
      <div
        className={`sm:hidden fixed top-0 left-0 z-50 h-full w-[260px] max-w-[80vw] transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Classic Mac window chrome */}
        <div className="h-full flex flex-col bg-[#e8e6e3] border-r border-[#888] shadow-[2px_0_8px_rgba(0,0,0,0.3)]">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-b from-[#e8e8e8] to-[#c8c8c8] border-b border-[#999]">
            {/* Close button - classic Mac style */}
            <button
              onClick={close}
              className="w-[13px] h-[13px] rounded-full bg-gradient-to-b from-[#ff6058] to-[#e0443e] border border-[#cf3a32] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:from-[#ff7b73] hover:to-[#e85850] active:from-[#d63a32] active:to-[#c02e28] transition-all"
              aria-label="Close mailbox drawer"
            />
            <span className="flex-1 text-center text-[12px] font-bold text-[#444] font-[family-name:var(--font-system)] tracking-tight">
              Mailboxes
            </span>
            {/* Spacer to center the title */}
            <div className="w-[13px]" />
          </div>

          {/* Sidebar content - render the MailSidebar children here */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
