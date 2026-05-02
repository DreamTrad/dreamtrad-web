// app/(site)/jeux/[id]/patchfr/page.js

import { redirect } from "next/navigation";

export const revalidate = 3600; // 1 hour

export default async function PatchFrIndexPage({ params }) {
  const id = (await params).id;

  redirect(`/jeux/${id}/patchfr/telechargement`);
}
