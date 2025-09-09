import LinkWithIcon from "../ui/LinkWithIcon";
import PlatformIcons from "../ui/PlatformIcons";

export default function DiscoverCard({
  titre,
  image,
  genre = [],
  duree,
  plateforme = [],
  lien_jeu = [],
  patch_fr = [],
  description,
}) {
  return (
    <div className="bg-bg-tertiary rounded-2xl shadow-lg overflow-hidden border border-bg-secondary flex flex-col w-full max-w-6xl">
      {/* Header */}
      <div className="bg-bg-secondary px-6 py-3">
        <h3 className="text-2xl font-bold text-accent">{titre}</h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mt-2">
          {/* Durée */}
          {duree && (
            <span>
              <span className="font-semibold text-accent">Durée :</span> {duree}
            </span>
          )}

          {/* Plateformes */}
          {plateforme.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-accent">Plateformes :</span>
              <PlatformIcons platforms={plateforme} />
            </div>
          )}

          {/* Genres */}
          {genre.length > 0 && (
            <span>
              <span className="font-semibold text-accent">Genres :</span>{" "}
              {genre.join(", ")}
            </span>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-row p-6 gap-6">
        {/* Image */}
        <div className="flex-[2]">
          <img
            src={image}
            alt={`Affiche de ${titre}`}
            className="w-full h-[200px] object-cover rounded-md shadow-md"
          />
        </div>

        {/* Description */}
        <div className="flex-[3] text-text-secondary text-sm text-justify flex items-center">
          <p>{description}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-bg-secondary px-6 py-4 flex flex-col md:flex-row gap-4">
        {/* Patchs */}
        {patch_fr.length > 0 && (
          <div className="flex flex-col gap-2 p-3 border rounded-lg bg-bg-tertiary flex-1">
            <span className="font-semibold text-accent text-sm uppercase tracking-wide">
              Patch Français
            </span>
            <div className="flex gap-3">
              {patch_fr.map((patch, idx) => (
                <LinkWithIcon key={idx} url={patch} />
              ))}
            </div>
          </div>
        )}

        {/* Liens */}
        {lien_jeu.length > 0 && (
          <div className="flex flex-col gap-2 p-3 border rounded-lg bg-bg-tertiary flex-1">
            <span className="font-semibold text-accent text-sm uppercase tracking-wide">
              Obtenir le jeu
            </span>
            <div className="flex gap-3">
              {lien_jeu.map((url, idx) => (
                <LinkWithIcon key={idx} url={url} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}