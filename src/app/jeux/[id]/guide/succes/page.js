// app/jeux/[id]/guide/succes/page.js
import { games } from "@/data/jeux";
import SuccesClient from "./SuccesClient";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return games
    .filter(
      (g) =>
        g.categories?.guide?.sections?.some(
          (s) => s.id === "succes"
        )
    )
    .map((g) => ({
      id: g.id,
    }));
}

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const game = games.find((g) => g.id === id);
  if (!game) return {};

  const section = game.categories?.guide?.sections?.find(
    (s) => s.id === "succes"
  );
  if (!section) return {};

  const title = `Succès | ${game.name}`;
  const description = `Consultez la liste complète des succès pour ${game.name}.`;
  const image = `/jeux/${id}/cover.webp`; // conserve l'image actuelle

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
          alt: game.name,
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
  const game = games.find((g) => g.id === id);
  if (!game) return <div>Jeu introuvable</div>;

  const section = game.categories.guide.sections.find((s) => s.id === "succes");
  if (!section) return <div>Section Succès introuvable</div>;

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-text mb-10 text-4xl font-extrabold tracking-tight">Les succès de {game.name}</h1>
      <SuccesClient sectionData={section.data} gameId={id} />
    </div>
  );
}
