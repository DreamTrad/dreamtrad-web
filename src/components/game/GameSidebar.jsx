import { NavLink, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { games } from "../../data/jeu";

export default function GameSidebar({ onLinkClick }) {
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

        if (item.children && item.children.length > 0) {
          return (
            <CollapsibleSection
              key={idx}
              item={item}
              baseTo={to}
              onLinkClick={onLinkClick}
            />
          );
        }

        return (
          <li key={idx}>
            <NavLink
              to={to}
              end
              onClick={(e) => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                if (onLinkClick) onLinkClick(e);
              }}
              className={({ isActive }) =>
                `block rounded-md px-4 py-2 transition ${
                  isActive ? "bg-hover text-text" : "hover:bg-hover-secondary"
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

function CollapsibleSection({ item, baseTo, onLinkClick }) {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className="hover:bg-hover-secondary flex w-full items-center justify-between rounded-md px-4 py-2"
      >
        <span>{item.name}</span>
        <span className="text-sm">{open ? "▾" : "▸"}</span>
      </button>

      {open && (
        <ul className="mt-1 ml-4 space-y-1">
          {item.children.map((child, idx) => (
            <li key={idx}>
              <NavLink
                to={`${baseTo}/${child.id}`}
                end
                onClick={(e) => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  if (onLinkClick) onLinkClick(e);
                }}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-1 text-sm transition ${
                    isActive ? "bg-hover text-text" : "hover:bg-hover-tertiary"
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
