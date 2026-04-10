"use client";

import { useState, useEffect, useCallback } from "react";

interface MacBootScreenProps {
  readonly onComplete: () => void;
}

export default function MacBootScreen({ onComplete }: MacBootScreenProps) {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [fadingOut, setFadingOut] = useState(false);

  const handleAnimationEnd = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Phase 1 -> Phase 2 at 1.5s
    const phase2Timer = setTimeout(() => {
      setPhase(2);
    }, 1500);

    // Phase 2 -> Phase 3 at 3.5s
    const phase3Timer = setTimeout(() => {
      setPhase(3);
    }, 3500);

    // Start fade-out at 4s
    const fadeOutTimer = setTimeout(() => {
      setFadingOut(true);
    }, 4000);

    // Complete at 4.5s
    const completeTimer = setTimeout(() => {
      handleAnimationEnd();
    }, 4500);

    return () => {
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [handleAnimationEnd]);

  return (
    <div
      className={`boot-overlay ${fadingOut ? "boot-fade-out" : ""}`}
      style={{
        backgroundColor: phase === 3 ? "#8b8b8b" : "#1a1a1a",
      }}
    >
      {phase < 3 && (
        <>
          <svg
            className="boot-apple-logo"
            width="60"
            height="72"
            viewBox="0 0 60 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Leaf */}
            <path
              d="M35 2C35 2 38 0 42 2C40 6 36 8 35 8C34 7 34 4 35 2Z"
              fill="#c0c0c0"
            />
            {/* Apple body with bite */}
            <path
              d="M30 12C18 12 8 22 8 36C8 52 16 64 24 68C26 69 28 70 30 70C32 70 34 69 36 68C44 64 52 52 52 36C52 22 42 12 30 12ZM46 30C44 28 42 28 40 30C38 32 38 34 40 36C42 38 44 38 46 36C48 34 48 32 46 30Z"
              fill="#c0c0c0"
            />
          </svg>

          {phase === 2 && (
            <div className="boot-progress-track">
              <div className="boot-progress-fill" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
