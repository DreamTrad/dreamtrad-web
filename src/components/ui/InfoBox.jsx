export default function InfoBox({
  title,
  icon = "ℹ",
  children,
  className = "",
}) {
  return (
    <div className={`mx-auto mt-6 mb-4 max-w-5xl px-4 ${className}`}>
      <div className="border-bg-tertiary bg-bg-secondary rounded-xl border shadow-lg">
        {(title || icon) && (
          <div className="border-bg-tertiary flex items-center gap-3 border-b px-6 py-4">
            <span className="text-accent text-xl">{icon}</span>
            {title && (
              <h1 className="text-text text-lg font-semibold">{title}</h1>
            )}
          </div>
        )}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
