"use client";

import { useState } from "react";

export default function UpdateVndbButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/update-vndb", {
        method: "POST",
      });

      const json = await res.json();
      setResult(json);
    } catch (e) {
      setResult({ error: "Erreur" });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className="bg-accent rounded px-4 py-2 text-white"
      >
        {loading ? "Mise à jour..." : "Mettre à jour les votes et scores VNDB"}
      </button>

      {result && (
        <div className="text-sm">
          {result.updated ? `${result.updated} entrées mises à jour` : "Erreur"}
        </div>
      )}
    </div>
  );
}
