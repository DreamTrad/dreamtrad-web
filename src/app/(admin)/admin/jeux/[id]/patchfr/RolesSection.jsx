"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import RoleCategoryEditor from "./RoleCategoryEditor";

const roleLabels = {
  traduction: "Traduction",
  programmation: "Programmation",
  graphisme: "Graphisme",
  relecture: "Relecture",
  autre: "Autre",
};

export default function RolesSection({ projectId }) {
  const [roles, setRoles] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchRoles();
    fetchMembers();
  }, [projectId]);

  const fetchRoles = async () => {
    const { data } = await supabase
      .from("project_roles")
      .select(`
        member_id,
        role,
        comment,
        members (id, name)
      `)
      .eq("project_id", projectId);

    setRoles(data || []);
  };

  const fetchMembers = async () => {
    const { data } = await supabase
      .from("members")
      .select("id, name");

    setMembers(data || []);
  };

  const grouped = roles.reduce((acc, r) => {
    const key = r.role;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(r);
    return acc;
  }, {});
  
  return (
    <div className="space-y-6">
      {Object.entries(roleLabels).map(([roleKey, label]) => (
        <RoleCategoryEditor
          key={roleKey}
          role={roleKey}
          label={label}
          items={grouped[roleKey] || []}
          members={members}
          projectId={projectId}
          refresh={fetchRoles}
        />
      ))}
    </div>
  );
}