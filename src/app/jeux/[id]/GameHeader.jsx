"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { games } from "@/data/jeux";

export default function GameHeader({ gameId }) {
  const game = games.find((g) => g.id === gameId);
  const pathname = usePathname();
  const [logoError, setLogoError] = useState(false);

  if (!game) return null;

  const logoPath = `/jeux/${game.id}/logo.webp`;

  const linkClass = (active) =>
    `px-4 py-2 text-base font-semibold rounded-xl transition-colors ${
      active
        ? "bg-accent text-white shadow-md"
        : "text-text hover:bg-hover hover:text-accent-secondary"
    }`;

  return (
    <header className="bg-bg-secondary border-bg-tertiary w-full border-b shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        {/* Logo / Nom */}
        <div className="flex w-full justify-center sm:w-auto sm:justify-start">
          {!logoError ? (
            <img
              src={logoPath}
              alt={`Logo ${game.name}`}
              className="h-24 object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <h2 className="text-text text-3xl font-bold">{game.name}</h2>
          )}
        </div>

        {/* Menu */}
        <nav className="flex flex-1 flex-wrap justify-center gap-2 sm:justify-end">
          {Object.entries(game.categories).map(([key, category]) => {
            let href = `/jeux/${game.id}/${key}`;

            if (key === "general") {
              href = `/jeux/${game.id}`;
            }

            const active =
              key === "general"
                ? pathname === `/jeux/${game.id}`
                : pathname.startsWith(`/jeux/${game.id}/${key}`);

            return (
              <Link key={key} href={href} className={linkClass(active)}>
                {category.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
