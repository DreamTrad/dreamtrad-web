// src\app\(admin)\admin\articles\[id]\page.js
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import StorageImageEditor from "@/components/StorageImageEditor";
import MarkdownEditor from "@/components/MarkdownEditor";
import ArticleImagesManager from "./ArticleImagesManager";

export default function ArticleAdminPage() {
  const params = useParams();
  const id = params.id;

  const [article, setArticle] = useState(null);
  const [draft, setDraft] = useState(null);
  const [original, setOriginal] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchArticle();
  }, []);

  useEffect(() => {
    if (!draft || !original) return;
    setIsDirty(JSON.stringify(draft) !== JSON.stringify(original));
  }, [draft, original]);

  const fetchArticle = async () => {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      setArticle(data);
      setDraft({
        ...data,
        authors: data.authors || [],
        tags: data.tags || [],
      });
      setOriginal(data);
    }
  };

  const updateField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const updateList = (field, index, value) => {
    const updated = [...(draft[field] || [])];
    updated[index] = value;
    updateField(field, updated);
  };

  const addItem = (field) => {
    updateField(field, [...(draft[field] || []), ""]);
  };

  const removeItem = (field, index) => {
    const updated = draft[field].filter((_, i) => i !== index);
    updateField(field, updated);
  };

  const save = async () => {
    await supabase
      .from("articles")
      .update({
        title: draft.title,
        authors: draft.authors,
        date: draft.date,
        tags: draft.tags,
        excerpt: draft.excerpt,
        content: draft.content,
        is_visible: draft.is_visible,
      })
      .eq("id", id);

    setOriginal(draft);
    setIsDirty(false);
  };

  const reset = () => {
    setDraft(original);
  };

  if (!draft) return <div className="p-6">Chargement...</div>;

  return (
    <div className="mx-auto max-w-5xl p-6">
      {/* Header actions */}
      <div className="mb-4 flex items-center justify-between">
        {/* Left */}
        <button
          onClick={() => router.push(`/admin/articles`)}
          className="bg-bg-secondary rounded px-4 py-2 text-sm"
        >
          ← Retour
        </button>

        {/* Right */}
        <div className="flex gap-2">
          <button
            onClick={async () => {
              if (!confirm("Supprimer cet article ?")) return;

              await supabase.from("articles").delete().eq("id", id);
              window.location.href = "/admin/articles";
            }}
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
      <h1 className="text-accent mb-6 text-2xl font-bold">
        Modifier l’article
      </h1>

      <div className="bg-bg-tertiary border-bg-secondary flex flex-col gap-6 rounded-xl border p-6">
        {/* Top row */}
        <div className="flex items-start justify-between gap-6">
          {/* Title */}
          <div className="flex-1">
            <label className="text-sm">Titre</label>
            <input
              value={draft.title || ""}
              onChange={(e) => updateField("title", e.target.value)}
              className="bg-bg-secondary w-full rounded p-2"
            />
          </div>

          {/* Visible */}
          <div className="flex items-center gap-2 pt-6">
            <span className="text-sm">Visible</span>
            <input
              type="checkbox"
              checked={draft.is_visible || false}
              onChange={(e) => updateField("is_visible", e.target.checked)}
            />
          </div>
        </div>

        <div className="bg-bg-secondary rounded-xl p-4">
          <h3 className="mb-3 text-sm font-medium">
            Image principale de l’article
          </h3>

          <div className="group relative overflow-hidden rounded-lg">
            <StorageImageEditor
              imagePath={`/articles-content/${id}/cover.webp`}
            >
              {({ imageUrl, openFilePicker }) => (
                <img
                  src={imageUrl}
                  onClick={openFilePicker}
                  className="mb-6 w-full cursor-pointer rounded-lg"
                />
              )}
            </StorageImageEditor>
          </div>
        </div>

        {/* Middle row */}
        <div className="grid grid-cols-3 gap-6">
          {/* Date */}
          <div>
            <label className="text-sm">Date</label>
            <input
              type="date"
              value={draft.date || ""}
              onChange={(e) => updateField("date", e.target.value)}
              className="bg-bg-secondary w-full rounded p-2"
            />
          </div>
          {/* Authors */}
          <div>
            <label className="text-sm">Auteurs</label>
            <div className="flex flex-col gap-2">
              {draft.authors.map((a, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={a}
                    onChange={(e) => updateList("authors", i, e.target.value)}
                    className="bg-bg-secondary flex-1 rounded p-2"
                  />
                  <button
                    onClick={() => removeItem("authors", i)}
                    className="bg-error rounded px-2 text-white"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() => addItem("authors")}
                className="bg-accent w-fit rounded px-2 py-1 text-xs text-white"
              >
                +
              </button>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm">Tags</label>
            <div className="flex flex-col gap-2">
              {draft.tags.map((tag, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={tag}
                    onChange={(e) => updateList("tags", i, e.target.value)}
                    className="bg-bg-secondary flex-1 rounded p-2"
                  />
                  <button
                    onClick={() => removeItem("tags", i)}
                    className="bg-error rounded px-2 text-white"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() => addItem("tags")}
                className="bg-accent w-fit rounded px-2 py-1 text-xs text-white"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="text-sm">Excerpt</label>
          <textarea
            value={draft.excerpt || ""}
            onChange={(e) => updateField("excerpt", e.target.value)}
            className="bg-bg-secondary w-full rounded p-2"
            rows={4}
          />
        </div>

        {/* Content */}
        <div>
          <MarkdownEditor
            value={draft.content}
            onChange={(val) => updateField("content", val)}
          />
        </div>

        {/* Actions */}
        {isDirty && (
          <div className="mt-2 flex justify-end gap-2">
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

        <ArticleImagesManager articleId={id} />
      </div>
    </div>
  );
}
