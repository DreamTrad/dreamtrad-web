"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function CollapsibleSection({ item, baseHref, pathname, onLinkClick }) {
  const [open, setOpen] = useState(pathname.startsWith(baseHref));

  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className="hover:bg-hover-secondary flex w-full items-center justify-between rounded-md px-4 py-2"
      >
        <span className="capitalize">{item.name}</span>
        <span className="text-sm">{open ? "▾" : "▸"}</span>
      </button>

      {open && (
        <ul className="mt-1 ml-4 space-y-1">
          {item.children.map((child) => {
            const href = `${baseHref}/${child.id}`;
            const active = pathname === href;

            return (
              <li key={child.id}>
                <Link
                  href={href}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    onLinkClick?.();
                  }}
                  className={`block rounded-md px-3 py-1 text-sm transition ${
                    active ? "bg-hover text-text" : "hover:bg-hover-tertiary"
                  }`}
                >
                  {child.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

function resolveHref({ gameId, category, sectionId }) {
  if (category === "general") {
    if (sectionId === "presentation") {
      return `/jeux/${gameId}`;
    }
    return `/jeux/${gameId}/${sectionId}`;
  }

  return `/jeux/${gameId}/${category}/${sectionId}`;
}

export default function GameSidebar({
  gameId,
  hasPatch,
  hasStaff,
  hasInstallation,
  pageGuideData,
  onLinkClick,
}) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const categories = ["general", "guide", "patchfr"];

  let category = "general";

  if (categories.includes(parts[2])) {
    category = parts[2];
  }

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
      { id: "installation", name: "Installation", enabled: hasInstallation },
      { id: "equipe", name: "Équipe", enabled: true },
    ];
  }

  if (category === "guide") {
    const baseSlug = `${gameId}/guide`;
    const guideData = pageGuideData ?? [];

    const groups = {};

    guideData.forEach((p) => {
      const parts = p.slug.split("/");

      if (p.slug === baseSlug) {
        groups[p.file] = {
          id: p.file,
          name: p.alias || p.title
        };
        return;
      }

      if (parts.length === 3) {
        const groupKey = parts[2];

        if (!groups[groupKey]) {
          groups[groupKey] = {
            id: groupKey,
            name: groupKey.replace(/_/g, " "),
            children: [],
          };
        }

        groups[groupKey].children.push({
          id: p.file,
          name: p.alias || p.title
        });
      }
    });

    sections = Object.values(groups);
  }

  sections = sections.filter((s) => s.enabled ?? true);

  return (
    <ul className="space-y-2">
      {sections.map((item) => {
        const href = resolveHref({
          gameId,
          category,
          sectionId: item.id,
        });

        if (item.children?.length) {
          return (
            <CollapsibleSection
              key={item.id}
              item={item}
              baseHref={`/jeux/${gameId}/guide/${item.id}`}
              pathname={pathname}
              onLinkClick={onLinkClick}
            />
          );
        }

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
