"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateArticleModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const slugify = (text) => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleCreate = async () => {
    const slug = slugify(title);
    if (!slug) return;

    setLoading(true);

    const { error } = await supabase.from("articles").insert({
      id: slug,
      slug: slug,
      title: title,
      content: "",
      is_visible: false,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      return;
    }

    setOpen(false);
    setTitle("");

    // Client-side navigation
    router.push(`/admin/articles/${slug}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-accent rounded px-4 py-2 text-white"
      >
        + Nouvel article
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-bg-tertiary flex w-full max-w-md flex-col gap-4 rounded-xl p-6">
            <h2 className="text-lg font-bold">Créer un article</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de l’article"
              className="bg-bg-secondary rounded p-2"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="bg-text-tertiary rounded px-4 py-2"
              >
                Annuler
              </button>

              <button
                onClick={handleCreate}
                disabled={loading}
                className="bg-accent rounded px-4 py-2 text-white disabled:opacity-50"
              >
                {loading ? "Création..." : "Créer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
