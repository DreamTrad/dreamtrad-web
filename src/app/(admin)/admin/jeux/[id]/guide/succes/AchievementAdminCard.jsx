"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import StorageImageEditor from "@/components/StorageImageEditor";

export default function AchievementAdminCard({ achievement, onUpdated }) {
  const [draft, setDraft] = useState(achievement);
  const [original, setOriginal] = useState(achievement);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setDraft(achievement);
    setOriginal(achievement);
  }, [achievement]);

  useEffect(() => {
    setIsDirty(JSON.stringify(draft) !== JSON.stringify(original));
  }, [draft, original]);

  const updateField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const save = async () => {
    await supabase
      .from("achievements")
      .update({
        title_fr: draft.title_fr,
        title_og: draft.title_og,
        description_fr: draft.description_fr,
        description_og: draft.description_og,
        resolution: draft.resolution,
        hidden: draft.hidden,
      })
      .eq("id", draft.id)
      .eq("project_id", draft.project_id);

    setOriginal(draft);
    setIsDirty(false);
    onUpdated?.();
  };

  const remove = async () => {
    if (!confirm("Supprimer ce succès ?")) return;

    await supabase
      .from("achievements")
      .delete()
      .eq("id", draft.id)
      .eq("project_id", draft.project_id);

    onUpdated?.();
  };

  return (
    <div className="bg-bg-tertiary border-bg-secondary flex flex-col gap-5 rounded-xl border p-6 shadow-md">

      {/* HEADER */}
      <div className="flex items-start gap-4">

        {/* IMAGE */}
        <div className="group relative h-20 w-20 shrink-0">
          <StorageImageEditor
            imagePath={`/jeux/${draft.project_id}/guide/succes/${draft.id}.webp`}
          >
            {({ imageUrl, openFilePicker }) => (
              <img
                src={imageUrl}
                onClick={openFilePicker}
                className="border-bg-secondary h-full w-full cursor-pointer rounded-lg border object-cover"
              />
            )}
          </StorageImageEditor>
        </div>

        {/* MAIN INFO */}
        <div className="flex flex-1 flex-col gap-3">

          {/* ID */}
          <div className="text-text-tertiary text-xs">
            Identifiant (non modifiable) : {draft.id}
          </div>

          {/* VISIBILITY */}
          <label className="flex items-center gap-2 text-sm">
            <span>Succès caché</span>
            <input
              type="checkbox"
              checked={draft.hidden || false}
              onChange={(e) => updateField("hidden", e.target.checked)}
            />
          </label>

          {/* TITLES */}
          <div className="flex flex-col gap-2">
            <label className="text-text-tertiary text-xs">
              Titre en français
            </label>
            <input
              value={draft.title_fr || ""}
              onChange={(e) => updateField("title_fr", e.target.value)}
              className="bg-bg-secondary rounded px-3 py-2 text-sm"
            />

            <label className="text-text-tertiary text-xs">
              Titre original (anglais / langue source)
            </label>
            <input
              value={draft.title_og || ""}
              onChange={(e) => updateField("title_og", e.target.value)}
              className="bg-bg-secondary rounded px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* DESCRIPTIONS */}
      <div className="flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-text-tertiary text-xs">
            Description originale
          </label>
          <textarea
            value={draft.description_og || ""}
            onChange={(e) => updateField("description_og", e.target.value)}
            className="bg-bg-secondary rounded p-3 text-sm"
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-text-tertiary text-xs">
            Description en français
          </label>
          <textarea
            value={draft.description_fr || ""}
            onChange={(e) => updateField("description_fr", e.target.value)}
            className="bg-bg-secondary rounded p-3 text-sm"
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-text-tertiary text-xs">
            Méthode d’obtention du succès
          </label>
          <textarea
            value={draft.resolution || ""}
            onChange={(e) => updateField("resolution", e.target.value)}
            className="bg-bg-secondary rounded p-3 text-sm"
            rows={2}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between">

        <button
          onClick={remove}
          className="bg-error rounded px-4 py-2 text-sm text-white"
        >
          Supprimer
        </button>

        {isDirty && (
          <div className="flex gap-2">
            <button
              onClick={() => setDraft(original)}
              className="bg-text-tertiary rounded px-4 py-2 text-sm"
            >
              Reset
            </button>

            <button
              onClick={save}
              className="bg-success rounded px-4 py-2 text-sm text-white"
            >
              Valider
            </button>
          </div>
        )}
      </div>
    </div>
  );
}