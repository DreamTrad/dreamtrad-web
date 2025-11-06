import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecentArticles from "../components/RecentArticles";
import MetaTags from "../components/MetaTags";
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
      .catch((err) => console.error("Erreur chargement progress.json :", err));
  }, []);

  return (
    <>
      <MetaTags
        title="Accueil"
        description="Équipe de traduction de Visual Novel. Suivez l’avancement des projets, téléchargez nos patchs, consultez des articles et des guides."
        url=""
      />
      <div className="bg-bg-primary flex min-h-screen flex-col text-white">
        <div className="mx-auto grid flex-1 grid-cols-1 gap-6 px-5 py-8 lg:grid-cols-3">
          {/* Colonne principale */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <MarkdownSection file={file_presentation} />

            {/* Avancement des projets */}
            <h2 className="mb-4 text-center text-lg font-semibold">
              Avancement des projets
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,450px))] justify-center gap-6">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <ProjectProgressCard
                    key={project.id}
                    title={project.title}
                    image={project.image}
                    progress={project.progress}
                  />
                ))
              ) : (
                <p className="text-text-secondary text-center">
                  Aucun projet chargé
                </p>
              )}
            </div>

            <section className="rounded-md border p-6">
              <h2 className="mb-2 text-lg font-semibold">
                Patches disponibles
              </h2>
              <p>Placeholder : liens vers pages de téléchargement</p>
            </section>
          </div>

          {/* Colonne secondaire */}
          <aside className="flex flex-col gap-6">
            <DiscordCard inviteUrl="https://t.co/O6tlFvR8wa" />

            <div className="bg-accent flex flex-col items-center rounded-xl p-6 text-center text-white shadow-lg">
              <h2 className="mb-3 text-2xl font-bold">🚀 Nous recrutons !</h2>
              <p className="mb-4 text-sm text-white/90">
                Tu veux aider à traduire, relire ou contribuer aux projets ?
                Rejoins-nous !
              </p>
              <Link
                to="/recrutement"
                className="text-accent inline-block rounded-lg bg-white px-6 py-2 font-semibold shadow transition hover:bg-gray-100"
              >
                Voir les projets →
              </Link>
            </div>

            <RecentArticles limit={3} />
          </aside>
        </div>
      </div>
    </>
  );
}
