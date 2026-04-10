import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // server only
);

// extract vndb id from url
function extractVndbId(url) {
  const match = url.match(/vndb\.org\/(v\d+)/);
  return match ? match[1] : null;
}

// fetch stats from VNDB
async function fetchVnStats(id) {
  const res = await fetch("https://api.vndb.org/kana/vn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filters: ["id", "=", id],
      fields: "rating,votecount",
    }),
  });

  const json = await res.json();
  return json.results?.[0] || null;
}

export async function POST() {
  const { data: entries, error } = await supabase
    .from("vndbfrentries")
    .select("id, links");

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  let updated = 0;

  for (const entry of entries) {
    const link = entry.links?.find((l) => l.includes("vndb.org"));
    if (!link) continue;

    const vnId = extractVndbId(link);
    if (!vnId) continue;

    try {
      const stats = await fetchVnStats(vnId);

      if (!stats) continue;

      await supabase
        .from("vndbfrentries")
        .update({
          vndb_rating: stats.rating,
          vndb_votes: stats.votecount,
        })
        .eq("id", entry.id);

      updated++;

      // throttle (important)
      await new Promise((r) => setTimeout(r, 300));
    } catch (e) {
      console.error("VNDB error:", e);
    }
  }

  return Response.json({ updated });
}