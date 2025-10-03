import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
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
          <DiscordCard inviteUrl="https://t.co/O6tlFvR8wa" />

          <div className="bg-accent text-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold mb-3">🚀 Nous recrutons !</h2>
            <p className="text-sm mb-4 text-white/90">
              Tu veux aider à traduire, relire ou contribuer aux projets ?
              Rejoins-nous !
            </p>
            <Link
              to="/recrutement"
              className="inline-block bg-white text-accent font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Voir les projets →
            </Link>
          </div>

          <RecentArticles limit={3} />
        </aside>
      </div>

    </div>
  );
}
