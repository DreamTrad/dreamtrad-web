// app/jeux/[id]/patchfr/page.js
import { games } from "@/data/jeux";
import { redirect, notFound } from "next/navigation";

export const dynamic = "force-static";

export default async function PatchFrIndexPage({ params }) {
  const id = (await params).id;

  const game = games.find((g) => g.id === id);
  if (!game) notFound();

  const patchfr = game.categories.patchfr;
  if (!patchfr || patchfr.sections.length === 0) notFound();

  const firstSection = patchfr.sections[0];

  redirect(`/jeux/${id}/patchfr/${firstSection.id}`);
}
