// app/(site)mentions-legales/page.js

import MarkdownSection from "@/components/ui/MarkdownSection";
import { createStaticClient } from "@/lib/supabase/public";

export const revalidate = 86400;

export const metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site.",
  openGraph: {
    title: "Mentions légales",
    description: "Mentions légales du site.",
    url: "/mentions-legales",
    images: [
      {
        url: "dreamtrad-cover.png",
        alt: "DreamTrad",
      },
    ],
  },
};

export default async function MentionsLegalesPage() {
  const supabase = createStaticClient();

  const { data: page, error: pageError } = await supabase
    .from("pages")
    .select("title, content")
    .eq("slug", "mentions-legales")
    .eq("file", "page")
    .single();

  if (pageError) {
    console.error("Supabase page error:", pageError);
  }

  return (
    <div className="border-bg-secondary bg-bg-tertiary mx-auto mt-8 mb-8 max-w-4xl rounded-xl border p-8 shadow-md">
      <MarkdownSection mainTitle={page?.title} content={page?.content || ""} />
    </div>
  );
}
