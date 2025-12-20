// app/mentions-legales/page.js
import fs from "fs";
import path from "path";
import MarkdownSection from "@/components/ui/MarkdownSection";

export const dynamic = "force-static";

export const metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site.",
  openGraph: {
    title: "Mentions légales",
    description: "Mentions légales du site.",
    url: "/mentions-legales",
    images: [
      {
        url: "/dreamtrad-logo-title.svg",
        width: 1200,
        height: 630,
        alt: "DreamTrad",
      },
    ],
  },
};

export default function MentionsLegalesPage() {
  const markdownPath = path.join(
    process.cwd(),
    "src/data/markdown/mentions-legales.md",
  );

  const markdownContent = fs.existsSync(markdownPath)
    ? fs.readFileSync(markdownPath, "utf8")
    : "# Mentions légales indisponibles";

  return (
    <div className="border-bg-secondary bg-bg-tertiary mx-auto mt-8 mb-8 max-w-4xl rounded-xl border p-8 shadow-md">
      <MarkdownSection content={markdownContent} />
    </div>
  );
}
