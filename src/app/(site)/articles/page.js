// app/articles/page.js
import { createClient } from "@/lib/supabase/server";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-static";

export const metadata = {
  title: "Articles",
  description:
    "Articles sur nos projets, sur la traduction, ou sur les visual Novel.",
};

export default async function ArticleListPage() {
  const supabase = createClient();

  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, title, authors, date, tags, excerpt, is_visible")
    .order("date", { ascending: false })
    .eq("is_visible", true);

  if (error) {
    console.error("Supabase error:", JSON.stringify(error, null, 2));
  }

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