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
    <header className="bg-bg-secondary text-text-secondary relative flex h-16 items-center">
      <nav className="relative flex h-full w-full items-center justify-center">
        {/* Logo + titre à gauche */}
        <Link to="/" className="absolute left-4 flex h-full items-center gap-2">
          <img
            src="/assets/dreamtrad-logo.png"
            alt="Logo DreamTrad"
            className="h-10 w-10 object-contain"
          />
          <span className="text-accent text-xl font-bold">DreamTrad</span>
        </Link>

        {/* Menu desktop centré */}
        <ul className="menu:flex mx-auto hidden h-full max-w-6xl items-center justify-center gap-6">
          {mainMenu.map((item) => (
            <li key={item.name}>
              <NavLink to={item.to}>{item.name}</NavLink>
            </li>
          ))}
        </ul>

        {/* Burger menu */}
        <button
          onClick={() => setOpen(!open)}
          className="menu:hidden hover:bg-hover-secondary absolute right-4 rounded-md px-4 py-2 text-2xl transition"
        >
          ☰
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <ul className="bg-bg-tertiary absolute top-full left-0 z-50 flex w-full flex-col shadow-lg">
          {mainMenu.map((item) => (
            <li key={item.name}>
              <NavLink to={item.to} onClick={() => setOpen(false)} fullWidth>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
