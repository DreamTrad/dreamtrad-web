import { NavLink, useParams } from "react-router-dom";
import { games } from "../../data/jeu";

export default function GameHeader() {
  const { id } = useParams();
  const game = games.find((g) => g.id === id);
  if (!game) return null;

  const logoPath = new URL(
    `../../assets/logo/logo_${game.id}.webp`,
    import.meta.url,
  ).href;

  const linkClass = ({ isActive }) =>
    `px-4 py-2 text-base font-semibold rounded-xl transition-colors duration-150
     ${isActive ? "bg-accent text-white shadow-md" : "text-text hover:bg-hover hover:text-accent-secondary"}`;

  return (
    <header className="w-full bg-bg-secondary border-b border-bg-tertiary shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        {/* Logo / Nom */}
        <div className="flex w-full justify-center sm:w-auto sm:justify-start">
          <img
            src={logoPath}
            alt={`Logo ${game.name}`}
            className="h-26 object-contain"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.insertAdjacentHTML(
                "afterend",
                `<h2 class='text-3xl font-bold text-text'>${game.name}</h2>`,
              );
            }}
          />
        </div>

        {/* Menu */}
        <nav className="flex flex-wrap justify-center gap-2 sm:justify-end flex-1">
          {Object.entries(game.categories).map(([key, category]) => {
            let to = `/jeu/${id}/${key}`;
            let end = false;

            if (key === "general") {
              const firstSection = category.sections[0];
              to = firstSection
                ? `/jeu/${id}/${key}/${firstSection.id}`
                : `/jeu/${id}/${key}`;
            }

            return (
              <NavLink key={key} to={to} end={end} className={linkClass}>
                {category.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
