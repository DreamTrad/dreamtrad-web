import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MarkdownSection from "../components/game/MarkdownSection";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch("/articles.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((a) => a.id === id);
        setArticle(found);
      })
      .catch((err) => console.error("Erreur chargement article :", err));
  }, [id]);

  if (!article) {
    return <p className="text-center text-red-500 mt-8">Article introuvable</p>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Titre */}
      <h1 className="text-3xl font-bold text-accent mb-4">{article.title}</h1>

      {/* Auteur + date */}
      <p className="text-sm text-text-tertiary mb-6">
        ✍️ {article.author} —{" "}
        {new Date(article.date).toLocaleDateString("fr-FR")} · {article.readingTime}
      </p>

      {/* Image de couverture */}
      {article.coverImage && (
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full rounded-lg mb-6 shadow-md"
        />
      )}

      {/* Contenu Markdown */}
      {article.markdownPath ? (
        <MarkdownSection file={article.markdownPath} />
      ) : (
        <p className="text-text-secondary italic">
          Aucun contenu disponible pour cet article.
        </p>
      )}

      {/* Tags */}
      {article.tags?.length > 0 && (
        <div className="flex gap-2 mt-6 flex-wrap">
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-bg-secondary px-2 py-1 rounded text-xs text-text-secondary"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
