// app/(site)/jeux/[id]/page.js

import { games } from "@/data/jeux";
import MarkdownSection from "@/components/ui/MarkdownSection";
import GameEmbeds from "./GameEmbeds";
import { createClient } from "@/lib/supabase/server";

export const dynamicParams = true;
export const revalidate = 60 * 60; // 1 heure

export default async function GamePage({ params }) {
  const id = (await params).id;
  const game = games.find((g) => g.id === id);

  const supabase = await createClient();

  const { data: project, projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("is_visible", true)
    .single();

  if (projectError) {
    console.error("Error fetching project:", projectError);
    redirect("/");
  }

  const { data: presentation, pageError } = await supabase
        .from("pages")
        .select("content")
        .eq("project_id", project.id)
        .eq("file", "presentation")
        .single();

      if (pageError) {
        console.error(pageError);
        redirect("/");
      }

  const presentationCat = game.categories.general.sections.find(
    (s) => s.id === "presentation",
  );

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 pb-20">
      <div className="bg-bg-secondary/60 rounded-2xl p-6 shadow-sm backdrop-blur-sm md:p-8">
        <MarkdownSection content={presentation?.content || ""} />
      </div>

      <GameEmbeds embeds={presentationCat.embeds} />
    </div>
  );
}
