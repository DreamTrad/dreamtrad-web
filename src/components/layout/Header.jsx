import headerImage from "../../assets/dreamtrad-header.jpg";
import NavLink from "../ui/NavLink";

export default function Header() {
  return (
    <header className="bg-bg-secondary text-text-secondary">
      <div className="w-full h-64 overflow-hidden">
        <img
          src={headerImage}
          alt="Header image"
          className="w-full h-full object-cover"
        />
      </div>

      <nav className="mx-6">
        <ul className="flex justify-between max-w-6xl mx-auto">
          <li><NavLink to="/">Accueil</NavLink></li>

          <li className="relative group">
            <NavLink to="/">Jeux</NavLink>
            <ul className="absolute left-0 top-full w-32 bg-bg-tertiary rounded-md shadow-lg invisible group-hover:visible">
              <li><NavLink to="/jeu/1" hoverType="tertiary" fullWidth>Jeu 1</NavLink></li>
              <li><NavLink to="/jeu/2" hoverType="tertiary" fullWidth>Jeu 2</NavLink></li>
              <li><NavLink to="/jeu/3" hoverType="tertiary" fullWidth>Jeu 3</NavLink></li>
            </ul>
          </li>

          <li><NavLink to="/">Articles</NavLink></li>
          <li><NavLink to="/">Équipe</NavLink></li>
          <li><NavLink to="/">Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}