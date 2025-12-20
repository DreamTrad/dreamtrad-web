// app/vndb-fr/page.js
import fs from "fs";
import path from "path";
import DiscoverClient from "./VndbfrClient";

export const dynamic = "force-static";

export async function generateMetadata(_, parent) {
  const parentMetadata = await parent;

  return {
    ...parentMetadata,

    title: 'vndb-fr',
    description: 'Découvrez des Visual Novel disponibles en français.',

    openGraph: {
      ...parentMetadata.openGraph,
      title: 'vndb-fr',
      description: 'Découvrez des Visual Novel disponibles en français.',
      url: '/vndb-fr',
    },
  };
}

export default function VndbfrPage() {
  // Read JSON
  let jsonData = [];
  try {
    const jsonPath = path.join(process.cwd(), "src/data/json/vn_fr_list.json");
    jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  } catch (err) {
    console.error("Erreur lecture vn_fr_list.json :", err);
  }

  let markdown = "";
  try {
    const mdPath = path.join(
      process.cwd(),
      "src/data/markdown/vndb-fr-global.md",
    );
    markdown = fs.readFileSync(mdPath, "utf8");
  } catch {
    console.error("Markdown introuvable pour vndb-fr");
  }

  return <DiscoverClient initialData={jsonData} markdownContent={markdown} />;
}
