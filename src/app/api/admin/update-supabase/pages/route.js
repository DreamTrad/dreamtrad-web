// app/api/admin/update-supabase/pages/route.js

import { revalidatePath } from "next/cache";
import { createStaticClient } from "@/lib/supabase/public";
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

  const supabase = createStaticClient();

  const { slug, file, type, data } = body;

  const { error } = await supabase
    .from("pages")
    .update(data)
    .eq("slug", slug)
    .eq("file", file);

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  if (file === "page") {
    revalidatePath(`/${slug}`);
  } else if (type === "infobox") {
    revalidatePath(`/${slug}`);
  } else if (type === "presentation") {
    revalidatePath(`/jeux/${slug}`);
  } else if (type === "infopatch") {
    revalidatePath(`/jeux/${slug}`);
  } else if (type === "installation") {
    revalidatePath(`/jeux/${slug}`);
  }

  return Response.json({ ok: true });
}
