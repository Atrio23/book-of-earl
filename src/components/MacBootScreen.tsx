"use client";

import { useState, useEffect } from "react";

type BootPhase = "crt-on" | "chime-flash" | "logo-progress" | "welcome" | "fade-out";

interface MacBootScreenProps {
  readonly onComplete: () => void;
}

export default function MacBootScreen({ onComplete }: MacBootScreenProps) {
  const [phase, setPhase] = useState<BootPhase>("crt-on");
  const [showFlash, setShowFlash] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 2: Chime flash at 0.8s
    timers.push(
      setTimeout(() => {
        setPhase("chime-flash");
        setShowFlash(true);
      }, 800)
    );

    // Flash fades, logo appears at 1.1s
    timers.push(
      setTimeout(() => {
        setShowFlash(false);
        setShowLogo(true);
      }, 1100)
    );

    // Phase 3: Logo + progress bar at 1.5s
    timers.push(
      setTimeout(() => {
        setPhase("logo-progress");
      }, 1500)
    );

    // Phase 4: Welcome text at 4s
    timers.push(
      setTimeout(() => {
        setPhase("welcome");
      }, 4000)
    );

    // Phase 5: Fade out at 4.5s
    timers.push(
      setTimeout(() => {
        setPhase("fade-out");
      }, 4500)
    );

    // Complete at 5.5s
    timers.push(
      setTimeout(() => {
        onComplete();
      }, 5500)
    );

    return () => {
      for (const timer of timers) {
        clearTimeout(timer);
      }
    };
  }, [onComplete]);

  const isCrtOn = phase === "crt-on";
  const showProgress = phase === "logo-progress" || phase === "welcome" || phase === "fade-out";
  const isWelcome = phase === "welcome" || phase === "fade-out";
  const isFadingOut = phase === "fade-out";

  const backgroundColor = isWelcome ? "#4a4a4a" : "#1a1a1a";

  return (
    <div
      className={`boot-overlay ${isCrtOn ? "boot-screen-on" : ""} ${isFadingOut ? "boot-fade-out" : ""}`}
      style={{ backgroundColor }}
    >
      {/* CRT scanline overlay */}
      <div className="boot-scanlines" />

      {/* Chime flash */}
      {showFlash && <div className="boot-chime-flash" />}

      {/* Screen glow behind logo */}
      {showLogo && <div className="boot-screen-glow" />}

      {/* Apple logo */}
      {showLogo && (
        <svg
          className="boot-apple-logo"
          width="56"
          height="68"
          viewBox="-2 -2 64 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M42.2,8.5c-2.8,2.8-6.6,4.4-10.2,4.1c-0.5-3.7,1.3-7.6,3.9-10.2c2.8-2.8,7-4.5,10.6-4.5
            C47,1.7,44.9,5.8,42.2,8.5z M46.5,12.2c-5.9-0.3-10.9,3.3-13.7,3.3c-2.8,0-7.2-3.2-11.8-3.1
            c-6.1,0.1-11.7,3.5-14.8,9c-6.3,10.9-1.6,27.2,4.5,36.1c3,4.4,6.6,9.3,11.4,9.1c4.5-0.2,6.3-2.9,11.7-2.9
            c5.5,0,7.1,2.9,11.9,2.8c4.9-0.1,8-4.4,11-8.9c3.4-5,4.8-9.9,4.9-10.2c-0.1,0-9.4-3.6-9.5-14.3
            c-0.1-9,7.3-13.3,7.7-13.5C56.4,14.3,49.7,12.4,46.5,12.2z"
            fill="#c0c0c0"
          />
        </svg>
      )}

      {/* Progress bar */}
      {showProgress && (
        <div className="boot-progress-track">
          <div className="boot-progress-fill" />
        </div>
      )}

      {/* Welcome text */}
      {isWelcome && (
        <div className="boot-welcome-text">Welcome</div>
      )}
    </div>
  );
}
