// app/(site)/jeux/[id]/guide/succes/page.js

import AchievementClient from "./AchievementClient";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60 * 60;

export async function generateMetadata({ params }) {
  const id = (await params).id;

  const supabase = await createClient();

  const { data: projectData } = await supabase
    .from("projects")
    .select("title")
    .eq("id", id)
    .single();

  const title = `Succès | ${projectData.title}`;
  const description = `Consultez la liste complète des succès pour ${projectData.title}.`;
  const image = `/jeux/${id}/cover.webp`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: projectData.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function SuccesPage({ params }) {
  const id = (await params).id;

  const supabase = await createClient();

  const { data: achievementData } = await supabase
    .from("achievements")
    .select("id, title_og, title_fr, description_fr, resolution, hidden")
    .eq("project_id", id)
    .not("description_fr", "is", null)
    .neq("description_fr", "")
    .order("id", { ascending: true })

  const { data: projectData } = await supabase
    .from("projects")
    .select("title")
    .eq("id", id)
    .single();

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-text mb-10 text-4xl font-extrabold tracking-tight">
        Les succès de {projectData.title}
      </h1>
      <AchievementClient achievementData={achievementData} gameId={id} />
    </div>
  );
}
