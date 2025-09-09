import { useEffect, useState } from "react";
import RecruitmentCard from "../components/game/DiscoverCard";
import MarkdownSection from "../components/game/MarkdownSection";

export default function DiscoverPage() {
  const [recruitmentData, setRecruitmentData] = useState([]);

  useEffect(() => {
    fetch("/decouvrir.json")
      .then(res => res.json())
      .then(data => setRecruitmentData(data))
      .catch(err => console.error("Erreur chargement decouvrir :", err));
  }, []);

  const file = "../../data/decouvrir-global";

  return (
    <div className="p-8 max-w-9xl mx-auto">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">
        Découvrez des Visual Novel disponible en français
      </h2>

      <div className="mt-16 mb-16">
          <MarkdownSection file={file} />
      </div>
      <div className="grid gap-8 grid-cols-[repeat(auto-fit,600px)] justify-center">
        {recruitmentData.map((project) => (
          <RecruitmentCard
            key={project.id}
            titre={project.titre}
            image={project.image}
            genre={project.genre}
            duree={project.duree}
            plateforme={project.plateforme}
            lien_jeu={project.lien_jeu}
            patch_fr={project.patch_fr}
            description={project.description}
          />
        ))}
      </div>
    </div>
  );
}
