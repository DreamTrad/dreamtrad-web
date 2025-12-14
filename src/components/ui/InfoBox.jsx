export default function InfoBox({
  title,
  icon = "ℹ",
  children,
}) {
  return (
    <div className="mx-auto mt-12 mb-12 max-w-5xl px-4">
      <div className="rounded-xl border border-bg-tertiary bg-bg-secondary shadow-lg">
        {(title || icon) && (
          <div className="flex items-center gap-3 border-b border-bg-tertiary px-6 py-4">
            <span className="text-accent text-xl">{icon}</span>
            {title && (
              <h2 className="text-text text-lg font-semibold">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
