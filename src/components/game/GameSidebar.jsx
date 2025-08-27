import { NavLink } from "react-router-dom";

export default function GameSidebar() {
  return (
    <ul className="space-y-2">
      <li>
        <NavLink to="." end className="block px-4 py-2 rounded-md hover:bg-hover">
          Introduction
        </NavLink>
      </li>
      <li>
        <NavLink to="patch-fr" className="block px-4 py-2 rounded-md hover:bg-hover">
          Installation Patch
        </NavLink>
      </li>
      <li>
        <NavLink to="guide" className="block px-4 py-2 rounded-md hover:bg-hover">
          Guide
        </NavLink>
      </li>
    </ul>
  );
}
