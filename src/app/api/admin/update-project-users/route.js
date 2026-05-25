// /api/admin/update-project-users/route.js

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/service";
import { createClient as createClientServer } from "@/lib/supabase/server";

export async function POST(request) {
  const supabase = await createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!["admin", "super_admin"].includes(profile?.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId, projectIds } = await request.json();

  // delete old
  await supabaseAdmin
    .from("project_users")
    .delete()
    .eq("user_id", userId);

  // insert new
  const inserts = projectIds.map((project_id) => ({
    user_id: userId,
    project_id,
  }));

  if (inserts.length > 0) {
    await supabaseAdmin.from("project_users").insert(inserts);
  }

  return NextResponse.json({ success: true });
}