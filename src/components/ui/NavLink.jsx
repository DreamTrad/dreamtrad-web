import Link from "next/link";

export default function NavLink({
  to,
  children,
  hoverType = "secondary",
  fullWidth = false,
  className = "",
  onClick,
  ...props
}) {
  const hoverClass = {
    primary: "hover:bg-hover",
    secondary: "hover:bg-hover-secondary",
    tertiary: "hover:bg-hover-tertiary",
  }[hoverType];

  return (
    <Link
      href={to}
      onClick={onClick}
      className={`transition ${hoverClass} ${
        fullWidth
          ? "block w-full rounded-md px-4 py-2"
          : "inline-block rounded-md px-4 py-2"
      } ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
