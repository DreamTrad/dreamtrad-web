// src/app/(admin)/admin/jeux/page.js
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AdminGamesPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const { data } = await supabase
      .from("projects")
      .select("id, title, is_visible")
      .order("title");

    if (data) setGames(data);
  };

  const toggleVisibility = async (id, value) => {
    const confirmMessage = value
      ? "Rendre ce projet visible sur le site ?"
      : "Masquer ce projet du site ?";

    if (!confirm(confirmMessage)) return;

    // optimistic update
    setGames((prev) =>
      prev.map((g) => (g.id === id ? { ...g, is_visible: value } : g)),
    );

    await supabase.from("projects").update({ is_visible: value }).eq("id", id);
  };

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen p-10">
      <h1 className="mb-8 text-center text-3xl font-bold">Gestion des jeux</h1>

      <div className="grid grid-cols-[repeat(auto-fit,350px)] justify-center gap-8">
        {games.map((game) => (
          <div
            key={game.id}
            className="group bg-bg-secondary overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-xl"
          >
            {/* Image */}
            <Link href={`/admin/jeux/${game.id}`}>
              <div className="aspect-video cursor-pointer overflow-hidden">
                <img
                  src={`/jeux/${game.id}/cover.webp`}
                  alt={game.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Infos */}
            <div className="flex flex-col gap-3 p-4 text-center">
              <h2 className="text-text-primary group-hover:text-accent text-lg font-semibold transition-colors">
                {game.title}
              </h2>

              {/* Visible toggle */}
              <label className="flex items-center justify-center gap-2 text-sm">
                <span>Visible sur le site</span>
                <input
                  type="checkbox"
                  checked={game.is_visible || false}
                  onChange={(e) => toggleVisibility(game.id, e.target.checked)}
                />
              </label>

              {/* Actions */}
              <div className="flex justify-center gap-2">
                <Link
                  href={`/admin/jeux/${game.id}`}
                  className="bg-accent rounded px-3 py-1 text-xs text-white"
                >
                  Modifier
                </Link>

                <button
                  onClick={async () => {
                    if (!confirm("Supprimer ce projet ?")) return;

                    await supabase.from("projects").delete().eq("id", game.id);

                    fetchGames();
                  }}
                  className="bg-error rounded px-3 py-1 text-xs text-white"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
