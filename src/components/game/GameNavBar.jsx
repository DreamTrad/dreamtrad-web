import { NavLink, useParams, useLocation } from "react-router-dom";
import { games } from "../../data/jeu";

export default function GameNavBar() {
  const { id } = useParams();
  const location = useLocation();
  const game = games.find((g) => g.id === id);

  if (!game) return null;

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md inline-block ${isActive ? "bg-hover" : ""}`;

  return (
    <nav className="bg-accent text-light">
      <ul className="mx-auto flex max-w-6xl justify-center">
        {Object.entries(game.categories).map(([key, category]) => {
          let to = `/jeu/${id}/${key}`;
          let end = false;

          // Special case for general: link to first section
          if (key === "general") {
            const firstSection = category.sections[0];
            to = firstSection
              ? `/jeu/${id}/${key}/${firstSection.id}`
              : `/jeu/${id}/${key}`;
            // End=false so the link stays active when navigating subsections
          }

          return (
            <li key={key}>
              <NavLink to={to} end={end} className={linkClass}>
                {category.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
