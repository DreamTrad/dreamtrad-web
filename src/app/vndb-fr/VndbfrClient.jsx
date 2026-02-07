"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import DiscoverCard from "@/app/vndb-fr/VndbfrCard";
import MarkdownSection from "@/components/ui/MarkdownSection";
import InfoBox from "@/components/ui/InfoBox";

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

export default function VndbfrClient({ initialData, markdownContent }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDurees, setSelectedDurees] = useState([]);
  const [traductionFilter, setTraductionFilter] = useState("");
  const [vndbLinkFilter, setVndbLinkFilter] = useState("");
  const [sortOption, setSortOption] = useState("titre-asc");

  const data = initialData ?? [];

  const genres = useMemo(
    () =>
      Array.from(
        new Set(
          data.flatMap((p) =>
            Array.isArray(p.genre)
              ? p.genre
              : p.genre
                ? p.genre.split(",").map((g) => g.trim())
                : [],
          ),
        ),
      ).sort(),
    [data],
  );

  const durees = useMemo(
    () => Array.from(new Set(data.map((p) => p.duree).filter(Boolean))).sort(),
    [data],
  );

  const filtered = useMemo(() => {
    return data.filter((p) => {
      const nameMatch = p.titre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const genresP = Array.isArray(p.genre)
        ? p.genre
        : p.genre
          ? p.genre.split(",").map((g) => g.trim())
          : [];

      const dureeMatch =
        selectedDurees.length === 0 || selectedDurees.includes(p.duree);

      const genreMatch =
        selectedGenres.length === 0 ||
        selectedGenres.some((g) => genresP.includes(g));

      const hasFanTrad =
        Array.isArray(p.patch_fr) &&
        p.patch_fr.some((l) => l.startsWith("fr:"));

      const tradMatch =
        traductionFilter === ""
          ? true
          : traductionFilter === "officielle"
            ? !hasFanTrad
            : hasFanTrad;

      const hasVndbLink =
        Array.isArray(p.lien_jeu) &&
        p.lien_jeu.some((l) => l.includes("vndb.org"));

      const vndbMatch =
        vndbLinkFilter === ""
          ? true
          : vndbLinkFilter === "with"
            ? hasVndbLink
            : !hasVndbLink;

      return nameMatch && genreMatch && dureeMatch && tradMatch && vndbMatch;
    });
  }, [
    data,
    searchTerm,
    selectedGenres,
    selectedDurees,
    traductionFilter,
    vndbLinkFilter,
  ]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "titre-asc":
          return a.titre.localeCompare(b.titre);
        case "titre-desc":
          return b.titre.localeCompare(a.titre);
        case "note-asc":
          return (a.note_vndb || 0) - (b.note_vndb || 0);
        case "note-desc":
          return (b.note_vndb || 0) - (a.note_vndb || 0);
        case "popularite-asc":
          return (a.popularite_vndb || 9999) - (b.popularite_vndb || 9999);
        case "popularite-desc":
          return (b.popularite_vndb || 9999) - (a.popularite_vndb || 9999);
        default:
          return 0;
      }
    });
  }, [filtered, sortOption]);

  return (
    <div className="max-w-9xl mx-auto p-8">
      <InfoBox title="Découvrir des visual novels en français" icon="📚">
        <MarkdownSection content={markdownContent} />
      </InfoBox>

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
          options={genres}
          selected={selectedGenres}
          setSelected={setSelectedGenres}
        />

        <MultiDropdown
          label="Sélectionner des durées"
          options={durees}
          selected={selectedDurees}
          setSelected={setSelectedDurees}
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
            Titre (A → Z)
          </option>
          <option value="titre-desc">Titre (Z → A)</option>
          <option value="note-asc">Note VNDB (faible → fort)</option>
          <option value="note-desc">Note VNDB (fort → faible)</option>
          <option value="popularite-asc">Popularité (meilleure → pire)</option>
          <option value="popularite-desc">Popularité (pire → meilleure)</option>
        </select>
      </div>

      {/* Grille */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,800px))] justify-center gap-8">
        {sorted.map((p) => (
          <DiscoverCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
