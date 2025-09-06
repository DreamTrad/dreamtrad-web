import { NavLink, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { games } from "../../data/jeu";

export default function GameSidebar() {
  const { id } = useParams();
  const location = useLocation();
  const game = games.find((g) => g.id === id);

  if (!game) return null;

  let categoryKey = location.pathname.split("/")[3] || "general";
  let category = game.categories[categoryKey];

  if (!category) {
    categoryKey = "general";
    category = game.categories[categoryKey];
  }

  const sections = category?.sections || [];

  return (
    <ul className="space-y-2">
      {sections.map((item, idx) => {
        const to = `/jeu/${id}/${categoryKey}/${item.id}`;

        // --- si la section a des enfants ---
        if (item.children && item.children.length > 0) {
          return <CollapsibleSection key={idx} item={item} baseTo={to} />;
        }

        // --- section normale ---
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

// --- composant pour gérer une section avec enfants ---
function CollapsibleSection({ item, baseTo }) {
  const [open, setOpen] = useState(false);

  return (
    <li>
      {/* bouton pour expand/collapse */}
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full px-4 py-2 rounded-md hover:bg-hover/70"
      >
        <span>{item.name}</span>
        <span className="text-sm">{open ? "▾" : "▸"}</span>
      </button>

      {/* enfants affichés uniquement si open */}
      {open && (
        <ul className="ml-4 mt-1 space-y-1">
          {item.children.map((child, idx) => (
            <li key={idx}>
              <NavLink
                to={`${baseTo}/${child.id}`}
                end
                className={({ isActive }) =>
                  `block px-3 py-1 rounded-md text-sm transition ${
                    isActive ? "bg-hover text-white" : "hover:bg-hover/50"
                  }`
                }
              >
                {child.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
