import { NavLink, useParams } from "react-router-dom";
import { games } from "../../data/jeu";

export default function GameNavBar() {
  const { id } = useParams();
  const game = games.find(g => g.id === id);

  if (!game) return null;

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md inline-block ${isActive ? "bg-hover" : ""}`;

  return (
    <nav className="bg-accent text-light">
      <ul className="flex justify-center max-w-6xl mx-auto">
        {Object.entries(game.categories).map(([key, category]) => (
          <li key={key}>
            <NavLink
              to={key === "overview" ? `/jeu/${id}` : `/jeu/${id}/${key}`}
              end={key === "overview"}
              className={linkClass}
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
