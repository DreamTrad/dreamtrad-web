import { useEffect, useState } from "react";
import TeamMemberCard from "../components/card/TeamMemberCard";
import MarkdownSection from "../components/ui/MarkdownSection";
import useFetchWithLoader from "../hooks/useFetchWithLoader";

export default function TeamPage() {
  const [team, setTeam] = useState([]);
  const file = "../../data/equipe-global";

  useEffect(() => {
    fetch("/data/team.json")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((err) => console.error("Erreur chargement équipe :", err));
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-accent mb-8 text-center">
        Notre Équipe
      </h1>
      <div className="mt-16 mb-16">
        <MarkdownSection file={file} />
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-1">
        {team.map((member) => (
          <TeamMemberCard key={member.id} {...member} />
        ))}
      </div>
    </div>
  );
}
