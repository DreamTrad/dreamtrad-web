// app/api/admin/update-supabase/pages/route.js

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function POST(req) {

  // 1. AUTH CHECK (same logic as admin layout)
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { slug, file, type, data } = body;

  const { data: updatedPages, error } = await supabase
    .from("pages")
    .update(data)
    .eq("slug", slug)
    .eq("file", file)
    .select("slug");

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  if (!updatedPages?.length) {
    return Response.json(
      { error: "Mise à jour refusée ou page introuvable." },
      { status: 403 },
    );
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
