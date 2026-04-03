"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import TeamMemberAdminCard from "./TeamMemberAdminCard";

export default function TeamAdminPage() {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const { data } = await supabase.from("members").select("*").order("name");
    if (data) setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {members.map((m) => (
        <TeamMemberAdminCard
          key={m.id}
          member={m}
          onUpdated={fetchMembers}
        />
      ))}
    </div>
  );
}