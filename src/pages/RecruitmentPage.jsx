import recruitmentData from "../data/projet/recrutement.json";
import RecruitmentCard from "../components/game/RecruitmentCard";
import MarkdownSection from "../components/game/MarkdownSection";

export default function RecruitmentPage() {

  const file = "../../data/projet/recrutement-global";

  return (
    <div className="p-8 max-w-9xl mx-auto">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">
        Nos projets en recrutement
      </h2>

      <div className="mt-16 mb-16">
          <MarkdownSection file={file} />
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
