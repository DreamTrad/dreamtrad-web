import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/service";

export async function GET(req) {
  const authResponse = await authenticate();
  if (authResponse) return authResponse;

  const params = new URL(req.url).searchParams;
  const pageResponse = await findPage(params.get("slug"), params.get("file"));
  if (pageResponse.error) {
    return NextResponse.json(
      { error: pageResponse.error },
      { status: pageResponse.status },
    );
  }

  const { data, error } = await supabaseAdmin
    .from("page_images")
    .select("*")
    .eq("page_id", pageResponse.page.id)
    .order("created_at");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ images: data || [] });
}

export async function POST(req) {
  const authResponse = await authenticate();
  if (authResponse) return authResponse;

  const { slug, file, name } = await req.json();
  const cleanName = typeof name === "string" ? name.trim() : "";
  if (!cleanName) {
    return NextResponse.json({ error: "Le nom est requis." }, { status: 400 });
  }

  const pageResponse = await findPage(slug, file);
  if (pageResponse.error) {
    return NextResponse.json(
      { error: pageResponse.error },
      { status: pageResponse.status },
    );
  }

  const { data, error } = await supabaseAdmin
    .from("page_images")
    .insert({ page_id: pageResponse.page.id, name: cleanName })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ image: data }, { status: 201 });
}

export async function DELETE(req) {
  const authResponse = await authenticate();
  if (authResponse) return authResponse;

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "L’identifiant est requis." }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("page_images")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

async function authenticate() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

async function findPage(slug, file) {
  if (!slug || !file) {
    return { error: "Le slug et le fichier sont requis.", status: 400 };
  }

  const { data: page, error } = await supabaseAdmin
    .from("pages")
    .select("id")
    .eq("slug", slug)
    .eq("file", file)
    .single();

  if (error || !page) {
    return { error: error?.message || "Page introuvable.", status: 404 };
  }

  return { page };
}