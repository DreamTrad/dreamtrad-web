// app/api/admin/upload-image/route.js

import sharp from "sharp";
import { NextResponse } from "next/server";
import { createStaticClient } from "@lib/supabase/public";
import { createClient } from "@/lib/supabase/server";

export async function POST(req) {

  // 1. AUTH CHECK (same logic as admin layout)
  const supabaseAdmin = await createClient();

  const {
    data: { user },
  } = await supabaseAdmin.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const path = formData.get("path");

  const buffer = Buffer.from(await file.arrayBuffer());

  // Convert + compress to webp
  const webpBuffer = await sharp(buffer)
    .webp({ quality: 75, effort: 4 })
    .toBuffer();

  const supabase = createStaticClient();

  const { error } = await supabase.storage
    .from("images")
    .upload(path, webpBuffer, {
      upsert: true,
      cacheControl: "31536000",
      contentType: "image/webp",
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}