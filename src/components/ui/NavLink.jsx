import { Link } from "react-router-dom";

export default function NavLink({ to, children, hoverType = "secondary", fullWidth = false, className = "" }) {
  const hoverClass = {
    primary: "hover:bg-hover",
    secondary: "hover:bg-hover-secondary",
    tertiary: "hover:bg-hover-tertiary"
  }[hoverType];

  return (
    <Link
      to={to}
      className={`transition ${hoverClass} ${fullWidth ? "block w-full px-4 py-2 rounded-md" : "inline-block px-4 py-2 rounded-md"} ${className}`}
    >
      {children}
    </Link>
  );
}