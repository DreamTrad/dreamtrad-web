"use client";

import { useParams } from "next/navigation";
import PageEditor from "@/components/PageEditor";
import StorageImageEditor from "@/components/StorageImageEditor";
import WidgetsEditor from "./WidgetsEditor";
import ProjectStaffManager from "./ProjectStaffManager";

function ImageBlock({ title, path, className }) {
  return (
    <div className="bg-bg-secondary rounded-xl p-4">
      <h3 className="text-sm font-medium mb-3">{title}</h3>

      <div className="group relative overflow-hidden rounded-lg">
        <StorageImageEditor imagePath={path}>
          {({ imageUrl, openFilePicker, loading }) => (
            <>
              <img
                src={imageUrl}
                onClick={openFilePicker}
                className={`w-full cursor-pointer object-cover ${className}`}
              />

              <div
                onClick={openFilePicker}
                className="bg-black/60 absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100 cursor-pointer"
              >
                <span className="text-sm text-white">
                  {loading ? "Upload..." : "Changer"}
                </span>
              </div>
            </>
          )}
        </StorageImageEditor>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* HEADER */}
      <h1 className="text-accent mb-6 text-2xl font-bold">
        Contenu de la page équipe
      </h1>

      {/* IMAGES */}
      <div className="bg-bg-tertiary rounded-2xl p-6 mb-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Poster */}
          <ImageBlock
            title="Poster du jeu"
            path={`poster/${id}.webp`}
            className="h-105 object-contain"
          />

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <ImageBlock
              title="Logo du jeu"
              path={`jeux/${id}/logo.webp`}
              className="h-24 object-contain"
            />

            <ImageBlock
              title="Cover du jeu"
              path={`jeux/${id}/cover.webp`}
              className="h-65"
            />
          </div>

        </div>
      </div>

      {/* INFOBOX */}
      <div className="mb-10">
        <PageEditor
          title="Présentation du jeu"
          slug={id}
          file="presentation"
          editTitle
          editContent
        />
      </div>

      {/* WIDGETS */}
      <WidgetsEditor projectId={id} />

      {/* STAFF */}
      <div className="mt-10">
        <ProjectStaffManager projectId={id} />
      </div>
    </div>
  );
}