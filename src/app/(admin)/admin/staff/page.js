"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import AdminStaffCard from "./AdminStaffCard";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "_");

const makeUniqueId = (base, existingIds) => {
  let id = base;
  let i = 1;

  while (existingIds.includes(id)) {
    id = `${base}_${i}`;
    i++;
  }

  return id;
};

export default function StaffAdminPage() {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");

  const fetchStaffs = async () => {
    setLoading(true);

    const { data } = await supabase.from("staffs").select("*");

    setStaffs(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const createStaff = async () => {
    const base = slugify(newName);
    const id = makeUniqueId(
      base,
      staffs.map((s) => s.id),
    );

    await supabase.from("staffs").insert({
      id,
      name: newName,
      text: "",
      is_visible: false,
    });

    setNewName("");
    fetchStaffs();
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Staff</h1>

        <div className="flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nom du staff"
            className="bg-bg-secondary rounded px-3 py-2"
          />

          <button
            onClick={createStaff}
            className="bg-accent rounded px-4 py-2 text-white"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="flex flex-col gap-4">
        {staffs.map((member) => (
          <AdminStaffCard
            key={member.id}
            member={member}
            onUpdated={fetchStaffs}
          />
        ))}
      </div>
    </div>
  );
}
