"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import PhotoLightbox from "./PhotoLightbox";

interface Photo {
  readonly id: string;
  readonly filename: string;
  readonly storage_path: string;
  readonly public_url: string | null;
  readonly date_taken: string | null;
  readonly caption: string | null;
  readonly sort_order: number;
}

interface YearGroup {
  readonly year: number;
  readonly photos: readonly Photo[];
}

interface PhotoGalleryProps {
  readonly yearGroups: readonly YearGroup[];
  readonly allPhotos: readonly Photo[];
}

function formatPhotoDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PhotoGallery({
  yearGroups,
  allPhotos,
}: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback(
    (photoId: string) => {
      const idx = allPhotos.findIndex((p) => p.id === photoId);
      if (idx >= 0) {
        setLightboxIndex(idx);
      }
    },
    [allPhotos]
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const navigateLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        {yearGroups.map((group) => (
          <div key={group.year}>
            {/* Year divider -- matches archive style */}
            <div className="sticky top-0 z-10 bg-gradient-to-b from-[#e8e8e8] to-[#dedede] border-t border-t-[#f0f0f0] border-b border-b-[#c8c8c8] px-4 py-1">
              <span className="text-[12px] font-bold text-[#555] font-[family-name:var(--font-system)] tracking-wide tabular-nums">
                {group.year}
              </span>
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-4 stagger-fade-in">
              {group.photos.map((photo) => {
                const src = photo.public_url ?? "";
                return (
                  <button
                    key={photo.id}
                    onClick={() => openLightbox(photo.id)}
                    className="group relative bg-white border border-[#d0d0d0] rounded overflow-hidden shadow-sm hover:shadow-md hover:border-[#999] hover-lift"
                    aria-label={`View photo: ${photo.caption ?? photo.filename}`}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={src}
                        alt={photo.caption ?? photo.filename}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-200"
                        unoptimized
                      />
                    </div>
                    {photo.date_taken && (
                      <div className="px-2 py-1.5 bg-white border-t border-[#e8e8e8]">
                        <p className="text-[11px] text-[#999] font-[family-name:var(--font-system)] truncate">
                          {formatPhotoDate(photo.date_taken)}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={allPhotos}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </>
  );
}
