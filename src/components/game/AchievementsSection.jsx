import { useState } from "react";
import AchievementCard from "./AchievementCard";

const getImageById = (gameId, AchievementId) =>
  `/assets/jeu/${gameId}/guide/achievements/${AchievementId}.webp`;

export default function AchievementsSection({ sectionData, gameId }) {
  const [revealAll, setRevealAll] = useState(false);

  const handleRevealAll = () => setRevealAll(true);

  return (
    <div className="flex flex-col gap-4">
      {!revealAll && (
        <button
          className="self-start rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
