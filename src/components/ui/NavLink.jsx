import { Link } from "react-router-dom";

export default function NavLink({
  to,
  children,
  hoverType = "secondary",
  fullWidth = false,
  className = "",
  ...props
}) {
  const hoverClass = {
    primary: "hover:bg-hover",
    secondary: "hover:bg-hover-secondary",
    tertiary: "hover:bg-hover-tertiary",
  }[hoverType];

  return (
    <Link
      to={to}
      {...props}
      className={`transition ${hoverClass} ${
        fullWidth
          ? "block w-full rounded-md px-4 py-2"
          : "inline-block rounded-md px-4 py-2"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
