// app/(site)/jeux/[id]/patchfr/page.js

import { redirect } from "next/navigation";
import { createStaticClient } from "@/lib/supabase/public";

export const dynamic = "force-static";

export async function generateStaticParams() {

  const supabase = createStaticClient();

  const { data } = await supabase
    .from("projects")
    .select("id")
    .eq("is_visible", true);

  return data.map((p) => ({
    id: p.id.toString(),
  }));
}

export default async function PatchFrIndexPage({ params }) {
  const id = (await params).id;

  redirect(`/jeux/${id}/patchfr/telechargement`);
}
