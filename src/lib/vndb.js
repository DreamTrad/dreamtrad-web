// Extract VN ID from URL
function extractVnId(url) {
  const match = url.match(/v\d+/);
  return match ? match[0] : null;
}

// Fetch rating + vote count
export async function fetchVnStats(vndbUrl) {
  const id = extractVnId(vndbUrl);
  if (!id) throw new Error("Invalid VNDB URL");

  const res = await fetch("https://api.vndb.org/kana/vn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filters: ["id", "=", id],
      fields: "title, rating, votecount",
    }),
  });

  if (!res.ok) {
    throw new Error("VNDB API error");
  }

  const json = await res.json();
  const vn = json.results?.[0];

  return {
    title: vn?.title || null,
    rating: vn?.rating || null,
    votecount: vn?.votecount || 0,
  };
}