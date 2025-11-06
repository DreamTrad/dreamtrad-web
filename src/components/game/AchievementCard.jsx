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
      className="bg-bg-tertiary text-text-secondary relative flex w-full max-w-5/6 cursor-pointer items-start gap-4 rounded-lg p-4 shadow-md"
      onClick={handleClick}
    >
      {/* image */}
      <img
        src={image}
        alt={titleEn}
        className={`h-16 w-16 flex-shrink-0 rounded-md object-cover ${
          revealed ? "" : "blur-sm"
        }`}
      />

      {/* content */}
      <div className="flex flex-1 flex-col gap-1">
        {revealed ? (
          <>
            <h3 className="text-text text-lg font-bold">{titleFr}</h3>
            <p className="text-text-tertiary text-sm italic">{titleEn}</p>
            <ReactMarkdown>{description}</ReactMarkdown>
            {resolution && (
              <p className="text-text-tertiary mt-2 text-xs">
                <MarkdownSection
                  content={`:::spoiler[comment l’obtenir]\n${resolution}\n:::`}
                />
              </p>
            )}
          </>
        ) : (
          <div className="text-text-tertiary flex h-full w-full items-center justify-center rounded-md text-center">
            Succès caché
            <br />
            Cliquez pour le dévoiler
          </div>
        )}
      </div>
    </div>
  );
}
