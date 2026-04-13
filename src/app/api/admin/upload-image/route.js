// app/api/admin/upload-image/route.js

import sharp from "sharp";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const path = formData.get("path");

  const buffer = Buffer.from(await file.arrayBuffer());

  // Convert + compress to webp
  const webpBuffer = await sharp(buffer)
    .webp({ quality: 75, effort: 4 })
    .toBuffer();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error } = await supabase.storage
    .from("images")
    .upload(path, webpBuffer, {
      upsert: true,
      contentType: "image/webp",
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}