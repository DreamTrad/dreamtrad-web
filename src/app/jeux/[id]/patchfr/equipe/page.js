import { games } from "@/data/jeux";
import { notFound } from "next/navigation";
import TeamRoleCategory from "./TeamRoleCategory";

export const dynamic = "force-static";


export async function generateMetadata({ params }) {
  const id = (await params).id;
  const image = `/jeux/${id}/cover.webp`;

  const game = games.find((g) => g.id === id);
  if (!game) return {};

  return {
    title: `Équipe patchfr – ${game.name}`,
    description: `Découvrez l’équipe ayant travaillé sur la traduction française de ${game.name}.`,
    openGraph: {
      title: `Équipe patchfr – ${game.name}`,
      description: `Équipe de traduction française du Visual Novel ${game.name}.`,
      url: `/jeux/${id}/patchfr/equipe`,
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

export default async function TeamRoleSection({ params }) {
  const id = (await params).id;

  const game = games.find((g) => g.id === id);
  if (!game) notFound();

  const section = game.categories.patchfr.sections.find(
    (s) => s.id === "equipe",
  );
  if (!section) notFound();

  return (
    <>
    <div className="mx-auto max-w-7xl space-y-12 px-4 pb-20">
              <div className="bg-bg-secondary/60 rounded-2xl p-6 shadow-sm backdrop-blur-sm md:p-8">
      <h1 className="text-text mb-14 text-center text-4xl font-bold">
        L’équipe ayant travaillé sur le patch
      </h1>
      <p className="text-justify">
        Si une information est incorrecte, ou manquante, ou que vous souhaitez
        transmettre un lien vers un réseau social ou site internet en lien avec vous
        qui sera affiché à côté de votre pseudo, n’hésitez pas à nous contacter
        !
      </p>
            </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {section.data .filter((cat) => cat.people && cat.people.length > 0) .map((cat, idx) => ( <TeamRoleCategory key={idx} category={cat} /> ))}
      </div>
      </div>
    </>
  );
}
