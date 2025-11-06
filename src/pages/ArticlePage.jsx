import { useParams, Link } from "react-router-dom";
import MetaTags from "../components/MetaTags";
import MarkdownSection from "../components/ui/MarkdownSection";
import LoaderOverlay from "../components/ui/LoaderOverlay";
import useFetchWithLoader from "../hooks/useFetchWithLoader";

export default function ArticlePage() {
  const { id } = useParams();
  const {
    data: articles,
    loading,
    error,
  } = useFetchWithLoader("/data/articles.json", []);

  if (loading) return <LoaderOverlay />;
  if (error)
    return <p className="text-center text-red-500">Erreur : {error.message}</p>;

  const article = articles.find((a) => a.id === id);
  if (!article)
    return <p className="mt-8 text-center text-red-500">Article introuvable</p>;

  return (
    <>
      <MetaTags
        title={article.title}
        description={article.excerpt}
        image={article.coverImage}
        url={`articles/${article.id}`}
      />
      <div className="relative mx-auto max-w-4xl p-8">
        <Link
          to="/articles"
          className="text-accent mb-6 inline-block hover:underline"
        >
          ← Retour aux articles
        </Link>

        <div className="bg-bg-tertiary border-bg-secondary rounded-xl border p-6 shadow-lg">
          <h1 className="text-accent mb-4 text-3xl font-bold">
            {article.title}
          </h1>
          <p className="text-text-tertiary mb-6 text-sm">
            {article.author} —{" "}
            {new Date(article.date).toLocaleDateString("fr-FR")} ·{" "}
            {article.readingTime}
          </p>

          {article.coverImage && (
            <img
              src={article.coverImage}
              alt={article.title}
              className="mb-6 w-full rounded-lg shadow-md"
            />
          )}

          {article.markdownPath ? (
            <MarkdownSection file={article.markdownPath} />
          ) : (
            <p className="text-text-secondary italic">
              Aucun contenu disponible pour cet article.
            </p>
          )}

          {article.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-bg-secondary text-text-secondary rounded px-2 py-1 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
