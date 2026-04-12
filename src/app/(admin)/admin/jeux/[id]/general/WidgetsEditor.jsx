"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function WidgetsEditor({ projectId }) {
  const [widgets, setWidgets] = useState([]);
  const [original, setOriginal] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    fetchWidgets();
  }, [projectId]);

  useEffect(() => {
    const changed =
      JSON.stringify(widgets) !== JSON.stringify(original);
    setIsDirty(changed);
  }, [widgets, original]);

  const fetchWidgets = async () => {
    const { data, error } = await supabase
      .from("widgets")
      .select("*")
      .eq("project", projectId);

    if (error) {
      console.error(error);
      return;
    }

    setWidgets(data || []);
    setOriginal(data || []);
  };

  const updateWidget = (index, value) => {
    setWidgets((prev) => {
      const updated = [...prev];
      updated[index].embed_id = value;
      return updated;
    });
  };

  const save = async () => {
    for (const widget of widgets) {
      const { error } = await supabase
        .from("widgets")
        .update({ embed_id: widget.embed_id })
        .eq("project", projectId)
        .eq("widget_type", widget.widget_type);

      if (error) {
        console.error(error);
        return;
      }
    }

    setOriginal(widgets);
    setIsDirty(false);
  };

  const reset = () => {
    setWidgets(original);
  };

  if (!widgets.length) {
    return <div className="p-4">Aucun widget</div>;
  }

  return (
    <div className="bg-bg-tertiary border-bg-secondary flex flex-col gap-6 rounded-xl border p-6">
      <h2 className="text-lg font-bold">Widgets</h2>

      {widgets.map((widget, index) => (
        <div key={widget.widget_type}>
          <label className="text-sm font-medium">
            {widget.widget_type}
          </label>
          <input
            value={widget.embed_id || ""}
            onChange={(e) =>
              updateWidget(index, e.target.value)
            }
            className="bg-bg-secondary w-full rounded p-2"
          />
        </div>
      ))}

      {isDirty && (
        <div className="flex justify-end gap-2">
          <button
            onClick={reset}
            className="bg-text-tertiary rounded px-4 py-2"
          >
            Reset
          </button>
          <button
            onClick={save}
            className="bg-success rounded px-4 py-2 text-white"
          >
            Enregistrer
          </button>
        </div>
      )}
    </div>
  );
}