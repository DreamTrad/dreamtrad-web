import { useEffect, useState } from "react";
import ArticleCard from "../components/card/ArticleCard";

export default function ArticleListPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("data/articles.json")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Erreur chargement articles :", err));
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-accent mb-8 text-center">
        Nos Articles
      </h1>

      <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}
