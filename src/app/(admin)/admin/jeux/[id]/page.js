"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

import GameHeader from "./GameHeader";
import GameToggles from "./GameToggles";
import GameProgress from "./GameProgress";
import RecruitmentsSection from "./RecruitmentsSection";

export default function AdminGamePage() {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [recruitments, setRecruitments] = useState({
    project: null,
    other: null,
  });

  useEffect(() => {
    fetchGame();
    fetchRecruitments();
  }, []);

  const fetchGame = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (data) setGame(data);
  };

  const fetchRecruitments = async () => {
    const { data } = await supabase
      .from("project_recruitments")
      .select("*")
      .eq("project_id", id);

    let project = data?.find((r) => r.type === "project");
    let other = data?.find((r) => r.type === "other");

    if (!project) {
      const { data: created } = await supabase
        .from("project_recruitments")
        .insert({ project_id: id, type: "project" })
        .select()
        .single();
      project = created;
    }

    if (!other) {
      const { data: created } = await supabase
        .from("project_recruitments")
        .insert({ project_id: id, type: "other" })
        .select()
        .single();
      other = created;
    }

    setRecruitments({ project, other });
  };

  const updateGameField = async (field, value) => {
    setGame((prev) => ({ ...prev, [field]: value }));

    await supabase
      .from("projects")
      .update({ [field]: value })
      .eq("id", id);
  };

  if (!game || !recruitments.project || !recruitments.other) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
      <GameHeader title={game.title} />

      <GameToggles game={game} onChange={updateGameField} />

      <GameProgress game={game} />

      <RecruitmentsSection
        recruitments={recruitments}
        setRecruitments={setRecruitments}
      />
    </div>
  );
}