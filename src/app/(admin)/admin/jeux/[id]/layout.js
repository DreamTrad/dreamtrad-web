import { supabase } from "@/lib/supabase/client";

import GameHeader from "./GameHeader";

export default async function AdminGameLayout({ children, params }) {
  const id = (await params).id;

  const { data: game } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();


  if (!game) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <>
      <GameHeader id={game.id} title={game.title} />
      {children}
    </>
  );
}
