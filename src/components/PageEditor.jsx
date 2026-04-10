"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function PageEditor({
  title = "Édition de la page",
  slug,
  file = "page",
}) {
  const [draft, setDraft] = useState(null);
  const [original, setOriginal] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    fetchPage();
  }, [slug]);

  useEffect(() => {
    if (!draft || !original) return;
    setIsDirty(JSON.stringify(draft) !== JSON.stringify(original));
  }, [draft, original]);

  const fetchPage = async () => {
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .eq("file", file)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setDraft(data);
    setOriginal(data);
  };

  const updateField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const save = async () => {
    console.log("Saving:", draft);
    const { data, error } = await supabase
      .from("pages")
      .update({
        title: draft.title,
        description: draft.description,
        content: draft.content,
      })
      .eq("slug", slug)
      .eq("file", file);

    if (error) {
        console.log("result:", data, error);
      return;
    }

    setOriginal(draft);
    setIsDirty(false);
  };

  const reset = () => {
    setDraft(original);
  };

  if (!draft) return <div className="p-6">Chargement...</div>;

  return (
    <div className="bg-bg-tertiary border-bg-secondary flex flex-col gap-6 rounded-xl border p-6">
      <h1 className="text-center text-lg font-bold">{title}</h1>
      {/* Title */}
      <div>
        <label className="text-sm">Titre</label>
        <input
          value={draft.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
          className="bg-bg-secondary w-full rounded p-2"
        />
      </div>

      {/* Description */}
      {draft.type !== "infobox" && (
        <div>
          <label className="text-sm">Description</label>
          <input
            value={draft.description || ""}
            onChange={(e) => updateField("description", e.target.value)}
            className="bg-bg-secondary w-full rounded p-2"
          />
        </div>
      )}

      {/* Content */}
      <div>
        <label className="text-sm">Contenu (Markdown)</label>
        <textarea
          value={draft.content || ""}
          onChange={(e) => updateField("content", e.target.value)}
          className="bg-bg-secondary w-full rounded p-2 font-mono"
          rows={14}
        />
      </div>

      {/* Actions */}
      {isDirty && (
        <div className="flex justify-end gap-2">
          <button
            onClick={reset}
            className="bg-text-tertiary rounded px-4 py-2"
          >
            Reset
          </button>
          <button
            onClick={save}
            className="bg-success rounded px-4 py-2 text-white"
          >
            Enregistrer
          </button>
        </div>
      )}
    </div>
  );
}
