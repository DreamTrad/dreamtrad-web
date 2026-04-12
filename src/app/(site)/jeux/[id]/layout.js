// app/(site)/jeux/[id]/layout.js

import GameHeader from "./GameHeader";
import GameClient from "./GameClient";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600; // 1 heure

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

  // Patch check
  const { data: patchData } = await supabase
    .from("patches")
    .select("project_id")
    .eq("project_id", id)
    .limit(1)
    .single();

  // Staff check
  const { data: staffData } = await supabase
    .from("staff_projects")
    .select(
      `
      staffs (
        is_visible
      )
    `,
    )
    .eq("project_id", id)
    .limit(1);

  const hasStaff = staffData?.some((item) => item.staffs?.is_visible);

  const { data: pagesInstallation } = await supabase
    .from("pages")
    .select("file, title, content")
    .eq("type", "installation")
    .eq("project_id", id)
    .eq("is_visible", true)
    .limit(1)
    .single()

  const { data: achievementData } = await supabase
    .from("achievements")
    .select("id")
    .eq("project_id", id)
    .not("description_fr", "is", null)
    .neq("description_fr", "")
    .limit(1)
    .single();

  const { data: pageGuideData } = await supabase
    .from("pages")
    .select("slug, file, title, alias")
    .eq("project_id", id)
    .eq("type", "guide")
    .eq("is_visible", true)
    .order("position", { ascending: true });

  const hasGuide = !!pageGuideData?.length || !!achievementData;


  return (
    <div className="flex min-h-screen flex-col">
      <GameHeader id={project.id} title={project.title} hasGuide={hasGuide} />
      <GameClient
        gameId={id}
        hasPatch={!!patchData}
        hasStaff={!!hasStaff}
        pageGuideData={pageGuideData}
        hasInstallation={!!pagesInstallation}
        hasAchievements={!!achievementData}
      >
        {children}
      </GameClient>
    </div>
  );
}
