// app/(site)/vndb-fr/page.js

import VndbfrClient from "./VndbfrClient";
import { createStaticClient } from "@/lib/supabase/public";
import MarkdownSection from "@/components/ui/MarkdownSection";
import InfoBox from "@/components/ui/InfoBox";

export async function generateMetadata(_, parent) {
  const parentMetadata = await parent;

  return {
    ...parentMetadata,

    title: "vndb-fr",
    description: "Découvrez des visual novels disponibles en français.",

    openGraph: {
      ...parentMetadata.openGraph,
      title: "vndb-fr",
      description: "Découvrez des visual novels disponibles en français.",
      url: "/vndb-fr",
    },
  };
}

export default async function VndbfrPage() {
  const supabase = createStaticClient();

  const { data: page, error: pageError } = await supabase
    .from("pages")
    .select("content, title")
    .eq("slug", "vndb-fr")
    .eq("file", "infobox")
    .single();

  const { data: entries } = await supabase
    .from("vndbfrentries")
    .select("*")
    .eq("is_visible", true)
    .order("title", { ascending: true });

  const { data: genres } = await supabase.rpc("get_genres");
  const { data: durations } = await supabase.rpc("get_durations");

  if (pageError) {
    console.error("Supabase page error:", pageError);
  }

  return (
    <div className="max-w-9xl mx-auto p-8">
      <InfoBox title={page?.title || ""} icon="📚">
        <MarkdownSection content={page?.content || ""} />
      </InfoBox>
      <VndbfrClient entries={entries} genres={genres} durations={durations} />;
    </div>
  );
}
