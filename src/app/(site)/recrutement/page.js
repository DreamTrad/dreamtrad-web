// app/recrutement/page.js
import { createClient } from "@/lib/supabase/server";
import MarkdownSection from "@/components/ui/MarkdownSection";
import InfoBox from "@/components/ui/InfoBox";
import RecruitmentCard from "@/components/RecruitmentCard";
import fs from "fs";
import path from "path";

export const revalidate = 60 * 60 * 24;

export const metadata = {
  title: "Recrutement",
  description:
    "Nous recrutons pour plusieurs projets de traduction. N’hésitez pas à vous manifester. Nous avons aussi besoin d’aide pour améliorer le contenu du site.",
  openGraph: {
    title: "Recrutement",
    description:
      "Nous recrutons pour plusieurs projets de traduction. N’hésitez pas à vous manifester. Nous avons aussi besoin d’aide pour améliorer le contenu du site.",
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

export default async function RecruitmentPage() {
  const supabase = await createClient();

  const { data: projectRecruitments } = await supabase
    .from("project_recruitments")
    .select(
      `
      *,
      projects (
        id,
        title
      )
    `,
    )
    .eq("is_active", true)
    .eq("type", "project");

  // Project recruitments (other)
  const { data: otherProjectRecruitments } = await supabase
    .from("project_recruitments")
    .select(
      `
      *,
      projects (
        id,
        title
      )
    `,
    )
    .eq("is_active", true)
    .eq("type", "other");

  // Site recruitments
  const { data: siteRecruitments } = await supabase
    .from("site_recruitments")
    .select("*")
    .eq("is_active", true);

  const mergedRecruitments = [
    ...(otherProjectRecruitments || []).map((item) => ({
      id: item.projects?.id || item.id,
      title: item.title || item.projects?.title,
      roles: item.roles,
      contact: item.contact,
      description: item.description,
      image: `/poster/${item.projects?.id}.webp`,
    })),
    ...(siteRecruitments || []),
  ];

  // Markdown
  const filePath = path.join(
    process.cwd(),
    "src/data/markdown/recrutement-global.md",
  );

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
        {/* MAIN PROJECTS */}
        <h2 className="text-accent mb-8 text-center text-3xl font-bold">
          Les projets de traduction en recrutement
        </h2>

        <div className="grid grid-cols-1 justify-center gap-8 sm:grid-cols-[repeat(auto-fit,minmax(400px,600px))]">
          {projectRecruitments?.map((item) => (
            <RecruitmentCard
              key={item.id}
              id={item.projects?.id}
              title={item.title || item.projects?.title}
              roles={item.roles}
              contact={item.contact}
              description={item.description}
            />
          ))}
        </div>

        {/* OTHER PROJECT RECRUITMENTS */}
        <h2 className="text-accent mt-16 mb-8 text-center text-3xl font-bold">
          Contributions pour le site et pour des nouveaux projets de traduction
        </h2>

        <div className="grid grid-cols-1 justify-center gap-8 sm:grid-cols-[repeat(auto-fit,minmax(400px,600px))]">
          {mergedRecruitments.map((item) => (
            <RecruitmentCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </>
  );
}
