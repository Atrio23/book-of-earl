"use client";

import { useCallback, useEffect } from "react";
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
        className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg transition-colors cursor-default"
        aria-label="Close lightbox"
      >
        &#10005;
      </button>

      {/* Previous arrow */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl transition-colors cursor-default"
          aria-label="Previous photo"
        >
          &#8249;
        </button>
      )}

      {/* Next arrow */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl transition-colors cursor-default"
          aria-label="Next photo"
        >
          &#8250;
        </button>
      )}

      {/* Photo container */}
      <div
        className="relative flex flex-col items-center max-w-[90vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={src}
            alt={photo.caption ?? photo.filename}
            width={1200}
            height={900}
            className="max-h-[80vh] w-auto h-auto object-contain rounded"
            style={{ maxWidth: "90vw" }}
            priority
            unoptimized
          />
        </div>

        {/* Caption / date below photo */}
        <div className="mt-3 text-center">
          {photo.caption && (
            <p className="text-[14px] text-white/90 mb-1">{photo.caption}</p>
          )}
          {photo.date_taken && (
            <p className="text-[12px] text-white/50">
              {formatPhotoDate(photo.date_taken)}
            </p>
          )}
          <p className="text-[11px] text-white/30 mt-1">
            {currentIndex + 1} of {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
}
