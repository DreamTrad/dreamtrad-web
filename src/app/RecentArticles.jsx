import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

export default function RecentArticles({ limit = 3 }) {
  const articlesPath = path.join(process.cwd(), "src/data/json/articles.json");
  let articles = [];
  try {
    const articlesJson = fs.readFileSync(articlesPath, "utf8");
    articles = JSON.parse(articlesJson)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  } catch (err) {
    console.error("Erreur lecture articles.json :", err);
  }

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
          articles.map((article) => {
            const coverImage = `/articles-content/${article.id}/cover.webp`;
            return (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                scroll={true}
                className="group flex items-center gap-3"
              >
                <Image
                  src={coverImage}
                  alt={article.title}
                  width={80}
                  height={80}
                  className="rounded-md object-cover shadow-sm transition group-hover:opacity-90"
                />

                <div className="flex flex-1 flex-col">
                  <h3 className="text-text group-hover:text-accent line-clamp-2 text-sm font-bold">
                    {article.title}
                  </h3>
                  <p className="text-text-tertiary text-xs">
                    {new Date(article.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>

      <div className="mt-4 text-right">
        <Link
          href="/articles"
          scroll={true}
          className="text-accent text-xs hover:underline"
        >
          Voir tous les articles →
        </Link>
      </div>
    </div>
  );
}
