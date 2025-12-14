import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecentArticles from "../components/RecentArticles";
import MetaTags from "../components/MetaTags";
import DiscordCard from "../components/card/DiscordCard";
import MarkdownSection from "../components/ui/MarkdownSection";
import ProjectProgressCard from "../components/card/ProjectProgressCard";
import AvailablePatches from "../components/game/AvailablePatches";
import chibiAiba from "../assets/chibi/chibi-aiba.webp";
import InfoBox from "../components/ui/InfoBox";

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
            <InfoBox title="Traduction et promotion du Visual Novel en français !" icon="✨" className="mt-2">
                    <MarkdownSection file={file_presentation} className="text-justify leading-relaxed" />
                  </InfoBox>

            {/* Avancement des projets */}
            <h2 className=" text-center text-lg font-semibold">
              Avancement des projets
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,450px))] justify-center gap-6">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <ProjectProgressCard
                    key={project.id}
                    id={project.id}
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
            <p className="text-text-secondary text-center text-sm mb-4 leading-tight italic">
              Mis à jour tous les lundis matin !
            </p>

           <AvailablePatches />

          </div>

          {/* Colonne secondaire */}
          <aside className="flex flex-col gap-16">
            <DiscordCard inviteUrl="https://t.co/O6tlFvR8wa" />

            <div className="from-accent to-accent-tertiary flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-linear-to-br p-6 text-white shadow-xl md:flex-row">
              {/* Text & button */}
              <div className="flex max-w-md flex-1 flex-col items-center space-y-4 text-center">
                <h2 className="text-2xl font-bold">Nous recrutons !</h2>
                <p className="text-sm text-white/90">
                  Tu veux aider à traduire, relire ou contribuer aux projets ?{" "}
                  <br />
                  Rejoins-nous !
                </p>
                <Link
                  to="/recrutement"
                  className="text-accent inline-block rounded-lg bg-white px-6 py-2 font-semibold shadow-md transition hover:bg-gray-100 hover:shadow-lg"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Voir les projets →
                </Link>
              </div>

              {/* Chibi illustration */}
              <div className="flex h-full shrink-0 items-stretch justify-center md:h-auto md:justify-start">
                <img
                  src={chibiAiba}
                  alt="Chibi Aiba"
                  className="pointer-events-none h-50 object-contain drop-shadow-xl select-none"
                />
              </div>
            </div>

            <RecentArticles limit={3} />
          </aside>
        </div>
      </div>
    </>
  );
}
