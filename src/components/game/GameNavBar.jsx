import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function GameNavbar() {
  const { id } = useParams();

  return (
    <nav className="bg-accent text-light">
      <ul className="flex justify-center max-w-6xl mx-auto">
        <li><NavLink to={`/jeu/${id}`} end className={({ isActive }) =>
              `px-4 py-2 rounded-md ${isActive ? "bg-hover" : ""}`
            }>Le Jeu</NavLink></li>
        <li><NavLink to={`/jeu/${id}/game-fr`} className={({ isActive }) =>
              `px-4 py-2 rounded-md ${isActive ? "bg-hover" : ""}`
            }>Patch FR</NavLink></li>
        <li><NavLink to={`/jeu/${id}/guide`} className={({ isActive }) =>
              `px-4 py-2 rounded-md ${isActive ? "bg-hover" : ""}`
            }>Guide</NavLink></li>
      </ul>
    </nav>
  );
}
