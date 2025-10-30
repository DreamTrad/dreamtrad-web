import { useState } from "react";
import { Link } from "react-router-dom";
import NavLink from "../ui/NavLink";

const mainMenu = [
  { name: "Accueil", to: "/" },
  { name: "Jeux", to: "/jeux" },
  { name: "Recrutement", to: "/recrutement" },
  { name: "Articles", to: "/articles" },
  { name: "Découvrir", to: "/decouvrir" },
  { name: "Équipe", to: "/equipe" },
  { name: "Contact", to: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-bg-secondary text-text-secondary relative h-16 flex items-center">
      <nav className="flex items-center justify-center w-full relative h-full">

        {/* Logo + titre à gauche */}
        <Link
          to="/"
          className="absolute left-4 flex items-center gap-2 h-full"
        >
          <img
            src="/assets/dreamtrad-logo.png"
            alt="Logo DreamTrad"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold text-accent">DreamTrad</span>
        </Link>

        {/* Menu desktop centré */}
        <ul className="hidden menu:flex gap-6 justify-center max-w-6xl mx-auto h-full items-center">
          {mainMenu.map((item) => (
            <li key={item.name}>
              <NavLink to={item.to}>{item.name}</NavLink>
            </li>
          ))}
        </ul>

        {/* Burger menu */}
        <button
          onClick={() => setOpen(!open)}
          className="absolute right-4 menu:hidden px-4 py-2 text-2xl rounded-md transition hover:bg-hover-secondary"
        >
          ☰
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <ul className="absolute top-full left-0 w-full bg-bg-tertiary shadow-lg z-50 flex flex-col">
          {mainMenu.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.to}
                onClick={() => setOpen(false)}
                fullWidth
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
