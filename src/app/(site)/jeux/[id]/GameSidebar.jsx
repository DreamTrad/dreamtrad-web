"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function resolveHref({ gameId, category, sectionId }) {
  if (category === "general") {
    if (sectionId === "presentation") {
      return `/jeux/${gameId}`;
    }
    return `/jeux/${gameId}/${sectionId}`;
  }

  return `/jeux/${gameId}/${category}/${sectionId}`;
}

export default function GameSidebar({ gameId, hasPatch, hasStaff, onLinkClick }) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const categories = ["general", "guide", "patchfr"];

  let category = "general";

  if (categories.includes(parts[2])) {
    category = parts[2];
  }

  // Define sections manually
  let sections = [];

  if (category === "general") {
    sections = [
      { id: "presentation", name: "Présentation", enabled: true },
      { id: "staff", name: "Staff", enabled: hasStaff },
    ];
  }

  if (category === "patchfr") {
    sections = [
      {
        id: "telechargement",
        name: hasPatch ? "Téléchargement" : "Informations patch",
        enabled: true,
      },
      { id: "installation", name: "Installation", enabled: false }, // replace with condition
      { id: "equipe", name: "Équipe", enabled: true },
    ];
  }

  // guide not handled yet (can be added later)
  sections = sections.filter((s) => s.enabled);

  return (
    <ul className="space-y-2">
      {sections.map((item) => {
        const href = resolveHref({
          gameId,
          category,
          sectionId: item.id,
        });

        const active = pathname === href;

        return (
          <li key={item.id}>
            <Link
              href={href}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onLinkClick?.();
              }}
              className={`block rounded-md px-4 py-2 transition ${
                active ? "bg-hover text-text" : "hover:bg-hover-secondary"
              }`}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
