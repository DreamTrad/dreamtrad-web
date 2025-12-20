// app/jeux/[id]/page.js
import fs from "fs";
import path from "path";
import { extractMarkdownMetadata } from "@/lib/markdownMetadata";
import MarkdownSection from "@/components/ui/MarkdownSection";

export default async function GamePage({ params }) {
  const id = (await params).id;
  const mdPath = path.join(
    process.cwd(),
    "src/data/jeux",
    id,
    "general",
    "presentation.md",
  );

  const raw = fs.readFileSync(mdPath, "utf8");
  const { body } = extractMarkdownMetadata(raw);

  return <MarkdownSection content={body} />;
}
