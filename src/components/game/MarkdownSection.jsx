import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownSection({ gameId, file }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    import(`../../data/jeu/${gameId}/${file}.md?raw`)
      .then((module) => setContent(module.default))
      .catch(() => setContent("# Erreur\nContenu introuvable."));
  }, [gameId, file]);

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
