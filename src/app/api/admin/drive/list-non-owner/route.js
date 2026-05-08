import { google } from "googleapis";
import { createClient } from "@/lib/supabase/server";

function formatType(mime) {
  if (!mime) return "Unknown";

  if (mime.includes("folder")) return "📁 Dossier";
  if (mime.includes("image")) return "🖼️ Image";
  if (mime.includes("video")) return "🎬 Vidéo";
  if (mime.includes("pdf")) return "📄 PDF";
  if (mime.includes("spreadsheet")) return "📊 Tableur";
  if (mime.includes("document")) return "📝 Document";

  return "📦 Fichier";
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. OPTIONAL: role check (recommended)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  const role = profile?.role;

  if (!(role === "admin" || role === "super_admin")) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );

  auth.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const drive = google.drive({
    version: "v3",
    auth,
  });

  const myEmail = "dreamteamtrad8@gmail.com";

  let pageToken = undefined;
  const allFiles = [];

  do {
    const res = await drive.files.list({
      q: "trashed = false",
      fields: "nextPageToken, files(id,name,mimeType,owners,parents)",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      pageSize: 1000,
      pageToken,
    });

    allFiles.push(...(res.data.files || []));

    pageToken = res.data.nextPageToken;
  } while (pageToken);

  const formatted = allFiles
    .filter((f) => f.owners?.[0]?.emailAddress !== myEmail)
    .map((f) => ({
      name: f.name,
      owner: f.owners?.[0]?.emailAddress || "Unknown",
      parents: f.parents || [],
    }));
  return Response.json({ files: formatted });
}
