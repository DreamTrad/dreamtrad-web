"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import MarkdownEditor from "@/components/MarkdownEditor";
import GuideImagesManager from "./GuideImagesManager";

export default function GuideEditAdminPage() {
  const { guide_id, id: gameId } = useParams();

  const [draft, setDraft] = useState(null);
  const [original, setOriginal] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchPage();
  }, []);

  useEffect(() => {
    if (!draft || !original) return;
    setIsDirty(JSON.stringify(draft) !== JSON.stringify(original));
  }, [draft, original]);

  const fetchPage = async () => {
    const { data } = await supabase
      .from("pages")
      .select("*")
      .eq("id", guide_id)
      .single();

    if (data) {
      setDraft(data);
      setOriginal(data);
    }
  };

  const updateField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const save = async () => {
    await supabase
      .from("pages")
      .update({
        title: draft.title,
        description: draft.description,
        content: draft.content,
        file: draft.file,
        alias: draft.alias,
        is_visible: draft.is_visible,
      })
      .eq("id", guide_id);

    await publishOnUpdate();
    setOriginal(draft);
    setIsDirty(false);
  };

  const reset = () => {
    setDraft(original);
  };

  const remove = async () => {
    if (!confirm("Supprimer cette page ?")) return;

    await supabase.from("pages").delete().eq("id", guide_id);
    await publishOnDelete();
    router.push(`/admin/jeux/${gameId}/guide`);
  };

  const publishOnUpdate = async () => {
    const paths = [
      `/jeux/${gameId}`,
      `/jeux/${id}/guide`,
      `/jeux/${draft.slug}/${draft.file}`,
      `/jeux/${original.slug}/${original.file}`,
    ];

    const uniquePaths = [...new Set(paths)];

    await fetch("/api/admin/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths: uniquePaths }),
    });
  };

  const publishOnDelete = async () => {
    await fetch("/api/admin/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paths: [`/jeux/${gameId}`, `/jeux/${original.slug}/${original.file}`],
      }),
    });
  };

  if (!draft) return <div className="p-6">Chargement...</div>;

  return (
    <div className="mx-auto max-w-5xl p-6">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => router.push(`/admin/jeux/${gameId}/guide`)}
          className="bg-bg-secondary rounded px-4 py-2 text-sm"
        >
          ← Retour
        </button>

        <div className="flex gap-2">
          <button
            onClick={remove}
            className="bg-error rounded px-4 py-2 text-sm text-white"
          >
            Supprimer
          </button>

          {isDirty && (
            <>
              <button
                onClick={reset}
                className="bg-text-tertiary rounded px-4 py-2 text-sm"
              >
                Reset
              </button>
              <button
                onClick={save}
                className="bg-success rounded px-4 py-2 text-sm text-white"
              >
                Enregistrer
              </button>
            </>
          )}
        </div>
      </div>

      <h1 className="text-accent mb-6 text-2xl font-bold">Modifier le guide</h1>

      <div className="bg-bg-tertiary border-bg-secondary flex flex-col gap-6 rounded-xl border p-6">
        {/* TITLE */}
        <div>
          <label className="text-sm">Titre</label>
          <input
            value={draft.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            className="bg-bg-secondary w-full rounded p-2"
          />
        </div>

        {/* ALIAS */}
        <div>
          <label className="text-sm">Alias (dans le menu)</label>
          <input
            value={draft.alias || ""}
            onChange={(e) => updateField("alias", e.target.value)}
            className="bg-bg-secondary w-full rounded p-2"
          />
        </div>

        {/* FILE */}
        <div>
          <label className="text-sm">Nom du fichier dans l’url</label>
          <input
            value={draft.file || ""}
            onChange={(e) => updateField("file", e.target.value)}
            className="bg-bg-secondary w-full rounded p-2"
          />
        </div>

        {/* VISIBILITY */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Visible sur le site</span>
          <input
            type="checkbox"
            checked={draft.is_visible || false}
            onChange={(e) => updateField("is_visible", e.target.checked)}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm">Description</label>
          <textarea
            value={draft.description || ""}
            onChange={(e) => updateField("description", e.target.value)}
            className="bg-bg-secondary w-full rounded p-2"
            rows={4}
          />
        </div>
        <GuideImagesManager pageId={guide_id} gameId={gameId} />
        {/* CONTENT */}
        <div>
          <MarkdownEditor
            value={draft.content}
            onChange={(val) => updateField("content", val)}
          />
        </div>

        {/* ACTIONS */}
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
              Valider
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
