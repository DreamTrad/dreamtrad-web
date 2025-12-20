"use client";

import Link from "next/link";

export default function ProjectProgressCard({ id, title, image, progress }) {
  const bars = [
    { label: "Traduction", value: progress.traduction },
    { label: "Images", value: progress.images },
    { label: "Technique", value: progress.technique },
    { label: "Relecture", value: progress.relecture },
  ];

  return (
    <div className="bg-bg-secondary flex items-start rounded-xl p-6 shadow-lg">
      {/* Image alignée avec les barres */}
      <div className="mr-6 h-full w-32 shrink-0 overflow-hidden rounded-md">
        <img src={image} alt={title} className="h-full w-auto object-cover" />
      </div>

      {/* Contenu */}
      <div className="flex-1">
        {/* Header avec titre cliquable */}
        <div className="mb-4 flex items-center justify-between">
          <Link href={`/jeux/${id}/`} className="group" scroll={true}>
            <h3 className="group-hover:text-accent text-2xl font-bold transition">
              {title}
            </h3>
          </Link>
        </div>

        {/* Barres de progression */}
        <div className="space-y-3">
          {bars.map((bar) => (
            <div key={bar.label}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{bar.label}</span>
                <span>{bar.value}%</span>
              </div>
              <div className="bg-bg-tertiary relative h-4 w-full overflow-hidden rounded-md">
                <div
                  className="bg-accent absolute top-0 left-0 h-full"
                  style={{ width: `${bar.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
