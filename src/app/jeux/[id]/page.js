// app/jeux/[id]/page.js
import fs from "fs";
import path from "path";
import { games } from "@/data/jeux";
import { extractMarkdownMetadata } from "@/lib/markdownMetadata";
import MarkdownSection from "@/components/ui/MarkdownSection";
import GameEmbeds from "./GameEmbeds";

export default async function GamePage({ params }) {
  const id = (await params).id;

  const game = games.find((g) => g.id === id);
  if (!game) redirect("/");

  const presentation = game.categories.general.sections.find(
    (s) => s.id === "presentation",
  );
  if (!presentation?.file) redirect("/");

  const mdPath = path.join(
    process.cwd(),
    "src/data/jeux",
    id,
    `${presentation.file}.md`,
  );

  const raw = fs.readFileSync(mdPath, "utf8");
  const { body } = extractMarkdownMetadata(raw);

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 pb-20">
      <div className="bg-bg-secondary/60 rounded-2xl p-6 shadow-sm backdrop-blur-sm md:p-8">
        <MarkdownSection content={body} />
      </div>

      <GameEmbeds embeds={presentation.embeds} />
    </div>
  );
}
