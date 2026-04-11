// app/(site)/jeux/[id]/guide/page.js

import { games } from "@/data/jeux";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamicParams = true;
export const revalidate = 60 * 60;

export default async function GuideIndexPage({ params }) {
  const id = (await params).id;

  const supabase = await createClient();

  const { data: project, projectError } = await supabase
    .from("projects")
    .select("id, categories")
    .eq("id", id)
    .eq("is_visible", true)
    .single();

  const game = games.find((g) => g.id === id);

  const guide = game.categories.guide;
  if (!guide || guide.sections.length === 0) notFound();

  const firstSection = guide.sections[0];

  // Case: section with children
  if (firstSection.children && firstSection.children.length > 0) {
    redirect(
      `/jeux/${id}/guide/${firstSection.id}/${firstSection.children[0].id}`,
    );
  }

  // Case: simple section
  redirect(`/jeux/${id}/guide/${firstSection.id}`);
}
