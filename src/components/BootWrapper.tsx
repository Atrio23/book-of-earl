"use client";

import { useState, useEffect } from "react";
import MacBootScreen from "@/components/MacBootScreen";

interface BootWrapperProps {
  readonly children: React.ReactNode;
}

export default function BootWrapper({ children }: BootWrapperProps) {
  const [showBoot, setShowBoot] = useState(false);
  const [bootComplete, setBootComplete] = useState(true);

  useEffect(() => {
    try {
      const hasBooted = sessionStorage.getItem("book-of-earl-booted");
      if (!hasBooted) {
        setShowBoot(true);
        setBootComplete(false);
      }
    } catch {
      // sessionStorage not available (SSR or restricted) — skip animation
    }
  }, []);

  const handleBootComplete = () => {
    try {
      sessionStorage.setItem("book-of-earl-booted", "true");
    } catch {
      // sessionStorage not available — continue silently
    }
    setShowBoot(false);
    setBootComplete(true);
  };

  return (
    <>
      {showBoot && <MacBootScreen onComplete={handleBootComplete} />}
      <div
        style={{
          opacity: bootComplete ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
        }}
      >
        {children}
      </div>
    </>
  );
}
