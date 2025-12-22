// app/recrutement/page.js
import fs from "fs";
import path from "path";
import MarkdownSection from "@/components/ui/MarkdownSection";
import InfoBox from "@/components/ui/InfoBox";
import RecruitmentCard from "./RecruitmentCard";

export const dynamic = "force-static";

export const metadata = {
  title: "Recrutement",
  description: "Nous recrutons pour plusieurs projets de traduction. N’hésitez pas à vous manifester. Nous avons aussi besoin d’aide pour améliorer le contenu du site.",
  openGraph: {
    title: "Recrutement",
    description: "Nous recrutons pour plusieurs projets de traduction. N’hésitez pas à vous manifester. Nous avons aussi besoin d’aide pour améliorer le contenu du site.",
    url: "/recrutement",
    images: [
      {
        url: "/dreamtrad-logo-title.webp",
        width: 1200,
        height: 630,
        alt: "DreamTrad",
      },
    ],
  },
};

export default function RecruitmentPage() {
  // Read recruitment JSON files
  const projectPath = path.join(
    process.cwd(),
    "src/data/json/recrutement_projet.json",
  );
  const webPath = path.join(
    process.cwd(),
    "src/data/json/recrutement_siteweb.json",
  );

  const filePath = path.join(
    process.cwd(),
    "src/data/markdown/recrutement-global.md",
  );

  const recruitmentProjectData = fs.existsSync(projectPath)
    ? JSON.parse(fs.readFileSync(projectPath, "utf8"))
    : [];

  const recruitmentWebData = fs.existsSync(webPath)
    ? JSON.parse(fs.readFileSync(webPath, "utf8"))
    : [];

  const fileContent = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "# Contenu indisponible";

  return (
    <>
      <InfoBox title="Rejoindre un projet de traduction" icon="👥">
        <MarkdownSection
          content={fileContent}
          className="text-justify leading-relaxed"
        />
      </InfoBox>

      <div className="max-w-9xl mx-auto p-8">
        <h2 className="text-accent mb-8 text-center text-3xl font-bold">
          Les projets de traduction en recrutement
        </h2>

        <div className="grid grid-cols-1 justify-center gap-8 sm:grid-cols-[repeat(auto-fit,minmax(400px,600px))]">
          {recruitmentProjectData.map((project) => (
            <RecruitmentCard key={project.id} {...project} />
          ))}
        </div>

        <h2 className="text-accent mt-16 mb-8 text-center text-3xl font-bold">
          Les tâches pour le site internet
        </h2>

        <div className="grid grid-cols-1 justify-center gap-8 sm:grid-cols-[repeat(auto-fit,minmax(400px,600px))]">
          {recruitmentWebData.map((project) => (
            <RecruitmentCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </>
  );
}
