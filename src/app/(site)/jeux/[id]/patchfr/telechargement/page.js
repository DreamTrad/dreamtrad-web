import DownloadClient from "./DownloadClient";
import ImageCarousel from "./ImageCarousel";
import MarkdownSection from "@/components/ui/MarkdownSection";
import ProjectProgressCard from "@/components/ProjectProgressCard";
import { createStaticClient } from "@/lib/supabase/public";
import { getImageUrl } from "@/lib/supabase/storage";

export const revalidate = 900; // 15 minutes

export async function generateMetadata({ params }) {
  const id = (await params).id;

  const supabase = createStaticClient();

    const { data: project, error } = await supabase
      .from("projects")
      .select("title")
      .eq("id", id)
      .eq("is_visible", true)
      .single();

    if (error) {
      console.error("Error fetching project:", error);
      return {};
    }

    if (!project) return {};

  const image = getImageUrl(`/jeux/${id}/cover.webp`);

  return {
    title: `Téléchargement patch fr | ${project.title}`,
    description: `Télécharger les différents patchs de ${project.title}`,
    openGraph: {
      title: `Téléchargement patch fr | ${project.title}`,
      description: `Télécharger les différents patchs de ${project.title}`,
      url: `/jeux/${id}/patchfr/telechargement`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function DownloadPage({ params }) {
  const id = (await params).id;

  const supabase = createStaticClient();


  const { data: project, error } = await supabase
    .from("projects")
    .select("id, title, progress, show_progress")
    .eq("id", id)
    .single();

    if (error) {
      console.error("Error fetching project:", error);
    }

    const { data: patches, error: patchesError } = await supabase
    .from("patches")
    .select("id, name, link")
    .eq("project_id", id);

    if (patchesError) {
      console.error("Error fetching patches:", patchesError);
    }

    const { data: infopatch, pageError } = await supabase
    .from("pages")
    .select("title, content")
    .eq("project_id", project.id)
    .eq("file", "infopatch")
    .single();

    if (pageError) {
      console.error(pageError);
      redirect("/");
    }

    const { data: images } = await supabase
    .from("gallery_images")
    .select("name")
    .eq("project_id", id)
    .order("position");

    const urls = images.map((img) => getImageUrl(`/jeux/${id}/patchfr/gallery/${img.name}.webp`));

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 pb-20">
      <div className="bg-bg-secondary/60 rounded-2xl p-6 shadow-sm backdrop-blur-sm md:p-8">
        <MarkdownSection mainTitle={infopatch?.title} content={infopatch?.content || ""} />
      </div>

      {project?.show_progress && (
        <div className="flex justify-center">
          <ProjectProgressCard
            id={project.id}
            title={project.title}
            image={getImageUrl(`/poster/${project.id}.webp`)}
            progress={project.progress}
          />
        </div>
      )}

      <DownloadClient patches={patches} />

      {images.length > 0 && <ImageCarousel images={urls} interval={15000} />}
    </div>
  );
}
