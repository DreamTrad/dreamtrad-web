"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function ProjectStaffManager({ projectId }) {
  const [linked, setLinked] = useState([]);
  const [available, setAvailable] = useState([]);
  const [selected, setSelected] = useState("");

  const fetchData = async () => {
    // linked staffs
    const { data: linkedData } = await supabase
      .from("staff_projects")
      .select("staffs(*)")
      .eq("project_id", projectId);

    const linkedStaffs =
      linkedData?.map((item) => item.staffs).filter(Boolean) || [];

    setLinked(linkedStaffs);

    // all staffs
    const { data: allStaffs } = await supabase
      .from("staffs")
      .select("*");

    // filter available (not already linked)
    const availableStaffs =
      allStaffs?.filter(
        (s) => !linkedStaffs.some((l) => l.id === s.id)
      ) || [];

    setAvailable(availableStaffs);
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const addStaff = async () => {
    if (!selected) return;

    await supabase.from("staff_projects").insert({
      project_id: projectId,
      staff_id: selected,
    });

    setSelected("");
    fetchData();
    await publish();
  };

  const removeStaff = async (staffId) => {
    await supabase
      .from("staff_projects")
      .delete()
      .eq("project_id", projectId)
      .eq("staff_id", staffId);

    fetchData();
    await publish();
  };

  const publish = async () => {
    await fetch("/api/admin/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paths: [`/jeux/${projectId}/staff`, `/jeux/${projectId}`, "/sitemap.xml"],
      }),
    });
  };

  return (
    <div className="bg-bg-tertiary border-bg-secondary flex flex-col gap-4 rounded-xl border p-6">
      <h2 className="text-lg font-bold">Staff ayant bossé sur le jeu</h2>

      {/* LINKED STAFF */}
      <div className="flex flex-wrap gap-2">
        {linked.map((staff) => (
          <div
            key={staff.id}
            className="bg-bg-secondary flex items-center gap-2 rounded px-3 py-1 text-sm"
          >
            <span>{staff.name}</span>

            <button
              onClick={() => removeStaff(staff.id)}
              className="text-error"
            >
              ✕
            </button>
          </div>
        ))}

        {!linked.length && (
          <p className="text-text-tertiary text-sm">
            Aucun staff lié
          </p>
        )}
      </div>

      {/* ADD STAFF */}
      <div className="flex gap-2">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="bg-bg-secondary flex-1 rounded px-3 py-2"
        >
          <option value="">Ajouter un staff</option>
          {available.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.name}
            </option>
          ))}
        </select>

        <button
          onClick={addStaff}
          className="bg-accent rounded px-4 py-2 text-white"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}