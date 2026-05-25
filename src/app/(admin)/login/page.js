// app/login/page.js

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.push("/admin/jeux");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary text-white">
      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-sm rounded-2xl bg-[#1a1a1a] p-6 shadow-xl"
      >
        {/* Back to site */}
        <Link
          href="/"
          className="absolute left-4 top-4 text-sm text-text-secondary transition hover:text-white"
        >
          ← Retour au site
        </Link>

        <h1 className="mb-6 mt-6 text-center text-2xl font-bold">
          Connexion Admin
        </h1>

        {errorMsg && (
          <p className="mb-4 rounded bg-red-500/20 p-2 text-sm text-red-400">
            {errorMsg}
          </p>
        )}

        <div className="mb-4 flex flex-col gap-2">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            className="rounded-lg bg-[#2a2a2a] p-3 outline-none focus:ring-2 focus:ring-accent"
            placeholder="email@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <label className="text-sm text-gray-300">Mot de passe</label>
          <input
            type="password"
            className="rounded-lg bg-[#2a2a2a] p-3 outline-none focus:ring-2 focus:ring-accent"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-accent py-3 font-semibold transition hover:bg-accent/90 disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}