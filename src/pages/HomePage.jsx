import { useEffect, useState } from "react";
import RecentArticles from "../components/RecentArticles";
import DiscordCard from "../components/card/DiscordCard";
import MarkdownSection from "../components/ui/MarkdownSection";
import ProjectProgressCard from "../components/card/ProjectProgressCard";

export default function HomePage() {

  const file_presentation = "../../data/presentation-accueil";
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("data/progress.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) =>
        console.error("Erreur chargement progress.json :", err)
      );
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-white">

      <div className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Colonne principale */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <MarkdownSection file={file_presentation} />

{/* Avancement des projets */}
<h2 className="text-lg font-semibold mb-4 text-center">
  Avancement des projets
</h2>
<div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
  {projects.length > 0 ? (
    projects.map((project) => (
      <ProjectProgressCard
        key={project.id}
        title={project.title}
        image={project.image}
        progress={project.progress}
        recruiting={project.recruiting}
      />
    ))
  ) : (
    <p className="text-center text-text-secondary">
      Aucun projet chargé
    </p>
  )}
</div>


          <section className="border p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Patches disponibles</h2>
            <p>Placeholder : liens vers pages de téléchargement</p>
          </section>
        </div>

        {/* Colonne secondaire */}
        <aside className="flex flex-col gap-6">
          <DiscordCard inviteUrl="https://t.co/O6tlFvR8wa"/>

          <div className="border p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Recrutement</h2>
            <p>
              Placeholder : lien vers projets où il y a besoin d’aide
            </p>
          </div>

             <RecentArticles limit={3} />
        </aside>
      </div>

    </div>
  );
}
