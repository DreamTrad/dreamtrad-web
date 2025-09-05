import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

// Glob statique pour tous les md
const allMarkdown = import.meta.glob([
  '../../data/jeu/**/*.md',
  '../../data/projet/**/*.md',
], { query: '?raw', import: 'default' });


export default function MarkdownSection({ gameId, file }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!file) return;

    // Construire le chemin exact attendu par le glob
    const key = gameId
      ? `../../data/jeu/${gameId}/${file}.md`
      : `${file}.md`;
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
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]} // permet de parser le HTML dans le Markdown
        components={{
          iframe: ({ node, ...props }) => (
            <div className="my-4 relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
              <iframe
                {...props}
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
              />
            </div>
          ),
          a: ({ node, href, children, ...props }) => {
            if (href?.startsWith("/")) {
              // Lien interne -> react-router
              return (
                <Link to={href} className="text-accent hover:underline" {...props}>
                  {children}
                </Link>
              );
            }
            // Lien externe
            return (
              <a
                href={href}
                className="text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}