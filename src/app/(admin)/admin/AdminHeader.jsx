// components/admin/AdminHeader.jsx

"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="bg-bg-secondary/80 flex items-center justify-between border-b border-white/5 px-6 py-3 backdrop-blur">
      <div className="flex flex-col">
        <span className="text-text-secondary text-sm">DreamTrad</span>
        <span className="text-accent text-lg font-semibold">
          Interface d’administration
        </span>
      </div>

      <button
        onClick={handleLogout}
        className="bg-error/90 hover:bg-error rounded-lg px-4 py-2 text-sm font-semibold text-white transition"
      >
        Déconnexion
      </button>
    </header>
  );
}
