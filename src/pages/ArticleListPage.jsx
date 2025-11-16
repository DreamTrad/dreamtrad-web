import { useEffect, useState } from "react";
import MetaTags from "../components/MetaTags";
import ArticleCard from "../components/card/ArticleCard";

export default function ArticleListPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/data/articles.json")
      .then((res) => res.json())
      .then((data) => {
        // Trier du plus récent au plus ancien
        const sorted = [...data].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        setArticles(sorted);
      })
      .catch((err) =>
        console.error("Erreur chargement articles :", err),
      );
  }, []);

  return (
    <>
      <MetaTags
        title="Liste des articles"
        description="Articles sur nos projets, sur la traduction, ou sur les visual Novel"
        url="articles"
      />
      <div className="mx-auto max-w-6xl p-8">
        <h1 className="text-accent mb-8 text-center text-3xl font-bold">
          Nos Articles
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </>
  );
}
