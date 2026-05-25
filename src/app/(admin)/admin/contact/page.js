// app/admin/contact/page.js

import PageEditor from "@/components/PageEditor";

export default function ContactAdminPage() {

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Page editor block */}
      <div className="mb-10">
        <h1 className="text-accent mb-4 text-2xl font-bold">
          Contenu de la page contact
        </h1>

        {/* INFOBOX */}
        <div className="mb-10">
          <PageEditor
            title="Infobox de la page"
            slug="contact"
            file="infobox"
            type="infobox"
            editTitle
            editContent
          />
        </div>
      </div>
    </div>
  );
}
