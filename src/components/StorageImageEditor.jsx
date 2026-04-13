"use client";

import { useRef, useState } from "react";
import { getImageUrl } from "@/lib/supabase/storage";

export default function StorageImageEditor({
  imagePath,
  title,
  className = "",
  previewClassName = "h-48",
}) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(Date.now());

  const imageUrl = getImageUrl(imagePath) + `?t=${refreshKey}`;

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", imagePath);

    const res = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (!res.ok) {
      console.error(await res.json());
      return;
    }

    setRefreshKey(Date.now());
  };

  return (
  <div className={`flex flex-col gap-4 ${className}`}>
    {/* Title + button row */}
    {(title || true) && (
      <div className="flex gap-2">
        {title && <h2 className="text-lg font-bold">{title}</h2>}

        <button
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="bg-accent hover:bg-accent-secondary rounded-md px-4 py-2 text-sm text-white transition disabled:opacity-50"
        >
          {loading ? "Upload..." : "Changer l’image"}
        </button>
      </div>
    )}

    {/* Preview */}
    <div className="relative w-full overflow-hidden rounded-lg">
      <img src={imageUrl} className={previewClassName} />
    </div>

    {/* Hidden input */}
    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleUpload}
    />
  </div>
);
}