export default function DiscoverCard({ titre, image, genre = [], duree, plateforme = [], lien_jeu = [], patch_fr = [], description }) {
  return (
    <div className="bg-bg-tertiary rounded-2xl shadow-lg overflow-hidden border border-bg-secondary flex flex-col w-full max-w-5xl">
      {/* titre */}
      <div className="bg-bg-secondary px-6 py-3">
        <h3 className="text-xl font-bold text-accent">{titre}</h3>
      </div>

      {/* Image + Infos */}
      <div className="flex flex-row p-6 gap-6">
        {/* Image */}
        <div className="flex-[2]">
          <img
            src={image}
            alt={`Affiche de ${titre}`}
            className="w-full h-60 object-cover rounded-md shadow-md"
          />
        </div>

        {/* Infos */}
        <div className="flex-[3] flex flex-col gap-3 text-text-secondary text-sm">
          {/* Genres */}
          {genre.length > 0 && (
            <p>
              <span className="font-semibold text-accent">Genres :</span>{" "}
              {genre.join(", ")}
            </p>
          )}

          {/* Durée */}
          {duree && (
            <p>
              <span className="font-semibold text-accent">Durée :</span> {duree}
            </p>
          )}

          {/* Plateformes */}
          {plateforme.length > 0 && (
            <p>
              <span className="font-semibold text-accent">Plateformes :</span>{" "}
              {plateforme.join(", ")}
            </p>
          )}

          {/* Liens */}
          {lien_jeu.length > 0 && (
            <p>
              <span className="font-semibold text-accent">Lien du jeu :</span>{" "}
              {lien_jeu.map((lien, idx) => (
                <a
                  key={idx}
                  href={lien.startsWith("http") ? lien : `https://${lien}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline ml-1"
                >
                  {lien}
                </a>
              ))}
            </p>
          )}

          {/* Patchs */}
          {patch_fr.length > 0 && (
            <p>
              <span className="font-semibold text-accent">Patch FR :</span>{" "}
              {patch_fr.map((patch, idx) => (
                <a
                  key={idx}
                  href={patch.startsWith("http") ? patch : `https://${patch}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline ml-1"
                >
                  {patch}
                </a>
              ))}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="bg-bg-secondary p-4 rounded-b-2xl text-text-secondary text-sm text-justify">
          {description}
        </div>
      )}
    </div>
  );
}
