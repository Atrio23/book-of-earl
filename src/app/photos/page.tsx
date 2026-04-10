import type { Metadata } from "next";
import { Suspense } from "react";
import { fetchPhotos } from "@/lib/photo-queries";
import type { Photo } from "@/lib/photo-queries";
import PhotoGallery from "@/components/PhotoGallery";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "A collection of photographs from Earl Roberts -- family, friends, and moments captured over the years.",
};

export const revalidate = 60;

interface YearGroup {
  readonly year: number;
  readonly photos: readonly Photo[];
}

function groupPhotosByYear(photos: readonly Photo[]): readonly YearGroup[] {
  const groups: Array<{ year: number; photos: Photo[] }> = [];
  let currentYear: number | null = null;
  let currentGroup: Photo[] = [];

  for (const photo of photos) {
    const photoYear = photo.date_taken
      ? new Date(photo.date_taken).getFullYear()
      : 0;

    if (photoYear !== currentYear) {
      if (currentYear !== null) {
        groups.push({ year: currentYear, photos: currentGroup });
      }
      currentYear = photoYear;
      currentGroup = [photo];
    } else {
      currentGroup.push(photo);
    }
  }

  if (currentYear !== null) {
    groups.push({ year: currentYear, photos: currentGroup });
  }

  return groups;
}

async function PhotosContent() {
  let photos: readonly Photo[] = [];
  let fetchError = false;

  try {
    photos = await fetchPhotos();
  } catch {
    fetchError = true;
  }

  const yearGroups = groupPhotosByYear(photos);
  const photoCount = photos.length;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      {/* Toolbar header */}
      <div className="border-b border-[#c8c8c8] bg-gradient-to-b from-[#f6f6f6] to-[#e8e8e8] px-6 py-2.5">
        <h1 className="text-[13px] font-bold text-[#333] font-[family-name:var(--font-system)]">
          Photos
        </h1>
        <p className="text-[11px] text-[#888] mt-0.5 font-[family-name:var(--font-system)]">
          Family photographs and memories
        </p>
      </div>

      {fetchError && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[13px] text-[#888] font-[family-name:var(--font-system)] italic">
            Unable to load photos at this time. Please try again later.
          </p>
        </div>
      )}

      {!fetchError && photos.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center py-16">
          <div className="text-[48px] mb-3 opacity-30">&#128247;</div>
          <p className="text-[14px] font-bold text-[#555] font-[family-name:var(--font-system)] mb-1">
            No photos yet
          </p>
          <p className="text-[12px] text-[#888] font-[family-name:var(--font-system)]">
            Check back soon for photographs from Earl.
          </p>
        </div>
      )}

      {!fetchError && photos.length > 0 && (
        <PhotoGallery yearGroups={yearGroups} allPhotos={photos} />
      )}

      {/* Status bar */}
      <div className="mac-status-bar">
        <div className="flex items-center justify-center px-4 py-1.5">
          <span className="text-[11px] text-mac-text-light font-[family-name:var(--font-system)]">
            {photoCount} photo{photoCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PhotosPage() {
  return (
    <div
      className="page-enter flex flex-col"
      style={{ minHeight: "calc(100vh - 65px)" }}
    >
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center bg-white">
            <p className="text-[13px] text-[#888] font-[family-name:var(--font-system)] italic animate-pulse">
              Loading photos...
            </p>
          </div>
        }
      >
        <PhotosContent />
      </Suspense>
    </div>
  );
}
