"use client";

import { useParams } from "next/navigation";
import PageEditor from "@/components/PageEditor";
import StorageImageEditor from "@/components/StorageImageEditor";
import WidgetsEditor from "./WidgetsEditor";
import ProjectStaffManager from "./ProjectStaffManager";

export default function AdminPage() {
  const { id } = useParams();

return (
  <div className="mx-auto max-w-6xl p-6">
    <div className="mb-10">
  <h1 className="text-accent mb-4 text-2xl font-bold">
    Contenu de la page équipe
  </h1>

  <div className="bg-bg-tertiary rounded-2xl p-6 mb-4">

    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">

      <div>
        <StorageImageEditor
          title="Poster du jeu"
          imagePath={`poster/${id}.webp`}
          previewClassName="h-100 w-full rounded-md object-contain"
        />
      </div>

      <div className="flex flex-col gap-6">
        <StorageImageEditor
          title="Logo du jeu"
          imagePath={`jeux/${id}/logo.webp`}
          previewClassName="h-24 object-contain"
        />

        <StorageImageEditor
          title="Cover du jeu"
          imagePath={`jeux/${id}/cover.webp`}
          previewClassName="h-full w-full object-cover"
        />
      </div>

        </div>
      </div>

      {/* INFOBOX */}
      <div className="mb-10">
        <PageEditor
          title="Présentation u jeu"
          slug={id}
          file="presentation"
          editTitle
          editContent
        />
      </div>

      <WidgetsEditor projectId={id} />

      <div className="mt-10">
        <ProjectStaffManager projectId={id} />
      </div>
    </div>
  </div>
);
}
