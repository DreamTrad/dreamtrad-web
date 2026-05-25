"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleSession = async () => {
      const hash = window.location.hash;

      if (!hash) {
        console.error("No hash found in URL");
        return;
      }

      const params = new URLSearchParams(hash.substring(1));

      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (!access_token || !refresh_token) {
        console.error("Tokens missing in URL");
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        console.error("Set session failed:", error.message);
        return;
      }

      router.replace("/auth/set-password");
    };

    handleSession();
  }, [router]);

  return <div>Connexion en cours...</div>;
}