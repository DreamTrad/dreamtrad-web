// app/articles/[id]/page.js
import { createStaticClient } from "@/lib/supabase/static";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import MarkdownSection from "@/components/ui/MarkdownSection";

export const dynamicParams = false;

export async function generateStaticParams() {
  const supabase = createStaticClient();

  const { data } = await supabase
    .from("articles")
    .select("id")
    .eq("is_visible", true);

  return (
    data?.map((article) => ({
      id: article.id,
    })) || []
  );
}

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const supabase = createStaticClient();

  const { data: article } = await supabase
    .from("articles")
    .select("id, title, excerpt, is_visible")
    .eq("id", id)
    .single();

  if (!article || !article.is_visible) {
    return {
      title: "Article introuvable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const baseUrl = "https://dreamtrad.fr";
  const articleUrl = `${baseUrl}/articles/${article.id}`;
  const imageUrl = `${baseUrl}/articles-content/${article.id}/cover.webp`;

  return {
    metadataBase: new URL(baseUrl),

    title: article.title,
    description: article.excerpt || "",

    alternates: {
      canonical: articleUrl,
    },

    openGraph: {
      type: "article",
      url: articleUrl,
      title: article.title,
      description: article.excerpt || "",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || "",
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({ params }) {
  const id = (await params).id;
  const supabase = createStaticClient();

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (!article || !article.is_visible) return notFound();

  const markdownPath = path.join(
    process.cwd(),
    "src/data/articles",
    `${article.id}.md`,
  );

  let markdownContent = "";

  try {
    markdownContent = fs.readFileSync(markdownPath, "utf8");
  } catch (err) {
    console.error("Markdown introuvable :", err);
  }

  const coverImage = `/articles-content/${article.id}/cover.webp`;

  return (
    <div className="relative mx-auto max-w-4xl p-2">
      <Link
        href="/articles"
        className="text-accent mb-6 inline-block hover:underline"
      >
        ← Retour aux articles
      </Link>

      <div className="bg-bg-tertiary border-bg-secondary rounded-xl border p-6 shadow-lg">
        <Image
          src={coverImage}
          alt={article.title}
          width={1200}
          height={675}
          className="mb-6 w-full rounded-lg shadow-md"
          priority
        />

        <h1 className="text-text mb-4 text-3xl font-bold">
          {article.title}
        </h1>

        <p className="text-text-tertiary mb-6">
          {article.authors?.join(", ")} —{" "}
          {new Date(article.date).toLocaleDateString("fr-FR")}
        </p>

        <MarkdownSection
          content={markdownContent}
          imageClassName="mx-auto block"
        />

        {article.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-bg-secondary text-text-secondary rounded px-2 py-1 text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}