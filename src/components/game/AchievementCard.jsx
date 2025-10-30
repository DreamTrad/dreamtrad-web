import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import MarkdownSection from "../ui/MarkdownSection";

export default function AchievementCard({
  image,
  titleEn,
  titleFr,
  description,
  resolution,
  hidden,
}) {
  const [revealed, setRevealed] = useState(!hidden);

  // Synchroniser avec le prop hidden si celui-ci change (ex: revealAll)
  useEffect(() => {
    setRevealed(!hidden);
  }, [hidden]);

  const handleClick = () => {
    if (hidden) setRevealed(true);
  };

  return (
    <div
      className="relative bg-bg-tertiary text-text-secondary rounded-lg shadow-md p-4 flex gap-4 items-start w-full max-w-5/6 cursor-pointer"
      onClick={handleClick}
    >
      {/* image */}
      <img
        src={image}
        alt={titleEn}
        className={`w-16 h-16 object-cover rounded-md flex-shrink-0 ${
          revealed ? "" : "blur-sm"
        }`}
      />

      {/* content */}
      <div className="flex flex-col gap-1 flex-1">
        {revealed ? (
          <>
            <h3 className="text-lg font-bold text-text">{titleFr}</h3>
            <p className="text-sm italic text-text-tertiary">{titleEn}</p>
            <ReactMarkdown>{description}</ReactMarkdown>
            {resolution && (
              <p className="text-xs text-text-tertiary mt-2">
                <MarkdownSection
                  content={`:::spoiler[comment l’obtenir]\n${resolution}\n:::`}
                />
              </p>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center text-center w-full h-full text-text-tertiary rounded-md">
            Succès caché
            <br />
            Cliquez pour le dévoiler
          </div>
        )}
      </div>
    </div>
  );
}
