import { NavLink, useParams, useLocation } from "react-router-dom";

export default function GameSidebar() {
  const { id } = useParams();
  const location = useLocation();

  // Déterminer la catégorie active à partir de l'URL
  const category = location.pathname.split("/")[3] || "overview";

  // Sous-menus selon la catégorie
  const subMenus = {
    overview: [
      { name: "Intro", path: `/jeu/${id}` },
    ],
    "patch-fr": [
      { name: "Installation", path: `/jeu/${id}/jeu-fr` },
      { name: "Notes de version", path: `/jeu/${id}/jeu-fr/notes` },
    ],
    guide: [
      { name: "Introduction", path: `/jeu/${id}/guide/intro` },
      { name: "Astuces", path: `/jeu/${id}/guide/tips` },
      { name: "FAQ", path: `/jeu/${id}/guide/faq` },
    ],
  };

  const currentMenu = subMenus[category] || [];

  return (
    <ul className="space-y-2">
      {currentMenu.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition ${
                isActive ? "bg-hover text-white" : "hover:bg-hover/70"
              }`
            }
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
