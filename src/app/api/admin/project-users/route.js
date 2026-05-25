// /api/admin/project-users/route.js

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/service";
import { createClient as createClientServer } from "@/lib/supabase/server";

export async function GET() {
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

  // all users
  const { data: usersData } =
    await supabaseAdmin.auth.admin.listUsers();

  // profiles
  const { data: profiles } = await supabaseAdmin
    .from("profiles")
    .select("*");

  // projects
  const { data: projects } = await supabaseAdmin
    .from("projects")
    .select("id, title");

  // relations
  const { data: relations } = await supabaseAdmin
    .from("project_users")
    .select("*");

  // merge
  const users = usersData.users
    .map((u) => {
      const profile = profiles.find((p) => p.id === u.id);

      return {
        id: u.id,
        email: u.email,
        role: profile?.role || "user",
        projects:
          relations
            .filter((r) => r.user_id === u.id)
            .map((r) => r.project_id) || [],
      };
    })
    // remove admins
    .filter((u) => u.role === "user");

  return NextResponse.json({
    users,
    projects,
  });
}