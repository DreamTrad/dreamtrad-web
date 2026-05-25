import { google } from "googleapis";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
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
    fields: "files(id,permissions)",
  });

  for (const file of files.data.files || []) {
    const pending = file.permissions?.find((p) => p.pendingOwner);

    if (!pending) {
      continue;
    }

    await drive.permissions.update({
      fileId: file.id,
      permissionId: pending.id,
      transferOwnership: true,
      requestBody: {
        role: "owner",
      },
    });
  }

  return Response.json({
    success: true,
  });
}
