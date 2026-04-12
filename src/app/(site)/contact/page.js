// app/(site)contact/page.js

import InfoBox from "@/components/ui/InfoBox";
import MarkdownSection from "@/components/ui/MarkdownSection";
import ContactClient from "./ContactClient";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 86400;

export const metadata = {
  title: "Contact",
  description:
    "Pour nous contacter si vous avez une question, un problème, une remarque.",
  alternates: {
    canonical: "https://dreamtrad.fr/equipe",
  },
  openGraph: {
    type: "website",
    title: "Contact",
    description:
      "Pour nous contacter si vous avez une question, un problème, une remarque.",
    url: "https://dreamtrad.fr/equipe",
    siteName: "DreamTrad",
    images: [
      {
        url: "/dreamtrad-cover.png",
        alt: "DreamTrad",
      },
    ],
  },
};

export default async function ContactPage() {
  const supabase = await createClient();

  const { data: page, error: pageError } = await supabase
    .from("pages")
    .select("content, title")
    .eq("slug", "contact")
    .eq("file", "infobox")
    .single();

  if (pageError) {
    console.error("Supabase page error:", pageError);
  }


  return (
    <>
      <InfoBox title={page?.title || ""} icon="✉️">
        <MarkdownSection
          content={page?.content || ""}
          className="text-justify leading-relaxed"
        />
      </InfoBox>

      <ContactClient />
    </>
  );
}
