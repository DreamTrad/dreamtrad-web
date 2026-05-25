// app/api/admin/revalidate/route.js

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function POST(req) {

  // 1. AUTH CHECK (same logic as admin layout)
  const supabaseAdmin = await createClient();

  const {
    data: { user },
  } = await supabaseAdmin.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { path, paths } = body;

  if (!path && !paths) {
    return Response.json(
      { error: "Missing path or paths" },
      { status: 400 }
    );
  }

  const list = paths || [path];

  // -------------------------
  // REVALIDATE
  // -------------------------
  for (const p of list) {
    revalidatePath(p);
  }

  return Response.json({ ok: true });
}