// app/(admin)/admin/vndb-fr/page.js

"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import PageEditor from "@/components/PageEditor";
import UpdateVndbButton from "./UpdateVndbButton";

// Manage array fields (links, patchfr)
const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "_");
};

const makeUniqueId = (base, existingIds) => {
  let id = base;
  let i = 1;

  while (existingIds.includes(id)) {
    id = `${base}_${i}`;
    i++;
  }

  return id;
};

function ListEditor({ label, value = [], onChange }) {
  const updateItem = (index, val) => {
    const updated = [...value];
    updated[index] = val;
    onChange(updated);
  };

  const addItem = () => {
    onChange([...(value || []), ""]);
  };

  const removeItem = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="mb-2 font-bold">{label}</div>

      <div className="flex flex-col gap-2">
        {value.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              className="bg-bg-tertiary border-hover-tertiary text-text-secondary flex-1 rounded border p-2"
              placeholder="https://..."
            />

            <button
              onClick={() => removeItem(i)}
              className="bg-error rounded px-2 text-white"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="bg-accent mt-2 rounded px-2 py-1 text-xs text-white"
      >
        +
      </button>
    </div>
  );
}

function SearchableSelect({ options, value, onChange }) {
  const [search, setSearch] = useState("");

  const filtered = options.filter((o) =>
    o.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full max-w-md">
      <input
        className="bg-bg-tertiary border-hover-tertiary text-text-secondary mb-2 w-full rounded border p-2"
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="bg-bg-tertiary border-hover-tertiary text-text-secondary w-full rounded border p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size={8}
      >
        {filtered.map((o) => (
          <option key={o.id} value={o.id}>
            {o.title}
          </option>
        ))}
      </select>
    </div>
  );
}

function MultiSelect({ label, options, value, onChange }) {
  return (
    <div className="w-full">
      <div className="mb-1 font-bold">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value.includes(opt);

          return (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(
                  active ? value.filter((v) => v !== opt) : [...value, opt],
                );
              }}
              className={`rounded border px-2 py-1 text-sm transition ${
                active
                  ? "bg-accent text-white"
                  : "bg-bg-tertiary text-text-secondary border-hover-tertiary"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AdminVndbfrPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);

  const [entries, setEntries] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [genres, setGenres] = useState([]);
  const [durations, setDurations] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const [initialForm, setInitialForm] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  const createEntry = async () => {
    if (!newTitle.trim()) return;

    setCreating(true);

    const baseId = slugify(newTitle);
    const existingIds = entries.map((e) => e.id);
    const id = makeUniqueId(baseId, existingIds);

    const { data, error } = await supabase
      .from("vndbfrentries")
      .insert({
        id,
        title: newTitle,
        genres: [],
        platforms: [],
        patchfr: [],
        links: [],
        description: "",
        is_visible: false,
      })
      .select()
      .single();

    setCreating(false);

    if (!error && data) {
      const updated = [data, ...entries];
      setEntries(updated);

      setSelectedId(data.id);

      setNewTitle("");
      setCreateOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: entries } = await supabase
        .from("vndbfrentries")
        .select("*")
        .order("title");

      const { data: g } = await supabase.rpc("get_genres");
      const { data: d } = await supabase.rpc("get_durations");
      const { data: p } = await supabase.rpc("get_platforms");

      setEntries(entries || []);
      setGenres(g || []);
      setDurations(d || []);
      setPlatforms(p || []);

      if (entries?.length) {
        setSelectedId(entries[0].id);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const entry = entries.find((e) => e.id === selectedId);
    if (!entry) return;

    const clean = {
      ...entry,
      genres: entry.genres || [],
      platforms: entry.platforms || [],
      patchfr: entry.patchfr || [],
      links: entry.links || [],
    };

    setForm(clean);
    setInitialForm(clean);
    setIsDirty(false);
  }, [selectedId, entries]);

  const checkDirty = (newForm) => {
    return JSON.stringify(newForm) !== JSON.stringify(initialForm);
  };

  const updateField = (key, value) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    setIsDirty(checkDirty(updated));
  };

  const save = async () => {
    setSaving(true);

    const { data, error } = await supabase
      .from("vndbfrentries")
      .update({
        title: form.title,
        duration: form.duration,
        genres: form.genres,
        platforms: form.platforms,
        patchfr: form.patchfr,
        links: form.links,
        description: form.description,
        is_visible: form.is_visible,
      })
      .eq("id", form.id)
      .select()
      .single();

    setSaving(false);

    if (!error && data) {
      setForm(data);
      setInitialForm(data);
      setIsDirty(false);
    }
  };

  const reset = () => {
    setForm(initialForm);
    setIsDirty(false);
  };

  if (!form) return null;

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Admin VNDB-FR</h1>
      {/* INFOBOX */}
      <div className="mb-10">
        <h1 className="text-accent mb-4 text-2xl font-bold">Infobox vndb-fr</h1>

        <PageEditor slug="vndb-fr" file="infobox" />
      </div>

      {/* ENTRÉES */}

      {createOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="bg-bg-secondary border-hover-tertiary w-full max-w-md rounded-xl border p-6">
            <h2 className="mb-4 text-lg font-bold">Créer une entrée</h2>

            <input
              className="bg-bg-tertiary border-hover-tertiary text-text-secondary mb-4 w-full rounded border p-2"
              placeholder="Titre"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setCreateOpen(false)}
                className="bg-warning rounded px-3 py-2 text-white"
              >
                Annuler
              </button>

              <button
                onClick={createEntry}
                disabled={creating}
                className="bg-success rounded px-3 py-2 text-white"
              >
                {creating ? "Création..." : "Créer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SELECT */}
      {/* SELECT BAR */}
      <div className="items-top mb-8 flex gap-4">
        <span className="font-bold">Sélectionner une entrée :</span>

        <SearchableSelect
          options={entries}
          value={selectedId}
          onChange={setSelectedId}
        />
        <div className="ml-auto flex-col space-y-4 p-6">
          <div className="mt-auto">
            <UpdateVndbButton />
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="bg-accent mb-auto w-full rounded px-3 py-2 text-sm text-white"
          >
            + Nouvelle entrée
          </button>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-bg-secondary border-hover-tertiary space-y-4 rounded-xl border p-6">
        <label className="flex items-center gap-2">
          <span className="mb-1 font-bold">Titre</span>
          <input
            className="bg-bg-tertiary border-hover-tertiary text-text-secondary w-full rounded border p-2"
            value={form.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </label>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <span className="mb-1 font-bold">Durée</span>
            <select
              className="bg-bg-tertiary border-hover-tertiary text-text-secondary rounded border p-2"
              value={form.duration || durations[0] || ""}
              onChange={(e) => updateField("duration", e.target.value)}
            >
              {durations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label className="ml-auto flex items-center gap-2">
            <span>Visible sur le site</span>
            <input
              type="checkbox"
              checked={form.is_visible || false}
              onChange={(e) => updateField("is_visible", e.target.checked)}
            />
          </label>
        </div>

        <MultiSelect
          label="Genres"
          options={genres}
          value={form.genres}
          onChange={(v) => updateField("genres", v)}
        />

        <MultiSelect
          label="Plateformes"
          options={platforms}
          value={form.platforms}
          onChange={(v) => updateField("platforms", v)}
        />

        <ListEditor
          label="Liens"
          value={form.links || []}
          onChange={(v) => updateField("links", v)}
        />

        <ListEditor
          label="Patch FR"
          value={form.patchfr || []}
          onChange={(v) => updateField("patchfr", v)}
        />
        <textarea
          className="bg-bg-tertiary border-hover-tertiary text-text-secondary w-full rounded border p-2"
          rows={6}
          value={form.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
        />

        {isDirty && (
          <div className="flex gap-2">
            <button
              onClick={save}
              disabled={saving}
              className="bg-success rounded px-4 py-2 text-white transition hover:bg-green-600 active:scale-95"
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
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
    </div>
  );
}
