// app/api/admin/revalidate/route.js

import { revalidatePath } from "next/cache";

export async function POST(req) {
  const body = await req.json();

  const { path, paths } = body;

  if (!path && !paths) {
    return Response.json(
      { error: "Missing path or paths" },
      { status: 400 }
    );
  }

  const list = paths || [path];

  for (const p of list) {
    revalidatePath(p);
  }

  return Response.json({ ok: true });
}