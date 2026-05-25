"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function ProjectDriveSettings() {
  const [projects, setProjects] = useState([]);
  const [initialProjects, setInitialProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select(
        "id, title, sheet_table, drive, drive_patch"
      )
      .order("title");

    if (error) {
      console.error(error);
      return;
    }

    setProjects(data || []);
    setInitialProjects(data || []);
    setLoading(false);
  };

  const updateField = (id, field, value) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              [field]: value,
            }
          : p
      )
    );
  };

  const isDirty = (project) => {
    const initial = initialProjects.find(
      (p) => p.id === project.id
    );

    return (
      initial?.sheet_table !==
        project.sheet_table ||
      initial?.drive !== project.drive ||
      initial?.drive_patch !==
        project.drive_patch
    );
  };

  const reset = (project) => {
    const initial = initialProjects.find(
      (p) => p.id === project.id
    );

    if (!initial) return;

    setProjects((prev) =>
      prev.map((p) =>
        p.id === project.id ? initial : p
      )
    );
  };

  const save = async (project) => {
    const { error } = await supabase
      .from("projects")
      .update({
        sheet_table: project.sheet_table,
        drive: project.drive,
        drive_patch: project.drive_patch,
      })
      .eq("id", project.id);

    if (error) {
      console.error(error);
      return;
    }

    setInitialProjects((prev) =>
      prev.map((p) =>
        p.id === project.id ? { ...project } : p
      )
    );
  };

  if (loading) {
    return (
      <div className="text-text-tertiary">
        Chargement...
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary border-hover-tertiary rounded-xl border p-6">
      <h2 className="mb-6 text-lg font-bold">
        Paramètres Drive des projets
      </h2>

      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-bg-tertiary border-hover-tertiary rounded-xl border p-4"
          >
            <div className="mb-4">
              <h3 className="font-semibold">
                {project.title}
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {/* SHEET TABLE */}
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">
                  Table du projet
                </span>

                <input
                  value={project.sheet_table || ""}
                  onChange={(e) =>
                    updateField(
                      project.id,
                      "sheet_table",
                      e.target.value
                    )
                  }
                  className="bg-bg-secondary border-hover-tertiary rounded border p-2"
                />
              </label>

              {/* DRIVE */}
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">
                  Dossier Drive du projet
                </span>

                <input
                  value={project.drive || ""}
                  onChange={(e) =>
                    updateField(
                      project.id,
                      "drive",
                      e.target.value
                    )
                  }
                  className="bg-bg-secondary border-hover-tertiary rounded border p-2"
                />
              </label>

              {/* DRIVE PATCH */}
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">
                  Dossier Drives des patchs
                </span>

                <input
                  value={project.drive_patch || ""}
                  onChange={(e) =>
                    updateField(
                      project.id,
                      "drive_patch",
                      e.target.value
                    )
                  }
                  className="bg-bg-secondary border-hover-tertiary rounded border p-2"
                />
              </label>
            </div>

            {isDirty(project) && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => save(project)}
                  className="bg-success rounded px-4 py-2 text-sm text-white transition hover:opacity-90"
                >
                  Enregistrer
                </button>

                <button
                  onClick={() => reset(project)}
                  className="bg-warning rounded px-4 py-2 text-sm text-white transition hover:opacity-90"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}