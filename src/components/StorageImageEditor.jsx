"use client";

import { useRef, useState } from "react";
import { getImageUrl } from "@/lib/supabase/storage";

export default function StorageImageEditor({
  imagePath,
  children,
}) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(Date.now());

  const imageUrl = getImageUrl(imagePath) + `?t=${refreshKey}`;

  const openFilePicker = () => {
    if (!loading) inputRef.current?.click();
  };

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
    <>
      {children({
        imageUrl,
        openFilePicker,
        loading,
      })}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
    </>
  );
}