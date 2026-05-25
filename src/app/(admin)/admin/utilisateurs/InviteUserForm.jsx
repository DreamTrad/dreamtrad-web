"use client";

import { useState } from "react";

export default function InviteUserForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/invite-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l'invitation");
      }

      setMessage(`Invitation envoyée à ${email}`);
      setEmail("");
    } catch (err) {
      setError(err.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-secondary border-hover-tertiary rounded-xl border p-6">
      <h2 className="mb-6 text-lg font-bold">
        Inviter un utilisateur
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* EMAIL */}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-bold">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@exemple.com"
            className="bg-bg-tertiary border-hover-tertiary text-text-secondary rounded border p-2"
          />
        </label>

        {/* ROLE */}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-bold">Rôle</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-bg-tertiary border-hover-tertiary text-text-secondary rounded border p-2"
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </label>

        {/* FEEDBACK */}
        {message && (
          <div className="bg-success/10 text-success rounded px-3 py-2 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-error/10 text-error rounded px-3 py-2 text-sm">
            {error}
          </div>
        )}

        {/* ACTION */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-accent rounded px-4 py-2 text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Envoi..." : "Envoyer l'invitation"}
          </button>
        </div>
      </form>
    </div>
  );
}