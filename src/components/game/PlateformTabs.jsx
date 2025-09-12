import { useState } from "react";
import MarkdownSection from "../ui/MarkdownSection";

export default function PlateformsTabs({ gameId, platforms }) {
  const [active, setActive] = useState(platforms[0].id);

  const activePlatform = platforms.find(p => p.id === active);

  return (
    <div>
      {/* Tabs header */}
      <div className="flex space-x-2 border-b border-bg-secondary mb-4">
        {platforms.map(p => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`px-4 py-2 rounded-t-md transition ${
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
