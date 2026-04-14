"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import StorageImageEditor from "@/components/StorageImageEditor";
import MarkdownEditor from "@/components/MarkdownEditor";

export default function AdminStaffCard({ member, onUpdated }) {
  const [draft, setDraft] = useState(member);
  const [initial, setInitial] = useState(member);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setDraft(member);
    setInitial(member);
  }, [member]);

  const checkDirty = (newData) =>
    JSON.stringify(newData) !== JSON.stringify(initial);

  const updateField = (field, value) => {
    const newData = { ...draft, [field]: value };
    setDraft(newData);
    setIsDirty(checkDirty(newData));
  };

  const reset = () => {
    setDraft(initial);
    setIsDirty(false);
  };

  const save = async () => {
    const { error } = await supabase
      .from("staffs")
      .update({
        name: draft.name,
        text: draft.text,
        is_visible: draft.is_visible,
      })
      .eq("id", draft.id);

    if (error) {
      console.error(error);
      return;
    }

    setInitial(draft);
    setIsDirty(false);
    onUpdated?.();
  };

  const remove = async () => {
    if (!confirm("Supprimer ce membre ?")) return;

    await supabase.from("staffs").delete().eq("id", draft.id);
    onUpdated?.();
  };

  return (
    <div className="bg-bg-tertiary border-bg-secondary flex flex-col gap-4 rounded-xl border p-6">
      {/* HEADER */}
      <div className="flex items-start gap-4">
        {/* IMAGE */}
        <div className="h-20 w-20 shrink-0">
          <StorageImageEditor
            imagePath={`staff/${draft.id}.webp`}
            previewClassName="h-full w-full rounded-lg object-cover"
            minimal
          />
        </div>

        {/* MAIN INFOS */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="text-text-tertiary text-xs">{draft.id}</div>

            <label className="flex items-center gap-2 text-sm">
              <span>Visible</span>
              <input
                type="checkbox"
                checked={draft.is_visible || false}
                onChange={(e) => updateField("is_visible", e.target.checked)}
              />
            </label>
          </div>

          <input
            value={draft.name || ""}
            onChange={(e) => updateField("name", e.target.value)}
            className="text-accent border-b border-transparent bg-transparent text-xl font-bold outline-none"
          />
        </div>
      </div>

      {/* DESCRIPTION (MARKDOWN) */}
      <MarkdownEditor
        value={draft.text}
        onChange={(val) => updateField("text", val)}
      />

      {/* ACTIONS */}
      <div className="flex justify-between gap-2">
        <button
          onClick={remove}
          className="bg-error rounded px-4 py-2 text-sm text-white"
        >
          Supprimer
        </button>
        {isDirty && (
          <div className="flex gap-2">
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
          </div>
        )}
      </div>
    </div>
  );
}
