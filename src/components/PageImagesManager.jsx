"use client";

import { useEffect, useState } from "react";
import StorageImageEditor from "@/components/StorageImageEditor";

export default function PageImagesManager({ slug, file, ignoreFile = false }) {
  const [images, setImages] = useState([]);
  const [newName, setNewName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  // Build folder path properly
  const pathFolder = ignoreFile
    ? slug
    : `${slug}/${file}`;

  const fetchImages = async () => {
    setIsLoading(true);
    setLoadError("");

    try {
      const params = new URLSearchParams({ slug, file });

      const response = await fetch(`/api/admin/page-images?${params}`);
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Impossible de charger les images.");
      }

      setImages(result.images || []);
    } catch (error) {
      setImages([]);
      setLoadError(error.message || "Impossible de charger les images.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!slug) return;
    if (!ignoreFile && !file) return;

    fetchImages();
  }, [slug, file, ignoreFile]);

  const addImage = async () => {
    const cleanName = newName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, "_");

    if (!cleanName) return;

    const response = await fetch("/api/admin/page-images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, file, name: cleanName }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      setLoadError(result.error || "Impossible d’ajouter l’image.");
      return;
    }

    setNewName("");
    await fetchImages();
  };

  const removeImage = async (id) => {
    const response = await fetch("/api/admin/page-images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      setLoadError(result.error || "Impossible de supprimer l’image.");
      return;
    }

    await fetchImages();
  };

  const copyName = (name) => {
    navigator.clipboard.writeText(
      `![](/jeux/${pathFolder}/${name}.webp)`
    );
  };

  return (
    <div className="bg-bg-tertiary flex flex-col gap-4 rounded-xl p-6">
      <h2 className="text-lg font-bold">Images de la page</h2>

      {/* ADD */}
      <div className="flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nom de l’image"
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
          const path = `jeux/${pathFolder}/${img.name}.webp`;

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
      {isLoading && <p className="text-sm text-text-secondary">Chargement des images...</p>}
      {loadError && <p role="alert" className="text-sm text-error">{loadError}</p>}
      {!isLoading && !loadError && images.length === 0 && (
        <p className="text-sm text-text-secondary">Aucune image disponible pour cette page.</p>
      )}
    </div>
  );
}