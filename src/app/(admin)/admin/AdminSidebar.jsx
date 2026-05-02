"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminSidebar({ projects, role }) {
  const [open, setOpen] = useState(false);

  return (
    <aside className="bg-bg-tertiary/80 text-text flex w-64 flex-col gap-4 border-r border-white/5 p-4 backdrop-blur">
      <h2 className="text-accent text-xl font-bold tracking-wide">Admin</h2>

      <nav className="mt-2 flex flex-col gap-2">
        {(role === "admin" || role === "super_admin") && (
          <>
            <Link
              href="/admin/accueil"
              className="hover:bg-hover rounded-lg px-3 py-2 text-sm transition"
            >
              Accueil
            </Link>
            <Link
              href="/admin/recrutement"
              className="hover:bg-hover rounded-lg px-3 py-2 text-sm transition"
            >
              Recrutement
            </Link>

            <Link
              href="/admin/vndb-fr"
              className="hover:bg-hover rounded-lg px-3 py-2 text-sm transition"
            >
              VNDB-FR
            </Link>

            <Link
              href="/admin/equipe"
              className="hover:bg-hover rounded-lg px-3 py-2 text-sm transition"
            >
              Équipe
            </Link>

            <Link
              href="/admin/articles"
              className="hover:bg-hover rounded-lg px-3 py-2 text-sm transition"
            >
              Articles
            </Link>
            <Link
              href="/admin/staff"
              className="hover:bg-hover rounded-lg px-3 py-2 text-sm transition"
            >
              Staff
            </Link>
            <Link
              href="/admin/mentions-legales"
              className="hover:bg-hover rounded-lg px-3 py-2 text-sm transition"
            >
              Mentions légales
            </Link>
          </>
        )}
        <Link
          href="/admin/jeux"
          className="hover:bg-hover rounded-lg px-3 py-2 text-sm transition"
        >
          Tous les projets
        </Link>

        {/* Projets */}
        <div>
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="hover:bg-hover flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm"
          >
            <span>Projets</span>
            <span className="text-xs">{open ? "▲" : "▼"}</span>
          </div>

          {open && (
            <div className="mt-1 ml-3 flex flex-col gap-1 border-l border-white/10 pl-2">
              {projects.map((project) => (
                <Link
                  className="hover:bg-hover rounded px-2 py-1 text-xs"
                  key={project.id}
                  href={`/admin/jeux/${project.id}`}
                >
                  {project.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
