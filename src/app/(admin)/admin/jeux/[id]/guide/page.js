"use client";

import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";


export default function AdminGameGuidePage() {
  const { id } = useParams();



  return (
    <>
      <h2 className="p-6">Ça sera dev un plus tard…</h2>
    </>
  );
}
