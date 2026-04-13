import { supabase } from "@/lib/supabase/client";

export function getImageUrl(path) {
  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(path);

  return data.publicUrl;
}