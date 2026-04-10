"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";

interface Photo {
  readonly id: string;
  readonly public_url: string | null;
  readonly caption: string | null;
  readonly date_taken: string | null;
  readonly filename: string;
}

interface PhotoLightboxProps {
  readonly photos: readonly Photo[];
  readonly currentIndex: number;
  readonly onClose: () => void;
  readonly onNavigate: (index: number) => void;
}

const SWIPE_THRESHOLD = 50;

function formatPhotoDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PhotoLightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: PhotoLightboxProps) {
  const photo = photos[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const goToPrev = useCallback(() => {
    if (hasPrev) {
      onNavigate(currentIndex - 1);
    }
  }, [hasPrev, currentIndex, onNavigate]);

  const goToNext = useCallback(() => {
    if (hasNext) {
      onNavigate(currentIndex + 1);
    }
  }, [hasNext, currentIndex, onNavigate]);

  // Touch swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      // Only trigger if horizontal swipe is dominant
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
        if (deltaX < 0 && hasNext) {
          goToNext();
        } else if (deltaX > 0 && hasPrev) {
          goToPrev();
        }
      }
    },
    [goToNext, goToPrev, hasNext, hasPrev]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goToPrev, goToNext]);

  if (!photo) {
    return null;
  }

  const src = photo.public_url ?? "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg transition-colors cursor-default"
        aria-label="Close lightbox"
      >
        &#10005;
      </button>

      {/* Previous arrow -- hidden on mobile where swipe is primary */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrev();
          }}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl transition-colors cursor-default"
          aria-label="Previous photo"
        >
          &#8249;
        </button>
      )}

      {/* Next arrow -- hidden on mobile where swipe is primary */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl transition-colors cursor-default"
          aria-label="Next photo"
        >
          &#8250;
        </button>
      )}

      {/* Photo container */}
      <div
        className="relative flex flex-col items-center max-w-[95vw] sm:max-w-[90vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={src}
            alt={photo.caption ?? photo.filename}
            width={1200}
            height={900}
            className="max-h-[75vh] sm:max-h-[80vh] w-auto h-auto object-contain rounded pointer-events-none"
            style={{ maxWidth: "95vw" }}
            draggable={false}
            priority
            unoptimized
          />
        </div>

        {/* Caption / date below photo */}
        <div className="mt-3 text-center px-4">
          {photo.caption && (
            <p className="text-[15px] sm:text-[14px] text-white/90 mb-1">{photo.caption}</p>
          )}
          {photo.date_taken && (
            <p className="text-[13px] sm:text-[12px] text-white/50">
              {formatPhotoDate(photo.date_taken)}
            </p>
          )}
          <p className="text-[13px] sm:text-[11px] text-white/30 mt-1">
            {currentIndex + 1} of {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
}
