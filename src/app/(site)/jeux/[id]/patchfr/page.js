// app/(site)/jeux/[id]/patchfr/page.js

import { redirect } from "next/navigation";

export default async function PatchFrIndexPage({ params }) {
  const id = (await params).id;

  redirect(`/jeux/${id}/patchfr/telechargement`);
}
