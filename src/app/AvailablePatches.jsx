"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { games } from "@/data/jeux";

export default function AvailablePatches() {
  const available = useMemo(() => {
    return games
      .map((game) => {
        const patchfr = game.categories?.patchfr;
        if (!patchfr) return null;

        const tele = patchfr.sections?.find((s) => s.id === "telechargement");
        if (!tele?.platforms?.length) return null;

        return {
          id: game.id,
          name: game.name,
          image: `/jeux/${game.id}/cover.webp`,
          platforms: tele.platforms,
          link: `/jeux/${game.id}/patchfr/telechargement`,
        };
      })
      .filter(Boolean);
  }, []);

  const [index, setIndex] = useState(0);

  // Auto-slide every 6s
  useEffect(() => {
    if (!available.length) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % available.length),
      6000,
    );
    return () => clearInterval(timer);
  }, [available.length]);

  if (!available.length) return null;

  const goNext = () => setIndex((i) => (i + 1) % available.length);
  const goPrev = () =>
    setIndex((i) => (i - 1 + available.length) % available.length);

  // Helper
  const cleanPlatformName = (name) => name.split("(")[0].trim();

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h2 className="text-center text-lg font-semibold">Patchs disponibles</h2>

      {/* Carousel container */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {available.map((g) => (
            <div
              key={g.id}
              className="bg-bg-tertiary flex w-full shrink-0 flex-col overflow-hidden rounded-xl md:h-72 md:flex-row"
            >
              <div className="relative h-52 w-full md:h-full md:w-2/3">
                <Image
                  src={g.image}
                  alt={g.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="text-text-secondary flex w-full flex-col justify-between gap-3 p-4 md:w-1/3">
                <div>
                  <h3 className="text-accent text-xl font-bold">{g.name}</h3>
                  <ul className="mt-2 space-y-1">
                    {g.platforms.map((p) => (
                      <li
                        key={p.id}
                        className="text-text text-lg font-semibold"
                      >
                        {cleanPlatformName(p.name)}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={g.link} scroll>
                  <span className="bg-accent hover:bg-accent-secondary inline-block cursor-pointer rounded-md px-4 py-2 text-center font-semibold text-white transition">
                    Voir le patch →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={goPrev}
          className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
        >
          ›
        </button>
      </div>

      <div className="flex gap-2">
        {available.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full transition ${
              i === index
                ? "bg-accent-secondary scale-110"
                : "bg-text-secondary/40 hover:bg-text-secondary/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
