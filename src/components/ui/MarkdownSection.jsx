import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import LoaderOverlay from "../ui/LoaderOverlay";
import MetaTags from "../MetaTags";

// -------- Markdown imports --------
const allMarkdown = import.meta.glob(
  ["../../data/jeu/**/*.md", "../../data/*.md"],
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

// Plugin pour ::spoiler
function remarkCustomSpoiler() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === "containerDirective" && node.name === "spoiler") {
        const data = node.data || (node.data = {});
        data.hName = "spoiler";

        let title = "spoiler";

        if (
          node.children?.length > 0 &&
          node.children[0].type === "paragraph"
        ) {
          const firstChild = node.children[0].children?.[0];
          if (firstChild?.type === "text") {
            title = firstChild.value.trim();
            node.children.shift();
          }
        }

        data.hProperties = { title };
      }
    });
  };
}

function extractMetadata(text) {
  if (!text.startsWith("---")) return { description: "", body: text };

  const end = text.indexOf("\n---", 3);
  if (end === -1) return { description: "", body: text };

  const description = text.slice(3, end).trim();
  const body = text.slice(end + 4).trim();
  return { description, body };
}

function extractFirstTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)/m);
  return match ? match[1].trim() : "DreamTrad";
}

// -------- Main component --------
export default function MarkdownSection({
  gameId,
  file,
  content: inlineContent,
  className = "",
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({
    title: "DreamTrad",
    description: "Traduction de Visual Novels en français.",
    image: "",
  });

  useEffect(() => {
    const handleContent = (text) => {
      const { description, body } = extractMetadata(text);
      const title = extractFirstTitle(body);
      const image = `/assets/jeu/${gameId}/cover.webp`

      setMeta({ title, description, image });
      setContent(body);
    };

    if (inlineContent) {
      handleContent(inlineContent);
      return;
    }

    if (!file) return;
    setLoading(true);

    // Fichier dans src/data (import.meta.glob)
    const key = gameId ? `../../data/jeu/${gameId}/${file}.md` : `${file}.md`;
    const importFile = allMarkdown[key];

    if (importFile) {
      importFile()
        .then((text) => handleContent(text))
        .finally(() => setLoading(false));
      return;
    }

    // Fichier dans public (fetch)
    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error("Fichier non trouvé");
        return res.text();
      })
      .then((text) => handleContent(text))
      .catch(() => handleContent("# Fichier introuvable"))
      .finally(() => setLoading(false));
  }, [gameId, file, inlineContent]);

  if (loading) return <LoaderOverlay />;

  return (
    <>
      <MetaTags
        title={meta.title}
        description={meta.description}
        image={meta.image}
        url={file || ""}
      />
      <div className={`prose prose-invert max-w-none ${className}`}>
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
    </>
  );
}
