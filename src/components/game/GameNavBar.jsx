import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { games } from "../../data/jeu"; // ou via import.meta.glob

export default function GameNavBar() {
  const { id } = useParams();
  const game = games.find(g => g.id === id);

  if (!game) return null; // pas de jeu trouvé

  // Liste des catégories, optionnelles selon le jeu
  const categories = [
    { name: "Le Jeu", path: `/jeu/${id}`, show: true },
    { name: "Guide", path: `/jeu/${id}/guide`, show: game.hasGuide },
    { name: "Patch FR", path: `/jeu/${id}/patch-fr`, show: game.hasPatchFR },
    { name: "Articles", path: `/jeu/${id}/articles`, show: game.hasArticles },
  ].filter(cat => cat.show);

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md inline-block ${
      isActive ? "bg-hover" : ""
    }`;

  return (
    <nav className="bg-accent text-light">
      <ul className="flex justify-center max-w-6xl mx-auto gap-4">
        {categories.map(cat => (
          <li key={cat.name}>
            <NavLink to={cat.path} className={linkClass}>
              {cat.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
