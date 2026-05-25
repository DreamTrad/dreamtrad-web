"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function CreateMemberModal({ onClose, onCreated }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const generateId = async (name) => {
    let base = name
      .toLowerCase()
      .normalize("NFD") // remove accents
      .replace(/[\u0300-\u036f]/g, "") // strip diacritics
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .trim()
      .replace(/\s+/g, "-"); // spaces → dash

    let finalId = base;
    let counter = 1;

    while (true) {
      const { data } = await supabase
        .from("members")
        .select("id")
        .eq("id", finalId)
        .maybeSingle();

      if (!data) break;

      finalId = `${base}-${counter}`;
      counter++;
    }

    return finalId;
  };

  const handleCreate = async () => {
    if (!name.trim()) return;

    const generatedId = await generateId(name);

    const { error } = await supabase.from("members").insert({
      id: generatedId,
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

        {/* Name */}
        <input
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-bg-secondary rounded px-3 py-2 text-sm"
        />

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
