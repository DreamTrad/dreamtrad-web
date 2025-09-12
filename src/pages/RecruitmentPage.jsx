import { useEffect, useState } from "react";
import RecruitmentCard from "../components/card/RecruitmentCard";
import MarkdownSection from "../components/ui/MarkdownSection";

export default function RecruitmentPage() {
  const [recruitmentData, setRecruitmentData] = useState([]);

  useEffect(() => {
    fetch("data/recrutement.json")
      .then(res => res.json())
      .then(data => setRecruitmentData(data))
      .catch(err => console.error("Erreur chargement recrutement :", err));
  }, []);

  const file = "../../data/recrutement-global";

  return (
    <div className="p-8 max-w-9xl mx-auto">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">
        Nos projets en recrutement
      </h2>

      <div className="mt-16 mb-16">
        <MarkdownSection file={file} />
      </div>
<div className="grid gap-8 justify-center
                grid-cols-1          /* mobile par défaut */
                sm:grid-cols-[repeat(auto-fit,minmax(600px,1fr))]">
  {recruitmentData.map((project) => (
    <RecruitmentCard
      key={project.id}
      title={project.title}
      image={project.image}
      roles={project.roles}
      contact={project.contact}
      description={project.description}
    />
  ))}
</div>



    </div>
  );
}
