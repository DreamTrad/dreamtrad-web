import fs from "fs";
import path from "path";

import { games } from "@/data/jeux";
import DownloadClient from "./DownloadClient";
import ImageCarousel from "./ImageCarousel";
import MarkdownSection from "@/components/ui/MarkdownSection";
import ProjectProgressCard from "@/components/ProjectProgressCard";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60 * 60 * 24;

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const game = games.find((g) => g.id === id);
  if (!game) return {};

  const image = `/jeux/${id}/cover.webp`;

  return {
    title: `Téléchargement patch fr | ${game.name}`,
    description: `Télécharger les différents patchs de ${game.name}`,
    openGraph: {
      title: `Téléchargement patch fr | ${game.name}`,
      description: `Télécharger les différents patchs de ${game.name}`,
      url: `/jeux/${id}/patchfr/telechargement`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: game.name,
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

  let content = "Informations indisponibles.";

  try {
    const markdownPath = path.join(
      process.cwd(),
      "src/data/jeux",
      id,
      "patchfr",
      "informations.md",
    );
    content = fs.readFileSync(markdownPath, "utf8");
  } catch {}

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 pb-20">
      <div className="bg-bg-secondary/60 rounded-2xl p-6 shadow-sm backdrop-blur-sm md:p-8">
        <MarkdownSection content={content} />
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
