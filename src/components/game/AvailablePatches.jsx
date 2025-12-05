import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { games } from "../../data/jeu";

export default function AvailablePatches() {
  const available = [];

  // Extracts text before parentheses
  function cleanPlatformName(name) {
    return name.split("(")[0].trim();
  }

  // Extract patches
  for (const game of games) {
    const jeufr = game.categories?.jeufr;
    if (!jeufr) continue;

    const tele = jeufr.sections?.find((s) => s.id === "telechargement");
    if (!tele || !tele.platforms?.length) continue;

    available.push({
      id: game.id,
      name: game.name,
      image: `/assets/jeu/${game.id}/cover.webp`,
      platforms: tele.platforms,
      link: `/jeu/${game.id}/jeufr/telechargement`,
    });
  }

  const [index, setIndex] = useState(0);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % available.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [available.length]);

  if (available.length === 0) return null;

  const goNext = () => setIndex((i) => (i + 1) % available.length);
  const goPrev = () =>
    setIndex((i) => (i - 1 + available.length) % available.length);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h2 className="text-center text-lg font-semibold">Patchs disponibles</h2>

      {/* Carousel container */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-xl">
        {/* Slides */}
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {available.map((g) => (
            <div
              key={g.id}
              className="bg-bg-tertiary flex w-full shrink-0 flex-col overflow-hidden rounded-xl md:h-72 md:flex-row"
            >
              {/* Image */}
              <div className="w-full md:w-2/3 h-52 md:h-full">
                <img
                  src={g.image}
                  alt={g.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="text-text-secondary flex w-full md:w-1/3 flex-col justify-between gap-3 p-4">
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

                <Link
                  to={g.link}
                  className="bg-accent hover:bg-accent-secondary rounded-md px-4 py-2 text-center font-semibold text-white transition"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Voir le patch →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Left arrow */}
        <button
          onClick={goPrev}
          className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
        >
          ‹
        </button>

        {/* Right arrow */}
        <button
          onClick={goNext}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
        >
          ›
        </button>
      </div>

      {/* Dots */}
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
