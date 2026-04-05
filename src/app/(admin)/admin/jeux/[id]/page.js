// src/app/(admin)/admin/jeux/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import ProjectProgressCard from "@/components/ProjectProgressCard";

export default function AdminGamePage() {
  const { id } = useParams();

  const [game, setGame] = useState(null);

  useEffect(() => {
    fetchGame();
  }, []);

  const fetchGame = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (data) setGame(data);
  };

  const toggleField = async (field, currentValue) => {
    const newValue = !currentValue;

    const confirmMessage =
      field === "is_visible"
        ? newValue
          ? "Rendre ce projet visible ?"
          : "Masquer ce projet ?"
        : newValue
        ? "Afficher la progression ?"
        : "Masquer la progression ?";

    if (!confirm(confirmMessage)) return;

    setGame((prev) => ({
      ...prev,
      [field]: newValue,
    }));

    await supabase
      .from("projects")
      .update({ [field]: newValue })
      .eq("id", id);
  };

  if (!game) return <div className="p-6">Chargement...</div>;

  return (
    <div className="mx-auto max-w-5xl p-6 flex flex-col gap-6">
      <h1 className="text-accent text-2xl font-bold">
        {game.title}
      </h1>

      {/* Top controls */}
      <div className="bg-bg-tertiary border-bg-secondary flex items-center justify-between rounded-xl border p-4">
        <div className="flex items-center gap-6">
          {/* is_visible */}
          <label className="flex items-center gap-2">
            <span>Pages du jeu visible sur le site</span>
            <input
              type="checkbox"
              checked={game.is_visible || false}
              onChange={() =>
                toggleField("is_visible", game.is_visible)
              }
            />
          </label>

          {/* show_progress */}
          <label className="flex items-center gap-2">
            <span>Afficher la progression sur le site</span>
            <input
              type="checkbox"
              checked={game.show_progress || false}
              onChange={() =>
                toggleField("show_progress", game.show_progress)
              }
            />
          </label>
        </div>
      </div>

      {/* Progress card */}
      {game.progress && (
        <ProjectProgressCard
          id={game.id}
          title={game.title}
          progress={game.progress}
        />
      )}
    </div>
  );
}