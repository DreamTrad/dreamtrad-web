"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function GameHeader({ id, title, isAdmin }) {
  const pathname = usePathname();
  const [logoError, setLogoError] = useState(false);

  const toggleVisibility = async (id, value) => {
    const confirmMessage = value
      ? "Rendre ce projet visible sur le site ?"
      : "Masquer ce projet du site ?";

    if (!confirm(confirmMessage)) return;

    setGames((prev) =>
      prev.map((g) => (g.id === id ? { ...g, is_visible: value } : g)),
    );

    await supabase.from("projects").update({ is_visible: value }).eq("id", id);
  };

  const logoPath = `/jeux/${id}/logo.webp`;

  const linkClass = (active) =>
    `px-4 py-2 text-base font-semibold rounded-xl transition-colors ${
      active
        ? "bg-accent text-white shadow-md"
        : "text-text hover:bg-hover hover:text-accent-secondary"
    }`;

  const categories = [
    { key: "general", name: "Le jeu", enabled: true },
    { key: "guide", name: "Guide", enabled: true },
    { key: "patchfr", name: "Projet", enabled: true },
  ];

  return (
    <header className="bg-bg-secondary border-bg-tertiary w-full border-b shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        {/* Logo / Name */}
        <div className="flex w-full justify-center sm:w-auto sm:justify-start">
          {!logoError ? (
            <img
              src={logoPath}
              alt={`Logo ${title}`}
              className="h-24 object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <h2 className="text-text text-3xl font-bold">{title}</h2>
          )}
        </div>

        {/* <label className="flex items-center justify-center gap-2 text-sm">
          <span>Visible sur le site</span>
          <input
            type="checkbox"
            checked={game.is_visible || false}
            onChange={(e) => toggleVisibility(game.id, e.target.checked)}
          />
        </label> */}

        {/* Menu */}
        <nav className="flex flex-1 flex-wrap justify-center gap-2 sm:justify-end">
          {categories
            .filter((cat) => cat.enabled)
            .map((category) => {
              const href = `/admin/jeux/${id}/${category.key}`;
              const active = pathname.startsWith(href);

              return (
                <Link
                  key={category.key}
                  href={href}
                  className={linkClass(active)}
                >
                  {category.name}
                </Link>
              );
            })}
        </nav>
      </div>
    </header>
  );
}
