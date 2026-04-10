import Link from "next/link";
import LinkWithIcon from "@/components/ui/LinkWithIcon";
import PlatformIcons from "./PlatformIcons";
import ReactMarkdown from "react-markdown";

export default function DiscoverCard({
  id,
  title,
  genres = [],
  duration,
  vndb_rating,
  vndb_votes,
  platforms = [],
  links = [],
  patch_fr = [],
  description,
}) {

  const safeGenres = Array.isArray(genres) ? genres : [];
  const safePlatforms = Array.isArray(platforms) ? platforms : [];
  const safeLinks = Array.isArray(links) ? links : [];
  const safePatchFr = Array.isArray(patch_fr) ? patch_fr : [];

  const internalPatch = patch_fr.find((p) => p.startsWith("fr:/"));
  const internalPath = internalPatch
    ? `/jeux/${internalPatch.split("/")[2]}/`
    : null;

  return (
    <div className="bg-bg-tertiary border-hover-secondary flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl border">
      {/* Header */}
      <div className="bg-bg-secondary flex flex-col gap-3 px-6 py-3">
        {internalPath ? (
          <div className="mb-2 flex items-center justify-between">
            <Link href={internalPath} className="group">
              <h3 className="group-hover:text-accent text-2xl font-bold transition">
                {title}
              </h3>
            </Link>
          </div>
        ) : (
          <h3 className="text-2xl font-bold">{title}</h3>
        )}

        {/* Première ligne : durée / genres / plateformes */}
        <div className="text-text-secondary flex flex-wrap items-center gap-4 text-sm">
          {duration && (
            <span>
              <span className="label-secondary">Durée :</span> {duration}
            </span>
          )}

          {safePlatforms.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="label-secondary">Plateformes :</span>
              <PlatformIcons platforms={safePlatforms} />
            </div>
          )}

          {safeGenres.length > 0 && (
            <span>
              <span className="label-secondary">Genres :</span>{" "}
              {safeGenres.join(", ")}
            </span>
          )}
        </div>

        {/* Deuxième ligne : note VNDB, popularité, liens */}
        <div className="text-text-secondary flex flex-wrap items-center justify-between gap-6 text-sm">
          {/* Note et popularité */}
          <div className="flex items-center gap-4">
            {vndb_rating && (
              <span>
                <span className="label-secondary">Note VNDB :</span>{" "}
                {(vndb_rating / 10).toFixed(1)}
              </span>
            )}
            {vndb_votes && (
              <span>
                <span className="label-secondary">TOP popularité VNDB :</span>{" "}
                {vndb_votes}
              </span>
            )}
          </div>

          {/* Liens */}
          {safeLinks.length + safePatchFr.length > 0 && (
            <div className="bg-bg-tertiary border-hover-secondary flex flex-wrap items-center gap-3 rounded-xl border p-2">
              <span className="text-accent text-xs font-semibold tracking-wide uppercase">
                Liens
              </span>
              <div className="flex flex-wrap gap-2">
                {safeLinks.map((url, idx) => (
                  <LinkWithIcon key={idx} url={url} />
                ))}
                {safePatchFr.map((patch, idx) => (
                  <LinkWithIcon key={idx} url={patch} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex grow flex-col gap-6 p-6 md:flex-row">
        <div className="flex flex-2 items-center justify-center">
          <img
            src={`poster/${id}.webp`}
            alt={`Affiche de ${title}`}
            className="h-100 w-full rounded-md object-contain"
          />
        </div>

        <div className="bg-bg-secondary prose prose-invert text-text-secondary text-justify max-w-none flex-3 rounded-md p-4 text-sm">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
