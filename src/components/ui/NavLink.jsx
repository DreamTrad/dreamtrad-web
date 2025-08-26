
export default function NavLink({ href, children, hoverType = "secondary", fullWidth = false, className = "" }) {
  const hoverClass = {
    primary: "hover:bg-hover",
    secondary: "hover:bg-hover-secondary",
    tertiary: "hover:bg-hover-tertiary"
  }[hoverType];

  return (
    <a
      href={href}
      className={`transition ${hoverClass} ${fullWidth ? "block w-full px-4 py-2 rounded-md" : "inline-block px-4 py-2 rounded-md"} ${className}`}
    >
      {children}
    </a>
  );
}