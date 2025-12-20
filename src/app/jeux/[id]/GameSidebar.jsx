"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { games } from "@/data/jeux";

function resolveHref({ gameId, categoryKey, sectionId }) {
  if (categoryKey === "general") {
    if (sectionId === "presentation") {
      return `/jeux/${gameId}`;
    }
    return `/jeux/${gameId}/${sectionId}`;
  }

  return `/jeux/${gameId}/${categoryKey}/${sectionId}`;
}

export default function GameSidebar({ gameId, onLinkClick }) {
  const pathname = usePathname();
  const game = games.find((g) => g.id === gameId);
  if (!game) return null;

  const parts = pathname.split("/").filter(Boolean);

  let categoryKey = "general";
  if (parts[2] && game.categories[parts[2]]) {
    categoryKey = parts[2];
  }

  const sections = game.categories[categoryKey]?.sections || [];

  return (
    <ul className="space-y-2">
      {sections.map((item) => {
        const href = resolveHref({
          gameId,
          categoryKey,
          sectionId: item.id,
        });

        if (item.children?.length) {
          return (
            <CollapsibleSection
              key={item.id}
              item={item}
              baseHref={href}
              pathname={pathname}
              gameId={gameId}
              categoryKey={categoryKey}
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

function CollapsibleSection({
  item,
  baseHref,
  pathname,
  gameId,
  categoryKey,
  onLinkClick,
}) {
  const [open, setOpen] = useState(pathname.startsWith(baseHref));

  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className="hover:bg-hover-secondary flex w-full items-center justify-between rounded-md px-4 py-2"
      >
        <span>{item.name}</span>
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
