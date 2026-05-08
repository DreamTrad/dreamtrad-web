"use client";

import { useEffect, useState } from "react";
import GameSidebar from "./GameSidebar";

export default function GameClient({
  gameId,
  hasPatch,
  hasStaff,
  hasInstallation,
  pageGuideData,
  hasAchievements,
  children,
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen]);

  return (
    <div className="flex flex-1">
      {/* Desktop sidebar */}
      <aside className="bg-bg-tertiary text-text-secondary border-bg-secondary hidden w-64 shrink-0 border-r p-4 lg:block">
        <GameSidebar
          gameId={gameId}
          hasPatch={hasPatch}
          hasStaff={hasStaff}
          hasInstallation={hasInstallation}
          pageGuideData={pageGuideData}
          hasAchievements={hasAchievements}
        />
      </aside>

      {/* Mobile floating button */}
      <button
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className="bg-bg-secondary hover:bg-hover border-bg-tertiary fixed right-4 top-70 z-60 flex h-14 w-14 items-center justify-center rounded-full border text-2xl shadow-xl transition lg:hidden"
      >
        {mobileSidebarOpen ? "✕" : "☰"}
      </button>

      {/* Mobile sidebar */}
      {mobileSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Drawer */}
          <aside className="bg-bg-tertiary text-text-secondary border-bg-secondary fixed top-0 left-0 z-50 h-full w-72 overflow-y-auto border-r p-4 shadow-2xl lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Navigation</h2>

              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="hover:bg-hover rounded-md px-3 py-1 text-lg"
              >
                ✕
              </button>
            </div>

            <GameSidebar
              gameId={gameId}
              hasPatch={hasPatch}
              hasStaff={hasStaff}
              hasInstallation={hasInstallation}
              pageGuideData={pageGuideData}
              hasAchievements={hasAchievements}
              onLinkClick={() => setMobileSidebarOpen(false)}
            />
          </aside>
        </>
      )}

      {/* Content */}
      <section className="min-w-0 flex-1 p-6">{children}</section>
    </div>
  );
}
