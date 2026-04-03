"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function CreateMemberModal({ onClose, onCreated }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleCreate = async () => {
    if (!id || !name) return;

    const { error } = await supabase.from("members").insert({
      id,
      name,
      is_important: false,
      skills: [],
      links: [],
    });

    if (error) {
      console.error(error);
      return;
    }

    onCreated?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-8">
      <div className="bg-bg-tertiary border-bg-secondary w-full max-w-md rounded-xl border p-6 shadow-xl">
        <h2 className="text-accent mb-4 text-lg font-semibold">
          Nouveau membre
        </h2>

        <div className="flex flex-col gap-4">
          {/* ID */}
          <input
            placeholder="id (unique)"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="bg-bg-secondary rounded px-3 py-2 text-sm"
          />

          {/* Name */}
          <input
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-bg-secondary rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-text-tertiary rounded px-4 py-2 text-sm"
          >
            Annuler
          </button>

          <button
            onClick={handleCreate}
            className="bg-accent rounded px-4 py-2 text-sm text-white"
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  );
}