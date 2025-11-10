import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecentArticles({ limit = 3 }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/data/articles.json")
      .then((res) => res.json())
      .then((data) => {
        // Trier du plus récent au plus ancien
        const sorted = [...data].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        setArticles(sorted.slice(0, limit));
      })
      .catch((err) =>
        console.error("Erreur chargement articles récents :", err),
      );
  }, [limit]);

  return (
    <div className="border-bg-secondary bg-bg-tertiary rounded-xl border p-4 shadow-md">
      <h2 className="text-accent mb-4 text-center text-lg font-semibold">
        Articles récents
      </h2>

      <div className="flex flex-col gap-4">
        {articles.length === 0 ? (
          <p className="text-text-tertiary text-center text-sm">
            Aucun article disponible.
          </p>
        ) : (
          articles.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.id}`}
              className="group flex items-center gap-3"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {/* Image miniature */}
              {article.coverImage && (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="h-20 w-20 rounded-md object-cover shadow-sm transition group-hover:opacity-90"
                />
              )}

              {/* Texte */}
              <div className="flex flex-1 flex-col">
                <h3 className="text-text group-hover:text-accent line-clamp-2 text-sm font-bold">
                  {article.title}
                </h3>
                <p className="text-text-tertiary text-xs">
                  {new Date(article.date).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>

      <div className="mt-4 text-right">
        <Link to="/articles" className="text-accent text-xs hover:underline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Voir tous les articles →
        </Link>
      </div>
    </div>
  );
}
