"use client";

import { useState } from "react";
import GameSidebar from "./GameSidebar";

export default function GameClient({ gameId, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-1">
      <aside
        className={`bg-bg-tertiary text-text-secondary border-bg-secondary relative border-r transition-all duration-300 ${
          sidebarOpen ? "w-64 p-4" : "w-4"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-bg-secondary hover:bg-hover border-bg-tertiary absolute top-4 -right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border text-lg shadow-lg transition md:-right-4"
        >
          {sidebarOpen ? "←" : "→"}
        </button>

        {sidebarOpen && (
          <GameSidebar
            gameId={gameId}
            onLinkClick={() => {
              if (window.innerWidth < 768) {
                setSidebarOpen(false);
              }
            }}
          />
        )}
      </aside>

      <section className="min-w-0 flex-1 p-6">{children}</section>
    </div>
  );
}
