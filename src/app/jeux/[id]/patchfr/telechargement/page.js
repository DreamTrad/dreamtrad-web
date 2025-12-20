import fs from "fs";
import path from "path";

import { games } from "@/data/jeux";
import DownloadSectionClient from "./DownloadClient";
import ImageCarousel from "./ImageCarousel";
import MarkdownSection from "@/components/ui/MarkdownSection";
import ProjectProgressCard from "@/components/ProjectProgressCard";

export const dynamic = "force-static";

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const game = games.find((g) => g.id === id);
  if (!game) return {};

  const image = `/jeux/${id}/cover.webp`;

  return {
    title: `Téléchargement patch – ${game.name}`,
    description: `Télécharger les différents patchs de ${game.name}`,
    openGraph: {
      title: `Téléchargement patch – ${game.name}`,
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

  const projectsPath = path.join(process.cwd(), "src/data/json/progress.json");
  const projects = JSON.parse(fs.readFileSync(projectsPath, "utf8"));
  const project = projects.find((p) => p.id === id);

  const game = games.find((g) => g.id === id);
  if (!game) return <div>Jeu introuvable</div>;

  const section = game.categories.patchfr?.sections?.find(
    (s) => s.id === "telechargement",
  );
  if (!section) return <div>Section Téléchargement introuvable</div>;

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
    <div className="space-y-16">
      <MarkdownSection content={content} />
      {project && (
        <div className="flex justify-center">
          <ProjectProgressCard
            key={project.id}
            id={project.id}
            title={project.title}
            image={project.image}
            progress={project.progress}
          />
        </div>
      )}
      {images.length > 0 && <ImageCarousel images={images} interval={15000} />}
      <DownloadSectionClient gameId={id} platforms={section.platforms} />
    </div>
  );
}
