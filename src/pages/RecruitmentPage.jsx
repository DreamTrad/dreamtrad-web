import { useEffect, useState } from "react";
import MetaTags from "../components/MetaTags";
import RecruitmentCard from "../components/card/RecruitmentCard";
import MarkdownSection from "../components/ui/MarkdownSection";

export default function RecruitmentPage() {
  const [recruitmentProjectData, setRecruitmenProjecttData] = useState([]);
  const [recruitmentWebData, setRecruitmentWebData] = useState([]);

  useEffect(() => {
    fetch("data/recrutement_projet.json")
      .then((res) => res.json())
      .then((data) => setRecruitmenProjecttData(data))
      .catch((err) => console.error("Erreur chargement recrutement :", err));
  }, []);

  useEffect(() => {
    fetch("data/recrutement_siteweb.json")
      .then((res) => res.json())
      .then((data) => setRecruitmentWebData(data))
      .catch((err) => console.error("Erreur chargement recrutement :", err));
  }, []);

  const file = "../../data/recrutement-global";

  return (
    <>
      <MetaTags
        title="Recrutement"
        description="Nous recrutons pour plusieurs projets de traductions. N’hésitez pas à vous manifester. Nous avons aussi besoin d’aide pour améliorer le contenu du site internet."
        url="recrutement"
      />
      <div className="max-w-9xl mx-auto p-8">
        <div className="mt-6">
          <MarkdownSection file={file} />
        </div>
        <h2 className="text-accent mt-16 mb-8 text-center text-3xl font-bold">
          Les projets de traduction en recrutement
        </h2>

        <div className="grid grid-cols-1 justify-center gap-8 sm:[grid-template-columns:repeat(auto-fit,minmax(400px,600px))]">
          {recruitmentProjectData.map((project) => (
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

        <h2 className="text-accent mt-16 mb-8 text-center text-3xl font-bold">
          Les tâches pour le site internet
        </h2>

        <div className="grid grid-cols-1 justify-center gap-8 sm:[grid-template-columns:repeat(auto-fit,minmax(400px,600px))]">
          {recruitmentWebData.map((project) => (
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
    </>
  );
}
