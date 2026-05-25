// app/api/admin/revalidate/route.js

import { revalidatePath } from "next/cache";

export async function POST(req) {
  // -------------------------
  // AUTH CHECK (must be first)
  // -------------------------
  const auth = req.headers.get("authorization");

  if (auth !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // -------------------------
  // BODY PARSING
  // -------------------------
  const body = await req.json();

  const { path, paths } = body;

  if (!path && !paths) {
    return Response.json(
      { error: "Missing path or paths" },
      { status: 400 }
    );
  }

  const list = paths || [path];

  // -------------------------
  // REVALIDATE
  // -------------------------
  for (const p of list) {
    revalidatePath(p);
  }

  return Response.json({ ok: true });
}