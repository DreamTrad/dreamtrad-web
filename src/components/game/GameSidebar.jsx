import { NavLink, useParams, useLocation } from "react-router-dom";
import { games } from "../../data/jeu";

export default function GameSidebar() {
  const { id } = useParams();
  const location = useLocation();
  const game = games.find(g => g.id === id);

  if (!game) return null;

  let categoryKey = location.pathname.split("/")[3] || "overview";
  let category = game.categories[categoryKey];

  if (!category) {
    categoryKey = "overview";
    category = game.categories[categoryKey];
  }

  const sections = category?.sections || [];

  return (
    <ul className="space-y-2">
      {sections.map((item, idx) => {
        const to = `/jeu/${id}/${categoryKey}/${item.id}`;
        return (
          <li key={idx}>
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition ${
                  isActive ? "bg-hover text-white" : "hover:bg-hover/70"
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}