// app/api/admin/revalidate/route.js

import { revalidatePath } from "next/cache";

export async function POST(req) {
  const body = await req.json();

  const { path } = body;

  if (!path) {
    return Response.json({ error: "Missing path" }, { status: 400 });
  }

  revalidatePath(path);

  return Response.json({ ok: true });
}