"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import GuideManager from "./GuideManager";
import { buildGuideSections } from "./buildGuideSections";

export default function GuideAdminPage() {
  const { id } = useParams();
  const router = useRouter();

  const [sections, setSections] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    fetchPages();
  }, [id]);

  const fetchPages = async () => {
    const { data } = await supabase
      .from("pages")
      .select("*")
      .eq("project_id", id)
      .eq("type", "guide")
      .order("position", { ascending: true });

    setSections(buildGuideSections(data || [], id));
  };

  // -----------------------
  // CREATE PAGE
  // -----------------------
  const createPage = async () => {
    const name = prompt("Nom de la page");
    if (!name) return;

    const file = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/[^\w]/g, "");

    // position at end
    const { data: last } = await supabase
      .from("pages")
      .select("position")
      .eq("project_id", id)
      .eq("type", "guide")
      .order("position", { ascending: false })
      .limit(1)
      .single();

    const position = (last?.position || 0) + 10;

    await supabase.from("pages").insert({
      slug: `${id}/guide`,
      file,
      project_id: id,
      type: "guide",
      title: name,
      alias: name,
      position,
      is_visible: false,
    });

    fetchPages();
  };

  // -----------------------
  // SAVE POSITIONS
  // -----------------------
  const save = async () => {
    for (const section of sections) {
      const baseSlug =
        section.id === "root"
          ? `${id}/guide`
          : `${id}/guide/${section.id}`;

      for (let i = 0; i < section.children.length; i++) {
        const item = section.children[i];

        await supabase
          .from("pages")
          .update({ position: i * 10 })
          .eq("file", item.file)
          .eq("slug", baseSlug);
      }
    }

    setIsDirty(false);
    fetchPages();
  };

  // -----------------------
  // VISIBILITY
  // -----------------------
  const toggleVisibility = async (item) => {
    const newValue = !item.is_visible;

    setSections((prev) =>
      prev.map((section) => ({
        ...section,
        children: section.children.map((child) =>
          child.file === item.file ? { ...child, is_visible: newValue } : child
        ),
      }))
    );

    await supabase
      .from("pages")
      .update({ is_visible: newValue })
      .eq("file", item.file);
  };

  // -----------------------
  // MOVE
  // -----------------------
  const moveItem = async (item, folder) => {
    const newSlug = folder ? `${id}/guide/${folder}` : `${id}/guide`;

    await supabase
      .from("pages")
      .update({ slug: newSlug })
      .eq("file", item.file);

    fetchPages();
  };

  const createFolderAndMove = async (item, folderName) => {
    const folder = folderName.toLowerCase().replace(/\s/g, "_");
    await moveItem(item, folder);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* -------- SUCCESS BUTTON -------- */}
      <div>
        <button
          onClick={() => router.push(`/admin/jeux/${id}/guide/succes`)}
          className="bg-accent rounded px-4 py-2 text-white"
        >
          Gérer les succès
        </button>
      </div>

      {/* -------- GUIDE BLOCK -------- */}
      <div className="bg-bg-tertiary border-bg-secondary rounded-xl border p-6 flex flex-col gap-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Guide</h2>

          <div className="flex gap-2">
            <button
              onClick={createPage}
              className="bg-accent rounded px-4 py-2 text-sm text-white"
            >
              + Nouvelle page
            </button>

            {isDirty && (
              <button
                onClick={save}
                className="bg-success rounded px-4 py-2 text-sm text-white"
              >
                Enregistrer
              </button>
            )}
          </div>
        </div>

        {/* LIST */}
        <GuideManager
          sections={sections}
          setSections={(s) => {
            setSections(s);
            setIsDirty(true);
          }}
          moveItem={moveItem}
          createFolder={createFolderAndMove}
          gameId={id}
          toggleVisibility={toggleVisibility}
        />
      </div>
    </div>
  );
}