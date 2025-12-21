// app/jeux/[id]/guide/succes/page.js
import { games } from "@/data/jeux";
import SuccesClient from "./SuccesClient";

export const dynamic = "force-static";

export async function generateMetadata({ params }, parent) {
  const id = (await params).id;
  const game = games.find((g) => g.id === id);
  if (!game) return parent;

  const parentMetadata = await parent;

  const title = `Succès | ${game.name}`;
  const description = `Liste des succès de ${game.name}`;

  return {
    ...parentMetadata,

    title,

    description,

    openGraph: {
      ...parentMetadata.openGraph,
      title,
      description,
      url: `/jeux/${id}/guide/succes`,
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
