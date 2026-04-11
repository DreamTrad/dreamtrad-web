"use client";

import { useState } from "react";
import MarkdownSection from "@/components/ui/MarkdownSection";

export default function PlateformsTabs({ pagesInstallation }) {
  if (!pagesInstallation?.length) return null;

  const [activePage, setActivePage] = useState(pagesInstallation[0]);

  const getButtonClass = (p) =>
    `min-w-27.5 flex-1 rounded-md border px-4 py-2 text-center text-sm font-medium whitespace-normal transition ${
      activePage.file === p.file
        ? "bg-bg-tertiary text-text border-accent"
        : "bg-bg-secondary text-text-secondary border-bg-tertiary hover:bg-hover-secondary"
    }`;

  return (
    <div className="w-full overflow-hidden">
      {/* Tabs */}
      <div className="flex w-full flex-wrap gap-2 pb-3">
        {pagesInstallation.map((p) => (
          <button
            key={p.file}
            onClick={() => setActivePage(p)}
            className={getButtonClass(p)}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl space-y-12 px-4 pb-20">
        <div className="bg-bg-secondary/60 rounded-2xl p-6 shadow-sm backdrop-blur-sm md:p-8">
          <MarkdownSection
            imageClassName="mx-auto block"
            content={activePage?.content ?? "Contenu introuvable."}
          />
        </div>
      </div>
    </div>
  );
}