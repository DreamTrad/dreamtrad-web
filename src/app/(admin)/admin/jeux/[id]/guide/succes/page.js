"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import AchievementAdminCard from "./AchievementAdminCard";

export default function SuccesAdminPage() {
  const { id } = useParams();

  const [achievements, setAchievements] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchAchievements();
  }, [id]);

  const fetchAchievements = async () => {
    const { data } = await supabase
      .from("achievements")
      .select("*")
      .eq("project_id", id)
      .order("id", { ascending: true });

    setAchievements(data || []);
    setIsDirty(false);
  };

  const publish = async () => {
    await fetch("/api/admin/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paths: [`/jeux/${id}/guide/succes`, `/jeux/${id}`, `/jeux/${id}/guide`, "/sitemap.xml"],
      }),
    });
  };

  // -------------------------
  // CREATE NEW ACHIEVEMENT
  // -------------------------
  const createAchievement = async () => {
    const idValue = prompt("ID du succès (unique)");
    if (!idValue) return;

    const { data } = await supabase
      .from("achievements")
      .insert({
        id: idValue,
        project_id: id,
        title_fr: "",
        title_og: "",
        description_fr: "",
        description_og: "",
        resolution: "",
        hidden: true,
      })
      .select()
      .single();

    if (data) {
      setAchievements((prev) => [...prev, data]);
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push(`/admin/jeux/${id}/guide`)}
          className="bg-bg-secondary rounded px-4 py-2 text-sm"
        >
          ← Retour
        </button>
        <h1 className="text-xl font-bold">Gestion des succès</h1>
        <button
          onClick={publish}
          className="bg-success rounded px-4 py-2 text-white"
        >
          Publier les mises à jour
        </button>
        <button
          onClick={createAchievement}
          className="bg-accent rounded px-4 py-2 text-white"
        >
          + Ajouter un succès
        </button>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-4">
        {achievements.map((achievement) => (
          <AchievementAdminCard
            key={achievement.id}
            achievement={achievement}
            onUpdated={fetchAchievements}
          />
        ))}
      </div>
    </div>
  );
}
