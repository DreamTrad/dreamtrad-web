"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function RoleCategoryEditor({
  role,
  label,
  items,
  members,
  projectId,
  refresh,
}) {
  const [newMemberId, setNewMemberId] = useState("");
  const [existingComment, setExistingComment] = useState("");
  const [createComment, setCreateComment] = useState("");
  const [newName, setNewName] = useState("");

  const updateComment = async (member_id, comment) => {
    await supabase
      .from("project_roles")
      .update({ comment })
      .eq("member_id", member_id)
      .eq("project_id", projectId)
      .eq("role", role);

    refresh();
  };

  const remove = async (member_id) => {
    await supabase
      .from("project_roles")
      .delete()
      .eq("member_id", member_id)
      .eq("project_id", projectId)
      .eq("role", role);

    refresh();
    await publish();
  };

  const addExisting = async () => {
    if (!newMemberId) return;

    await supabase.from("project_roles").insert({
      member_id: newMemberId,
      project_id: projectId,
      role,
      comment: existingComment,
    });

    setNewMemberId("");
    setExistingComment("");
    refresh();
    await publish();
  };

  const createAndAdd = async () => {
    if (!newName) return;

    const { data } = await supabase
      .from("members")
      .insert({
        id: newName.toLowerCase().replace(/\s+/g, "_"),
        name: newName,
      })
      .select()
      .single();

    if (!data) return;

    await supabase.from("project_roles").insert({
      member_id: data.id,
      project_id: projectId,
      role,
      comment: createComment,
    });

    setNewName("");
    setCreateComment("");
    refresh();
    await publish();
  };

  const publish = async () => {
    await fetch("/api/admin/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paths: [`/jeux/${projectId}/patchfr/equipe`],
      }),
    });
  };

  // Sort existing items by member name
  const sortedItems = [...items].sort((a, b) =>
    (a.members?.name || "").localeCompare(b.members?.name || "")
  );

  // Sort members for select
  const sortedMembers = [...members].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="bg-bg-tertiary rounded-xl p-4 space-y-4">
      <h2 className="text-lg font-bold">{label}</h2>

      {/* EXISTING */}
      {sortedItems.map((item) => (
        <div key={item.member_id} className="flex gap-2 items-center">
          <span className="w-40">{item.members?.name}</span>

          <input
            placeholder="Commentaire"
            defaultValue={item.comment || ""}
            onBlur={(e) =>
              updateComment(item.member_id, e.target.value)
            }
            className="bg-bg-secondary flex-1 rounded p-1"
          />

          <button
            onClick={() => remove(item.member_id)}
            className="bg-error rounded px-2 text-white transition hover:bg-red-600 active:scale-95"
          >
            ✕
          </button>
        </div>
      ))}

      {/* ADD EXISTING */}
      <div className="flex gap-2">
        <select
          value={newMemberId}
          onChange={(e) => setNewMemberId(e.target.value)}
          className="bg-bg-secondary rounded p-1"
        >
          <option value="">Ajouter membre existant</option>
          {sortedMembers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Commentaire"
          value={existingComment}
          onChange={(e) => setExistingComment(e.target.value)}
          className="bg-bg-secondary rounded p-1"
        />

        <button
          onClick={addExisting}
          className="bg-accent hover:bg-accent/80 rounded px-2 py-1 text-xs text-white transition active:scale-95"
        >
          +
        </button>
      </div>

      {/* CREATE NEW */}
      <div className="flex gap-2">
        <input
          placeholder="Ajouter un nouveau membre"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="bg-bg-secondary rounded p-1"
        />

        <input
          placeholder="Commentaire"
          value={createComment}
          onChange={(e) => setCreateComment(e.target.value)}
          className="bg-bg-secondary rounded p-1"
        />

        <button
          onClick={createAndAdd}
          className="bg-success rounded px-4 py-2 text-white transition hover:bg-green-600 active:scale-95"
        >
          Créer +
        </button>
      </div>
    </div>
  );
}