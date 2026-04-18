"use client";

import { useState } from "react";

export default function MoveModal({
  open,
  onClose,
  item,
  allSections,
  onMove,
  onCreateFolder,
}) {
  const [folderName, setFolderName] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-bg-secondary w-100 rounded p-4 flex flex-col gap-4">
        <h2 className="text-sm font-medium">Changer de dossier</h2>

        {/* MOVE EXISTING */}
        <div className="flex flex-col gap-2">
          <button
            className="text-left px-2 py-1 hover:bg-bg-tertiary rounded"
            onClick={() => {
              onMove(item, null);
              onClose();
            }}
          >
            Racine
          </button>

          {allSections
            .filter((s) => s.id !== "root")
            .map((s) => (
              <button
                key={s.id}
                className="text-left px-2 py-1 hover:bg-bg-tertiary rounded"
                onClick={() => {
                  onMove(item, s.id);
                  onClose();
                }}
              >
                {s.name}
              </button>
            ))}
        </div>

        {/* CREATE FOLDER */}
        <div className="border-t pt-3 flex flex-col gap-2">
          <input
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Nouveau dossier"
            className="bg-bg-tertiary p-2 rounded"
          />

          <button
            onClick={() => {
              if (!folderName) return;
              onCreateFolder(item, folderName);
              onClose();
            }}
            className="bg-accent text-white rounded px-2 py-1"
          >
            Créer et déplacer
          </button>
        </div>

        <button
          onClick={onClose}
          className="text-xs text-text-tertiary"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}