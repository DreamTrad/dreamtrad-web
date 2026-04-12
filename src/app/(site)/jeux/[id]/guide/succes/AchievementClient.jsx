"use client";

import { useState } from "react";
import AchievementCard from "./AchievementCard";

const baseImagePath = (gameId) =>
  `/jeux/${gameId}/guide/succes`;

export default function AchievementClient({ achievementData, gameId }) {
  const [revealAll, setRevealAll] = useState(false);
  const imageBase = baseImagePath(gameId);

  return (
    <div className="flex flex-col gap-4">
      {!revealAll && (
        <button
          className="bg-accent text-text mb-4 hover:bg-accent-secondary self-start rounded px-4 py-2"
          onClick={() => setRevealAll(true)}
        >
          Révéler tous les succès cachés
        </button>
      )}

      <div className="grid gap-4">
        {achievementData?.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            image={`${imageBase}/${achievement.id}.webp`}
            titleEn={achievement.title_og}
            titleFr={achievement.title_fr}
            description={achievement.description_fr}
            resolution={achievement.resolution}
            hidden={achievement.hidden && !revealAll}
          />
        ))}
      </div>
    </div>
  );
}
