// app/(site)/jeux/[id]/guide/page.js

import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamicParams = true;
export const revalidate = 60 * 60;

export default async function GuideIndexPage({ params }) {
  const id = (await params).id;

  const supabase = await createClient();

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
    redirect(`/jeux/${id}`);
  }

  redirect(`/jeux/${pageData.slug}/${pageData.file}`);
}
