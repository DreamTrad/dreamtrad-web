import { useState } from "react";
import MarkdownSection from "../ui/MarkdownSection";

export default function PlateformsTabs({ gameId, platforms }) {
  const [active, setActive] = useState(platforms[0].id);

  const activePlatform = platforms.find((p) => p.id === active);

  return (
    <div>
      {/* Tabs header */}
      <div className="border-bg-secondary mb-4 flex space-x-2 border-b">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`rounded-t-md px-4 py-2 transition ${
              active === p.id
                ? "bg-bg-tertiary text-accent"
                : "bg-bg-secondary text-text-secondary hover:bg-hover-secondary"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Active content */}
      {activePlatform && (
        <MarkdownSection gameId={gameId} file={activePlatform.file} />
      )}
    </div>
  );
}
