// app/(site)/jeux/[id]/page.js

import { redirect } from "next/navigation";


export default async function AdminGamePage({ params }) {
  const id = (await params).id;

  redirect(`${id}/patchfr`);
}
