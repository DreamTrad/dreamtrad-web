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
  { query: "?raw", import: "default" },
);

// -------- Custom components --------
function Spoiler({ title = "spoiler", children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-4">
      <button
        onClick={() => setOpen(!open)}
        className="border-bg-secondary bg-bg-secondary text-text-secondary hover:bg-hover hover:text-text flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-medium transition"
      >
        {/* Arrow */}
        <span className={`transition-transform ${open ? "rotate-90" : ""}`}>
          ▶
        </span>

        {/* Label */}
        {open ? `Cacher ${title}` : `Montrer ${title}`}
      </button>

      {open && (
        <div className="border-bg-secondary bg-bg-tertiary mt-3 rounded-xl border p-3">
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
  imageClassName = "",
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
      const image = `/assets/jeu/${gameId}/cover.webp`;

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
      <div
        className={`prose prose-invert break-anywhere max-w-none wrap-break-word ${className} prose-p:text-justify prose-a:no-underline prose-a:font-bold`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkDirective, remarkCustomSpoiler]}
          rehypePlugins={[rehypeRaw]}
          components={{
            iframe: ({ node, ...props }) => (
              <div className="relative my-4 h-0 overflow-hidden rounded-lg pb-[56.25%] shadow-lg">
                <iframe
                  {...props}
                  className="absolute top-0 left-0 h-full w-full"
                  allowFullScreen
                />
              </div>
            ),
            img: ({ node, ...props }) => (
              <img
                {...props}
                className={imageClassName || undefined} // <-- applique seulement si fourni
              />
            ),
            a: ({ node, href, children, ...props }) => {
              if (href?.startsWith("/")) {
                return (
                  <Link
                    to={href}
                    className="text-accent-secondary hover:text-accent-tertiary font-bold no-underline"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    {...props}
                  >
                    {children}
                  </Link>
                );
              }
              return (
                <a
                  href={href}
                  className="text-accent-secondary hover:text-accent-tertiary font-bold no-underline"
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
