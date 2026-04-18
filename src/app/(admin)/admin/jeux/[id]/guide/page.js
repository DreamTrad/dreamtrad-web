"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import GuideManager from "./GuideManager";
import { buildGuideSections } from "./buildGuideSections";

export default function GuideAdminPage() {
  const { id } = useParams();

  const [pages, setPages] = useState([]);
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

    setPages(data || []);
    setSections(buildGuideSections(data || [], id));
  };

  // SAVE POSITIONS
  const save = async () => {
    for (const section of sections) {
      const baseSlug =
        section.id === "root" ? `${id}/guide` : `${id}/guide/${section.id}`;

      for (let i = 0; i < section.children.length; i++) {
        const item = section.children[i];

        await supabase
          .from("pages")
          .update({
            position: i * 10,
          })
          .eq("file", item.file)
          .eq("slug", baseSlug);
      }
    }

    setIsDirty(false);
    fetchPages();
  };

  const toggleVisibility = async (item) => {
    const newValue = !item.is_visible;

    // optimistic update
    setSections((prev) =>
      prev.map((section) => ({
        ...section,
        children: section.children.map((child) =>
          child.file === item.file ? { ...child, is_visible: newValue } : child,
        ),
      })),
    );

    await supabase
      .from("pages")
      .update({
        is_visible: newValue,
      })
      .eq("file", item.file);
  };

  // MOVE ITEM
  const moveItem = async (item, folder) => {
    const newSlug = folder ? `${id}/guide/${folder}` : `${id}/guide`;

    await supabase
      .from("pages")
      .update({ slug: newSlug })
      .eq("file", item.file);

    fetchPages();
  };

  // CREATE FOLDER + MOVE
  const createFolderAndMove = async (item, folderName) => {
  const folder = folderName.toLowerCase().replace(/\s/g, "_");

  await moveItem(item, folder);
};

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-end">
        {isDirty && (
          <button
            onClick={save}
            className="bg-success rounded px-4 py-2 text-white"
          >
            Enregistrer
          </button>
        )}
      </div>

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
  );
}
