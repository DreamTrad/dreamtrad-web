"use client";

import { useState } from "react";
import TransfersManager from "./TransfersManager";
import DriveExplorer from "./DriveExplorer";
import ProjectDriveSettings from "./ProjectDriveSettings";

export default function DrivePage() {
  const [tab, setTab] = useState("patches");

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-accent mb-6 text-2xl font-bold">
        Gestion liés à Google Drive
      </h1>

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setTab("patches")}
          className={`rounded px-4 py-2 text-sm ${
            tab === "patches"
              ? "bg-accent text-white"
              : "bg-bg-secondary"
          }`}
        >
          Lien des drive projets
        </button>
        <button
          onClick={() => setTab("transfers")}
          className={`rounded px-4 py-2 text-sm ${
            tab === "transfers"
              ? "bg-accent text-white"
              : "bg-bg-secondary"
          }`}
        >
          Transferts en attente
        </button>

        <button
          onClick={() => setTab("drive")}
          className={`rounded px-4 py-2 text-sm ${
            tab === "drive"
              ? "bg-accent text-white"
              : "bg-bg-secondary"
          }`}
        >
          fichiers non propriétaire
        </button>
      </div>

      {/* Content */}
      {tab === "patches" && <ProjectDriveSettings />}
      {tab === "transfers" && <TransfersManager />}
      {tab === "drive" && <DriveExplorer />}
    </div>
  );
}