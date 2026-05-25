"use client";

import { useEffect, useState } from "react";

export default function ProjectUsersManager() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [savingId, setSavingId] = useState(null);

  const fetchData = async () => {
    const res = await fetch("/api/admin/project-users");
    const data = await res.json();

    setUsers(data.users || []);
    setProjects(data.projects || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleProject = async (userId, projectId) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const hasProject = user.projects.includes(projectId);

    const newProjects = hasProject
      ? user.projects.filter((p) => p !== projectId)
      : [...user.projects, projectId];

    setSavingId(userId);

    await fetch("/api/admin/update-project-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        projectIds: newProjects,
      }),
    });

    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, projects: newProjects } : u
      )
    );

    setSavingId(null);
  };

  return (
    <div className="bg-bg-secondary border-hover-tertiary rounded-xl border p-6">
      <h2 className="mb-6 text-lg font-bold">
        Accès aux projets (utilisateurs)
      </h2>

      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-bg-tertiary border-hover-tertiary rounded-lg border p-4"
          >
            {/* HEADER */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium">{user.email}</span>
                <span className="text-text-tertiary text-xs">
                  {user.id}
                </span>
              </div>

              {savingId === user.id && (
                <span className="text-text-tertiary text-xs">
                  Sauvegarde...
                </span>
              )}
            </div>

            {/* PROJECTS */}
            <div className="flex flex-wrap gap-2">
              {projects.map((project) => {
                const active = user.projects.includes(project.id);

                return (
                  <button
                    key={project.id}
                    onClick={() =>
                      toggleProject(user.id, project.id)
                    }
                    className={`rounded px-3 py-1 text-sm transition
                      ${
                        active
                          ? "bg-accent text-white"
                          : "bg-bg-primary hover:bg-bg-secondary"
                      }
                    `}
                  >
                    {project.title}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!users.length && (
          <div className="text-text-tertiary text-sm">
            Aucun utilisateur
          </div>
        )}
      </div>
    </div>
  );
}