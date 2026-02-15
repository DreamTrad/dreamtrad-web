// app/articles/[slug]/page.js
import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import MarkdownSection from "@/components/ui/MarkdownSection";

export const dynamic = "force-static";
export const dynamicParams = false;

// --- Static paths for Next.js dynamic route ---
export async function generateStaticParams() {
  const articlesPath = path.join(process.cwd(), "src/data/json/articles.json");
  const articles = JSON.parse(fs.readFileSync(articlesPath, "utf8"));

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const slug = params.slug;

  const articlesPath = path.join(
    process.cwd(),
    "src/data/json/articles.json"
  );

  const articles = JSON.parse(fs.readFileSync(articlesPath, "utf8"));
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article introuvable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const baseUrl = "https://dreamtrad.fr";
  const articleUrl = `${baseUrl}/articles/${article.slug}`;
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
  const slug = (await params).slug;
  const articlesPath = path.join(process.cwd(), "src/data/json/articles.json");

  let articles = [];
  try {
    const articlesJson = fs.readFileSync(articlesPath, "utf8");
    articles = JSON.parse(articlesJson);
  } catch {
    console.error("Erreur lecture articles.json :");
  }

  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  const markdownPath = path.join(
    process.cwd(),
    "src/data/articles",
    `${article.id}-${article.slug}.md`,
  );

  let markdownContent = "";
  try {
    markdownContent = fs.readFileSync(markdownPath, "utf8");
  } catch {
    console.error("Markdown introuvable pour l'article", slug);
  }

  const coverImage = `/articles-content/${article.id}/cover.webp`;
  const canonicalUrl = `https://tondomaine.com/articles/${article.slug}`;

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

        <h1 className="text-text mb-4 text-3xl font-bold">{article.title}</h1>

        <p className="text-text-tertiary mb-6">
          {article.author} —{" "}
          {new Date(article.date).toLocaleDateString("fr-FR")}
        </p>

        <MarkdownSection
          content={markdownContent}
          imageClassName="mx-auto block"
        />

        {article.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag, idx) => (
              <ul
                key={idx}
                className="bg-bg-secondary text-text-secondary rounded px-2 py-1 text-xs"
              >
                #{tag}
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
