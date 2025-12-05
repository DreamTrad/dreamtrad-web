import { useEffect, useState } from "react";

export default function ImageCarousel({ gameId, interval = 10000 }) {
  const [images, setImages] = useState([]);

  const allImages = import.meta.glob("/src/assets/gallery/**/*.webp", {
    eager: true,
  });

  useEffect(() => {
    const prefix = `/src/assets/gallery/${gameId}/`;
    const found = [];

    for (const path in allImages) {
      if (path.startsWith(prefix)) {
        found.push(allImages[path].default);
      }
    }

    setImages(found);
  }, [gameId]);

  const [index, setIndex] = useState(0);

  // Auto-slide
  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      interval
    );

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) return null;

  const goNext = () => setIndex((i) => (i + 1) % images.length);
  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="relative max-w-6xl overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="bg-bg-tertiary flex w-full shrink-0 rounded-xl"
            >
              <img
                src={src}
                alt={`carousel-${i}`}
                className="w-full"
              />
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
        {images.map((_, i) => (
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
