// app/api/admin/update-supabase/pages/route.js

import { revalidatePath } from "next/cache";
import { createStaticClient } from "@/lib/supabase/public";

export async function POST(req) {
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
