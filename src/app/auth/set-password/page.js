// auth/set-password/page.js

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 8) {
      setError("Minimum 8 caractères");
      return;
    }

    setLoading(true);

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError || !userData.user) {
        throw new Error("Utilisateur non authentifié");
        }

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      router.push("/admin");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-primary flex min-h-screen items-center justify-center px-4">
      <div className="bg-bg-tertiary border-bg-secondary w-full max-w-md rounded-xl border p-6 shadow-lg">
        {/* Header */}
        <h1 className="text-text mb-2 text-center text-2xl font-bold">
          Création du mot de passe
        </h1>

        <p className="text-text-secondary mb-6 text-center text-sm">
          Définissez votre mot de passe pour accéder à votre compte admin
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-text-secondary text-sm">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-bg-secondary border-bg-secondary text-text focus:border-accent rounded-md border px-3 py-2 outline-none"
              placeholder="Minimum 8 caractères"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-text-secondary text-sm">Confirmation</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-bg-secondary border-bg-secondary text-text focus:border-accent rounded-md border px-3 py-2 outline-none"
              placeholder="Retapez le mot de passe"
            />
          </div>

          {error && (
            <div className="bg-error/10 border-error text-error rounded-md border px-3 py-2 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-accent hover:bg-accent/80 text-text rounded-md px-4 py-2 font-medium transition disabled:opacity-50"
          >
            {loading ? "Création..." : "Créer le mot de passe"}
          </button>
        </form>
      </div>
    </div>
  );
}
