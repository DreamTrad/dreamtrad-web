// components/admin/AdminSidebar.jsx

import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="bg-bg-tertiary/80 text-text flex w-64 flex-col gap-4 border-r border-white/5 p-4 backdrop-blur">
      <h2 className="text-accent text-xl font-bold tracking-wide">Admin</h2>

      <nav className="mt-2 flex flex-col gap-2">
        <Link
          href="/admin"
          className="hover:bg-hover rounded-lg px-3 py-2 text-sm transition"
        >
          Accueil
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
      </nav>
    </aside>
  );
}
