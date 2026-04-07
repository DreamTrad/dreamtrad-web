"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

const ROLE_OPTIONS = [
  "traduction",
  "relecture",
  "graphisme",
  "programmation",
  "autre",
];

export default function RolesSection({ projectId }) {
  const [roles, setRoles] = useState([]);
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
    fetchMembers();
  }, [projectId]);

  const fetchRoles = async () => {
    const { data } = await supabase
      .from("project_roles")
      .select("*")
      .eq("project_id", projectId);

    if (data) setRoles(data);
  };

  const fetchMembers = async () => {
    const { data } = await supabase.from("members").select("*");

    if (data) setMembers(data);
  };

  const createMember = async () => {
    if (!newMember) return;

    setLoading(true);

    const { data } = await supabase
      .from("members")
      .insert({ id: newMember })
      .select()
      .single();

    if (data) {
      setMembers((prev) => [...prev, data]);
      setNewMember("");
    }

    setLoading(false);
  };

  const addRole = async (memberId, role) => {
    const { data } = await supabase
      .from("project_roles")
      .insert({
        member_id: memberId,
        project_id: projectId,
        role,
      })
      .select()
      .single();

    if (data) {
      setRoles((prev) => [...prev, data]);
    }
  };

  const updateComment = async (member_id, role, comment) => {
    const { data } = await supabase
      .from("project_roles")
      .update({ comment })
      .eq("member_id", member_id)
      .eq("project_id", projectId)
      .eq("role", role)
      .select()
      .maybeSingle();

    if (data) {
      setRoles((prev) =>
        prev.map((r) =>
          r.member_id === member_id && r.role === role ? data : r,
        ),
      );
    }
  };

  const deleteRole = async (member_id, role) => {
    await supabase
      .from("project_roles")
      .delete()
      .eq("member_id", member_id)
      .eq("project_id", projectId)
      .eq("role", role);

    setRoles((prev) =>
      prev.filter(
        (r) =>
          !(
            r.member_id === member_id &&
            r.project_id === projectId &&
            r.role === role
          ),
      ),
    );
  };

  return (
    <div className="bg-bg-secondary space-y-6 rounded-xl p-6">
      <h2 className="text-xl font-bold">Équipe du projet</h2>

      {/* Create member */}
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border p-2"
          placeholder="ID du member"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
        />
        <button
          onClick={createMember}
          disabled={loading}
          className="bg-primary rounded px-4 py-2 text-white"
        >
          Ajouter member
        </button>
      </div>

      {/* Members list */}
      <div className="space-y-4">
        {members.map((member) => {
          const memberRoles = roles.filter((r) => r.member_id === member.id);

          const availableRoles = ROLE_OPTIONS.filter(
            (role) => !memberRoles.some((r) => r.role === role),
          );

          return (
            <div key={member.id} className="rounded border p-4">
              <div className="font-semibold">{member.id}</div>

              {/* Add role */}
              <div className="mt-2 flex gap-2">
                <select
                  className="rounded border p-2"
                  defaultValue=""
                  onChange={(e) => addRole(member.id, e.target.value)}
                >
                  <option value="" disabled>
                    Ajouter un rôle
                  </option>

                  {availableRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Roles */}
              <div className="mt-3 space-y-2">
                {memberRoles.map((role) => (
                  <div
                    key={`${role.member_id}-${role.project_id}-${role.role}`}
                    className="flex items-center gap-2"
                  >
                    <span className="w-40">{role.role}</span>

                    <input
                      className="flex-1 rounded border p-1"
                      value={role.comment || ""}
                      onChange={(e) =>
                        updateComment(member.id, role.role, e.target.value)
                      }
                    />

                    <button
                      onClick={() => deleteRole(member.id, role.role)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
