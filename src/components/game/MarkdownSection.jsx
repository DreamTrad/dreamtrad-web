import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

// Glob statique pour tous les md
const allMarkdown = import.meta.glob('../../data/jeu/**/*.md', { as: 'raw' });

export default function MarkdownSection({ gameId, file }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!file) return;

    // Construire la clé exacte attendue par le glob
    const key = `../../data/jeu/${gameId}/${file}.md`;
    const importFile = allMarkdown[key];

    if (!importFile) {
      setContent('# Fichier introuvable');
      return;
    }

    importFile().then(setContent);
  }, [gameId, file]);

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
