import { createClient } from "@/lib/supabase/server";
import { google } from "googleapis";

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

  const files = await drive.files.list({
    fields:
      "files(id,name,owners(emailAddress),permissions(id,emailAddress,role,pendingOwner))",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  const transfers = [];

  for (const file of files.data.files || []) {
    const pendingPermission = file.permissions?.find(
      (p) => p.pendingOwner === true,
    );

    if (!pendingPermission) {
      continue;
    }

    transfers.push({
      fileId: file.id,
      name: file.name,
      owner: file.owners?.[0]?.emailAddress || "Unknown",
      permissionId: pendingPermission.id,
    });
  }

  return Response.json({
    transfers,
  });
}
