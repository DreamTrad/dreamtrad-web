"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function PatchesSection({ projectId }) {
  const [patches, setPatches] = useState([]);
  const [initialPatches, setInitialPatches] = useState([]);

  useEffect(() => {
    fetchPatches();
  }, []);

  const fetchPatches = async () => {
    const { data, error } = await supabase
      .from("patches")
      .select("*")
      .eq("project_id", projectId);

    if (error) {
      console.error("Error fetching patches:", error);
      return;
    }

    setPatches(data || []);
    setInitialPatches(data || []);
  };

  const updateLink = (id, value) => {
    setPatches((prev) =>
      prev.map((p) => (p.id === id ? { ...p, link: value } : p)),
    );
  };

  const isDirty = (patch) => {
    const initial = initialPatches.find((p) => p.id === patch.id);
    return initial?.link !== patch.link;
  };

  const save = async (patch) => {
    const { error } = await supabase
      .from("patches")
      .update({ link: patch.link })
      .eq("id", patch.id);

    if (error) {
      console.error("Error updating patch:", error);
      return;
    }

    // sync initial state
    setInitialPatches((prev) =>
      prev.map((p) => (p.id === patch.id ? { ...p, link: patch.link } : p)),
    );
  };

  const reset = (patch) => {
    const initial = initialPatches.find((p) => p.id === patch.id);

    setPatches((prev) =>
      prev.map((p) =>
        p.id === patch.id ? { ...p, link: initial?.link || "" } : p,
      ),
    );
  };

  if (!patches.length) {
    return (
      <div className="bg-bg-tertiary border-bg-secondary rounded-xl border p-4">
        <p className="text-text-secondary text-center">Aucun patch trouvé.</p>
      </div>
    );
  }

  return (
    <div className="bg-bg-tertiary border-bg-secondary flex flex-col gap-4 rounded-xl border p-4">
      <h2 className="text-lg font-bold">Patches</h2>

      {patches.map((patch) => (
        <div key={patch.id} className="flex flex-col gap-2">
          <div className="text-text font-semibold">{patch.name}</div>

          <input
            value={patch.link || ""}
            onChange={(e) => updateLink(patch.id, e.target.value)}
            className="bg-bg-secondary rounded p-2"
            placeholder="Lien"
          />

          {isDirty(patch) && (
            <div className="flex gap-2">
              <button
                onClick={() => save(patch)}
                className="bg-success rounded px-3 py-1 text-sm text-white transition hover:bg-green-600 active:scale-95"
              >
                Enregistrer
              </button>

              <button
                onClick={() => reset(patch)}
                className="bg-warning rounded px-3 py-1 text-sm text-white transition hover:bg-yellow-500 active:scale-95"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
