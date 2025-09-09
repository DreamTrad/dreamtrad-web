import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";

// -------- Markdown imports --------
const allMarkdown = import.meta.glob(
  [
    "../../data/jeu/**/*.md",
    "../../data/*.md",
  ],
  { query: "?raw", import: "default" }
);

// -------- Custom components --------
function Spoiler({ title = "spoiler", children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-2">
      <button
        onClick={() => setOpen(!open)}
        className="px-2 py-1 bg-accent text-white rounded-md text-sm"
      >
        {open ? `Cacher ${title}` : `Montrer ${title}`}
      </button>
      {open && (
        <div className="mt-2 p-2 border rounded-md bg-neutral-800">
          {children}
        </div>
      )}
    </div>
  );
}

// Plugin to transform ::spoiler blocks into JSX
function remarkCustomSpoiler() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === "containerDirective" && node.name === "spoiler") {
        const data = node.data || (node.data = {});
        data.hName = "spoiler";

        let title = "spoiler";

        // Si le premier enfant est du texte, on le prend comme titre
        if (node.children?.length > 0 && node.children[0].type === "paragraph") {
          const firstChild = node.children[0].children?.[0];
          if (firstChild?.type === "text") {
            title = firstChild.value.trim();

            // On retire ce premier enfant du contenu du spoiler
            node.children.shift();
          }
        }

        data.hProperties = { title };
      }
    });
  };
}

// -------- Main component --------
export default function MarkdownSection({ gameId, file, content: inlineContent }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (inlineContent) {
      setContent(inlineContent);
      return;
    }

    if (!file) return;
    const key = gameId
      ? `../../data/jeu/${gameId}/${file}.md`
      : `${file}.md`;
    const importFile = allMarkdown[key];

    if (!importFile) {
      setContent("# Fichier introuvable");
      return;
    }

    importFile().then((text) => setContent(text));
  }, [gameId, file, inlineContent]);


  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective, remarkCustomSpoiler]}
        rehypePlugins={[rehypeRaw]}
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
              return (
                <Link
                  to={href}
                  className="text-accent hover:underline"
                  {...props}
                >
                  {children}
                </Link>
              );
            }
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
          spoiler: ({ node, ...props }) => (
            <Spoiler title={props.title}>{props.children}</Spoiler>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
