// src/app/(admin)/admin/jeux/page.js
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { getImageUrl } from "@/lib/supabase/storage";

export default function AdminGamesPage() {
  const [games, setGames] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const isAdmin = role === "admin" || role === "super_admin";
  const isSuperAdmin = role === "super_admin";

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUser(user);

    // Get role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    setRole(profile?.role);
  };

  useEffect(() => {
    if (!user || !role) return;
    fetchGames();
  }, [user, role]);

  const fetchGames = async () => {
    if (isAdmin) {
      const { data } = await supabase
        .from("projects")
        .select("id, title, is_visible, sheet_table, drive")
        .order("title");

      if (data) setGames(data);
    } else {
      const { data } = await supabase
        .from("project_users")
        .select(
          `
          projects (
            id,
            title,
            is_visible
          )
        `,
        )
        .eq("user_id", user.id);

      if (data) {
        const formatted = data.map((p) => p.projects).filter(Boolean);

        setGames(formatted);
      }
    }
  };

  if (!user || !role) {
    return <div className="p-10 text-center">Chargement...</div>;
  }

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen p-10">
      <h1 className="mb-8 text-center text-3xl font-bold">Gestion des jeux</h1>

      <div className="grid grid-cols-[repeat(auto-fit,350px)] justify-center gap-8">
        {games.map((game) => (
          <div
            key={game.id}
            className="group bg-bg-secondary flex h-full flex-col overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-xl"
          >
            <Link href={`/admin/jeux/${game.id}`}>
              <div className="aspect-video cursor-pointer overflow-hidden">
                <img
                  src={getImageUrl(`/jeux/${game.id}/cover.webp`)}
                  alt={game.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="flex grow flex-col gap-3 p-4 text-center">
              <h2 className="text-text-primary group-hover:text-accent text-lg font-semibold transition-colors">
                {game.title}
              </h2>

              {isAdmin && (
                <div className="mt-auto flex justify-center gap-2">
                  {game.sheet_table && (
                    <a
                      href={game.sheet_table}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent hover:bg-accent/80 rounded px-3 py-1 text-center text-white transition"
                    >
                      Table du projet
                    </a>
                  )}

                  {game.drive && (
                    <a
                      href={game.drive}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent hover:bg-accent/80 rounded px-3 py-1 text-center text-white transition"
                    >
                      Drive du projet
                    </a>
                  )}
                </div>
              )}

              <div className="flex justify-center gap-2">
                {isSuperAdmin && (
                  <button
                    onClick={async () => {
                      if (!confirm("Supprimer ce projet ?")) return;

                      await supabase
                        .from("projects")
                        .delete()
                        .eq("id", game.id);

                      fetchGames();
                    }}
                    className="bg-error rounded px-3 py-1 text-xs text-white"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
