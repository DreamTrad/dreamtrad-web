// app/contact/page.js
import fs from "fs";
import path from "path";
import InfoBox from "@/components/ui/InfoBox";
import MarkdownSection from "@/components/ui/MarkdownSection";
import ContactClient from "./ContactClient";

export const dynamic = "force-static";

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

export default function ContactPage() {
  const markdownPath = path.join(
    process.cwd(),
    "src/data/markdown/contact-global.md",
  );

  let markdownContent = "";
  try {
    markdownContent = fs.readFileSync(markdownPath, "utf8");
  } catch (err) {
    markdownContent = "Contenu introuvable.";
  }

  return (
    <>
      <InfoBox title="Nous contacter" icon="✉️">
        <MarkdownSection
          content={markdownContent}
          className="text-justify leading-relaxed"
        />
      </InfoBox>

      <ContactClient />
    </>
  );
}
