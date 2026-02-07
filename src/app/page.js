// app/page.js
import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import AvailablePatches from "./AvailablePatches";
import RecentArticles from "./RecentArticles";
import DiscordCard from "./DiscordCard";
import ProjectProgressCard from "@/components/ProjectProgressCard";
import MarkdownSection from "@/components/ui/MarkdownSection";
import InfoBox from "@/components/ui/InfoBox";
import chibiAiba from "@/assets/chibi/chibi-aiba.webp";

export const dynamic = "force-static";

export const metadata = {
  title: "Accueil | Dreamtrad",
};

export default async function HomePage() {
  // paths to your data
  const presentationPath = path.join(
    process.cwd(),
    "src/data/markdown/presentation-accueil.md",
  );
  const projectsPath = path.join(process.cwd(), "src/data/json/progress.json");

  // read data
  const presentationContent = fs.readFileSync(presentationPath, "utf8");
  const projects = JSON.parse(fs.readFileSync(projectsPath, "utf8"));

  return (
    <div className="bg-bg-primary flex min-h-screen flex-col text-white">
      <div className="mx-auto grid flex-1 grid-cols-1 gap-6 px-5 py-8 lg:grid-cols-3">
        {/* Main column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <InfoBox
            title="Traduction et promotion du visual novel en français !"
            icon="✨"
            className="mt-2"
          >
            <MarkdownSection
              content={presentationContent}
              className="text-justify leading-relaxed"
            />
          </InfoBox>

            <AvailablePatches />
          <h2 className="text-center text-lg font-semibold mt-6">
            Avancements des projets
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,450px))] justify-center gap-6">
            {projects.map((project) => (
              <ProjectProgressCard
                key={project.id}
                id={project.id}
                title={project.title}
                image={project.image}
                progress={project.progress}
              />
            ))}
          </div>

          <p className="text-text-secondary mb-4 text-center text-sm leading-tight italic">
            Mis à jour tous les lundis matin !
          </p>

        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-16">
          <DiscordCard inviteUrl="https://discord.gg/gsuAz4DK4p" />

          <div className="from-accent to-accent-tertiary flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-linear-to-br p-6 text-white shadow-xl md:flex-row md:justify-between">
            <div className="flex max-w-md flex-1 flex-col items-center space-y-4 text-center">
              <h2 className="text-2xl font-bold">Nous recrutons !</h2>
              <p className="text-sm text-white/90">
                Tu veux aider à traduire, relire ou contribuer aux projets ?{" "}
                <br />
                Rejoins-nous !
              </p>
              <Link
                href="/recrutement"
                className="text-accent inline-block rounded-lg bg-white px-6 py-2 font-semibold shadow-md transition hover:bg-gray-100 hover:shadow-lg"
              >
                Voir les projets →
              </Link>
            </div>

            <div className="flex w-full justify-center md:w-auto md:justify-start">
              <Image
                src={chibiAiba}
                alt="Chibi Aiba"
                width={200}
                height={200}
                className="pointer-events-none max-w-37.5 object-contain drop-shadow-xl select-none md:max-w-none"
              />
            </div>
          </div>

          <RecentArticles limit={3} />
        </aside>
      </div>
    </div>
  );
}
