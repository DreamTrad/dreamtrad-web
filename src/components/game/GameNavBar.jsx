import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function GameNavbar() {
  const { id } = useParams();

  const linkClass = ({ isActive }) =>
              `px-4 py-2 rounded-md inline-block ${
                isActive ? "bg-hover" : ""
              }`;

  return (
    <nav className="bg-accent text-light">
      <ul className="flex justify-center max-w-6xl mx-auto">
        <li><NavLink to={`/jeu/${id}`} end className={linkClass}>Le Jeu</NavLink></li>
        <li><NavLink to={`/jeu/${id}/guide`} className={linkClass}>Guide</NavLink></li>
        <li><NavLink to={`/jeu/${id}/jeu-fr`} className={linkClass}>Patch FR</NavLink></li>
      </ul>
    </nav>
  );
}
