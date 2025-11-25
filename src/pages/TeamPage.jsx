import { useEffect, useState } from "react";
import MetaTags from "../components/MetaTags";
import TeamMemberCard from "../components/card/TeamMemberCard";
import MarkdownSection from "../components/ui/MarkdownSection";

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
    <div className="pb-16">
      <MetaTags
        title="Équipe"
        description="Les personnes qui ont beaucoup apportés aux projets et à l’équipe au fil des années."
        url="equipe"
      />
      <div className="mx-auto max-w-6xl p-8">
        <h1 className="text-accent mb-8 text-center text-3xl font-bold">
          Notre Équipe
        </h1>
        <div className="mt-16 mb-16">
          <MarkdownSection
            file={file}
            className="text-justify leading-relaxed"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-8 sm:[grid-template-columns:repeat(auto-fit,minmax(480px,1fr))]">
        {team.map((member) => (
          <TeamMemberCard key={member.id} {...member} />
        ))}
      </div>
    </div>
  );
}
