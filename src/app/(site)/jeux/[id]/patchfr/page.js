// app/jeux/[id]/patchfr/page.js

import { redirect } from "next/navigation";

export const revalidate = 60 * 60;

export default async function PatchFrIndexPage({ params }) {
  const id = (await params).id;

  redirect(`/jeux/${id}/patchfr/telechargement`);
}
