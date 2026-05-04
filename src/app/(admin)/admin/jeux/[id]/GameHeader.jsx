"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getImageUrl } from "@/lib/supabase/storage";

export default function GameHeader({ id, title }) {
  const pathname = usePathname();
  const [logoError, setLogoError] = useState(false);

  const logoPath = getImageUrl(`/jeux/${id}/logo.webp`);

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
