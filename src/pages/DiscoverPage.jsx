import { useEffect, useState, useRef } from "react";
import MetaTags from "../components/MetaTags";
import DiscoverCard from "../components/card/DiscoverCard";
import MarkdownSection from "../components/ui/MarkdownSection";
import LoaderOverlay from "../components/ui/LoaderOverlay";
import useFetchWithLoader from "../hooks/useFetchWithLoader";

// ----------------------
// Composant MultiDropdown
// ----------------------
function MultiDropdown({ label, options, selected, setSelected }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const toggleItem = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Fermer si clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="p-2 rounded-xl border border-gray-300 bg-white text-black w-48 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        {selected.length > 0 ? selected.join(", ") : label}
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-48 max-h-60 overflow-auto border border-gray-300 bg-white rounded-xl shadow-lg">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer text-text-secondary"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selected.includes(option)}
                onChange={() => toggleItem(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// ----------------------
// Page principale
// ----------------------
export default function DiscoverPage() {
  const { data: DiscoverData, loading, error } = useFetchWithLoader(
    "data/vn_fr_list.json",
    []
  );

  const file = "../../data/decouvrir-global";

  // Les states pour filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDurees, setSelectedDurees] = useState([]);
  const [traductionFilter, setTraductionFilter] = useState("");

  // Options uniques
  const genres = Array.from(
    new Set(
      DiscoverData.flatMap((p) => {
        if (!p.genre) return [];
        if (Array.isArray(p.genre)) return p.genre;
        return p.genre.split(",").map((g) => g.trim());
      })
    )
  ).sort();

  const durees = Array.from(
    new Set(DiscoverData.map((p) => p.duree).filter(Boolean))
  ).sort();


  // ----------------------
  // Filtrage
  // ----------------------
  const filteredData = DiscoverData.filter((project) => {
    const matchName = project.titre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const projectGenres = Array.isArray(project.genre)
      ? project.genre
      : project.genre
        ? project.genre.split(",").map((g) => g.trim())
        : [];

    const projectDurees = project.duree ? [project.duree] : [];

    const matchGenre =
      selectedGenres.length === 0
        ? true
        : selectedGenres.some((g) => projectGenres.includes(g));

    const matchDuree =
      selectedDurees.length === 0
        ? true
        : selectedDurees.some((d) => projectDurees.includes(d));

    const hasFanTranslation =
      Array.isArray(project.patch_fr) &&
      project.patch_fr.some((link) => link.startsWith("fr:"));

    const matchTraduction =
      traductionFilter === "officielle"
        ? !hasFanTranslation
        : traductionFilter === "non-officielle"
          ? hasFanTranslation
          : true;

    return matchName && matchGenre && matchDuree && matchTraduction;
  });

  const [sortOption, setSortOption] = useState("titre-asc");

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortOption) {
      case "titre-asc":
        return a.titre.localeCompare(b.titre);
      case "titre-desc":
        return b.titre.localeCompare(a.titre);

      case "note-asc":
        return parseFloat(a.note_vndb || 0) - parseFloat(b.note_vndb || 0);
      case "note-desc":
        return parseFloat(b.note_vndb || 0) - parseFloat(a.note_vndb || 0);

      case "popularite-asc": // 1 est mieux → plus petit d’abord
        return parseInt(a.popularite_vndb || 9999) - parseInt(b.popularite_vndb || 9999);
      case "popularite-desc":
        return parseInt(b.popularite_vndb || 9999) - parseInt(a.popularite_vndb || 9999);

      default:
        return 0;
    }
  });

  if (loading) return <LoaderOverlay />; // Loader local sur la zone
  if (error) return <p className="text-red-500 text-center">{error.message}</p>;

  return (
    <div className="p-8 max-w-9xl mx-auto">
      <MetaTags
        title="Découverte"
        description="Découvrez tous les Visual Novels disponibles en français, traduits ou officiels."
        url="decouverte"
      />

      <h2 className="text-3xl font-bold text-accent mb-8 text-center">
        Découvrez des Visual Novel disponible en français
      </h2>

      <div className="mt-16 mb-16">
        <MarkdownSection file={file} />
      </div>

      {/* Barre de filtres */}
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          className="p-2 rounded-xl border border-gray-300 bg-white text-black"
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
          className="p-2 rounded-xl border border-gray-300 bg-white text-black"
          value={traductionFilter}
          onChange={(e) => setTraductionFilter(e.target.value)}
        >
          <option value="">Toutes les traductions</option>
          <option value="officielle">Officielle</option>
          <option value="non-officielle">Fantraduction</option>
        </select>

        <select
          className="p-2 rounded-xl border border-gray-300 bg-white text-black"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="titre-asc">Titre (A → Z)</option>
          <option value="titre-desc">Titre (Z → A)</option>
          <option value="note-asc">Note VNDB (faible → fort)</option>
          <option value="note-desc">Note VNDB (fort → faible)</option>
          <option value="popularite-asc">Popularité (meilleure → pire)</option>
          <option value="popularite-desc">Popularité (pire → meilleure)</option>
        </select>
      </div>

      {/* Grille */}
      <div className="grid gap-8 w-full justify-center [grid-template-columns:repeat(auto-fit,minmax(320px,800px))]">
        {sortedData.map((project) => (
          <DiscoverCard
            key={project.id}
            titre={project.titre}
            image={project.image}
            genre={project.genre}
            duree={project.duree}
            plateforme={project.plateforme}
            lien_jeu={project.lien_jeu}
            patch_fr={project.patch_fr}
            description={project.description}
          />
        ))}
      </div>
    </div>
  );
}
