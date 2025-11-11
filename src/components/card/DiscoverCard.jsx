import { Link } from "react-router-dom";
import LinkWithIcon from "../ui/LinkWithIcon";
import PlatformIcons from "../ui/PlatformIcons";
import ReactMarkdown from "react-markdown";

export default function DiscoverCard({
  id,
  titre,
  image,
  genre = [],
  duree,
  note_vndb,
  popularite_vndb,
  plateforme = [],
  lien_jeu = [],
  patch_fr = [],
  description,
}) {
  const internalPatch = patch_fr.find((p) => p.startsWith("fr:/"));
  const internalPath = internalPatch
    ? `/jeu/${internalPatch.split("/")[2]}/general/`
    : null;

  return (
    <div className="bg-bg-tertiary border-hover-secondary flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl border">
      {/* Header */}
      <div className="bg-bg-secondary px-6 py-3">
        {internalPath ? (
          <div className="mb-4 flex items-center justify-between">
            <Link
              to={internalPath}
              className="group"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <h3 className="group-hover:text-accent text-2xl font-bold transition">
                {titre}
              </h3>
            </Link>
          </div>
        ) : (
          <h3 className="text-2xl font-bold">{titre}</h3>
        )}

        <div className="text-text-secondary mt-2 flex flex-wrap items-center gap-4 text-sm">
          {duree && (
            <span>
              <span className="label-secondary">Durée :</span> {duree}
            </span>
          )}

          {plateforme.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="label-secondary">Plateformes :</span>
              <PlatformIcons platforms={plateforme} />
            </div>
          )}

          {genre.length > 0 && (
            <span>
              <span className="label-secondary">Genres :</span>{" "}
              {genre.join(", ")}
            </span>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-grow flex-col gap-6 p-6 md:flex-row">
        <div className="flex flex-[2] items-center justify-center">
          <img
            src={image}
            alt={`Affiche de ${titre}`}
            className="h-[400px] w-full rounded-md object-contain"
          />
        </div>

        <div className="bg-bg-secondary prose prose-invert text-text-secondary max-w-none flex-[3] rounded-md p-4 text-sm">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-bg-secondary flex flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        {/* Bloc infos (note + popularité) */}
        <div className="flex items-center gap-6 text-sm text-text-secondary">
          {note_vndb && (
            <span>
              <span className="label-secondary">Note VNDB :</span>{" "}
              {parseFloat(note_vndb).toFixed(2)}
            </span>
          )}
          {popularite_vndb && (
            <span>
              <span className="label-secondary">Popularité VNDB :</span>{" "}
              {popularite_vndb}
            </span>
          )}
        </div>

        {/* Bloc liens */}
        {(lien_jeu.length + patch_fr.length > 0) && (
          <div className="bg-bg-tertiary flex flex-wrap items-center gap-3 rounded-xl border border-hover-secondary p-3">
            <span className="text-accent text-xs font-semibold uppercase tracking-wide">
              Liens
            </span>
            <div className="flex flex-wrap gap-3">
              {lien_jeu.map((url, idx) => (
                <LinkWithIcon key={idx} url={url} />
              ))}
              {patch_fr.map((patch, idx) => (
                <LinkWithIcon key={idx} url={patch} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
