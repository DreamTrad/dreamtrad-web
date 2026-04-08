// app/equipe/page.js
import fs from "fs";
import path from "path";
import TeamMemberCard from "@/app/(site)/equipe/TeamMemberCard";
import InfoBox from "@/components/ui/InfoBox";
import MarkdownSection from "@/components/ui/MarkdownSection";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

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
        url: "/dreamtrad-cover.png",
        alt: "DreamTrad",
      },
    ],
  },
};

export default async function TeamPage() {
  let team = [];

  const supabase = await createClient();
  const { data, error } = await supabase
  .from("members")
  .select(`
    id,
    name,
    skills,
    links,
    project_roles (
      role,
      comment,
      projects:project_id (
        id,
        title,
        is_visible
      )
    )
  `)
  .eq("is_important", true)
  .order("name", { ascending: true });

  if (error) {
    console.error("Supabase error:", JSON.stringify(error, null, 2));
  } else {
   team = (data || []).map((member) => {
  const projects = (member.project_roles || [])
    .map((pr) => pr.projects)
    .filter((p) => p && p.is_visible); // keep only visible

  // remove duplicates (same project appearing multiple times)
  const uniqueProjects = Array.from(
    new Map(projects.map((p) => [p.id, p])).values()
  );

  return {
    ...member,
    projects: uniqueProjects,
  };
});
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
