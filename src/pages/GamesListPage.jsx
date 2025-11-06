import { Link } from "react-router-dom";
import { games } from "../data/jeu";
import MetaTags from "../components/MetaTags";

export default function GamesListPage() {
  return (
    <>
      <MetaTags
        title="Visual Novel"
        description="La liste des Visual Novel traduit ou en cours de traduction par l’équipe. Téléchargez des patchs, consultez des guides ou découvrez simplement les jeux."
        url="jeux"
      />
      <div className="bg-bg-primary text-text-primary min-h-screen p-10">
        <h1 className="mb-8 text-center text-3xl font-bold">Liste des jeux</h1>

        <div className="grid grid-cols-[repeat(auto-fit,350px)] justify-center gap-8">
          {games.map((game) => (
            <Link
              key={game.id}
              to={`/jeu/${game.id}`}
              className="group bg-bg-secondary block overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-xl"
            >
              {/* Game image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={`assets/jeu/${game.id}/cover.webp`}
                  alt={game.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Game title */}
              <div className="p-4 text-center">
                <h2 className="text-text-primary group-hover:text-accent text-lg font-semibold transition-colors">
                  {game.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
