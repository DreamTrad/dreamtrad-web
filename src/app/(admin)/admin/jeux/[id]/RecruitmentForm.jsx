import { useEffect, useState } from "react";

export default function RecruitmentForm({ data, onSave, label, onSaved }) {
  const [localData, setLocalData] = useState(data);

  const [isDirty, setIsDirty] = useState(false);

  const [initialData, setInitialData] = useState(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const checkDirty = (newData) => {
    return JSON.stringify(newData) !== JSON.stringify(initialData);
  };

  const updateField = (field, value) => {
    const newData = { ...localData, [field]: value };

    setLocalData(newData);
    setIsDirty(checkDirty(newData));
  };

  const updateList = (field, index, value) => {
    const updated = [...(localData[field] || [])];
    updated[index] = value;

    updateField(field, updated);
  };

  const addItem = (field) => {
    const updated = [...(localData[field] || []), ""];
    updateField(field, updated);
  };

  const removeItem = (field, index) => {
    const updated = localData[field].filter((_, i) => i !== index);
    updateField(field, updated);
  };

  const reset = () => {
    setLocalData(initialData);

    if (typeof onChange === "function") {
      Object.entries(initialData ?? {}).forEach(([key, value]) => {
        onChange(key, value);
      });
    }

    setIsDirty(false);
  };

  return (
    <div className="bg-bg-tertiary border-bg-secondary flex flex-col gap-4 rounded-xl border p-4">
      <h2 className="text-lg font-bold">{label}</h2>

      <label className="flex items-center gap-2">
        <span>Actif</span>
        <input
          type="checkbox"
          checked={localData.is_active || false}
          onChange={(e) => updateField("is_active", e.target.checked)}
        />
      </label>

      <input
        value={localData.title || ""}
        onChange={(e) => updateField("title", e.target.value)}
        placeholder="Titre"
        className="bg-bg-secondary rounded p-2"
      />

      <div>
        <div className="mb-1 text-sm">Rôles</div>
        {localData.roles?.map((role, i) => (
          <div key={i} className="mb-1 flex gap-2">
            <input
              value={role}
              onChange={(e) => updateList("roles", i, e.target.value)}
              className="bg-bg-secondary flex-1 rounded p-2"
            />
            <button
              onClick={() => removeItem("roles", i)}
              className="bg-error rounded px-2 text-white transition hover:bg-red-600 active:scale-95"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={() => addItem("roles")}
          className="bg-accent hover:bg-accent/80 rounded px-2 py-1 text-xs text-white transition active:scale-95"
        >
          +
        </button>
      </div>

      <input
        value={localData.contact || ""}
        onChange={(e) => updateField("contact", e.target.value)}
        placeholder="Contact"
        className="bg-bg-secondary rounded p-2"
      />

      <textarea
        value={localData.description || ""}
        onChange={(e) => updateField("description", e.target.value)}
        rows={4}
        className="bg-bg-secondary rounded p-2"
      />

      {isDirty && (
        <div className="flex gap-2">
          <button className="bg-success rounded px-4 py-2 text-white transition hover:bg-green-600 active:scale-95"
            onClick={async () => {
              const savedData = await onSave(localData);

              if (savedData) {
                setLocalData(savedData);
                setIsDirty(false);
                setInitialData(savedData);

                if (onSaved) onSaved(savedData);
              }
            }}
          >
            Enregistrer
          </button>

          <button
            onClick={reset}
            className="bg-warning rounded px-4 py-2 text-white transition hover:bg-yellow-500 active:scale-95"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
