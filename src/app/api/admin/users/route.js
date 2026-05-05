import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createClientServer } from "@/lib/supabase/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

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
