import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavLink from "../ui/NavLink";

const mainMenu = [
  { name: "Accueil", to: "/" },
  { name: "Visual Novel", to: "/jeux" },
  { name: "Recrutement", to: "/recrutement" },
  { name: "Articles", to: "/articles" },
  { name: "VNDB-FR", to: "/decouvrir" },
  { name: "Équipe", to: "/equipe" },
  { name: "Contact", to: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Auto-close menu when switching to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false); // 768px = md breakpoint par défaut
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="bg-bg-secondary text-text-secondary relative flex h-16 items-center">
      <nav className="relative flex h-full w-full items-center justify-center px-20">
        {/* Logo + Nom site*/}
        <Link to="/" className="absolute left-4 flex h-full items-center gap-2">
          <img
            src="/assets/dreamtrad-logo.png"
            alt="Logo DreamTrad"
            className="h-10 w-10 object-contain"
          />
          <img
            src="/assets/dreamtrad-title.webp"
            alt="DreamTrad"
            className="h-10 object-contain"
          />
        </Link>

        {/* Menu desktop */}
        <ul className="menu:flex mx-auto hidden h-full max-w-6xl items-center justify-center gap-6">
          {mainMenu.map((item) => (
            <li key={item.name}>
              <NavLink to={item.to}>{item.name}</NavLink>
            </li>
          ))}
        </ul>

        {/* Burger */}
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
