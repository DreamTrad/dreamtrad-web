// app/(site)/jeux/[id]/guide/page.js

import { redirect } from "next/navigation";
import { createStaticClient } from "@/lib/supabase/public";

export const dynamic = "force-static";

export default async function GuideIndexPage({ params }) {
  const id = (await params).id;

  const supabase = createStaticClient();

  // -----------------------
  // Get visible guide pages (ordered)
  // -----------------------
  const { data: pages } = await supabase
    .from("pages")
    .select("slug, file, title, description, content, position")
    .eq("project_id", id)
    .eq("type", "guide")
    .eq("is_visible", true)
    .order("position", { ascending: true });

  // No guide pages found
  if (!pages || pages.length === 0) {
    const { data: project } = await supabase
      .from("projects")
      .select("show_achievements")
      .eq("is_visible", true)
      .eq("id", id)
      .single();

    if (project?.show_achievements) {
      redirect(`/jeux/${id}/guide/succes`);
    }

    redirect(`/jeux/${id}`);
  }

  // -----------------------
  // Find root guide page (slug === `${id}/guide`)
  // -----------------------
  const root = pages.find((p) => p.slug === `${id}/guide`);

  if (root) {
    redirect(`/jeux/${root.slug}/${root.file}`);
  }

  // -----------------------
  // Fallback: first available guide page
  // -----------------------
  redirect(`/jeux/${pages[0].slug}/${pages[0].file}`);
}
