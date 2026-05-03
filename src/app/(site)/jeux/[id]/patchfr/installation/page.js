// app/(site)/jeux/[id]/patchfr/installation/page.js

import PlateformsTabs from "./PlateformsTabs";
import { createStaticClient } from "@/lib/supabase/public";
import { getImageUrl } from "@/lib/supabase/storage";

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const image = getImageUrl(`/jeux/${id}/cover.webp`);

  const supabase = createStaticClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("title")
    .eq("id", id)
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return {};
  }

  return {
    title: `Installation patch fr | ${project.title}`,
    description: `Guide d'installation pour le patch français de ${project.title}.`,
    openGraph: {
      title: `Installation patch fr | ${project.title}`,
      description: `Guide d'installation pour le patch français de ${project.title}.`,
      url: `/jeux/${id}/patchfr/installation`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    }
  };
}

export default async function InstallationPage({ params }) {
  const id = (await params).id;

  const supabase = createStaticClient();

  const { data: pagesInstallation, error } = await supabase
    .from("pages")
    .select("file, title, content")
    .eq("type", "installation")
    .eq("project_id", id)
    .eq("is_visible", true)
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching project:", error);
  }

  return <PlateformsTabs pagesInstallation={pagesInstallation} />;
}
