"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import CreateMemberModal from "./CreateMemberModal";
import TeamMemberAdminCard from "./TeamMemberAdminCard";
import PageEditor from "@/components/PageEditor";

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

  const importantMembers = members.filter((m) => m.is_important);
  const otherMembers = members.filter((m) => !m.is_important);

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Page editor block */}
      <div className="mb-10">
        <h1 className="text-accent mb-4 text-2xl font-bold">
          Contenu de la page équipe
        </h1>

        {/* INFOBOX */}
        <div className="mb-10">
          <PageEditor
            title="Infobox de la page"
            slug="equipe"
            file="infobox"
            editTitle
            editContent
          />
        </div>
      </div>

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Gestion de l’équipe</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-accent rounded px-4 py-2 text-white"
        >
          + Nouveau membre
        </button>
      </div>

      {/* IMPORTANT */}
      <div className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">Membres importants</h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {importantMembers.map((m) => (
            <TeamMemberAdminCard
              key={m.id}
              member={m}
              onUpdated={fetchMembers}
            />
          ))}
        </div>
      </div>

      {/* AUTRES */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Autres membres</h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {otherMembers.map((m) => (
            <TeamMemberAdminCard
              key={m.id}
              member={m}
              onUpdated={fetchMembers}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <CreateMemberModal
          onClose={() => setIsOpen(false)}
          onCreated={() => {
            setIsOpen(false);
            fetchMembers();
          }}
        />
      )}
    </div>
  );
}
