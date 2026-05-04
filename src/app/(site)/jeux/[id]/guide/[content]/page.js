// app/(site)jeux/[id]/guide/[content]/page.js

import MarkdownSection from "@/components/ui/MarkdownSection";
import { createStaticClient } from "@/lib/supabase/public";
import { getImageUrl } from "@/lib/supabase/storage";

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const content = (await params).content;

  const supabase = createStaticClient();

  const { data: pageData } = await supabase
    .from("pages")
    .select("title, description")
    .eq("file", content)
    .eq("project_id", id)
    .eq("type", "guide")
    .limit(1)
    .single();

  const { data: projectData } = await supabase
    .from("projects")
    .select("title")
    .eq("id", id)
    .single();

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

  const { data: pageData } = await supabase
    .from("pages")
    .select("title, content")
    .eq("file", content)
    .eq("project_id", id)
    .eq("type", "guide")
    .limit(1)
    .single();

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
