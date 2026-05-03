"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import StorageImageEditor from "@/components/StorageImageEditor";

export default function GalleryManager({ projectId }) {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("project_id", projectId)
      .order("position");

    setImages(data || []);
  };

  useEffect(() => {
    fetchImages();
  }, [projectId]);

  const addImage = async () => {
    await supabase.from("gallery_images").insert({
      project_id: projectId,
      name: `${projectId}_${Date.now()}`,
      position: images.length,
    });

    fetchImages();
  };

  const removeImage = async (id) => {
    await supabase.from("gallery_images").delete().eq("id", id);
    fetchImages();
  };

  const swapPositions = async (a, b) => {
    // Update first image
    const { error: err1 } = await supabase
      .from("gallery_images")
      .update({ position: b.position })
      .eq("id", a.id);

    if (err1) {
      console.error(err1);
      return;
    }

    // Update second image
    const { error: err2 } = await supabase
      .from("gallery_images")
      .update({ position: a.position })
      .eq("id", b.id);

    if (err2) {
      console.error(err2);
      return;
    }

    fetchImages();
  };

  const moveUp = (index) => {
    if (index === 0) return;
    swapPositions(images[index], images[index - 1]);
  };

  const moveDown = (index) => {
    if (index === images.length - 1) return;
    swapPositions(images[index], images[index + 1]);
  };

  return (
    <div className="bg-bg-tertiary flex flex-col gap-4 rounded-xl p-6">
      <h2 className="text-lg font-bold">Galerie</h2>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {images.map((img, index) => (
          <div key={img.id} className="group relative">
            <StorageImageEditor
              imagePath={`jeux/${projectId}/patchfr/gallery/${img.name}.webp`}
              className="aspect-video overflow-hidden rounded-lg"
            />

            {/* DELETE */}
            <button
              onClick={() => {removeImage(img.id); console.log("delete clicked");}}
              className="pointer-events-auto bg-error absolute top-1 right-1 rounded px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100"
            >
              ✕
            </button>

            {/* ORDER CONTROLS */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 opacity-0 transition group-hover:opacity-100">
              <button
                onClick={() => moveUp(index)}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-lg text-white shadow-lg backdrop-blur hover:bg-black"
              >
                ←
              </button>

              <button
                onClick={() => moveDown(index)}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-lg text-white shadow-lg backdrop-blur hover:bg-black"
              >
                →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD */}
      <button
        onClick={addImage}
        className="bg-accent w-fit rounded px-4 py-2 text-white"
      >
        + Ajouter une image
      </button>
    </div>
  );
}
