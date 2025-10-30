import { useEffect, useState } from "react";
import MetaTags from "../components/MetaTags";
import MarkdownSection from "../components/ui/MarkdownSection";

const legalMarkdown = import.meta.glob("../data/mentions-legales.md", {
  query: "?raw",
  import: "default",
});

export default function ReglementationsPage() {
  const [content, setContent] = useState("");

  useEffect(() => {
    // Comme il n'y a qu'un seul fichier, on récupère sa clé
    const fileKey = Object.keys(legalMarkdown)[0];
    if (!fileKey) return;

    legalMarkdown[fileKey]()
      .then((text) => setContent(text))
      .catch((err) =>
        console.error("Erreur chargement mentions légales :", err)
      );
  }, []);

  return (
    <>
      <MetaTags
        title="Mentions légales"
        description="Mentions légales du site."
        url="mentions-legales"
      />
      <div className="p-8 max-w-4xl mx-auto bg-bg-tertiary border border-bg-secondary rounded-xl shadow-md">
        <MarkdownSection content={content} />
      </div>
    </>
  );
}
