// app/articles/page.js
import fs from "fs";
import path from "path";
import ArticleCard from "@/app/articles/ArticleCard";

export const dynamic = "force-static";

export const metadata = {
  title: "Articles",
  description:
    "Articles sur nos projets, sur la traduction, ou sur les visual Novel.",
};

export default function ArticleListPage() {
  // Read articles JSON from local file
  const articlesPath = path.join(process.cwd(), "src/data/json/articles.json");
  let articles = [];
  try {
    const articlesJson = fs.readFileSync(articlesPath, "utf8");
    articles = JSON.parse(articlesJson) || [];
    // Sort by date descending
    articles.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  } catch (err) {
    console.error("Erreur lecture articles.json :", err);
  }

  return (
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
  );
}
