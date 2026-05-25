// app/admin/page.js

"use client";

import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  redirect(`/admin/jeux`);
}