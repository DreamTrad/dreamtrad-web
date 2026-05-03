"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import StorageImageEditor from "@/components/StorageImageEditor";

export default function TeamMemberAdminCard({ member, onUpdated }) {
  const [draft, setDraft] = useState(member);
  const [original, setOriginal] = useState(member);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setDraft(member);
    setOriginal(member);
  }, [member]);

  useEffect(() => {
    setIsDirty(JSON.stringify(draft) !== JSON.stringify(original));
  }, [draft, original]);

  const updateField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const updateSkill = (index, value) => {
    const updated = [...(draft.skills || [])];
    updated[index] = value;
    updateField("skills", updated);
  };

  const addSkill = () => {
    updateField("skills", [...(draft.skills || []), ""]);
  };

  const removeSkill = (index) => {
    const updated = draft.skills.filter((_, i) => i !== index);
    updateField("skills", updated);
  };

  const updateLink = (index, value) => {
    const updated = [...(draft.links || [])];
    updated[index] = value;
    updateField("links", updated);
  };

  const addLink = () => {
    updateField("links", [...(draft.links || []), ""]);
  };

  const removeLink = (index) => {
    const updated = draft.links.filter((_, i) => i !== index);
    updateField("links", updated);
  };

  const save = async () => {
    await supabase.from("members").upsert(draft, {
      onConflict: "id",
    });

    setOriginal(draft);
    setIsDirty(false);
    onUpdated?.();
    await publish();
  };

  const reset = () => {
    setDraft(original);
  };

  const publish = async () => {
    const { data } = await supabase
      .from("staff_projects")
      .select("project_id")
      .eq("staff_id", draft.id);

    const projectIds = data?.map((p) => p.project_id) || [];

    const paths = [
      "/equipe",
      ...projectIds.map((id) => `/jeux/${id}/patchfr/equipe`),
    ];

    await fetch("/api/admin/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths }),
    });
  };



  return (
    <div className="bg-bg-tertiary border-bg-secondary flex flex-col gap-6 rounded-xl border p-6 shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="group relative aspect-square h-20 w-20">
            <StorageImageEditor imagePath={`/team/${member.id}.webp`}>
              {({ imageUrl, openFilePicker }) => (
                <img
                  src={imageUrl}
                  onClick={openFilePicker}
                  className="border-bg-secondary h-full w-full cursor-pointer rounded-lg border object-cover"
                />
              )}
            </StorageImageEditor>
          </div>
          <div>
            <div className="flex gap-6">
              <div className="text-text-tertiary text-xs">{draft.id}</div>

              <div className="flex items-center gap-2">
                <span className="text-sm">Visible sur la page équipe</span>
                <input
                  type="checkbox"
                  checked={draft.is_important || false}
                  onChange={(e) =>
                    updateField("is_important", e.target.checked)
                  }
                />
              </div>
            </div>

            <input
              value={draft.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
              className="text-accent focus:border-accent border-b border-transparent bg-transparent text-xl font-bold transition outline-none"
            />

            <div className="mt-2 flex flex-wrap gap-2">
              {draft.skills?.map((skill, i) => (
                <div
                  key={i}
                  className="bg-bg-secondary text-text-secondary flex items-center gap-1 rounded-md px-2 py-1 text-xs"
                >
                  <input
                    value={skill}
                    onChange={(e) => updateSkill(i, e.target.value)}
                    className="bg-transparent outline-none"
                  />
                  <button onClick={() => removeSkill(i)} className="text-error">
                    ✕
                  </button>
                </div>
              ))}

              <button
                onClick={addSkill}
                className="bg-accent rounded px-2 py-1 text-xs text-white"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2">
        {draft.links?.map((link, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={link}
              onChange={(e) => updateLink(i, e.target.value)}
              className="bg-bg-secondary flex-1 rounded px-2 py-1 text-sm"
            />
            <button
              onClick={() => removeLink(i)}
              className="bg-error rounded px-2 text-white"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={addLink}
          className="bg-accent w-fit rounded px-3 py-1 text-sm text-white"
        >
          + Ajouter un lien
        </button>
      </div>

      {/* Actions */}
      <div className="mt-auto flex justify-between gap-2">
        <button
          onClick={async () => {
            if (!confirm("Supprimer ce membre ?")) return;

            await supabase.from("members").delete().eq("id", original.id);
            onUpdated?.();
            await publish();
          }}
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
              Valider
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
