import { google } from "googleapis";
import { createClient } from "@/lib/supabase/server";

export async function POST(req) {
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

  const { fileId } = await req.json();

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

  const permissions = await drive.permissions.list({
    fileId,
    fields: "*",
  });

  const pending = permissions.data.permissions.find((p) => p.pendingOwner);

  if (!pending) {
    return Response.json({
      error: "No pending transfer",
    });
  }

  await drive.permissions.update({
    fileId,
    permissionId: pending.id,
    transferOwnership: true,
    requestBody: {
      role: "owner",
    },
  });

  return Response.json({
    success: true,
  });
}
