"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import StorageImageEditor from "@/components/StorageImageEditor";

export default function GuideImagesManager({ pageId, gameId }) {
  const [images, setImages] = useState([]);
  const [newName, setNewName] = useState("");

  const fetchImages = async () => {
    const { data } = await supabase
      .from("page_images")
      .select("*")
      .eq("page_id", pageId)
      .order("created_at");

    setImages(data || []);
  };

  useEffect(() => {
    fetchImages();
  }, [pageId]);

  const addImage = async () => {
    const cleanName = newName.toLowerCase().replace(/[^a-z0-9_-]/g, "_");
    if (!cleanName.trim()) return;

    await supabase.from("page_images").insert({
      page_id: pageId,
      name: cleanName.trim(),
    });

    setNewName("");
    fetchImages();
  };

  const removeImage = async (id) => {
    await supabase.from("page_images").delete().eq("id", id);
    fetchImages();
  };

  const copyName = (name) => {
    navigator.clipboard.writeText(
      `![](/jeux/${gameId}/guide/${pageId}/${name}.webp)`,
    );
  };

  return (
    <div className="bg-bg-tertiary flex flex-col gap-4 rounded-xl p-6">
      <h2 className="text-lg font-bold">Images du guide</h2>

      {/* ADD */}
      <div className="flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nom qu’aura l’image"
          className="bg-bg-secondary flex-1 rounded px-3 py-2 text-sm"
        />

        <button
          onClick={addImage}
          className="bg-accent rounded px-4 py-2 text-white"
        >
          Ajouter
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((img) => {
          const path = `jeux/${gameId}/guide/${pageId}/${img.name}.webp`;

          return (
            <div
              key={img.id}
              className="bg-bg-secondary flex flex-col gap-2 rounded-lg p-3"
            >
              <StorageImageEditor
                imagePath={path}
                className="aspect-video overflow-hidden rounded"
              />

              {/* NAME + ACTIONS */}
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-xs">{img.name}</span>

                <div className="flex gap-1">
                  <button
                    onClick={() => copyName(img.name)}
                    className="bg-bg-tertiary rounded px-2 py-1 text-xs"
                  >
                    Copier
                  </button>

                  <button
                    onClick={() => removeImage(img.id)}
                    className="bg-error rounded px-2 py-1 text-xs text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
