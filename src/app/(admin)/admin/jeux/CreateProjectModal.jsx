"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateProjectModal() {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [sheet_table, setSheetTable] = useState("");
  const [drive, setDrive] = useState("");
  const [drive_patch, setDrivePatch] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const slugify = (text) => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // Auto-update slug from title
  useEffect(() => {
    setProjectId(slugify(title));
  }, [title]);

  const handleCreate = async () => {
    if (!title || !projectId) return;

    setLoading(true);

    const { errorProject } = await supabase.from("projects").insert({
      id: projectId,
      title,
      progress: {
        images: 0,
        relecture: 0,
        technique: 0,
        traduction: 0,
      },
      sheet_table,
      drive,
      drive_patch,
    });

    if (errorProject) {
      console.error(errorProject);
      return;
    }

    const { errorRecruitments } = await supabase.from("project_recruitments").insert({
      project_id: projectId,
      type: "project",
      title: "Traduction de " + title,
    });

    if (errorRecruitments) {
      console.error(errorRecruitments);
      return;
    }

    const { errorRecruitments2 } = await supabase.from("project_recruitments").insert({
      project_id: projectId,
      type: "other",
    });

    if (errorRecruitments2) {
      console.error(errorRecruitments2);
      return;
    }

    const { errorPagePresentation } = await supabase.from("pages").insert({
      slug: projectId,
      file: "presentation",
      type: "presentation",
      project_id: projectId,
      is_visible: true,
      title: title
    });

    if (errorPagePresentation) {
      console.error(errorPagePresentation);
      return;
    }

    const { errorPageInfopatch } = await supabase.from("pages").insert({
      slug: `${projectId}/patchfr/telechargement`,
      file: "infopatch",
      type: "infopatch",
      project_id: projectId,
      is_visible: true,
      title: `Patch français de ${title}`,
      content: `Le patch de la traduction française n’est pas encore disponible.\n\nPour ne pas rater d’information sur l’avancement du projet, suivez nous sur [Twitter](https://x.com/DreamTradFR) et [Discord](https://discord.gg/gsuAz4DK4p) !`
    });

    if (errorPageInfopatch) {
      console.error(errorPageInfopatch);
      return;
    }

    setLoading(false);


    setOpen(false);
    setTitle("");
    setProjectId("");
    setSheetTable("");
    setDrive("");
    setDrivePatch("");

    router.push(`/admin/jeux/${projectId}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-accent rounded px-4 py-2 text-white"
      >
        + Nouveau projet
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-bg-secondary border-hover-tertiary flex w-full max-w-md flex-col gap-4 rounded-xl border p-6">
            <h2 className="text-lg font-bold">Créer un projet</h2>

            {/* TITLE */}
            <label className="flex flex-col gap-1">
              <span className="text-sm font-bold">Titre</span>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre du projet"
                className="bg-bg-tertiary border-hover-tertiary text-text-secondary rounded border p-2"
              />
            </label>

            {/* ID */}
            <label className="flex flex-col gap-1">
              <span className="text-sm font-bold">ID / Slug</span>

              <input
                value={projectId}
                onChange={(e) => setProjectId(slugify(e.target.value))}
                placeholder="mon-projet"
                className="bg-bg-tertiary border-hover-tertiary text-text-secondary rounded border p-2"
              />
            </label>

            {/* SHEET TABLE */}
            <label className="flex flex-col gap-1">
              <span className="text-sm font-bold">
                Lien vers la table du projet
              </span>
              <input
                value={sheet_table}
                onChange={(e) => setSheetTable(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/..."
                className="bg-bg-tertiary border-hover-tertiary text-text-secondary rounded border p-2"
              />
            </label>

            {/* DRIVE */}
            <label className="flex flex-col gap-1">
              <span className="text-sm font-bold">
                Lien vers le drive du projet
              </span>
              <input
                value={drive}
                onChange={(e) => setDrive(e.target.value)}
                placeholder="https://drive.google.com/drive/..."
                className="bg-bg-tertiary border-hover-tertiary text-text-secondary rounded border p-2"
              />
            </label>

            {/* DRIVE PATCH */}
            <label className="flex flex-col gap-1">
              <span className="text-sm font-bold">
                Lien vers le drive de patch
              </span>
              <input
                value={drive_patch}
                onChange={(e) => setDrivePatch(e.target.value)}
                placeholder="https://drive.google.com/drive/..."
                className="bg-bg-tertiary border-hover-tertiary text-text-secondary rounded border p-2"
              />
            </label>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="bg-warning rounded px-4 py-2 text-white"
              >
                Annuler
              </button>

              <button
                onClick={handleCreate}
                disabled={loading}
                className="bg-success rounded px-4 py-2 text-white disabled:opacity-50"
              >
                {loading ? "Création..." : "Créer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
