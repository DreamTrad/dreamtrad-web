import { useParams, Link } from "react-router-dom";
import MetaTags from "../components/MetaTags";
import MarkdownSection from "../components/ui/MarkdownSection";
import LoaderOverlay from "../components/ui/LoaderOverlay";
import useFetchWithLoader from "../hooks/useFetchWithLoader";

export default function ArticlePage() {
  const { id } = useParams();
  const { data: articles, loading, error } = useFetchWithLoader("/data/articles.json", []);

  if (loading) return <LoaderOverlay />;
  if (error) return <p className="text-red-500 text-center">Erreur : {error.message}</p>;

  const article = articles.find((a) => a.id === id);
  if (!article) return <p className="text-center text-red-500 mt-8">Article introuvable</p>;

  return (
    <div className="relative p-8 max-w-4xl mx-auto">
      <MetaTags
        title={article.title}
        description={article.excerpt}
        image={article.coverImage}
        url={`articles/${article.id}`}
      />
      <Link to="/articles" className="inline-block mb-6 text-accent hover:underline">
        ← Retour aux articles
      </Link>

      <div className="bg-bg-tertiary border border-bg-secondary rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-accent mb-4">{article.title}</h1>
        <p className="text-sm text-text-tertiary mb-6">
          {article.author} — {new Date(article.date).toLocaleDateString("fr-FR")} · {article.readingTime}
        </p>

        {article.coverImage && (
          <img src={article.coverImage} alt={article.title} className="w-full rounded-lg mb-6 shadow-md" />
        )}

        {article.markdownPath ? (
          <MarkdownSection file={article.markdownPath} />
        ) : (
          <p className="text-text-secondary italic">Aucun contenu disponible pour cet article.</p>
        )}

        {article.tags?.length > 0 && (
          <div className="flex gap-2 mt-6 flex-wrap">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="bg-bg-secondary px-2 py-1 rounded text-xs text-text-secondary">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
