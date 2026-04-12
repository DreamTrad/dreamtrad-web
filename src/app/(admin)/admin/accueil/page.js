// app/admin/accueil/page.js

import PageEditor from "@/components/PageEditor";

export default function AdminPage() {

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
            title="Infobox de la page"
            slug="/"
            file="infobox"
            editTitle
            editContent
          />
        </div>
      </div>
    </div>
  );
}
