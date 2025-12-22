// app/jeux/page.js
import Link from "next/link";
import { games } from "@/data/jeux";

export const dynamic = "force-static";

export const metadata = {
  title: "Liste des jeux",
  description:
    "Liste des Visual Novel traduits ou en cours de traduction par l’équipe. Téléchargez des patchs, consultez des guides ou découvrez simplement les jeux.",
  openGraph: {
    title: "Liste des jeux",
    description:
      "Liste des Visual Novel traduits ou en cours de traduction par l’équipe.",
    url: "/jeux",
    images: [
      {
        url: "/dreamtrad-logo-title.webp",
        width: 1200,
        height: 630,
        alt: "DreamTrad",
      },
    ],
  },
};

export default function GamesListPage() {
  return (
      <div className="bg-bg-primary text-text-primary min-h-screen p-10">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Liste des Visual Novel de l’équipe
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,350px)] justify-center gap-8">
          {games.map((game) => (
            <Link
              key={game.id}
              href={`/jeux/${game.id}`}
              className="group bg-bg-secondary block overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={`/jeux/${game.id}/cover.webp`}
                  alt={game.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4 text-center">
                <h2 className="text-text-primary group-hover:text-accent text-lg font-semibold transition-colors">
                  {game.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
  );
}
