"use client";

import { useEffect, useRef, useState } from "react";
import MarkdownSection from "@/components/ui/MarkdownSection";

export default function MarkdownEditor({
  value,
  onChange,
  initialMode = "preview",
  className = "",
}) {
  const [mode, setMode] = useState(initialMode);
  const [localValue, setLocalValue] = useState(value || "");
  const textareaRef = useRef(null);

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  useEffect(() => {
  if (mode === "edit") {
    autoResize();
    }
  }, [localValue, mode]);

  const update = (val) => {
    setLocalValue(val);
    onChange?.(val);
  };

  const insert = (text) => {
    update((localValue || "") + "\n" + text);
  };

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;

    const scrollPos = window.scrollY;

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";

    // restore scroll position to avoid page jump
    window.scrollTo(0, scrollPos);
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
          ref={textareaRef}
          value={localValue}
          onChange={(e) => update(e.target.value)}
          onInput={autoResize}
          className="bg-bg-secondary w-full resize-none overflow-hidden rounded p-3 font-mono"
          style={{
            minHeight: "200px",
            willChange: "height",
          }}
        />
      ) : (
        <div className="bg-bg-secondary rounded p-4">
          <MarkdownSection content={localValue} />
        </div>
      )}
    </div>
  );
}