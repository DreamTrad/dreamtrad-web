// app/jeux/[id]/guide/page.js
import { games } from "@/data/jeux";
import { redirect, notFound } from "next/navigation";

export const dynamic = "force-static";

export default async function GuideIndexPage({ params }) {
  const id = (await params).id;

  const game = games.find((g) => g.id === id);
  if (!game) notFound();

  const guide = game.categories.guide;
  if (!guide || guide.sections.length === 0) notFound();

  const firstSection = guide.sections[0];

  // Case: section with children
  if (firstSection.children && firstSection.children.length > 0) {
    redirect(
      `/jeux/${id}/guide/${firstSection.id}/${firstSection.children[0].id}`,
    );
  }

  // Case: simple section
  redirect(`/jeux/${id}/guide/${firstSection.id}`);
}
