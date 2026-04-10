"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase/client";
import DiscoverCard from "@/app/(site)/vndb-fr/VndbfrCard";

/* ---------------- MultiDropdown ---------------- */

function MultiDropdown({ label, options, selected, setSelected }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const toggleItem = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="border-hover-tertiary bg-bg-tertiary text-text-tertiary w-48 rounded-xl border p-2 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        {selected.length ? selected.join(", ") : label}
      </button>

      {open && (
        <div className="border-hover-tertiary bg-bg-tertiary text-text-tertiary absolute z-10 mt-1 max-h-72 w-48 overflow-auto rounded-xl border p-2 shadow-lg">
          {options.map((opt) => (
            <label
              key={opt}
              className="border-hover-tertiary bg-bg-tertiary text-text-tertiary hover:bg-hover-tertiary flex cursor-pointer items-center px-2 py-1"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selected.includes(opt)}
                onChange={() => toggleItem(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Page Client ---------------- */

export default function VndbfrClient() {
  const [dataEntries, setDataEntries] = useState([]);
  const [dataGenres, setDataGenres] = useState([]);
  const [dataDurations, setDataDurations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [traductionFilter, setTraductionFilter] = useState("");
  const [vndbLinkFilter, setVndbLinkFilter] = useState("");
  const [sortOption, setSortOption] = useState("titre-asc");

  useEffect(() => {
    const fetchAll = async () => {
      const { data: entries } = await supabase
        .from("vndbfrentries")
        .select("*")
        .eq("is_visible", true)
        .order("title", { ascending: true });

      const { data: genres } = await supabase.rpc("get_genres");
      const { data: durations } = await supabase.rpc("get_durations");

      setDataEntries(entries || []);
      setDataGenres(genres || []);
      setDataDurations(durations || []);
    };

    fetchAll();
  }, []);

  /* ---------------- FILTER ---------------- */

  const filtered = useMemo(() => {
    return dataEntries.filter((p) => {
      const nameMatch = p.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const genresP = p.genres || [];

      const durationMatch =
        selectedDuration.length === 0 || selectedDuration.includes(p.duration);

      const genreMatch =
        selectedGenres.length === 0 ||
        selectedGenres.some((g) => genresP.includes(g));

      const hasFanTrad =
        Array.isArray(p.patchfr) &&
        p.patchfr.some((l) => l.startsWith("fr:"));

      const tradMatch =
        traductionFilter === ""
          ? true
          : traductionFilter === "officielle"
            ? !hasFanTrad
            : hasFanTrad;

      const hasVndbLink =
        Array.isArray(p.links) && p.links.some((l) => l.includes("vndb.org"));

      const vndbMatch =
        vndbLinkFilter === ""
          ? true
          : vndbLinkFilter === "with"
            ? hasVndbLink
            : !hasVndbLink;

      return nameMatch && genreMatch && durationMatch && tradMatch && vndbMatch;
    });
  }, [
    dataEntries,
    searchTerm,
    selectedGenres,
    selectedDuration,
    traductionFilter,
    vndbLinkFilter,
  ]);

  /* ---------------- SORT ---------------- */

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "titre-asc":
          return a.title.localeCompare(b.title);
        case "titre-desc":
          return b.title.localeCompare(a.title);
        case "note-asc":
          return (a.vndb_rating || 0) - (b.vndb_rating || 0);
        case "note-desc":
          return (b.vndb_rating || 0) - (a.vndb_rating || 0);
        case "popularite-asc":
          return (a.vndb_votes || 0) - (b.vndb_votes || 0);
        case "popularite-desc":
          return (b.vndb_votes || 0) - (a.vndb_votes || 0);
        default:
          return 0;
      }
    });
  }, [filtered, sortOption]);

  return (
    <>
      {/* Filtres */}
      <div className="mt-16 mb-8 flex flex-wrap justify-center gap-4">
        <input
          type="text"
          className="border-hover-tertiary bg-bg-tertiary text-text-tertiary rounded-xl border p-2"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <MultiDropdown
          label="Sélectionner des genres"
          options={dataGenres}
          selected={selectedGenres}
          setSelected={setSelectedGenres}
        />

        <MultiDropdown
          label="Sélectionner des durées"
          options={dataDurations}
          selected={selectedDuration}
          setSelected={setSelectedDuration}
        />

        <select
          className="border-hover-tertiary bg-bg-tertiary text-text-tertiary rounded-xl border p-2"
          value={traductionFilter}
          onChange={(e) => setTraductionFilter(e.target.value)}
        >
          <option value="">Toutes traductions</option>
          <option value="officielle">Officielle</option>
          <option value="non-officielle">Fantraduction</option>
        </select>

        <select
          className="border-hover-tertiary bg-bg-tertiary text-text-tertiary rounded-xl border p-2"
          value={vndbLinkFilter}
          onChange={(e) => setVndbLinkFilter(e.target.value)}
        >
          <option value="">Visual novels et jeux semblables</option>
          <option value="with">Visual novels uniquement</option>
          <option value="without">Jeux semblables uniquement</option>
        </select>

        <select
          className="border-hover-tertiary bg-bg-tertiary text-text-tertiary rounded-xl border p-2"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="titre-asc" className="font-secondary">
            Titre A→Z
          </option>
          <option value="titre-desc">Titre Z→A</option>
          <option value="note-asc">Note VNDB ↓</option>
          <option value="note-desc">Note VNDB ↑</option>
          <option value="popularite-asc">Popularité ↓</option>
          <option value="popularite-desc">Popularité ↑</option>
        </select>
      </div>

      {/* Grille */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,800px))] justify-center gap-8">
        {sorted.map((p) => (
          <DiscoverCard key={p.id} {...p} />
        ))}
      </div>
    </>
  );
}
