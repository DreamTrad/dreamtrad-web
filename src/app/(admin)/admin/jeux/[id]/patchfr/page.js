"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

import GameToggles from "./GameToggles";
import GameProgress from "./GameProgress";
import RecruitmentsSection from "./RecruitmentsSection";
import PatchesSection from "./PatchesSection";
import RolesSection from "./RolesSection";
import PageEditor from "@/components/PageEditor";
import GalleryManager from "./GalleryManager";
import PlatformTabsEditor from "./PlatformTabsEditor";

export default function AdminGamePatchfrPage() {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [recruitments, setRecruitments] = useState({
    project: null,
    other: null,
  });

  useEffect(() => {
    if (!id) return;

    fetchGame();
    fetchRecruitments();
  }, [id]);

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

    const project = data?.find((r) => r.type === "project");
    const other = data?.find((r) => r.type === "other");

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
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
        <GameToggles game={game} onChange={updateGameField} />

        <GameProgress game={game} />

        <RecruitmentsSection
          recruitments={recruitments}
          setRecruitments={setRecruitments}
        />

        <PageEditor
        slug={`${id}/patchfr/telechargement`}
        file="infopatch"
        title="Info patch"
        editTitle
        editContent />

        <PatchesSection projectId={id} />

        <PlatformTabsEditor slug={`${id}/patchfr/installation`} />

        <GalleryManager projectId={id} />

        <RolesSection projectId={id} />
      </div>
    </>
  );
}
