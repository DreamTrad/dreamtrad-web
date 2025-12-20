// app/equipe/page.js
import fs from "fs";
import path from "path";
import TeamMemberCard from "@/app/equipe/TeamMemberCard";
import InfoBox from "@/components/ui/InfoBox";
import MarkdownSection from "@/components/ui/MarkdownSection";

export const dynamic = "force-static";

export const metadata = {
  title: "Équipe",
  description:
    "Les personnes qui ont beaucoup apporté aux projets et à l’équipe DreamTrad au fil des années.",
  alternates: {
    canonical: "/equipe",
  },
  openGraph: {
    title: "Équipe",
    description:
      "Les personnes qui ont beaucoup apporté aux projets et à l’équipe DreamTrad.",
    url: "/equipe",
    images: [
      {
        url: "/dreamtrad-logo-title.svg",
        width: 1200,
        height: 630,
        alt: "DreamTrad",
      },
    ],
  },
};

export default function TeamPage() {
  const teamPath = path.join(process.cwd(), "src/data/json/team.json");
  let team = [];

  try {
    const teamJson = fs.readFileSync(teamPath, "utf8");
    team = JSON.parse(teamJson);
  } catch (err) {
    console.error("Erreur lecture team.json :", err);
  }

  // Load markdown
  const markdownPath = path.join(
    process.cwd(),
    "src/data/markdown/equipe-global.md",
  );

  let markdownContent = "";

  try {
    markdownContent = fs.readFileSync(markdownPath, "utf8");
  } catch (err) {
    console.error("Erreur lecture equipe-global.md :", err);
    markdownContent = "# Contenu indisponible";
  }

  return (
    <div className="pb-16">
      <div className="mx-auto max-w-6xl p-8">
        <InfoBox title="L’histoire de DreamTrad" icon="🌟">
          <MarkdownSection
            content={markdownContent}
            className="text-justify leading-relaxed"
          />
        </InfoBox>
      </div>

      <div className="grid grid-cols-1 gap-8 px-8 sm:grid-cols-[repeat(auto-fit,minmax(480px,1fr))]">
        {team.map((member) => (
          <TeamMemberCard key={member.id} {...member} />
        ))}
      </div>
    </div>
  );
}
