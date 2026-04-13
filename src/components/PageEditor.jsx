"use client";

import ReactMarkdown from "react-markdown";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import MarkdownSection from "@/components/ui/MarkdownSection";

function MarkdownEditor({ value, onChange, renderMarkdown }) {
  const [mode, setMode] = useState("edit");

  const insert = (before, after = "") => {
    const text = value || "";
    const newText = text + `\n${before}${after}`;
    onChange(newText);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {mode === "edit" && (
            <>
              <button
                type="button"
                onClick={() => insert("## ")}
                className="rounded bg-bg-secondary px-3 py-1"
              >
                H2
              </button>

              <button
                type="button"
                onClick={() => insert("**gras**")}
                className="rounded bg-bg-secondary px-3 py-1"
              >
                Gras
              </button>

              <button
                type="button"
                onClick={() => insert("*italique*")}
                className="rounded bg-bg-secondary px-3 py-1"
              >
                Italique
              </button>

               <button
                type="button"
                onClick={() => insert("\n:::spoiler[le spoil]\n\n:::\n")}
                className="rounded bg-bg-secondary px-3 py-1"
              >
                Spoiler
              </button>
            </>
          )}
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={() =>
            setMode((prev) => (prev === "edit" ? "preview" : "edit"))
          }
          className="rounded bg-accent px-4 py-1 text-white"
        >
          {mode === "edit" ? "Preview" : "Éditer"}
        </button>
      </div>

      {/* Content */}
      {mode === "edit" ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="bg-bg-secondary w-full rounded p-2 font-mono"
          rows={16}
        />
      ) : (
        <div className="bg-bg-secondary rounded p-4">
          <MarkdownSection content={value || ""} />
        </div>
      )}
    </div>
  );
}


export default function PageEditor({
  title = "Édition de la page",
  slug,
  file,

  // Fields control (default: false)
  editTitle = false,
  editDescription = false,
  editContent = false,
  editIsVisible = false,
  editAlias = false,
}) {
  const [draft, setDraft] = useState(null);
  const [original, setOriginal] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    fetchPage();
  }, [slug, file]);

  useEffect(() => {
    if (!draft || !original) return;

    const fields = getEditableFields();
    const hasChanged = fields.some((field) => draft[field] !== original[field]);

    setIsDirty(hasChanged);
  }, [draft, original]);

  const getEditableFields = () => {
    const fields = [];
    if (editTitle) fields.push("title");
    if (editDescription) fields.push("description");
    if (editContent) fields.push("content");
    if (editIsVisible) fields.push("is_visible");
    if (editAlias) fields.push("alias");
    return fields;
  };

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
    const fields = getEditableFields();

    // Build dynamic update object
    const updateData = {};
    fields.forEach((field) => {
      updateData[field] = draft[field];
    });

    const { error } = await supabase
      .from("pages")
      .update(updateData)
      .eq("slug", slug)
      .eq("file", file);

    if (error) {
      console.error("error:", error);
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
      {editTitle && (
        <div>
          <label className="text-sm">Titre</label>
          <input
            value={draft.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            className="bg-bg-secondary w-full rounded p-2"
          />
        </div>
      )}

      {/* Description */}
      {editDescription && draft.type !== "infobox" && (
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
      {editContent && (
        <div>
          <label className="text-sm">Contenu (Markdown)</label>
          <MarkdownEditor
            value={draft.content}
            onChange={(val) => updateField("content", val)}
          />
        </div>
      )}

      {/* is_visible */}
      {editIsVisible && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={draft.is_visible || false}
            onChange={(e) => updateField("is_visible", e.target.checked)}
          />
          <label className="text-sm">Visible</label>
        </div>
      )}

      {/* alias */}
      {editAlias && (
        <div>
          <label className="text-sm">Alias</label>
          <input
            value={draft.alias || ""}
            onChange={(e) => updateField("alias", e.target.value)}
            className="bg-bg-secondary w-full rounded p-2"
          />
        </div>
      )}

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
