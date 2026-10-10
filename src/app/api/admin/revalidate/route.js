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

  const { path, paths, layoutPaths } = body;

  if (!path && !paths && !layoutPaths) {
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

  for (const p of layoutPaths || []) {
    revalidatePath(p, "layout");
  }

  return Response.json({ ok: true });
}