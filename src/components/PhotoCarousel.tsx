"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Photo } from "@/lib/photo-queries";

interface PhotoCarouselProps {
  readonly photos: readonly Photo[];
}

function formatPhotoDate(dateString: string | null): string {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const photoCount = photos.length;
  const currentPhoto = photos[currentIndex] ?? null;

  const goTo = useCallback(
    (index: number) => {
      if (photoCount === 0) return;
      const clamped = ((index % photoCount) + photoCount) % photoCount;
      setCurrentIndex(clamped);
    },
    [photoCount]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Auto-play
  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(goNext, 5000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPlaying, goNext]);

  // Scroll the active thumbnail into view
  useEffect(() => {
    if (!thumbnailStripRef.current) return;
    const activeThumb = thumbnailStripRef.current.children[currentIndex] as HTMLElement | undefined;
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  if (photoCount === 0) {
    return null;
  }

  const photoUrl = currentPhoto?.public_url ?? "";

  return (
    <div className="select-none">
      {/* Main photo area */}
      <div
        className="relative bg-white border border-[#b8b8b8] rounded-[3px] overflow-hidden"
        style={{
          boxShadow:
            "inset 0 0 0 4px #f5f5f5, 0 2px 8px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        {/* White mat inner padding */}
        <div className="bg-[#f5f5f5] p-3">
          <div className="relative bg-[#1a1a1a] rounded-[2px] overflow-hidden flex items-center justify-center" style={{ height: "280px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt={currentPhoto?.caption ?? currentPhoto?.filename ?? "Family photo"}
              className="max-w-full max-h-full object-contain"
              style={{ display: "block" }}
            />

            {/* Left arrow */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-[32px] h-[32px] flex items-center justify-center rounded-[4px] border border-[#999] bg-gradient-to-b from-[#fafafa]/90 to-[#d8d8d8]/90 text-[#555] hover:from-[#fff]/95 hover:to-[#e8e8e8]/95 active:from-[#ccc]/90 active:to-[#bbb]/90 transition-all cursor-default"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right arrow */}
            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-[32px] h-[32px] flex items-center justify-center rounded-[4px] border border-[#999] bg-gradient-to-b from-[#fafafa]/90 to-[#d8d8d8]/90 text-[#555] hover:from-[#fff]/95 hover:to-[#e8e8e8]/95 active:from-[#ccc]/90 active:to-[#bbb]/90 transition-all cursor-default"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Info bar: counter, caption/date, autoplay */}
      <div className="flex items-center justify-between px-1 py-2">
        <span className="text-[11px] text-[#888] font-[family-name:var(--font-system)] tabular-nums">
          {currentIndex + 1} of {photoCount}
        </span>

        <span className="text-[12px] text-[#777] font-[family-name:var(--font-system)] text-center flex-1 px-3 truncate">
          {currentPhoto?.caption ?? ""}
          {currentPhoto?.caption && currentPhoto?.date_taken ? " \u2014 " : ""}
          {currentPhoto?.date_taken ? formatPhotoDate(currentPhoto.date_taken) : ""}
        </span>

        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          className="text-[11px] text-[#666] font-[family-name:var(--font-system)] px-2 py-0.5 rounded-[3px] border border-[#bbb] bg-gradient-to-b from-[#fafafa] to-[#e8e8e8] hover:from-[#fff] hover:to-[#eee] active:from-[#ddd] active:to-[#ccc] transition-all cursor-default"
          style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)" }}
        >
          {isPlaying ? "\u275A\u275A Pause" : "\u25B6 Play"}
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        className="border border-[#b8b8b8] rounded-[3px] bg-[#e8e8e8] p-1.5 overflow-x-auto"
        style={{
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        <div
          ref={thumbnailStripRef}
          className="flex gap-1.5"
          style={{ minWidth: "min-content" }}
        >
          {photos.map((photo, idx) => {
            const isActive = idx === currentIndex;
            const thumbUrl = photo.public_url ?? "";
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`View photo ${idx + 1}`}
                className={`shrink-0 w-[44px] h-[44px] rounded-[2px] overflow-hidden border-2 transition-all cursor-default ${
                  isActive
                    ? "border-[#3d80df] shadow-[0_0_0_1px_#3d80df]"
                    : "border-[#ccc] hover:border-[#999]"
                }`}
                style={isActive ? { boxShadow: "0 0 0 1px #3d80df, 0 1px 3px rgba(0,0,0,0.15)" } : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbUrl}
                  alt={photo.caption ?? photo.filename ?? `Photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
