// app/jeux/[id]/patchfr/installation/page.js
import fs from "fs";
import path from "path";
import PlateformsTabs from "./PlateformsTabs";
import { games } from "@/data/jeux";

export const dynamic = "force-static";


export async function generateMetadata({ params }) {
  const gameId = (await params).id;
  const image = `/jeux/${gameId}/cover.webp`;

  const game = games.find(g => g.id === gameId);
  if (!game) return {};

  return {
    title: `Installation patch fr | ${game.name}`,
    description: `Guide d'installation pour le patch français de ${game.name}.`,
    openGraph: {
      title: `Installation patch fr | ${game.name}`,
      description: `Guide d'installation pour le patch français de ${game.name}.`,
      url: `/jeux/${gameId}/patchfr/installation`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: game.name,
        },
      ],
    }
  };
}

export default async function InstallationPage({ params }) {
  const gameId = (await params).id;
  const game = games.find((g) => g.id === gameId);
  if (!game) return null;

  const section = game.categories.patchfr.sections.find(
    (s) => s.id === "installation",
  );

  if (!section) return null;

  const contents = {};

  for (const platform of section.platforms) {
    try {
      const filePath = path.join(
        process.cwd(),
        "src/data/jeux",
        gameId,
        `${platform.file}.md`,
      );
      contents[platform.id] = fs.readFileSync(filePath, "utf-8");
    } catch {
      contents[platform.id] = "Contenu introuvable.";
    }
  }

  return <PlateformsTabs platforms={section.platforms} contents={contents} />;
}
