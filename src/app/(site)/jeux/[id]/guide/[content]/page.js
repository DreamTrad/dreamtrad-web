// app/(site)jeux/[id]/guide/[content]/page.js

import MarkdownSection from "@/components/ui/MarkdownSection";
import { createStaticClient } from "@/lib/supabase/public";
import { getImageUrl } from "@/lib/supabase/storage";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const supabase = createStaticClient();

  const { data } = await supabase
    .from("pages")
    .select("project_id, file")
    .eq("type", "guide")
    .eq("is_visible", true);

  return (data ?? []).map((p) => ({
    id: String(p.project_id),
    content: p.file,
  }));
}

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const content = (await params).content;

  const supabase = createStaticClient();

  const { data: pageData, error: pageError } = await supabase
    .from("pages")
    .select("title, description")
    .eq("file", content)
    .eq("project_id", id)
    .eq("type", "guide")
    .maybeSingle();

  const { data: projectData, error: projectError } = await supabase
    .from("projects")
    .select("title")
    .eq("id", id)
    .maybeSingle();

  if (pageError || projectError || !pageData || !projectData) {
    notFound();
  }

  const image = getImageUrl(`/jeux/${id}/cover.webp`);

  return {
    title: `${pageData.title} | ${projectData.title}`,
    description: pageData.description,
    openGraph: {
      title: `${pageData.title} | ${projectData.title}`,
      description: pageData.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: projectData.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageData.title} | ${projectData.title}`,
      description: pageData.description,
      images: [image],
    },
  };
}

export default async function GuideContentPage({ params }) {
  const id = (await params).id;
  const content = (await params).content;

  const supabase = createStaticClient();

  const { data: pageData, error } = await supabase
    .from("pages")
    .select("title, content")
    .eq("file", content)
    .eq("project_id", id)
    .eq("type", "guide")
    .maybeSingle();

  if (error || !pageData) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20">
      <div className="bg-bg-secondary/60 rounded-2xl p-6 shadow-sm backdrop-blur-sm md:p-8">
        <MarkdownSection
          mainTitle={pageData.title}
          content={pageData.content}
        />
      </div>
    </div>
  );
}
