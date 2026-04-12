// app/(site)/articles/page.js

import { createClient } from "@/lib/supabase/server";
import ArticleCard from "@/components/ArticleCard";

export const revalidate = 3600;

export const metadata = {
  title: "Articles",
  description:
    "Articles sur nos projets, sur la traduction, ou sur les visual Novel.",
};

export default async function ArticleListPage() {
  const supabase = await createClient();

  const { data: articles } = await supabase
    .from("articles")
    .select("id, slug, title, authors, date, tags, excerpt")
    .eq("is_visible", true)
    .order("date", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl p-8">
      <h1 className="text-accent mb-8 text-center text-3xl font-bold">
        Nos Articles
      </h1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        {articles?.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}
