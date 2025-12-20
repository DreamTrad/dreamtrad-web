"use client";

import { useEffect, useState } from "react";

export default function ImageCarousel({ images, interval = 10000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      interval,
    );
    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images.length) return null;

  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="relative max-w-6xl overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`gallery-${i + 1}`}
              className="w-full shrink-0"
            />
          ))}
        </div>

        {/* Prev */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
          aria-label="Image précédente"
        >
          ‹
        </button>

        {/* Next */}
        <button
          onClick={next}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
          aria-label="Image suivante"
        >
          ›
        </button>
      </div>

      {/* Dots */}
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
            aria-label={`Aller à l’image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
