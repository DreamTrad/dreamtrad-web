
export default function GameHeader({ title, sheet_table, drive }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-accent text-2xl font-bold">{title}</h1>

      <div className="flex gap-2">
        {sheet_table && (
          <a
            href={sheet_table}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent rounded px-3 py-1 text-white transition hover:bg-accent/80 text-center"
          >
            Table du projet
          </a>
        )}

        {drive && (
          <a
            href={drive}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent rounded px-3 py-1 text-white transition hover:bg-accent/80 text-center"
          >
            Drive du projet
          </a>
        )}
      </div>
    </div>
  );
}