import { useState } from "react";
import AchievementCard from "./AchievementCard";

const getImageById = (gameId, AchievementId) =>
  `/jeu/${gameId}/guide/achievements/${AchievementId}.webp`;

export default function AchievementsSection({ sectionData, gameId }) {
  const [revealAll, setRevealAll] = useState(false);

  const handleRevealAll = () => setRevealAll(true);

  return (
    <div className="flex flex-col gap-4">
      {!revealAll && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 self-start"
          onClick={handleRevealAll}
        >
          Révéler tous les succès cachés
        </button>
      )}

      <div className="grid gap-4">
        {sectionData?.map((succ) => (
          <AchievementCard
            key={succ.id}
            image={getImageById(gameId, succ.id)}
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
