import headerImage from "../../assets/dreamtrad-header.jpg";
import NavLink from "../ui/NavLink";
import { games } from "../../data/jeu"

const mainMenu = [
  { name: "Accueil", to: "/" },
  { name: "Jeux", to: "/", subMenu: games },
  { name: "Articles", to: "/" },
  { name: "Équipe", to: "/" },
  { name: "Contact", to: "/" },
];


export default function Header() {
  return (
    <header className="bg-bg-secondary text-text-secondary">
      <div className="w-full h-64 overflow-hidden">
        <img src={headerImage} alt="Header image" className="w-full h-full object-cover"/>
      </div>

      <nav className="mx-6">
        <ul className="flex justify-between max-w-6xl mx-auto">

          {mainMenu.map(item => (
            <li key={item.name} className={item.subMenu ? "relative group" : ""}>
              <NavLink to={item.to}>{item.name}</NavLink>

              {item.subMenu && (
                <ul className="absolute left-0 top-full w-fit bg-bg-tertiary rounded-md shadow-lg invisible group-hover:visible">
                  {item.subMenu.map(sub => (
                    <li key={sub.id}>
                      <NavLink to={`/jeu/${sub.id}`} hoverType="tertiary" fullWidth>
                        {sub.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}