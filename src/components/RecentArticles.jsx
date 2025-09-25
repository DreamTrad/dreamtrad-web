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
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setArticles(sorted.slice(0, limit));
      })
      .catch((err) =>
        console.error("Erreur chargement articles récents :", err)
      );
  }, [limit]);

  return (
    <div className="border border-bg-secondary bg-bg-tertiary rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4 text-accent text-center">
        Articles récents
      </h2>

      <div className="flex flex-col gap-4">
        {articles.length === 0 ? (
          <p className="text-sm text-text-tertiary text-center">
            Aucun article disponible.
          </p>
        ) : (
          articles.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.id}`}
              className="flex items-center gap-3 group"
            >
              {/* Image miniature */}
              {article.coverImage && (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-20 h-20 object-cover rounded-md shadow-sm group-hover:opacity-90 transition"
                />
              )}

              {/* Texte */}
              <div className="flex flex-col flex-1">
                <h3 className="text-sm font-bold text-text group-hover:text-accent line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-text-tertiary">
                  {new Date(article.date).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>

      <div className="mt-4 text-right">
        <Link
          to="/articles"
          className="text-xs text-accent hover:underline"
        >
          Voir tous les articles →
        </Link>
      </div>
    </div>
  );
}
