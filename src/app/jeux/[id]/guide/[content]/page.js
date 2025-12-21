// app/jeux/[id]/guide/[content]/page.js
import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { games } from "@/data/jeux";
import MarkdownSection from "@/components/ui/MarkdownSection";
import {
  extractMarkdownMetadata,
  extractFirstTitle,
} from "@/lib/markdownMetadata";

function findGuideSection(game, contentId) {
  return game.categories?.guide?.sections?.find(
    (section) => section.id === contentId,
  );
}

export async function generateStaticParams() {
  const params = [];

  for (const game of games) {
    const sections = game.categories?.guide?.sections ?? [];

    for (const section of sections) {
      params.push({
        id: game.id,
        content: section.id,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const content = (await params).content;

  const game = games.find((g) => g.id === id);
  if (!game) return {};

  const section = findGuideSection(game, content);
  if (!section?.file) return {};

  const markdownPath = path.join(
    process.cwd(),
    "src/data/jeux",
    id,
    `${section.file}.md`,
  );

  let markdown = "";
  try {
    markdown = fs.readFileSync(markdownPath, "utf8");
  } catch {
    return {};
  }

  const { description, body } = extractMarkdownMetadata(markdown);
  const title = extractFirstTitle(body) ?? section.name;

  return {
    title: `${title} | ${game.name}`,
    description,
  };
}

export default async function GuideContentPage({ params }) {
  const id = (await params).id;
  const content = (await params).content;

  const game = games.find((g) => g.id === id);
  if (!game) redirect("/");

  const section = findGuideSection(game, content);
  if (!section?.file) redirect(`/jeux/${id}/guide`);

  const markdownPath = path.join(
    process.cwd(),
    "src/data/jeux",
    id,
    `${section.file}.md`,
  );

  let markdown = "";
  try {
    markdown = fs.readFileSync(markdownPath, "utf8");
  } catch {
    redirect(`/jeux/${id}/guide`);
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
