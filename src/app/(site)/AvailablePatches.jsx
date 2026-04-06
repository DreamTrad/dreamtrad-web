"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";

export default function AvailablePatches() {
  const [available, setAvailable] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchPatches = async () => {
      const { data, error } = await supabase.from("patches").select(`
          id,
          project_id,
          name,
          link,
          projects!patches_project_id_fkey (
            title
          )
        `);

      if (error) {
        console.error("Fetch patches error:", error);
        return;
      }

      if (!data?.length) return;

      // group by project_id
      const grouped = data.reduce((acc, p) => {
        if (!acc[p.project_id]) {
          acc[p.project_id] = [];
        }
        acc[p.project_id].push(p);
        return acc;
      }, {});

      // format for UI
      const formatted = Object.entries(grouped).map(
        ([project_id, platforms]) => ({
          id: project_id,
          name: platforms[0]?.projects?.title || project_id,
          image: `/jeux/${project_id}/cover.webp`,
          platforms,
          link: `/jeux/${project_id}/patchfr/telechargement`,
        }),
      );

      setAvailable(formatted);
    };

    fetchPatches();
  }, []);

  // Auto-slide
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
                  sizes="(max-width: 768px) 100vw, 44vw"
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
