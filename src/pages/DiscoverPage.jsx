import { useEffect, useState, useRef } from "react";
import MetaTags from "../components/MetaTags";
import DiscoverCard from "../components/card/DiscoverCard";
import MarkdownSection from "../components/ui/MarkdownSection";
import LoaderOverlay from "../components/ui/LoaderOverlay";
import useFetchWithLoader from "../hooks/useFetchWithLoader";
import InfoBox from "../components/ui/InfoBox";

// ----------------------
// Composant MultiDropdown
// ----------------------
function MultiDropdown({ label, options, selected, setSelected }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const toggleItem = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
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
        className="border-hover-tertiary bg-bg-tertiary text-text-tertiary w-48 rounded-xl border p-2 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        {selected.length > 0 ? selected.join(", ") : label}
      </button>
      {open && (
        <div className="border-hover-tertiary bg-bg-tertiary text-text-tertiary absolute z-10 mt-1 max-h-75 w-48 overflow-auto rounded-xl border p-2 shadow-lg">
          {options.map((option) => (
            <label
              key={option}
              className="border-hover-tertiary bg-bg-tertiary text-text-tertiary hover:bg-hover-tertiary flex cursor-pointer items-center px-2 py-1"
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
  const {
    data: DiscoverData,
    loading,
    error,
  } = useFetchWithLoader("data/vn_fr_list.json", []);

  const file = "../../data/vndb-fr-global";

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
      }),
    ),
  ).sort();

  const durees = Array.from(
    new Set(DiscoverData.map((p) => p.duree).filter(Boolean)),
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
        return (
          parseInt(a.popularite_vndb || 9999) -
          parseInt(b.popularite_vndb || 9999)
        );
      case "popularite-desc":
        return (
          parseInt(b.popularite_vndb || 9999) -
          parseInt(a.popularite_vndb || 9999)
        );

      default:
        return 0;
    }
  });

  if (loading) return <LoaderOverlay />; // Loader local sur la zone
  if (error) return <p className="text-error text-center">{error.message}</p>;

  return (
    <>
      <div className="max-w-9xl mx-auto p-8">
        <MetaTags
          title="Découverte"
          description="Découvrez des Visual Novel disponibles en français."
          url="decouverte"
        />

        <InfoBox title="Découvrir des Visual Novel en français" icon="📚">
          <MarkdownSection
            file={file}
            className="text-justify leading-relaxed"
          />
        </InfoBox>

        {/* Barre de filtres */}
        <div className="mb-8 mt-16 flex flex-wrap justify-center gap-4">
          <input
            type="text"
            placeholder="Rechercher par nom..."
            className="border-hover-tertiary bg-bg-tertiary text-text-tertiary rounded-xl border p-2"
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
            <option value="">Toutes les traductions</option>
            <option value="officielle" className="">
              Officielle
            </option>
            <option value="non-officielle">Fantraduction</option>
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
            <option value="popularite-asc">
              Popularité (meilleure → pire)
            </option>
            <option value="popularite-desc">
              Popularité (pire → meilleure)
            </option>
          </select>
        </div>

        {/* Grille */}
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(320px,800px))] justify-center gap-8">
          {sortedData.map((project) => (
            <DiscoverCard
              key={project.id}
              titre={project.titre}
              image={project.image}
              genre={project.genre}
              duree={project.duree}
              note_vndb={project.note_vndb}
              popularite_vndb={project.popularite_vndb}
              plateforme={project.plateforme}
              lien_jeu={project.lien_jeu}
              patch_fr={project.patch_fr}
              description={project.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}
