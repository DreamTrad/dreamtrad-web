import fs from "fs";
import path from "path";

import DownloadClient from "./DownloadClient";
import ImageCarousel from "./ImageCarousel";
import MarkdownSection from "@/components/ui/MarkdownSection";
import ProjectProgressCard from "@/components/ProjectProgressCard";
import { createClient } from "@/lib/supabase/server";


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
    title: `Téléchargement patch fr | ${project.title}`,
    description: `Télécharger les différents patchs de ${project.title}`,
    openGraph: {
      title: `Téléchargement patch fr | ${project.title}`,
      description: `Télécharger les différents patchs de ${project.title}`,
      url: `/jeux/${id}/patchfr/telechargement`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function DownloadPage({ params }) {
  const id = (await params).id;

  const galleryPath = path.join(
    process.cwd(),
    "public",
    "jeux",
    id,
    "patchfr",
    "gallery",
  );

  const images = [];
  let i = 1;

  while (true) {
    const file = `image${i}.webp`;
    if (!fs.existsSync(path.join(galleryPath, file))) break;
    images.push(`/jeux/${id}/patchfr/gallery/${file}`);
    i++;
  }

  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("id, title, progress, show_progress")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
  }

  const { data: patches, error: patchesError } = await supabase
    .from("patches")
    .select("id, name, link")
    .eq("project_id", id);

  if (patchesError) {
    console.error("Error fetching patches:", patchesError);
  }

  const { data: infopatch, pageError } = await supabase
    .from("pages")
    .select("title, content")
    .eq("project_id", project.id)
    .eq("file", "infopatch")
    .single();

  if (pageError) {
    console.error(pageError);
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 pb-20">
      <div className="bg-bg-secondary/60 rounded-2xl p-6 shadow-sm backdrop-blur-sm md:p-8">
        <MarkdownSection mainTitle={infopatch?.title} content={infopatch?.content || ""} />
      </div>

      {project?.show_progress && (
        <div className="flex justify-center">
          <ProjectProgressCard
            id={project.id}
            title={project.title}
            image={`/poster/${project.id}.webp`}
            progress={project.progress}
          />
        </div>
      )}

      <DownloadClient patches={patches} />

      {images.length > 0 && <ImageCarousel images={images} interval={15000} />}
    </div>
  );
}
