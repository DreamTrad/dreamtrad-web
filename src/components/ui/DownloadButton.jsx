export default function DownloadButton({
  href,
  children = "Télécharger",
  fullWidth = false,
  newTab = true,
  className = "",
}) {
  const targetProps = newTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      {...targetProps}
      className={`focus:ring-offset-bg-secondary focus:ring-accent bg-accent hover:bg-hover-secondary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium text-white transition focus:ring-2 focus:ring-offset-2 focus:outline-none active:scale-[0.99] ${fullWidth ? "w-full max-w-md" : "w-64"} ${className}`}
    >
      {/* Download icon */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v12" />
        <path d="m7 11 5 5 5-5" />
        <path d="M21 21H3" />
      </svg>
      <span className="text-lg">{children}</span>
    </a>
  );
}
