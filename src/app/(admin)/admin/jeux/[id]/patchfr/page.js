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

  // -------------------------
  // REVALIDATE HELPERS
  // -------------------------
  const getGamePaths = async (id) => {
    const paths = [
      `/jeux`,
      `/jeux/${id}`,
      `/jeux/${id}/patchfr/equipe`,
      `/jeux/${id}/patchfr/telechargement`,
      `/jeux/${id}/patchfr/installation`,
      `/jeux/${id}/guide`,
      `/jeux/${id}/guide/succes`,
      `/jeux/${id}/staff`,
    ];

    // fetch guide pages
    const { data: guides } = await supabase
      .from("pages")
      .select("slug, file")
      .eq("project_id", id)
      .eq("type", "guide")
      .eq("is_visible", true);

    for (const g of guides || []) {
      paths.push(`/jeux/${g.slug}/${g.file}`);
    }

    return paths;
  };

  const publish = async (paths) => {
    const uniquePaths = [...new Set(paths)];

    await fetch("/api/admin/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paths: uniquePaths,
      }),
    });
  };

  // -------------------------
  // UPDATE GAME FIELD
  // -------------------------
  const updateGameField = async (field, value) => {
    setGame((prev) => ({ ...prev, [field]: value }));

    await supabase
      .from("projects")
      .update({ [field]: value })
      .eq("id", id);

    // -------------------------
    // REVALIDATE LOGIC
    // -------------------------
    if (field === "show_progress") {
      await publish([`/`, `/jeux/${id}/patchfr/telechargement`]);
    }

    if (field === "is_visible") {
      await publish(await getGamePaths(id));
    }
  };

  if (!game || !recruitments.project || !recruitments.other) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
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
        type="infopatch"
        title="Info patch"
        editTitle
        editContent
      />

      <PatchesSection projectId={id} />

      <PlatformTabsEditor projectId={id} slug={`${id}/patchfr/installation`} />

      <GalleryManager projectId={id} />

      <RolesSection projectId={id} />
    </div>
  );
}
