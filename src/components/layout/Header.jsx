import { useState } from "react";
import headerImage from "../../assets/dreamtrad-header.jpg";
import NavLink from "../ui/NavLink";
import { games } from "../../data/jeu";

const mainMenu = [
  { name: "Accueil", to: "/" },
  { name: "Jeux", to: "/jeux", subMenu: games },
  { name: "Recrutement", to: "/recrutement" },
  { name: "Articles", to: "/articles" },
  { name: "Découvrir", to: "/decouvrir" },
  { name: "Équipe", to: "/equipe" },
  { name: "Contact", to: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-bg-secondary text-text-secondary">
      {/* Image */}
      <div className="w-full h-64 overflow-hidden">
        <img
          src={headerImage}
          alt="Header image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation */}
      <nav className="mx-6 relative">
        {/* Desktop nav */}
        <ul className="hidden md:flex justify-between max-w-6xl mx-auto">
          {mainMenu.map((item) => (
            <li key={item.name} className={item.subMenu ? "relative group" : ""}>
              <NavLink to={item.to}>{item.name}</NavLink>

              {item.subMenu && (
                <ul className="absolute left-0 top-full w-fit z-50 bg-bg-tertiary rounded-md shadow-lg invisible group-hover:visible">
                  {item.subMenu.map((sub) => (
                    <li key={sub.id}>
                      <NavLink
                        to={`/jeu/${sub.id}`}
                        hoverType="tertiary"
                        fullWidth
                      >
                        {sub.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Burger button (mobile only) */}
        {/* Bouton burger */}
<button
  onClick={() => setOpen(!open)}
  className="md:hidden p-2 text-text-secondary"
>
  ☰
</button>

{/* Menu mobile */}
{open && (
  <ul className="absolute top-0 left-0 w-full bg-bg-tertiary shadow-lg z-50 flex flex-col">
    {mainMenu.map((item) => (
      <li key={item.name}>
        <NavLink to={item.to} onClick={() => setOpen(false)} fullWidth>
          {item.name}
        </NavLink>
      </li>
    ))}
  </ul>
)}

      </nav>
    </header>
  );
}
