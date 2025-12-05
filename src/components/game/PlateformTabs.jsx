import { useState } from "react";
import MarkdownSection from "../ui/MarkdownSection";

export default function PlateformsTabs({ gameId, platforms }) {
  const [active, setActive] = useState(platforms[0].id);
  const activePlatform = platforms.find((p) => p.id === active);

  return (
    <div className="w-full overflow-hidden">
      {/* Tabs header */}
      <div className="flex flex-wrap gap-2 pb-3 w-full">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`
              flex-1 min-w-[110px] px-4 py-2 rounded-md text-sm font-medium text-center
              border transition
              whitespace-normal wrap-break-word
              ${active === p.id
                ? "bg-bg-tertiary text-text border-accent"
                : "bg-bg-secondary text-text-secondary border-bg-tertiary hover:bg-hover-secondary"}
            `}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4">
        {activePlatform && (
          <MarkdownSection gameId={gameId} file={activePlatform.file} />
        )}
      </div>
    </div>
  );
}
