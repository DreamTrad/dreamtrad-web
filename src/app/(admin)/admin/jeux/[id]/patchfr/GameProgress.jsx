import ProjectProgressCard from "@/components/ProjectProgressCard";

export default function GameProgress({ game }) {
  if (!game.progress) return null;

  return (
    <ProjectProgressCard
      id={game.id}
      title={game.title}
      progress={game.progress}
    />
  );
}