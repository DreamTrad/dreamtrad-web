"use client";

import { useState } from "react";
import AchievementCard from "./AchievementCard";

const baseImagePath = (gameId) =>
  `/jeux/${gameId}/guide/succes`;

export default function SuccesClient({ sectionData, gameId }) {
  const [revealAll, setRevealAll] = useState(false);
  const imageBase = baseImagePath(gameId);

  return (
    <div className="flex flex-col gap-4">
      {!revealAll && (
        <button
          className="bg-accent text-text-secondary hover:bg-accent-secondary self-start rounded px-4 py-2"
          onClick={() => setRevealAll(true)}
        >
          Révéler tous les succès cachés
        </button>
      )}

      <div className="grid gap-4">
        {sectionData?.map((succ) => (
          <AchievementCard
            key={succ.id}
            image={`${imageBase}/${succ.id}.webp`}
            titleEn={succ.titleEn}
            titleFr={succ.titleFr}
            description={succ.descriptionFr}
            resolution={succ.resolution}
            hidden={succ.hidden && !revealAll}
          />
        ))}
      </div>
    </div>
  );
}
