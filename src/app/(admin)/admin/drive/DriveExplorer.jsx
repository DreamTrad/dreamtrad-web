"use client";

import { useEffect, useState } from "react";

function getOwnerMeta(email) {
  if (!email) return { name: "Inconnu", initials: "?" };

  const name = email.split("@")[0];
  const initials = name
    .split(".")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return { name, initials };
}

export default function DriveExplorer() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    setLoading(true);

    const res = await fetch("/api/admin/drive/list-non-owner");
    const data = await res.json();

    setFiles(data.files || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="bg-bg-secondary border-hover-tertiary rounded-xl border p-6">
      <h2 className="mb-6 text-lg font-bold">
        Fichiers (non propriétaire)
      </h2>

      {loading ? (
        <div className="text-text-tertiary">
          Chargement...
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {files.map((f) => {
            const type = getTypeMeta(f.type);
            const owner = getOwnerMeta(f.owner);

            return (
              <div
                key={f.name}
                className="bg-bg-tertiary border-hover-tertiary flex items-center justify-between gap-4 rounded-lg border px-4 py-3"
              >
                {/* NAME */}
                <div className="min-w-0 flex-1">
                  <span className="truncate font-medium">
                    {f.name}
                  </span>
                </div>

                {/* OWNER */}
                <div className="flex items-center gap-2">
                  <div className="bg-bg-secondary flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold">
                    {owner.initials}
                  </div>

                  <span className="whitespace-nowrap">
                    {owner.name}
                  </span>
                </div>
              </div>
            );
          })}

          {!files.length && (
            <div>
              Aucun fichier trouvé
            </div>
          )}
        </div>
      )}
    </div>
  );
}