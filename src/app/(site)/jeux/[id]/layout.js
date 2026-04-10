// app/(site)/jeux/[id]/layout.js

import GameHeader from "./GameHeader";
import GameClient from "./GameClient";
import { createClient } from "@/lib/supabase/server";

export const dynamicParams = true;
export const revalidate = 60 * 60; // 1 heure

export async function generateMetadata({ params }) {
  const id = (await params).id;

  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("title")
    .eq("id", id)
    .eq("is_visible", true)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return {};
  }

  if (!project) return {};

  const image = `/jeux/${id}/cover.webp`;

  return {
    title: project.title,
    description: `Découvrez ${project.title}, téléchargez ou renseignez-vous le patch français ou consultez les guides.`,
    openGraph: {
      title: project.title,
      description: `Découvrez ${project.title}, téléchargez ou renseignez-vous le patch français ou consultez les guides.`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [image],
    },
  };
}

export default async function GameLayout({ children, params }) {
  const id = (await params).id;

  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("is_visible", true)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return {};
  }

  return (
    <div className="flex min-h-screen flex-col">
      <GameHeader project={project} />
      <GameClient gameId={id}>{children}</GameClient>
    </div>
  );
}
