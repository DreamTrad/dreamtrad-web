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
      <div className="min-h-screen bg-bg-primary text-text-primary p-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Liste des jeux</h1>

        <div className="grid grid-cols-[repeat(auto-fit,350px)] gap-8 justify-center">
          {games.map((game) => (
            <Link
              key={game.id}
              to={`/jeu/${game.id}`}
              className="group block bg-bg-secondary rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Game image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={`assets/jeu/${game.id}/cover.webp`}
                  alt={game.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Game title */}
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
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
