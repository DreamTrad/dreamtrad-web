"use client";

import { useEffect, useState } from "react";
import MarkdownSection from "@/components/ui/MarkdownSection";

export default function MarkdownEditor({
  value,
  onChange,
  initialMode = "preview",
  className = "",
}) {
  const [mode, setMode] = useState(initialMode);
  const [localValue, setLocalValue] = useState(value || "");

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const update = (val) => {
    setLocalValue(val);
    onChange?.(val);
  };

  const insert = (text) => {
    update((localValue || "") + "\n" + text);
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>

      {/* HEADER */}
      <div className="flex items-center justify-between">

        {/* TOOLBAR */}
        {mode === "edit" ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => insert("## Titre")}
              className="rounded bg-bg-secondary px-3 py-1 text-sm"
            >
              H2
            </button>

            <button
              type="button"
              onClick={() => insert("**gras**")}
              className="rounded bg-bg-secondary px-3 py-1 text-sm"
            >
              Gras
            </button>

            <button
              type="button"
              onClick={() => insert("*italique*")}
              className="rounded bg-bg-secondary px-3 py-1 text-sm"
            >
              Italique
            </button>

            <button
              type="button"
              onClick={() =>
                insert("\n:::spoiler[spoiler]\n\ncontenu\n:::\n")
              }
              className="rounded bg-bg-secondary px-3 py-1 text-sm"
            >
              Spoiler
            </button>
          </div>
        ) : (
          <div />
        )}

        {/* MODE TOGGLE */}
        <button
          type="button"
          onClick={() =>
            setMode((m) => (m === "edit" ? "preview" : "edit"))
          }
          className="rounded bg-accent px-4 py-1 text-sm text-white"
        >
          {mode === "edit" ? "Preview" : "Éditer"}
        </button>
      </div>

      {/* CONTENT */}
      {mode === "edit" ? (
        <textarea
          value={localValue}
          onChange={(e) => update(e.target.value)}
          className="bg-bg-secondary min-h-62.5 w-full rounded p-3 font-mono"
        />
      ) : (
        <div className="bg-bg-secondary rounded p-4">
          <MarkdownSection content={localValue} />
        </div>
      )}
    </div>
  );
}