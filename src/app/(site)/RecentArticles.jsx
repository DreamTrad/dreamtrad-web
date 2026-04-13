import Link from "next/link";
import Image from "next/image";
import { createStaticClient } from "@/lib/supabase/public";
import { getImageUrl } from "@/lib/supabase/storage";

export default async function RecentArticles({ limit = 3 }) {
  const supabase = createStaticClient();

  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, slug, title, date")
    .eq("is_visible", true)
    .order("date", { ascending: false })
    .limit(limit);

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
            const coverImage = getImageUrl(`/articles-content/${article.id}/cover.webp`);
            const formattedDate = article.date
              ? new Date(article.date).toLocaleDateString("fr-FR")
              : "";

            return (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                scroll={true}
                className="group flex items-center gap-3"
              >
                <div className="relative h-20 w-20 shrink-0">
                  <Image
                    src={coverImage}
                    alt={article.title}
                    fill
                    loading="lazy"
                    className="rounded-md object-cover shadow-sm transition group-hover:opacity-90"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <h3 className="text-text group-hover:text-accent line-clamp-2 text-sm font-bold">
                    {article.title}
                  </h3>
                  <p className="text-text-tertiary text-xs">{formattedDate}</p>
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
