"use client";

import { useEffect, useState } from "react";

export default function UsersManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (userId, role) => {
    setSavingId(userId);

    await fetch("/api/admin/update-user-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, role }),
    });

    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));

    setSavingId(null);
  };

  return (
    <div className="bg-bg-secondary border-hover-tertiary rounded-xl border p-6">
      <h2 className="mb-6 text-lg font-bold">Gestion des utilisateurs</h2>

      {loading ? (
        <div className="text-text-tertiary">Chargement...</div>
      ) : (
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-bg-tertiary border-hover-tertiary flex items-center gap-4 rounded-lg border p-4"
            >
              {/* Infos */}
              <div className="flex flex-1 flex-col">
                <span className="text-text font-medium">{user.email}</span>
                <span className="text-text-tertiary text-xs">{user.id}</span>
              </div>

              {/* Role selector */}
              <div className="flex items-center gap-3">
                <select
                  value={user.role}
                  onChange={(e) => updateRole(user.id, e.target.value)}
                  disabled={savingId === user.id}
                  className="bg-bg-secondary border-hover-tertiary text-text-secondary rounded-lg border px-3 py-2 text-sm"
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>

                {savingId === user.id && (
                  <span className="text-text-tertiary text-xs">
                    Sauvegarde...
                  </span>
                )}
              </div>
            </div>
          ))}

          {!users.length && (
            <div className="text-text-tertiary text-sm">
              Aucun utilisateur trouvé
            </div>
          )}
        </div>
      )}
    </div>
  );
}
