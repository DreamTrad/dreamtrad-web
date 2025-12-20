'use client';

import { useState, useCallback } from 'react';
import MarkdownSection from '@/components/ui/MarkdownSection';

export default function AchievementCard({
  image,
  titleEn,
  titleFr,
  description,
  resolution,
  hidden,
}) {
  const [revealed, setRevealed] = useState(false);

  const isRevealed = !hidden || revealed;

  const handleClick = useCallback(() => {
    if (hidden) setRevealed(true);
  }, [hidden]);

  return (
    <div
      className="bg-bg-tertiary text-text-secondary relative flex w-full max-w-5/6 cursor-pointer items-start gap-4 rounded-lg p-4 shadow-md"
      onClick={handleClick}
    >
      {/* image */}
      <img
        src={image}
        alt={titleEn}
        className={`h-16 w-16 shrink-0 rounded-md object-cover ${
          isRevealed ? '' : 'blur-sm'
        }`}
      />

      {/* content */}
      <div className="flex flex-1 flex-col gap-1">
        {isRevealed ? (
          <>
            <h3 className="text-text text-lg font-bold">{titleFr}</h3>
            <p className="text-text-tertiary text-sm italic">{titleEn}</p>

            <MarkdownSection content={description} />

            {resolution && (
              <MarkdownSection
                content={`:::spoiler[comment l’obtenir]\n${resolution}\n:::`}
              />
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
