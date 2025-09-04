import SuccessCard from "./SuccessCard";


const getImageById = (gameId, successId) =>
    `/jeu/${gameId}/achievements/${successId}.webp`;


export default function AchievementsSection({ sectionData, gameId }) {
  return (
    <div className="grid gap-4">
      {sectionData?.map((succ) => (
        <SuccessCard
          key={succ.id}
          image={getImageById(gameId, succ.id)}
          titleEn={succ.titleEn}
          titleFr={succ.titleFr}
          description={succ.descriptionEn}
          resolution={succ.resolution}
          hidden={succ.hidden}
        />
      ))}
    </div>
  );
}