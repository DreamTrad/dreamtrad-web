// app/(site)/jeux/[id]/guide/page.js

import { redirect } from "next/navigation";
import { createStaticClient } from "@/lib/supabase/public";

export const revalidate = 21600; // 6 hours

export default async function GuideIndexPage({ params }) {
  const id = (await params).id;

  const supabase = createStaticClient();

  const { data: pageData } = await supabase
    .from("pages")
    .select("slug, file, title, description, content")
    .eq("project_id", id)
    .eq("type", "guide")
    .eq("is_visible", true)
    .order("position", { ascending: true })
    .limit(1)
    .single();

  if (!pageData) {
    const { data: achievementData } = await supabase
      .from("achievements")
      .select("id")
      .eq("project_id", id)
      .not("description_fr", "is", null)
      .neq("description_fr", "")
      .limit(1)
      .single();
    if (achievementData) {
      redirect(`/jeux/${id}/guide/succes`);
    }
    redirect(`/jeux/${id}`);
  }

  redirect(`/jeux/${pageData.slug}/${pageData.file}`);
}
