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

  // get all users
  const { data: users, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // get profiles
  const { data: profiles } = await supabaseAdmin.from("profiles").select("*");

  const merged = users.users.map((u) => {
    const profile = profiles.find((p) => p.id === u.id);
    return {
      id: u.id,
      email: u.email,
      role: profile?.role || "user",
    };
  });

  return NextResponse.json({ users: merged });
}
