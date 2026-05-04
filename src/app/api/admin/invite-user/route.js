// src/app/api/admin/invite-user/route.js

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createClientServer } from "@/lib/supabase/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function POST(request) {

  const supabase = await createClientServer();

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

  try {
    const { email, role = "" } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    );

    if (error) {
      console.error("Erreur invitation:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (data.user) {
      const { error: dbError } = await supabaseAdmin.from("profiles").upsert({
        id: data.user.id,
        role: role,
      });

      if (dbError) {
        console.error("Erreur ajout dans la table users:", dbError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Invitation envoyée avec succès",
      user: data.user,
    });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 },
    );
  }
}
