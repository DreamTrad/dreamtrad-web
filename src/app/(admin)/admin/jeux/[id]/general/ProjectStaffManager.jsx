"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function ProjectStaffManager({ projectId }) {
  const [linked, setLinked] = useState([]);
  const [available, setAvailable] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const fetchData = async () => {
    // Get linked staff
    const { data: linkedData } = await supabase
      .from("staff_projects")
      .select("staffs(*)")
      .eq("project_id", projectId);

    const linkedStaffs =
      linkedData?.map((i) => i.staffs).filter(Boolean) || [];

    setLinked(linkedStaffs);

    // Get all staff
    const { data: allStaff } = await supabase
      .from("staffs")
      .select("*");

    // Filter available
    const availableStaff =
      allStaff?.filter(
        (s) => !linkedStaffs.find((ls) => ls.id === s.id)
      ) || [];

    setAvailable(availableStaff);
  };

  const addStaff = async () => {
    if (!selected) return;

    const { error } = await supabase
      .from("staff_projects")
      .insert({
        project_id: projectId,
        staff_id: selected,
      });

    if (error) {
      console.error(error);
      return;
    }

    setSelected("");
    fetchData();
  };

  const removeStaff = async (staffId) => {
    const { error } = await supabase
      .from("staff_projects")
      .delete()
      .eq("project_id", projectId)
      .eq("staff_id", staffId);

    if (error) {
      console.error(error);
      return;
    }

    fetchData();
  };

  return (
    <div className="bg-bg-tertiary border-bg-secondary flex flex-col gap-6 rounded-xl border p-6">
      <h2 className="text-lg font-bold">Staff du projet</h2>

      {/* Linked staff */}
      <div className="flex flex-col gap-2">
        {linked.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between rounded bg-bg-secondary p-2"
          >
            <span>{s.name}</span>

            <button
              onClick={() => removeStaff(s.id)}
              className="text-red-400"
            >
              Supprimer
            </button>
          </div>
        ))}

        {linked.length === 0 && (
          <p className="text-sm text-text-secondary">
            Aucun staff lié
          </p>
        )}
      </div>

      {/* Add staff */}
      <div className="flex gap-2">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="bg-bg-secondary flex-1 rounded p-2"
        >
          <option value="">Ajouter un staff</option>
          {available.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <button
          onClick={addStaff}
          className="bg-success rounded px-4 text-white"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}