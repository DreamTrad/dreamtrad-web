// app/(site)/jeux/page.js

import Link from "next/link";
import { createStaticClient } from "@/lib/supabase/public";
import { getImageUrl } from "@/lib/supabase/storage";

export const revalidate = 3600; // 1 heure

export const metadata = {
  title: "Liste des jeux",
  description:
    "Liste des visual novels traduits ou en cours de traduction par l’équipe. Téléchargez des patchs, consultez des guides ou découvrez simplement les jeux.",
  openGraph: {
    title: "Liste des jeux",
    description:
      "Liste des visual novels traduits ou en cours de traduction par l’équipe.",
    url: "/jeux",
    images: [
      {
        url: "/dreamtrad-cover.png",
        alt: "DreamTrad",
      },
    ],
  },
};

export default async function GamesListPage() {
  const supabase = createStaticClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title")
    .eq("is_visible", true)
    .order("title", { ascending: true });

  if (error) {
    console.error("Error fetching project:", error);
  }

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen p-10">
      <h1 className="mb-8 text-center text-3xl font-bold">visual novels</h1>

      <div className="grid grid-cols-[repeat(auto-fit,350px)] justify-center gap-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/jeux/${project.id}`}
            className="group bg-bg-secondary block overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-xl"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={getImageUrl(`/jeux/${project.id}/cover.webp`)}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-4 text-center">
              <h2 className="text-text-primary group-hover:text-accent text-lg font-semibold transition-colors">
                {project.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
