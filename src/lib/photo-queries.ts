import { supabase } from "./supabase";

const SUPABASE_STORAGE_BASE = "https://lastqcirpqhgypyfpbsl.supabase.co/storage/v1/object/public";

export interface Photo {
  readonly id: string;
  readonly filename: string;
  readonly storage_path: string;
  readonly public_url: string | null;
  readonly date_taken: string | null;
  readonly caption: string | null;
  readonly sort_order: number;
}

function buildPublicUrl(storagePath: string): string {
  return `${SUPABASE_STORAGE_BASE}/${storagePath}`;
}

function toPhoto(row: Record<string, unknown>): Photo {
  const storagePath = row.storage_path as string;
  return {
    id: row.id as string,
    filename: row.filename as string,
    storage_path: storagePath,
    public_url: (row.public_url as string | null) ?? buildPublicUrl(storagePath),
    date_taken: row.date_taken as string | null,
    caption: row.caption as string | null,
    sort_order: row.sort_order as number,
  };
}

export async function fetchPhotos(): Promise<readonly Photo[]> {
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .order("date_taken", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch photos: ${error.message}`);
  }

  return (data ?? []).map(toPhoto);
}

export async function fetchPhotoById(id: string): Promise<Photo | null> {
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(`Failed to fetch photo: ${error.message}`);
  }

  return data ? toPhoto(data as Record<string, unknown>) : null;
}

export async function fetchRandomPhotos(
  limit: number = 20
): Promise<readonly Photo[]> {
  const allPhotos = await fetchPhotos();

  if (allPhotos.length <= limit) {
    return allPhotos;
  }

  // Fisher-Yates shuffle on a copy, then take the first `limit` items
  const shuffled = [...allPhotos];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, limit);
}
