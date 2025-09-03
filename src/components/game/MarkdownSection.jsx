import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

// Glob statique pour tous les md
const allMarkdown = import.meta.glob('../../data/jeu/**/*.md', { query: '?raw', import: 'default' });

export default function MarkdownSection({ gameId, file }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!file) return;

    // Construire le chemin exact attendu par le glob
    const key = `../../data/jeu/${gameId}/${file}.md`;
    const importFile = allMarkdown[key];

    if (!importFile) {
      setContent('# Fichier introuvable');
      return;
    }

    // Charger le Markdown
    importFile().then((text) => setContent(text));
  }, [gameId, file]);

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]} // permet de parser le HTML dans le Markdown
        components={{
          iframe: ({ node, ...props }) => (
            <div className="my-4 relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
              <iframe
                {...props}
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
                frameBorder="0"
              />
            </div>
          ),
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}