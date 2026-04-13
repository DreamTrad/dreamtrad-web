"use client";

import { supabase } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import PageEditor from "@/components/PageEditor";
import WidgetsEditor from "./WidgetsEditor";
import ProjectStaffManager from "./ProjectStaffManager";

export default function AdminPage() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Page editor block */}
      <div className="mb-10">
        <h1 className="text-accent mb-4 text-2xl font-bold">
          Contenu de la page équipe
        </h1>

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

        <WidgetsEditor projectId={id}/>

        <div className="mt-10">
          <ProjectStaffManager projectId={id} />
        </div>
      </div>
    </div>
  );
}
