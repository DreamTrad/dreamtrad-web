import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function RecentArticles({ limit = 3 }) {
  const supabase = await createClient();

  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, title, date")
    .order("date", { ascending: false })
    .limit(limit)
    .eq("is_visible", true);

  if (error) {
    console.error("Erreur Supabase articles :", error);
  }

  return (
    <div className="border-bg-secondary bg-bg-tertiary rounded-xl border p-4 shadow-md">
      <h2 className="text-accent mb-4 text-center text-lg font-semibold">
        Articles récents
      </h2>

      <div className="flex flex-col gap-4">
        {!articles || articles.length === 0 ? (
          <p className="text-text-tertiary text-center text-sm">
            Aucun article disponible.
          </p>
        ) : (
          articles.map((article) => {
            const coverImage = `/articles-content/${article.id}/cover.webp`;

            return (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                scroll={true}
                className="group flex items-center gap-3"
              >
                <Image
                  src={coverImage}
                  alt={article.title}
                  width={80}
                  height={80}
                  className="h-20 w-20 shrink-0 rounded-md object-cover shadow-sm transition group-hover:opacity-90"
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
