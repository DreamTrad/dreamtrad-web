"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import CreateMemberModal from "./CreateMemberModal";
import TeamMemberAdminCard from "./TeamMemberAdminCard";

export default function TeamAdminPage() {
  const [members, setMembers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchMembers = async () => {
    const { data } = await supabase.from("members").select("*").order("name");
    if (data) setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Gestion de l’équipe</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-accent rounded px-4 py-2 text-white"
        >
          + Nouveau membre
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {members.map((m) => (
          <TeamMemberAdminCard key={m.id} member={m} onUpdated={fetchMembers} />
        ))}
      </div>
      {isOpen && (
        <CreateMemberModal
          onClose={() => setIsOpen(false)}
          onCreated={() => {
            setIsOpen(false);
            fetchMembers();
          }}
        />
      )}
    </>
  );
}
