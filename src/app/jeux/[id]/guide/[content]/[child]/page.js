// app/jeux/[id]/guide/[content]/[child]/page.js
import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { games } from "@/data/jeux";
import MarkdownSection from "@/components/ui/MarkdownSection";
import {
  extractMarkdownMetadata,
  extractFirstTitle,
} from "@/lib/markdownMetadata";

export const dynamic = "force-static";

function findGuideChild(game, contentId, childId) {
  const section = game.categories?.guide?.sections?.find(
    (s) => s.id === contentId,
  );
  if (!section) return null;

  const child = section.children?.find((c) => c.id === childId);
  if (!child?.file) return null;

  return { section, child };
}

export async function generateStaticParams() {
  const params = [];

  for (const game of games) {
    const sections = game.categories?.guide?.sections ?? [];

    for (const section of sections) {
      if (!section.children) continue;

      for (const child of section.children) {
        params.push({
          id: game.id,
          content: section.id,
          child: child.id,
        });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const content = (await params).content;
  const child = (await params).child;

  const game = games.find((g) => g.id === id);
  if (!game) return {};

  const resolved = findGuideChild(game, content, child);
  if (!resolved) return {};

  const markdownPath = path.join(
    process.cwd(),
    "src/data/jeux",
    id,
    `${resolved.child.file}.md`,
  );

  let markdown = "";
  try {
    markdown = fs.readFileSync(markdownPath, "utf8");
  } catch {
    return {};
  }

  const { description, body } = extractMarkdownMetadata(markdown);
  const title = extractFirstTitle(body) ?? resolved.child.name;

  const image = `/jeux/${id}/cover.webp`; // conserve l'image actuelle

  return {
    title: `${title} | ${game.name}`,
    description,
    openGraph: {
      title: `${title} | ${game.name}`,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: game.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${game.name}`,
      description,
      images: [image],
    },
  };
}

export default async function GuideChildContentPage({ params }) {
  const id = (await params).id;
  const content = (await params).content;
  const child = (await params).child;

  const game = games.find((g) => g.id === id);
  if (!game) redirect("/");

  const resolved = findGuideChild(game, content, child);
  if (!resolved) redirect(`/jeux/${id}/guide/${content}`);

  const markdownPath = path.join(
    process.cwd(),
    "src/data/jeux",
    id,
    `${resolved.child.file}.md`,
  );

  let markdown = "";
  try {
    markdown = fs.readFileSync(markdownPath, "utf8");
  } catch {
    redirect(`/jeux/${id}/guide/${content}`);
  }

  const { body } = extractMarkdownMetadata(markdown);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20">
      <div className="bg-bg-secondary/60 rounded-2xl p-6 shadow-sm backdrop-blur-sm md:p-8">
        <MarkdownSection content={body} />
      </div>
    </div>
  );
}
